import apiClient from "@/ultiz/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const customerAmountInEscrow = async () => {
  const response = await apiClient.get("/escrow/balance/customers");

  return response.data;
};

export const useCustomerAmountInEscrow = () => {
  return useQuery({
    queryKey: ["Customer-amount-in-escrow"],
    queryFn: customerAmountInEscrow,
  });
};
