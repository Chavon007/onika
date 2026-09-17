"use client";

import apiClient from "@/ultiz/axios";
import { postJobDTO } from "@/schema/postJobSchema";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import uploadToCloudinary from "@/ultiz/cloudinary";
import { jobDetails } from "@/lib/types";
import { useRouter } from "next/navigation";
import { raiseDisputeDTO } from "@/schema/disputeSchema";
const postJobs = async (data: postJobDTO) => {
  const imagesUrl = await Promise.all(
    data.images.map((file) => uploadToCloudinary(file, "job-image")),
  );
  return apiClient.post("/post-job", {
    category: data.category,
    city: data.city,
    description: data.description,
    state: data.state,
    lga: data.lga,
    price: data.price,
    priority: data.priority,
    images: imagesUrl,
    landmark: data.landmark,
    address: data.address,
  });
};

const findJobsForArtisan = async () => {
  const response = apiClient.get("/jobs/pending");

  return (await response).data;
};

const getJobDetails = async (jobId: string): Promise<jobDetails> => {
  const response = await apiClient.get(`/jobs/${jobId}`);
  return response.data;
};
const artisanAcceptJob = async (jobId: string) => {
  const response = await apiClient.patch(`/jobs/${jobId}/accept`);
  return response.data;
};

const artisanRejectJob = async (jobId: string) => {
  const response = await apiClient.patch(`/jobs/${jobId}/reject`);
  return response.data;
};

const artisanActiveJobs = async () => {
  const response = await apiClient.get("/jobs/artisan-active");
  return response.data;
};

const customerActiveJobs = async () => {
  const response = await apiClient.get("/jobs/customer-active");
  return response.data;
};

const artisanCompleteJob = async (jobId: string) => {
  const response = await apiClient.patch(`/jobs/${jobId}/complete`);

  return response.data;
};

const artisanJobInProgress = async (jobId: string) => {
  const response = await apiClient.patch(`/jobs/${jobId}/in-progress`);
  return response.data;
};

const raiseDispute = async ({
  jobId,
  data,
}: {
  jobId: string;
  data: raiseDisputeDTO;
}) => {
  const response = await apiClient.patch(`/jobs/${jobId}/dispute`, data);

  return response.data;
};

const cancelJob = async (jobId: string) => {
  const response = await apiClient.patch(`/jobs/${jobId}/cancel`);

  return response.data;
};
const usePostJobMutation = () => {
  return useMutation({
    mutationFn: postJobs,
    onSuccess: () => {
      toast.success("Job posted successfully");
    },
    onError() {
      toast.error("Failed to post job");
    },
  });
};

export const useFindJobForArtisan = () => {
  return useQuery({
    queryKey: ["artisan-jobs"],
    queryFn: findJobsForArtisan,
  });
};

export const useGetJobDetails = (jobId: string) => {
  return useQuery<jobDetails>({
    queryKey: ["artisan-job-details", jobId],
    queryFn: () => getJobDetails(jobId),
    enabled: !!jobId,
  });
};
export const useArtisanAcceptJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: artisanAcceptJob,
    onSuccess: () => {
      toast.success("Job Accepted");
      queryClient.invalidateQueries({ queryKey: ["artisan-jobs"] });
    },
    onError(error: any) {
      const message = error?.response?.data.message || "Failed to accept job";
      toast.error(message);
    },
  });
};

export const useArtisanRejectJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: artisanRejectJob,
    onSuccess: () => {
      toast.success("Job Rejected");
      queryClient.invalidateQueries({ queryKey: ["artisan-jobs"] });
    },
    onError(error: any) {
      const message = error?.response?.data.message || "Failed to reject job";
      toast.error(message);
    },
  });
};

export const useArtisanActiveJob = () => {
  return useQuery({
    queryKey: ["artisan-active-jobs"],
    queryFn: artisanActiveJobs,
  });
};

export const useCustomerActiveJob = () => {
  return useQuery({
    queryKey: ["customer-active-jobs"],
    queryFn: customerActiveJobs,
  });
};
export const useArtisanCompleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: artisanCompleteJob,
    onSuccess: () => {
      toast.success("Job completed");
      queryClient.invalidateQueries({ queryKey: ["artisan-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["artisan-active-jobs"] });
    },
    onError(error: any) {
      const message = error?.response?.data.message || "Failed to complete job";
      toast.error(message);
    },
  });
};

export const useArtisanJobInprogress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: artisanJobInProgress,
    onSuccess: () => {
      toast.success("Job has started");
      queryClient.invalidateQueries({ queryKey: ["artisan-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["artisan-active-jobs"] });
    },
    onError(error: any) {
      const message =
        error?.response?.data.message || "Failed to turn job to in progress";
      toast.error(message);
    },
  });
};

export const useRaiseDispute = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: raiseDispute,
    onSuccess: () => {
      toast.success("Dispute raised successfully");
      router.push("/dashboard");
    },
    onError(error: any) {
      const message =
        error?.response?.data.message || "Failed to raise dispute";
      toast.error(message);
    },
  });
};
export const useCustomerCancelJob = () => {
  return useMutation({
    mutationFn: cancelJob,
    onSuccess: () => {
      toast.success("Job has been cancelled");
    },
    onError(error: any) {
      const message = error?.response?.data.message || "Failed to cancel";
      toast.error(message);
    },
  });
};
export default usePostJobMutation;
