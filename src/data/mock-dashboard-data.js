export const dashboardData = {
    "stats": {
      "totalPoints": 1320,
      "streakDays": 4,
      "overallCompletion": 26
    },
    "continueLearning": {
      "course": "Basic Conversation",
      "lesson": "Greetings & Introductions"
    },
    "courses": [
      {
        "title": "Basic Conversation",
        "progress": 56,
        "nextLesson": "Greetings & Introductions",
        "status": "Continue"
      },
      {
        "title": "Grammar Foundations",
        "progress": 34,
        "nextLesson": "Present Simple vs Continuous",
        "status": "Continue"
      },
      {
        "title": "Cultural Insights",
        "progress": 12,
        "nextLesson": "American vs British English",
        "status": "Continue"
      },
      {
        "title": "Pronunciation & Listening",
        "progress": 0,
        "nextLesson": "Difficult TH Sound",
        "status": "Start"
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
}


// Helper function to get dashboard data
export const getDashboardData = () => {
  return dashboardData;
};