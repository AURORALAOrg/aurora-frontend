/**
 * Types related to courses, lessons, assessments, and learning content
 */

import { UserLevel } from "./user-types";

/**
 * Represents a course in the learning platform
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  level: UserLevel;
  duration: number; // in minutes
  modulesCount: number;
  lessonsCount: number;
  category: CourseCategory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  instructorId?: string;
  isPublished: boolean;
  enrollmentCount?: number;
  rating?: number;
  certificationAvailable: boolean;
  modules: Module[];
}

/**
 * Course categories
 */
export type CourseCategory =
  | "grammar"
  | "conversation"
  | "business-communication"
  | "travel"
  | "cultural"
  | "creative-storytelling"
  | "public-speaking"
  | "assessment";

/**
 * Represents a module within a course
 */
export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  isLocked: boolean;
  completionPercentage?: number;
}

/**
 * Represents a lesson within a module
 */
export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: LessonType;
  content: LessonContent;
  duration: number; // in minutes
  order: number;
  isCompleted?: boolean;
  isLocked: boolean;
}

/**
 * Types of lessons
 */
export type LessonType =
  | "video"
  | "audio"
  | "text"
  | "interactive"
  | "quiz"
  | "assessment";

/**
 * Content for different lesson types
 */
export type LessonContent =
  | VideoLessonContent
  | AudioLessonContent
  | TextLessonContent
  | InteractiveLessonContent
  | QuizLessonContent
  | AssessmentLessonContent;

/**
 * Video lesson content
 */
export interface VideoLessonContent {
  videoUrl: string;
  transcript?: string;
  captions?: CaptionTrack[];
  duration: number; // in seconds
}

/**
 * Audio lesson content
 */
export interface AudioLessonContent {
  audioUrl: string;
  transcript?: string;
  duration: number; // in seconds
}

/**
 * Text lesson content
 */
export interface TextLessonContent {
  htmlContent: string;
  readingTime: number; // in minutes
}

/**
 * Interactive lesson content
 */
export interface InteractiveLessonContent {
  interactionType:
    | "conversation"
    | "pronunciation"
    | "fill-in-blanks"
    | "matching";
  interactionData: unknown; // This would be more specific based on interaction type
}

/**
 * Quiz lesson content
 */
export interface QuizLessonContent {
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in minutes
}

/**
 * Assessment lesson content
 */
export interface AssessmentLessonContent {
  questions: AssessmentQuestion[];
  timeLimit?: number; // in minutes
}

/**
 * Caption tracks for videos
 */
export interface CaptionTrack {
  language: string;
  label: string;
  url: string;
}

/**
 * Quiz question
 */
export interface QuizQuestion {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false" | "fill-in-blank" | "matching";
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

/**
 * Assessment question
 */
export interface AssessmentQuestion {
  id: string;
  text: string;
  type: "grammar" | "vocabulary" | "comprehension" | "speaking" | "writing";
  difficulty: "easy" | "medium" | "hard";
  options?: string[];
  correctAnswer?: string | string[];
  rubric?: AssessmentRubric;
  points: number;
}

/**
 * Assessment rubric
 */
export interface AssessmentRubric {
  criteria: RubricCriterion[];
  maxScore: number;
}

/**
 * Rubric criterion
 */
export interface RubricCriterion {
  name: string;
  description: string;
  weight: number;
}

/**
 * User's progress in a course
 */
export interface CourseProgress {
  userId: string;
  courseId: string;
  enrolledAt: string;
  lastAccessedAt: string;
  completedLessons: string[]; // Array of lesson IDs
  completedModules: string[]; // Array of module IDs
  completionPercentage: number;
  certificateIssued: boolean;
  certificateUrl?: string;
  quizScores: Record<string, number>; // Map of quiz ID to score
  assessmentResults: Record<string, AssessmentResult>; // Map of assessment ID to result
}

/**
 * Assessment result
 */
export interface AssessmentResult {
  score: number;
  feedback?: string;
  submittedAt: string;
  gradedAt?: string;
  gradedBy?: string;
}
