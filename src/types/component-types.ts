/**
 * Types related to UI components, props, and UI state
 */
import { ReactNode, ChangeEvent } from "react";
import { Course, Lesson, Module } from "./course-types";
import { User } from "./user-types";
import { NFTToken } from "./wallet-types";

/**
 * Common layout props
 */
export interface LayoutProps {
  children: ReactNode;
}

/**
 * Authentication context provider props
 */
export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Wallet context provider props
 */
export interface WalletProviderProps {
  children: ReactNode;
}

/**
 * NFT Interact component props
 */
export interface NFTInteractProps {
  initialContractId?: string;
}

/**
 * Course card component props
 */
export interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  onEnroll?: (courseId: string) => void;
  size?: "small" | "medium" | "large";
}

/**
 * Module list props
 */
export interface ModuleListProps {
  modules: Module[];
  currentModuleId?: string;
  onModuleSelect?: (moduleId: string) => void;
}

/**
 * Lesson list props
 */
export interface LessonListProps {
  lessons: Lesson[];
  currentLessonId?: string;
  onLessonSelect?: (lessonId: string) => void;
}

/**
 * Progress indicator props
 */
export interface ProgressIndicatorProps {
  value: number;
  max: number;
  label?: string;
  size?: "small" | "medium" | "large";
  showPercentage?: boolean;
}

/**
 * Audio player props
 */
export interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  onComplete?: () => void;
  showControls?: boolean;
}

/**
 * Video player props
 */
export interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  onComplete?: () => void;
  showControls?: boolean;
  startTime?: number;
}

/**
 * Quiz component props
 */
export interface QuizProps {
  questions: Array<{
    id: string;
    text: string;
    options: string[];
    correctAnswer: string | string[];
  }>;
  onComplete: (
    score: number,
    answers: Record<string, string | string[]>
  ) => void;
  timeLimit?: number;
}

/**
 * User avatar props
 */
export interface UserAvatarProps {
  user: User;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
  statusPosition?: "top-right" | "bottom-right";
}

/**
 * Toast notification props
 */
export interface ToastProps {
  title?: string;
  description: string;
  type?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

/**
 * Modal dialog props
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
}

/**
 * Button props extension
 */
export interface ButtonProps {
  children: ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  fullWidth?: boolean;
}

/**
 * Form field props
 */
export interface FormFieldProps {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  className?: string;
}

/**
 * Input field props
 */
export interface InputProps extends FormFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  min?: number;
  max?: number;
  step?: number;
}

/**
 * NFT display props
 */
export interface NFTDisplayProps {
  token: NFTToken;
  showOwner?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}
