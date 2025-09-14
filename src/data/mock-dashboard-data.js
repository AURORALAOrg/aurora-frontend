export const dashboardData = {
    "gamification": {
      "pointsTotal": 1320,
      "streakCount": 4,
      "overallCompletion": 26,
      "lastActiveAt": "2025-08-11T09:30:00Z",
      "badges": ["Streak Starter", "Grammar Guru", "Pronunciation Explorer"]
    },

    "lessons": [
      {
        "areaId": "basic-conv",
        "lessonId": "greetings-1",
        "title": "Greetings & Introductions",
        "status": "Continue",
        "completed": true,
        "score": 92,
        "lastAttemptAt": "2025-08-11T09:30:00Z",
        "percentComplete": 100,
        "nextLesson": {
          "lessonId": "basic-2",
          "title": "Greetings & Introductions 2",
        },
      },
      {
        "areaId": "grammar-found",
        "lessonId": "present-simple-1",
        "title": "Grammar Foundations",
        "status": "Continue",
        "completed": true,
        "score": 78,
        "lastAttemptAt": "2025-08-10T15:00:00Z",
        "percentComplete": 100,
        "nextLesson": {
          "lessonId": "grammar-2",
          "title": "Present Simple vs Continuous",
        },
      },
      {
        "areaId": "cultural-insights",
        "lessonId": "holidays-1",
        "title": "American vs British English",
        "status": "Continue",
        "completed": true,
        "score": 66,
        "lastAttemptAt": "2025-08-09T14:20:00Z",
        "percentComplete": 100,
        "nextLesson": {
          "lessonId": "cultural-2",
          "title": "Holidays & Traditions 2",
        },
      },
      {
        "areaId": "pronunciation",
        "lessonId": "th-sound-1",
        "title": "Difficult TH Sound",
        "status": "Start",
        "completed": false,
        "lastAttemptAt": "2025-08-08T17:45:00Z",
        "percentComplete": 0,
        "nextLesson": {
          "lessonId": "th-sound-2",
          "title": "Difficult TH Sound 2",
        },
      }
    ],

    "recommendations": [
      {
        "title": "Pronunciation: TH Sound",
        "tag": "New",
        "description": "Target Spanish speaker challenges with /ð/ and /θ/...",
        "rating": 5,
        "action": "Practice now"
      },
      {
        "title": "Present Simple Sprint",
        "tag": "Hot",
        "description": "Quick drills to perfect third-person forms and adverb placement.",
        "rating": 5,
        "action": "Start sprint"
      }
    ],

    "progress": {
      "perLesson": [
        { "areaId": "basic-conv", "lessonId": "greetings-1", "completed": true, "score": 92, "lastAttemptAt": "2025-08-11T09:30:00Z" },
        { "areaId": "grammar-found", "lessonId": "present-simple-1", "completed": true, "score": 78, "lastAttemptAt": "2025-08-10T15:00:00Z" },
        { "areaId": "cultural-insights", "lessonId": "holidays-1", "completed": true, "score": 66, "lastAttemptAt": "2025-08-09T14:20:00Z" },
        { "areaId": "pronunciation", "lessonId": "th-sound-1", "completed": false, "lastAttemptAt": "2025-08-08T17:45:00Z" }
      ],
      "areaSummary": [
        { "areaId": "basic-conv", "percentComplete": 56, "lastLessonId": "greetings-1" },
        { "areaId": "grammar-found", "percentComplete": 34, "lastLessonId": "present-simple-1" },
        { "areaId": "cultural-insights", "percentComplete": 12, "lastLessonId": "holidays-1" },
        { "areaId": "pronunciation", "percentComplete": 0 }
      ]
    },

    "activity": [
      { "id": "a1", "type": "lesson", "areaId": "basic-conv", "title": "Asking for Directions", "score": 92, "date": "2025-08-11T09:30:00Z" },
      { "id": "a2", "type": "assessment", "areaId": "grammar-found", "title": "Present Simple Check", "score": 78, "date": "2025-08-10T15:00:00Z" },
      { "id": "a3", "type": "lesson", "areaId": "cultural-insights", "title": "Holidays & Traditions", "score": 66, "date": "2025-08-09T14:20:00Z" },
      { "id": "a4", "type": "assessment", "areaId": "pronunciation", "title": "TH vs T Minimal Pairs", "score": 54, "date": "2025-08-08T17:45:00Z" },
      { "id": "a5", "type": "lesson", "areaId": "grammar-found", "title": "Question Formation", "score": 88, "date": "2025-08-07T11:10:00Z" }
    ],

    "recentActivity": [
      {
        "title": "Asking for Directions",
        "type": "Lesson - Basic Conversation",
        "date": "11/8/2025",
        "score": 92
      },
      {
        "title": "Present Simple Check",
        "type": "Assessment - Grammar Foundations",
        "date": "10/8/2025",
        "score": 78
      },
      {
        "title": "Holidays & Traditions",
        "type": "Lesson - Cultural Insights",
        "date": "9/8/2025",
        "score": 66
      },
      {
        "title": "TH vs T Minimal Pairs",
        "type": "Assessment - Pronunciation & Listening",
        "date": "8/8/2025",
        "score": 54
      },
      {
        "title": "Question Formation",
        "type": "Lesson - Grammar Foundations",
        "date": "7/8/2025",
        "score": 88
      }
    ]
  };

// Helper function to get dashboard data
export const getDashboardData = () => {
  return dashboardData;
};

// Helper function to get the next lesson to continue learning
export const getContinueLearningLesson = () => {
  const { lessons } = dashboardData;

  // First incomplete lesson
  const nextLesson = lessons.find(lesson => !lesson.completed);
  if (nextLesson) return nextLesson;

  // If all are completed, return the last one (most recent)
  return lessons[lessons.length - 1] || null;
};
