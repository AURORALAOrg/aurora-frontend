// Progress service for tracking lesson completion
class ProgressService {
  constructor() {
    this.storageKey = 'aurora-listening-course-progress';
  }

  // Get all completed lessons
  getCompletedLessons() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading progress from localStorage:', error);
      return [];
    }
  }

  // Mark a lesson as completed
  markLessonCompleted(lessonId) {
    try {
      const completed = this.getCompletedLessons();
      if (!completed.includes(lessonId)) {
        completed.push(lessonId);
        localStorage.setItem(this.storageKey, JSON.stringify(completed));
      }
      return true;
    } catch (error) {
      console.error('Error saving progress to localStorage:', error);
      return false;
    }
  }

  // Check if a lesson is completed
  isLessonCompleted(lessonId) {
    const completed = this.getCompletedLessons();
    return completed.includes(lessonId);
  }

  // Check if a lesson is unlocked (previous lesson completed or first lesson)
  isLessonUnlocked(lessonId, allLessons) {
    const lessonIndex = allLessons.findIndex(lesson => lesson.id === lessonId);
    if (lessonIndex === 0) return true; // First lesson is always unlocked
    if (lessonIndex === -1) return false; // Invalid lesson
    
    const previousLesson = allLessons[lessonIndex - 1];
    return this.isLessonCompleted(previousLesson.id);
  }

  // Get progress percentage for the course
  getCourseProgress(allLessons) {
    const completed = this.getCompletedLessons();
    if (!Array.isArray(allLessons) || allLessons.length === 0) return 0;
    const totalLessons = allLessons.length;
    const completedCount = allLessons.filter(lesson => 
      completed.includes(lesson.id)
    ).length;
    
    return Math.round((completedCount / totalLessons) * 100);
  }

  // Reset all progress
  resetProgress() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Error resetting progress:', error);
      return false;
    }
  }

  // Get lesson scores (for future enhancement)
  getLessonScores() {
    try {
      const stored = localStorage.getItem(`${this.storageKey}-scores`);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading scores from localStorage:', error);
      return {};
    }
  }

  // Save lesson score
  saveLessonScore(lessonId, score, totalQuestions) {
    try {
      const scores = this.getLessonScores();
      scores[lessonId] = {
        score,
        totalQuestions,
        percentage: totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem(`${this.storageKey}-scores`, JSON.stringify(scores));
      return true;
    } catch (error) {
      console.error('Error saving score to localStorage:', error);
      return false;
    }
  }
}

// Create a singleton instance
const progressService = new ProgressService();

export default progressService;
