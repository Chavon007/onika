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
  date: string;
  lga: string;
  priority: "ASAP" | "Today" | "This week" | "Flexible";
  price: number;
  createdAt: string;
}

export interface jobDetails {
  _id: string;
  type?: "public" | "private";
  customerId?: {
    fullName: string;
    phoneNumber: string;
  };
  artisanId?: {
    fullName: string;
    phoneNumber: string;
  };
  category?: string;
  date?: string;
  description?: string;
  price: number;
  city?: string;
  lga?: string;
  address?: string;
  state?: string;
  landmark?: string;
  status:
    | "pending"
    | "accepted"
    | "in_progress"
    | "rejected"
    | "awaiting_confirmation"
    | "completed"
    | "disputed"
    | "cancelled";
  images?: string[];
  previousStatus?:
    | "pending"
    | "accepted"
    | "reject"
    | "in_progress"
    | "awaiting_confirmation"
    | "completed"
    | "disputed"
    | "cancelled"
    | null;
  priority?: "ASAP" | "Today" | "This week" | "Flexible";
  createdAt: string;
}
export interface ArtisanProfile {
  _id: string;
  User: {
    _id: string;
    fullName: string;
    phoneNumber: string;
    lga: string;
    state: string;
  };
  bio: string;
  skills: string[];
  experience: string;
  faceVerification: string;
  workImage: string[];
}

export interface Transaction {
  _id: string;
  reference: string;
  type:
    | "funding"
    | "escrow_hold"
    | "escrow_release"
    | "refund"
    | "withdrawal"
    | "commission";
  direction: "credit" | "debit";
  date: string;
  amount: number;
  status: "successful" | "failed" | "pending";
  jobId: string | null;
  description?: string;
  createdAt: string;
}

export interface WalletDetails {
  balance?: number;
  status?: "active" | "frozen";
  currency?: string;
}
