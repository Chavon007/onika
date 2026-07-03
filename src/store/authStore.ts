import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../lib/types";

interface AuthState {
  user: User | null;
 
  isAuthenticated: boolean;
  isVerified: boolean;
  login: (user: User, isVerified?: boolean) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setIsVerified: (value: boolean) => void;
  isAdmin: () => boolean;
  isArtisan: () => boolean;
  isCustomer: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
    
      isAuthenticated: false,
      isVerified: false,
      login: (user, isVerified = false) =>
        set({
          user,
          isAuthenticated: true,
          isVerified,
        }),
      logout: () =>
        set({
          user: null,
         
          isAuthenticated: false,
          isVerified: false,
        }),
      updateUser: (updateUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updateUser } : null,
        })),
      setIsVerified: (value) =>
        set({
          isVerified: value,
        }),
      isAdmin: () => get().user?.role === "admin",
      isArtisan: () => get().user?.role === "artisan",
      isCustomer: () => get().user?.role === "customer",
    }),
    {
      name: "onika",
    },
  ),
);

export default useAuthStore;
