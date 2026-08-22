import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
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



apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      const data: any = error.response.data;
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
      toast.error(`${subject}: ${finalMessage}`);

      if (error.response.status === 401) {
        console.warn("Unauthorized request - redirecting to login");
        useAuthStore.getState().logout();
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
      if (error.response.status === 403) {
        toast.error("You are not authorized to perform this action");
      }
    } else if (error.request) {
      toast.error(
        "Network Error: Could not successfully communicate with the backend",
      );
    } else {
      toast.error(error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
