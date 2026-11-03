"use client";

import apiClient, { getErrorMessage } from "@/ultiz/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const REFRESH_KEYS = [
  ["customer-active-jobs"],
  ["customer-job-history"],
  ["artisan-active-jobs"],
  ["wallet"],
  ["transaction-history"],
];

const customerReleasePayment = async (jobId: string) => {
  const response = await apiClient.post(`/jobs/${jobId}/release-payment`);
  return response.data;
};

export const useCustomerReleasePayment = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerReleasePayment,
    onSuccess: () => {
      toast.success(
        "Job confirmed. Payment will be released to the artisan shortly.",
      );
      REFRESH_KEYS.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      );
      router.push("/dashboard");
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to process payment"));
    },
  });
};