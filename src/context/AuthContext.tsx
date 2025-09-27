"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logger from "@/lib/logger";
import {
  User,
  LoginCredentials,
  RegistrationData,
  AuthState,
} from "@/types/user-types";
import { ApiResponse, LoginResponse } from "@/types/api-types";

const API_BASE_URL = "http://localhost:8000/api/v1";

/**
 * Auth context interface
 */
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegistrationData) => Promise<void>;
  logout: () => void;
}

/**
 * Auth provider props
 */
interface AuthProviderProps {
  children: ReactNode;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoadingUser: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  error: null,
});

/**
 * Custom hook to use the auth context
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Auth provider component
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const navigate = useNavigate();

  // Load user from token on mount
  useEffect(() => {
    logger.auth("Executing AuthProvider useEffect");

    const token = localStorage.getItem("authenticationToken");
    if (token) {
      logger.auth("Token found in localStorage");

      axios
        .get<ApiResponse<{ user: User }>>(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const user = res.data.data.user;
          setUser(user);
          logger.auth("User loaded from /me", user);
        })
        .catch((err) => {
          logger.error("Error loading /me", err);
          localStorage.removeItem("authenticationToken");
          setUser(null);
        })
        .finally(() => setIsLoadingUser(false));
    } else {
      logger.auth("No token found in localStorage");
      setIsLoadingUser(false);
    }
  }, []);

  /**
   * Log in a user
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      const res = await axios.post<ApiResponse<LoginResponse>>(
        `${API_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const { token, user } = res.data.data;

      if (token) {
        localStorage.setItem("authenticationToken", token);
        setUser(user);
        logger.auth("Login successful - token saved");
        logger.auth("User set", user);
      }
    } catch (err) {
      const error = err as Error & {
        response?: { data?: { message?: string } };
      };
      logger.error("Login error", error);
      setError(
        error.response?.data?.message || "Failed to login. Please try again."
      );
      throw err;
    }
  };

  /**
   * Register a new user
   */
  const register = async (userData: RegistrationData): Promise<void> => {
    try {
      setError(null);
      await axios.post<ApiResponse<{ userId: string }>>(
        `${API_BASE_URL}/auth/register`,
        userData
      );
      navigate("/verify-email", { state: { email: userData.email } });
    } catch (err) {
      const error = err as Error & {
        response?: { data?: { message?: string } };
      };
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      throw err;
    }
  };

  /**
   * Log out the current user
   */
  const logout = (): void => {
    localStorage.removeItem("authenticationToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoadingUser,
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
