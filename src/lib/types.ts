import { signupFormDTO, loginFormDTO } from "@/schema/userSchema";
import { artisanProfileDTO } from "@/schema/ArtisanProfileSchema";

export type { signupFormDTO, loginFormDTO };
export type UserRole = "customer" | "artisan" | "admin";
export type { artisanProfileDTO };

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  lga: string;
  state: string;
  isVerified: boolean;
  createdAt: string;
}
