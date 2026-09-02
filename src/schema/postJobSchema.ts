import z from "zod";

export const postJobSchema = z.object({
  category: z
    .string()
    .min(1, "Category you need must be more than 1 character"),
  description: z
    .string()
    .min(1, "Describe the job with enough information")
    .max(600, "Too long"),
  priority: z.enum(["ASAP", "Today", "This week", "Flexible"]),
  images: z
    .array(z.instanceof(File))
    .min(1, "Please upload at least one image of he job")
    .max(3, "You can upload a maximum of 3 images of the job"),
  state: z.string().min(1, "Please enter right state"),
  city: z.string().min(1, "City can't be less than 1 character"),
  lga: z.string().min(1, "Please put your Local Government area"),
  price: z.string().min(1),
  landmark: z.string().min(1, "landmark can't be less than 1 character"),
  address: z.string().min(1, "address  can't be less than 1 character"),
});

export type postJobDTO = z.infer<typeof postJobSchema>;
