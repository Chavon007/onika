import apiClient from "@/ultiz/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";

const getArtisanCurrentMonthEarnings = async () => {
  const response = await apiClient.get("/earning/artisan/month");
  return response.data;
};

const getArtisanAllTimeEarnings = async () => {
  const response = await apiClient.get("/earning/artisan/total");

  return response.data;
};

export const useGetArtisanCurrentMonthEarnings = () => {
  const role = useAuthStore((s) => s.user?.role);
  return useQuery({
    queryKey: ["artisan-month-earnings"],
    queryFn: getArtisanCurrentMonthEarnings,
    enabled: role === "artisan",
  });
};

export const useGetArtisanAllTimeEarnings = () => {
  const role = useAuthStore((s) => s.user?.role);
  return useQuery({
    queryKey: ["artisan-all-time-earning"],
    queryFn: getArtisanAllTimeEarnings,
    enabled: role === "artisan",
  });
};
