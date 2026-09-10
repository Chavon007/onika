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

export interface JobSummary {
  _id: string;
  customerId: {
    _id: string;
    fullName: string;
  };
  category: string;
  description: string;
  city: string;
  lga: string;
  priority: "ASAP" | "Today" | "This week" | "Flexible";
  price: number;
  createdAt: string;
}

export interface jobDetails {
  _id: string;
  customerId: {
    fullName: string;
    phoneNumber: string;
  };
  category: string;
  description?: string;
  price: number;
  city?: string;
  lga?: string;
  address?: string;
  state?: string;
  landmark?: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "disputed" | "cancelled";
  images?: string[];
  priority?: "ASAP" | "Today" | "This week" | "Flexible";
  createdAt: string;
}
