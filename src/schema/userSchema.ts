import { z } from "zod";

const signUpSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number can't be less than 10"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    state: z.string().min(1, "State is required"),
    lga: z.string().min(1, "Please put your Local Government area"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
export type signupFormDTO = z.infer<typeof signUpSchema>;
export type loginFormDTO = z.infer<typeof loginSchema>;
