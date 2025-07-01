// Mock user profiles data for public profile pages
export const mockUserProfiles = {
  "aurora-student": {
    id: "1",
    username: "aurora-student",
    displayName: "Aurora Student",
    email: "aurora.student@example.com",
    country: "United States",
    community: "AI Enthusiasts",
    joinDate: "2023",
    avatarUrl: "",
    level: "Intermediate",
    overallProgress: 68,
    globalRank: 15,
    totalPoints: 8950,
    isTeacher: false,
    stats: {
      classesCompleted: 89,
      studyHours: 156,
      exercisesSolved: 750,
      currentStreak: 12
    },
    achievements: [
      {
        id: 1,
        title: "Consistent Learner",
        description: "Complete 7 consecutive days of practice",
        rarity: "common",
        unlocked: true,
        unlockedDate: "9/14/2023",
        icon: "🔥"
      },
      {
        id: 2,
        title: "Vocabulary Master",
        description: "Learn 500 new words",
        rarity: "rare",
        unlocked: true,
        unlockedDate: "11/19/2023",
        icon: "📚"
      }
    ],
    activityData: [
      { day: "Fri", points: 755, exercises: 47, studyTime: 4 },
      { day: "Sat", points: 680, exercises: 35, studyTime: 3 },
      { day: "Sun", points: 820, exercises: 52, studyTime: 5 },
      { day: "Mon", points: 745, exercises: 41, studyTime: 4 },
      { day: "Tue", points: 890, exercises: 58, studyTime: 6 },
      { day: "Wed", points: 720, exercises: 38, studyTime: 3 },
      { day: "Thu", points: 965, exercises: 62, studyTime: 7 }
    ]
  },
  "maria-garcia": {
    id: "2",
    username: "maria-garcia",
    displayName: "Maria Garcia",
    email: "maria.garcia@example.com",
    country: "Spain",
    community: "Business English",
    joinDate: "2022",
    avatarUrl: "",
    level: "Advanced",
    overallProgress: 85,
    globalRank: 8,
    totalPoints: 12750,
    isTeacher: true,
    teacherProfile: "/teacher/maria-garcia",
    stats: {
      classesCompleted: 156,
      studyHours: 284,
      exercisesSolved: 1250,
      currentStreak: 25
    },
    achievements: [
      {
        id: 1,
        title: "Grammar Expert",
        description: "Master all grammar modules",
        rarity: "legendary",
        unlocked: true,
        unlockedDate: "3/22/2023",
        icon: "👑"
      },
      {
        id: 2,
        title: "Community Helper",
        description: "Help 100 students in forums",
        rarity: "epic",
        unlocked: true,
        unlockedDate: "8/15/2023",
        icon: "🤝"
      },
      {
        id: 3,
        title: "Streak Master",
        description: "Maintain a 30-day streak",
        rarity: "rare",
        unlocked: true,
        unlockedDate: "6/10/2023",
        icon: "⚡"
      }
    ],
    activityData: [
      { day: "Fri", points: 920, exercises: 68, studyTime: 6 },
      { day: "Sat", points: 1050, exercises: 75, studyTime: 7 },
      { day: "Sun", points: 880, exercises: 62, studyTime: 5 },
      { day: "Mon", points: 1120, exercises: 89, studyTime: 8 },
      { day: "Tue", points: 1200, exercises: 95, studyTime: 9 },
      { day: "Wed", points: 990, exercises: 71, studyTime: 6 },
      { day: "Thu", points: 1180, exercises: 88, studyTime: 8 }
    ]
  },
  "john-teacher": {
    id: "3", 
    username: "john-teacher",
    displayName: "John Smith",
    email: "john.smith@example.com",
    country: "United Kingdom",
    community: "English Teachers",
    joinDate: "2021",
    avatarUrl: "",
    level: "Expert",
    overallProgress: 95,
    globalRank: 3,
    totalPoints: 18500,
    isTeacher: true,
    teacherProfile: "/teacher/john-teacher",
    stats: {
      classesCompleted: 245,
      studyHours: 456,
      exercisesSolved: 2100,
      currentStreak: 45
    },
    achievements: [
      {
        id: 1,
        title: "Teaching Legend",
        description: "Train over 1000 students",
        rarity: "legendary",
        unlocked: true,
        unlockedDate: "1/5/2023",
        icon: "🎓"
      },
      {
        id: 2,
        title: "Perfect Score",
        description: "Achieve 100% in advanced tests",
        rarity: "epic",
        unlocked: true,
        unlockedDate: "4/12/2023",
        icon: "🏆"
      }
    ],
    activityData: [
      { day: "Fri", points: 1340, exercises: 95, studyTime: 8 },
      { day: "Sat", points: 1520, exercises: 110, studyTime: 10 },
      { day: "Sun", points: 1200, exercises: 85, studyTime: 7 },
      { day: "Mon", points: 1680, exercises: 125, studyTime: 12 },
      { day: "Tue", points: 1750, exercises: 130, studyTime: 13 },
      { day: "Wed", points: 1450, exercises: 102, studyTime: 9 },
      { day: "Thu", points: 1820, exercises: 140, studyTime: 14 }
    ]
  }
};

// Helper function to get user profile by username
export const getUserProfile = (username) => {
  return mockUserProfiles[username] || null;
};

// Helper function to get all usernames
export const getAllUsernames = () => {
  return Object.keys(mockUserProfiles);
}; 