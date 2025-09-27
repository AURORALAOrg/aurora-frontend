/**
 * Types related to API requests, responses, and data structures
 */

import { User } from "./user-types";
import { Course } from "./course-types";

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  data: T;
  message?: string;
  errors?: ApiError[];
}

/**
 * API error object
 */
export interface ApiError {
  field?: string;
  message: string;
  code?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

/**
 * Auth API responses
 */
export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface VerifyEmailResponse {
  verified: boolean;
  message: string;
}

/**
 * User API responses
 */
export interface UserProfileResponse {
  user: User;
}

export interface UserUpdateResponse {
  user: User;
  message: string;
}

/**
 * Course API responses
 */
export interface CoursesResponse {
  courses: Course[];
  featured?: Course[];
  meta?: PaginationMeta;
}

export interface CourseDetailResponse {
  course: Course;
}

export interface CourseEnrollmentResponse {
  enrolled: boolean;
  courseId: string;
  message: string;
}

/**
 * API request parameters
 */

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

export interface CourseFilterParams extends PaginationParams {
  level?: string;
  category?: string;
  searchQuery?: string;
  tags?: string[];
  isPaid?: boolean;
  hasCertification?: boolean;
}

export interface UserRequestParams extends PaginationParams {
  type?: string;
  status?: string;
  searchQuery?: string;
}

/**
 * Form submission types
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FeedbackFormData {
  rating: number;
  comments: string;
  courseId?: string;
  lessonId?: string;
}
