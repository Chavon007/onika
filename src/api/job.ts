"use client";

import apiClient from "@/ultiz/axios";
import { postJobDTO } from "@/schema/postJobSchema";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import uploadToCloudinary from "@/ultiz/cloudinary";
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

const artisanAcceptJob = async (jobId: string) => {
  const response = await apiClient.patch(`/jobs/${jobId}/accept`);
  return response.data;
};

const artisanRejectJob = async (jobId: string) => {
  const response = await apiClient.patch(`/jobs/${jobId}/reject`);
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
export default usePostJobMutation;
