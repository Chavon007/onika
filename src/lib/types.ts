import { signupFormDTO, loginFormDTO } from "@/schema/userSchema";

export type { signupFormDTO, loginFormDTO };

export type UserRole = "customer" | "artisan" | "admin";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  lga: string;
  state: string;
  verified: boolean;
  createdAt: string;
}
