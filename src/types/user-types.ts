/**
 * Types related to user authentication, profiles, and account management
 */

/**
 * Represents a user in the system
 */
export interface User {
  id: string;
  email: string;
  name: string;
  profilePictureUrl?: string;
  role: UserRole;
  level?: UserLevel;
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  preferences?: UserPreferences;
}

/**
 * User roles in the system
 */
export type UserRole = "student" | "teacher" | "admin";

/**
 * User proficiency levels
 */
export type UserLevel = "beginner" | "intermediate" | "advanced" | "fluent";

/**
 * User account preferences
 */
export interface UserPreferences {
  notifications: NotificationPreferences;
  theme: "light" | "dark" | "system";
  language: string;
  accessibility?: AccessibilitySettings;
}

/**
 * User notification preferences
 */
export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  courseUpdates: boolean;
  newMessages: boolean;
  newAchievements: boolean;
}

/**
 * Accessibility settings for users
 */
export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: "small" | "medium" | "large";
  reduceMotion: boolean;
}

/**
 * Authentication-related types
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  error: string | null;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration form data
 */
export interface RegistrationData {
  email: string;
  password: string;
  name: string;
  level?: UserLevel;
}

/**
 * User request types as used in the use-user-requests hook
 */
export interface UserRequest {
  id: string;
  type: "Support" | "Progress Review" | "Level Reassessment";
  status: "Pending" | "In Review" | "Resolved" | "Rejected";
  title: string;
  description: string;
  submittedAt: string;
  updatedAt: string;
}
