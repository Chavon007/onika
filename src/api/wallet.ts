import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import apiClient from "@/ultiz/axios";
import { Transaction } from "@/lib/types";

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
const fetchTransactionHistory = async (
  page: number,
  limit: number,
): Promise<PaginatedResponse<Transaction>> => {
  const response:any = await apiClient.get("wallet/history", {
    params: { page, limit },
  });
  return response?.pagination ? response : response.data;
};

export const useFetchTransactionHistory = (page= 1, limit=6) => {
  return useQuery({
    queryKey: ["transaction-history", page, limit],
    queryFn: () => fetchTransactionHistory(page, limit),
    placeholderData: keepPreviousData,
  });
};
