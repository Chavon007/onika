"use client";

import apiClient from "@/ultiz/axios";
import { artisanProfileDTO } from "@/schema/ArtisanProfileSchema";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import uploadToCloudinary from "@/ultiz/cloudinary";
import { ArtisanProfile } from "@/lib/types";
const verifyArtisanProfile = async (data: artisanProfileDTO) => {
  const [governmentIdUrl, faceVerificationUrl, workImageUrls] =
    await Promise.all([
      uploadToCloudinary(data.governmentId, "artisan/government-id"),
      uploadToCloudinary(data.faceVerification, "artisan/face-verification"),
      Promise.all(
        data.workImage.map((file) =>
          uploadToCloudinary(file, "artisan/work-images"),
        ),
      ),
    ]);
  return apiClient.post("/artisan/create-profile", {
    bio: data.bio,
    skills: data.skills,
    nin: data.nin,
    bvn: data.bvn,
    governmentId: governmentIdUrl,
    workImage: workImageUrls,
    faceVerification: faceVerificationUrl,
    experience: data.experience,
  });
};

const fetchAllArtisan = async (skill?: string) => {
  const res = await apiClient.get<ArtisanProfile[]>("/artisan/all", {
    params: skill ? { skill } : {},
  });
  return res.data;
};

const useVerifyArtisanMutation = () => {
  return useMutation({
    mutationFn: verifyArtisanProfile,

    onSuccess: () => {
      toast.success("Details uplaoded successfully");
    },
    onError() {
      toast.error("Something went wrong while submitting your profile");
    },
  });
};

export const useFetchAllArtisan = (skill?: string) => {
  return useQuery({
    queryKey: ["fetch-all-artisan", skill ?? "all"],
    queryFn: () => fetchAllArtisan(skill),
    placeholderData: keepPreviousData,
  });
};

export default useVerifyArtisanMutation;
