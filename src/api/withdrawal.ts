import apiClient, { getErrorMessage } from "@/ultiz/axios";
import { WithdrawalPayload } from "@/schema/withdrawSchema";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const withdrawFund = async (data: WithdrawalPayload) => {
  const response = await apiClient.post("/withdrawal", data);
  return response.data;
};

export const useWithdrawalFund = () => {
  return useMutation({
    mutationFn: withdrawFund,
    onSuccess: () => {
      toast.success("Withdrawal requested successfully");
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed. Something happened"));
    },
  });
};
