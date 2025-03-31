"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_BASE_URL = "https://aura-backend-888z.onrender.com/api/v1";

type User = any;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  error: null,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      setError(null);

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("authenticationToken", response.data.token);
      }

      setUser(response.data.user);
    } catch (err: any) {
      console.log(err);
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
      throw err;
    }
  };

  const register = async (userData: any) => {
    try {
      setError(null);

      await axios.post(`${API_BASE_URL}/auth/register`, userData);
      router.push(`/verify-email?email=${encodeURIComponent(userData.email)}`);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      throw err;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("authenticationToken");
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
