import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

interface ApiErrorBody {
  message?: string;
  errors?: string[] | string;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: {
  resolve: () => void;
  reject: (err: unknown) => void;
}[] = [];

const onRefreshed = () => {
  refreshSubscribers.forEach(({ resolve }) => resolve());
  refreshSubscribers = [];
};

const onRefreshFailed = (err: unknown) => {
  refreshSubscribers.forEach(({ reject }) => reject(err));
  refreshSubscribers = [];
};

const getToastMessage = (data: ApiErrorBody | undefined, fallback: string) => {
  const details = data?.errors;

  if (Array.isArray(details) && details.length > 0) {
    return details.join(", ");
  }
  if (typeof details === "string" && details) {
    return details;
  }
  return data?.message || fallback;
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as ApiErrorBody | undefined;

      // Attempt silent refresh on 401, but only once per request,
      // and never for the refresh endpoint itself (avoid infinite loop)
      if (
        status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !originalRequest.url?.includes("/auth/refresh")
      ) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            await apiClient.post("/auth/refresh");
            isRefreshing = false;
            onRefreshed();
            return apiClient(originalRequest); 
          } catch (refreshError) {
            isRefreshing = false;
            onRefreshFailed(refreshError);
            useAuthStore.getState().logout();
            toast.error("Session expired. Please log in again.");
            setTimeout(() => {
              window.location.href = "/login";
            }, 1500);
            return Promise.reject(refreshError);
          }
        }

        // a refresh is already in flight: queue this request until it's done
        return new Promise((resolve, reject) => {
          refreshSubscribers.push({
            resolve: () => resolve(apiClient(originalRequest)),
            reject,
          });
        });
      }

      if (status === 403) {
        toast.error("You are not authorized to perform this action", {
          id: "forbidden",
        });
      } else if (status !== 401) {
        const message = getToastMessage(data, error.message);
        toast.error(message, { id: message });
      }
    } else if (error.request) {
      toast.error(
        "Network Error: Could not successfully communicate with the backend",
        { id: "network-error" },
      );
    } else {
      toast.error(error.message);
    }

    return Promise.reject(error);
  },
);

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || fallback;
  }

  return fallback;
};

export default apiClient;