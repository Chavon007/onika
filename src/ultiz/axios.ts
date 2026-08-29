import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response) {
      const data: any = error.response.data;

      // Attempt silent refresh on 401, but only once per request,
      // and never for the refresh endpoint itself (avoid infinite loop)
      if (
        error.response.status === 401 &&
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
            return apiClient(originalRequest); // retry the original request
          } catch (refreshError) {
            isRefreshing = false;
            useAuthStore.getState().logout();
            toast.error("Session expired. Please log in again.");
            setTimeout(() => {
              window.location.href = "/login";
            }, 1500);
            return Promise.reject(refreshError);
          }
        }

        // if a refresh is already in flight, queue this request until it's done
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            resolve(apiClient(originalRequest));
          });
        });
      }

      const subject = data?.message || "Error";
      const details = data?.errors;

      let finalMessage = "";
      if (Array.isArray(details)) {
        finalMessage = details.join(",");
      } else if (typeof details === "string") {
        finalMessage = details;
      } else {
        finalMessage = error.message;
      }

      // don't toast on the 401 we're silently handling above
      if (error.response.status !== 401) {
        toast.error(`${subject}: ${finalMessage}`);
      }

      if (error.response.status === 403) {
        toast.error("You are not authorized to perform this action");
      }
    } else if (error.request) {
      toast.error("Network Error: Could not successfully communicate with the backend");
    } else {
      toast.error(error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;