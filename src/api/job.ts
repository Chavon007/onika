"use client";

import apiClient from "@/ultiz/axios";
import { postJobDTO } from "@/schema/postJobSchema";
import {
  useQueryClient,
  useQuery,
  useMutation,
  keepPreviousData,
  QueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import uploadToCloudinary from "@/ultiz/cloudinary";
import { jobDetails } from "@/lib/types";
import { useRouter } from "next/navigation";
import { PrivetJobBookingDTO } from "@/schema/postJobSchema";
import { raiseDisputeDTO } from "@/schema/disputeSchema";
import { getErrorMessage } from "@/ultiz/axios";

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ---------------------------------------------------------------------------
// Query keys
// These match the keys in the wallet hooks file:
//   balance  -> ["wallet"]
//   history  -> ["transaction-history", page, limit]
// Using just ["transaction-history"] refreshes every page of the history.
// ---------------------------------------------------------------------------
const WALLET_KEYS = [["wallet"], ["transaction-history"]];
const CUSTOMER_KEYS = [["customer-active-jobs"], ["customer-job-history"]];
const ARTISAN_KEYS = [
  ["artisan-jobs"],
  ["artisan-active-jobs"],
  ["fetch-private-booking"],
];

// Refreshes a group of queries so the screen updates straight away.
const refresh = (queryClient: QueryClient, ...groups: string[][][]) => {
  groups.flat().forEach((queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  });
};

// ---------------------------------------------------------------------------
// API calls
// The backend stores money in KOBO. The user types NAIRA, so we multiply by
// 100 here, in ONE place, before sending. Do not convert anywhere else.
// ---------------------------------------------------------------------------
const toKobo = (naira: number) => Math.round(naira * 100);

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
    price: toKobo(data.price),
    priority: data.priority,
    images: imagesUrl,
    landmark: data.landmark,
    address: data.address,
  });
};

const privateBooking = async (data: PrivetJobBookingDTO) => {
  const imagesUrl = await Promise.all(
    data.images.map((file) => uploadToCloudinary(file, "job-image")),
  );

  return apiClient.post("/private-job", {
    artisanId: data.artisanId,
    address: data.address,
    description: data.description,
    price: toKobo(data.price),
    date: data.date,
    images: imagesUrl,
  });
};

const findJobsForArtisan = async () => {
  const response = await apiClient.get("/jobs/pending");
  return response.data;
};

const fetchArtisanPrivateJobs = async () => {
  const response = await apiClient.get("/jobs/private-bookings");
  return response.data;
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

const fetchPrivateJobDetail = async (jobId: string): Promise<jobDetails> => {
  const response = await apiClient.get(`/jobs/private-booking/${jobId}`);
  return response.data;
};

const acceptPrivateJobBooking = async (jobId: string) => {
  const response = await apiClient.patch(
    `/jobs/private-booking/${jobId}/accept`,
  );
  return response.data;
};

const rejectPrivateJobBooking = async (jobId: string) => {
  const response = await apiClient.patch(
    `/jobs/private-booking/${jobId}/reject`,
  );
  return response.data;
};

export const customerJobHistory = async (page = 1, limit = 6) => {
  const response = await apiClient.get<unknown, PaginatedResponse<jobDetails>>(
    "/jobs/history",
    { params: { page, limit } },
  );
  return { jobs: response.data, pagination: response.pagination };
};

// ---------------------------------------------------------------------------
// Customer hooks
// ---------------------------------------------------------------------------

// Posting a job takes money from the wallet, so refresh the wallet too.
const usePostJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postJobs,
    onSuccess: () => {
      toast.success("Job posted successfully");
      refresh(queryClient, CUSTOMER_KEYS, WALLET_KEYS);
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to post job"));
    },
  });
};

export const usePrivateJobBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: privateBooking,
    onSuccess: () => {
      toast.success("Job has been sent to artisan successfully");
      refresh(queryClient, CUSTOMER_KEYS, WALLET_KEYS);
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to send job to artisan"));
    },
  });
};

export const useCustomerActiveJob = () => {
  return useQuery({
    queryKey: ["customer-active-jobs"],
    queryFn: customerActiveJobs,
  });
};

export const useCustomerJobHistory = (page: number) => {
  return useQuery({
    queryKey: ["customer-job-history", page],
    queryFn: () => customerJobHistory(page),
    placeholderData: keepPreviousData,
  });
};

// Cancelling refunds the customer, so the lists AND the wallet must refresh.
export const useCustomerCancelJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelJob,
    onSuccess: () => {
      toast.success("Job has been cancelled");
      refresh(queryClient, CUSTOMER_KEYS, ARTISAN_KEYS, WALLET_KEYS);
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to cancel"));
    },
  });
};

export const useRaiseDispute = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: raiseDispute,
    onSuccess: () => {
      toast.success("Dispute raised successfully");
      refresh(queryClient, CUSTOMER_KEYS, ARTISAN_KEYS, WALLET_KEYS);
      router.push("/dashboard");
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to raise dispute"));
    },
  });
};

// ---------------------------------------------------------------------------
// Artisan hooks
// ---------------------------------------------------------------------------

export const useFindJobForArtisan = () => {
  return useQuery({
    queryKey: ["artisan-jobs"],
    queryFn: findJobsForArtisan,
  });
};

export const useFetchArtisanPrivateBooking = () => {
  return useQuery({
    queryKey: ["fetch-private-booking"],
    queryFn: fetchArtisanPrivateJobs,
  });
};

export const useGetJobDetails = (
  jobId: string,
  type: "public" | "private" = "public",
) => {
  return useQuery<jobDetails>({
    queryKey: ["artisan-job-details", type, jobId],
    queryFn: () =>
      type === "private" ? fetchPrivateJobDetail(jobId) : getJobDetails(jobId),
    enabled: !!jobId,
  });
};

export const useArtisanAcceptJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: artisanAcceptJob,
    onSuccess: () => {
      toast.success("Job Accepted");
      refresh(queryClient, ARTISAN_KEYS, CUSTOMER_KEYS);
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to accept job"));
    },
  });
};

export const useArtisanRejectJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: artisanRejectJob,
    onSuccess: () => {
      toast.success("Job Rejected");
      refresh(queryClient, ARTISAN_KEYS);
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to reject job"));
    },
  });
};

export const useAcceptPrivateJobBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptPrivateJobBooking,
    onSuccess: () => {
      toast.success("Job accepted");
      refresh(queryClient, ARTISAN_KEYS, CUSTOMER_KEYS);
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to accept job"));
    },
  });
};

// Rejecting a private job refunds the customer in full.
export const useRejectPrivateJobBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectPrivateJobBooking,
    onSuccess: () => {
      toast.success("Job rejected");
      refresh(queryClient, ARTISAN_KEYS, CUSTOMER_KEYS, WALLET_KEYS);
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to reject job"));
    },
  });
};

export const useArtisanActiveJob = () => {
  return useQuery({
    queryKey: ["artisan-active-jobs"],
    queryFn: artisanActiveJobs,
  });
};

export const useArtisanCompleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: artisanCompleteJob,
    onSuccess: () => {
      toast.success("Job completed");
      refresh(queryClient, ARTISAN_KEYS, CUSTOMER_KEYS);
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to complete job"));
    },
  });
};

export const useArtisanJobInprogress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: artisanJobInProgress,
    onSuccess: () => {
      toast.success("Job has started");
      refresh(queryClient, ARTISAN_KEYS, CUSTOMER_KEYS);
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to turn job to in progress"));
    },
  });
};

export default usePostJobMutation;