"use client";
import apiClient from "@/ultiz/axios";
import { User } from "../lib/types";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import { signupFormDTO, loginFormDTO } from "../schema/userSchema";
import { useMutation } from "@tanstack/react-query";

const signupFn = async (data: signupFormDTO) => {
  return apiClient.post("/auth/signup", data);
};

const loginFn = async (data: loginFormDTO) => {
  return apiClient.post("/auth/login", data);
};
const logout = async () => {
  return apiClient.post("/auth/logout");
};

const fetchMeFn = async (): Promise<User> => {
  return apiClient.get("/auth/me");
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

export default {
  useLoginMutation,
  useSignupMutation,
  loginFn,
  signupFn,
  fetchMeFn,
  logout,
};
