"use client";

import apiClient from "@/ultiz/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const customerReleasePayment = async (jobId: string) => {
  const response = await apiClient.post(`/jobs/${jobId}/release-payment`);

  return response.data;
};

export const useCustomerReleasePayment = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: customerReleasePayment,
    onSuccess: () => {
      toast.success("Artisan has been schedule for payment");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data.message || "Failed to processs payment";
      toast.error(message);
    },
  });
};
