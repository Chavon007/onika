"use client";

import apiClient from "@/ultiz/axios";
import { artisanProfileDTO } from "@/schema/ArtisanProfileSchema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import uploadToCloudinary from "@/ultiz/cloudinary";

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
export default useVerifyArtisanMutation;
