import apiClient, { getErrorMessage } from "@/ultiz/axios";
import toast from "react-hot-toast";
import { bankAccountDTO, bankAccountSchema } from "@/schema/bankSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { string } from "zod";
import { id } from "zod/locales";

const getBankList = async () => {
  const response = await apiClient.get("/bank/list");
  return response.data;
};

const getBankDetails = async (data: bankAccountDTO) => {
  const response = await apiClient.get("/bank/resolve", {
    params: {
      bankCode: data.bankCode,
      accountNumber: data.accountNumber,
    },
  });
  return response.data;
};

const addBankAccount = async (data: bankAccountDTO) => {
  const response = await apiClient.post("bank", data);

  return response.data;
};

const getUserBank = async () => {
  const response = await apiClient.get("/bank");
  return response.data;
};

const deleteBankAccount = async (id: string) => {
  const response = await apiClient.delete(`/bank/${id}`);

  return response.data;
};

export const useGetBankList = () => {
  return useQuery({
    queryKey: ["bank-list"],
    queryFn: getBankList,
  });
};
export const useGetBankDetail = (data: bankAccountDTO) => {
  return useQuery({
    queryKey: ["bank-detail", data.accountNumber, data.bankCode],
    queryFn: () => getBankDetails(data),
    enabled: !!data.bankCode && /^\d{10}$/.test(data.accountNumber),
  });
};

export const useAddBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBankAccount,
    onSuccess: () => {
      toast.success("Bank account added successfully");
      queryClient.invalidateQueries({ queryKey: ["bank"] });
    },
    onError(error) {
      toast.error(getErrorMessage(error, "Failed. Something happend"));
    },
  });
};

export const useGetUserBank = () => {
  return useQuery({
    queryKey: ["bank"],
    queryFn: getUserBank,
  });
};

export const useDeletBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBankAccount,
    onSuccess: () => {
      toast.success("Bank account deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bank"] });
    },
  });
};
