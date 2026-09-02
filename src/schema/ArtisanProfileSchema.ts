import { z } from "zod";

export const ArtisanProfileSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number can't less than 1")
    .max(14, "Phone number can't be more than 14"),
  city: z.string().min(1, "City can't be less than 1 character"),
  bio: z
    .string()
    .min(1, "Bio can't be less than one character")
    .max(500, "Bio can't be more than 500 words"),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  experience: z.string().min(1, "Please slecet years of experience"),
  nin: z.string().length(11, "NIN must be 11 digits"),
  bvn: z.string().length(11, "BVN must be 11 digits").optional(),
  governmentId: z.instanceof(File, {
    message: "Upload a verified Government id",
  }),
  faceVerification: z.instanceof(File, { message: "Face verification needed" }),
  workImage: z
    .array(z.instanceof(File))
    .min(1, "Please upload at least one work image")
    .max(6, "You can upload a maximum of 6 work images"),
});

export type artisanProfileDTO = z.infer<typeof ArtisanProfileSchema>;
