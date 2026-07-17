"use client";
import apiClient from "@/ultiz/axios";
import { User } from "../lib/types";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import {
  signupFormDTO,
  loginFormDTO,
  verifyFormDTO,
} from "../schema/userSchema";
import { useMutation } from "@tanstack/react-query";

const signupFn = async (data: signupFormDTO) => {
  return apiClient.post("/auth/signup", data);
};

const loginFn = async (data: loginFormDTO) => {
  return apiClient.post("/auth/login", data);
};

// logout
const logout = async () => {
  return apiClient.post("/auth/logout");
};

// fetch user's profile
const fetchMeFn = async (): Promise<User> => {
  return apiClient.get("/auth/me");
};

const verifyOTPtFn = async (data: verifyFormDTO) => {
  return apiClient.post("/auth/verify", data);
};

const resendOTPfn = async () => {
  return apiClient.post("/auth/resend-otp");
};

const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: loginFormDTO) => {
      await loginFn(data);

      const user = await fetchMeFn();
      return user;
    },

    onSuccess: (user) => {
      useAuthStore.getState().login(user, user.verified);
      toast.success("Login successful");
    },
  });
};

const useSignupMutation = () => {
  return useMutation({
    mutationFn: signupFn,
    onSuccess: () => {
      toast.success("Account created succesfully");
    },
  });
};

const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async (data: verifyFormDTO) => {
      await verifyOTPtFn(data);
      const user = await fetchMeFn();
      return user;
    },
    onSuccess: (user) => {
      useAuthStore.getState().login(user, user.verified);
      toast.success("Account verified successfully");
    },
  });
};

const useResendOTP = () => {
  return useMutation({
    mutationFn: resendOTPfn,
    onSuccess: () => {
      toast.success("A new code has been sent");
    },
  });
};
export default {
  useLoginMutation,
  useSignupMutation,
  loginFn,
  signupFn,
  fetchMeFn,
  logout,
  verifyOTPtFn,
  useVerifyOTP,
  useResendOTP,
};
