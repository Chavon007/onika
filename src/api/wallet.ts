import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import apiClient, { getErrorMessage } from "@/ultiz/axios";
import { Transaction } from "@/lib/types";
import { walletFundingDTO } from "@/schema/walletFundingSchema";
import toast from "react-hot-toast";
import { WalletDetails } from "@/lib/types";
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

interface fundingResult {
  authorizationUrl: string;
  reference: string;
}
interface fundingVerification {
  status: string;
  paid: boolean;
}
const fetchTransactionHistory = async (
  page: number,
  limit: number,
): Promise<PaginatedResponse<Transaction>> => {
  const response: any = await apiClient.get("wallet/history", {
    params: { page, limit },
  });
  return response?.pagination ? response : response.data;
};

const fundingWallet = async (
  data: walletFundingDTO,
): Promise<fundingResult> => {
  const response = await apiClient.post("/wallet/fund", {
    amount: Math.round(data.amount * 100),
  });

  const result: fundingResult | undefined = response?.data?.authorizationUrl
    ? response.data
    : response?.data?.data;

  if (!result?.authorizationUrl) {
    throw new Error("No payment link was returned");
  }

  return result;
};

const getFundingReference = async (
  reference: string,
): Promise<fundingVerification> => {
  const response = await apiClient.get(`/wallet/fund/verify/${reference}`);

  const body = response?.data;

  return body?.paid !== undefined ? body : body?.data;
};

const getWallet = async () => {
  const response = await apiClient.get("/wallet");

  return response.data;
};

export const useFetchTransactionHistory = (page = 1, limit = 6) => {
  return useQuery({
    queryKey: ["transaction-history", page, limit],
    queryFn: () => fetchTransactionHistory(page, limit),
    placeholderData: keepPreviousData,
  });
};

export const useFundingWallet = () => {
  return useMutation({
    mutationFn: fundingWallet,
    onSuccess: ({ authorizationUrl }) => {
      const url = new URL(authorizationUrl);
      if (!url.hostname.endsWith("paystack.com")) {
        toast.error("Invalid payment link");
        return;
      }
      toast.success("Redirecting to Paystack...");
      window.location.href = authorizationUrl;
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed to start payment"));
    },
  });
};

export const useGetFundingReference = (reference: string | null) => {
  return useQuery({
    queryKey: ["wallet-funding-reference", reference],
    queryFn: () => getFundingReference(reference as string),
    enabled: Boolean(reference),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useGetWallet = () => {
  return useQuery<WalletDetails>({
    queryKey: ["wallet"],
    queryFn: getWallet,
  });
};
