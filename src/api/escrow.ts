import apiClient from "@/ultiz/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";
const customerAmountInEscrow = async () => {
  const response = await apiClient.get("/escrow/balance/customers");

  return response.data;
};

export const useCustomerAmountInEscrow = () => {
  const role = useAuthStore((s) => s.user?.role);
  return useQuery({
    queryKey: ["Customer-amount-in-escrow"],
    queryFn: customerAmountInEscrow,
    enabled: role === "customer",
  });
};
