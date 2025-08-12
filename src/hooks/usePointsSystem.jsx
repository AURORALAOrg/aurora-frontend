
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Trophy, Star, Zap, Target } from "lucide-react"

// Points system configuration
export const POINTS_CONFIG = {
  CORRECT_ANSWER: 10,
  LESSON_COMPLETION: 50,
  STREAK_BONUS: 25,
  PERFECT_LESSON: 100,
  DAILY_GOAL: 200,
}

export const usePointsSystem = () => {
  const [totalPoints, setTotalPoints] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [dailyPoints, setDailyPoints] = useState(0)
  const [achievements, setAchievements] = useState([])

  // Load points from localStorage on mount
  useEffect(() => {
    const savedPoints = localStorage.getItem("userPoints")
    const savedStreak = localStorage.getItem("userStreak")
    const savedDailyPoints = localStorage.getItem("dailyPoints")
    const savedAchievements = localStorage.getItem("achievements")

    if (savedPoints) setTotalPoints(Number.parseInt(savedPoints))
    if (savedStreak) setCurrentStreak(Number.parseInt(savedStreak))
    if (savedDailyPoints) setDailyPoints(Number.parseInt(savedDailyPoints))
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements))
  }, [])

  // Save points to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userPoints", totalPoints.toString())
    localStorage.setItem("userStreak", currentStreak.toString())
    localStorage.setItem("dailyPoints", dailyPoints.toString())
    localStorage.setItem("achievements", JSON.stringify(achievements))
  }, [totalPoints, currentStreak, dailyPoints, achievements])

  const awardPoints = (type, multiplier = 1) => {
    let points = 0
    let message = ""
    let toastIcon = null

    switch (type) {
      case "CORRECT_ANSWER":
        points = POINTS_CONFIG.CORRECT_ANSWER * multiplier
        message = `+${points} XP`
        toastIcon = <Target className="w-4 h-4 text-emerald-400" />
        break
      case "LESSON_COMPLETION":
        points = POINTS_CONFIG.LESSON_COMPLETION
        message = `Lesson Complete! +${points} XP`
        toastIcon = <Star className="w-4 h-4 text-blue-400" />
        break
      case "STREAK_BONUS":
        points = POINTS_CONFIG.STREAK_BONUS
        message = `${currentStreak + 1} day streak! +${points} XP`
        toastIcon = <Zap className="w-4 h-4 text-orange-400" />
        setCurrentStreak((prev) => prev + 1)
        break
      case "PERFECT_LESSON":
        points = POINTS_CONFIG.PERFECT_LESSON
        message = `Perfect! +${points} XP bonus`
        toastIcon = <Trophy className="w-4 h-4 text-amber-400" />
        break
    }

    setTotalPoints((prev) => prev + points)
    setDailyPoints((prev) => prev + points)

    // Show Duolingo-style toast notification
    toast.success(message, {
      icon: toastIcon,
      duration: 2500,
      style: {
        background: "#1e293b",
        border: "1px solid #475569",
        color: "#f1f5f9",
      },
    })

    // Check for achievements
    checkAchievements(totalPoints + points, dailyPoints + points)
  }

  const checkAchievements = (newTotal, newDaily) => {
    const newAchievements = []

    if (newTotal >= 100 && !achievements.includes("first-100")) {
      newAchievements.push("first-100")
    }
    if (newTotal >= 500 && !achievements.includes("point-collector")) {
      newAchievements.push("point-collector")
    }
    if (currentStreak >= 7 && !achievements.includes("week-warrior")) {
      newAchievements.push("week-warrior")
    }
    if (newDaily >= POINTS_CONFIG.DAILY_GOAL && !achievements.includes("daily-champion")) {
      newAchievements.push("daily-champion")
    }

    if (newAchievements.length > 0) {
      setAchievements((prev) => [...prev, ...newAchievements])
      newAchievements.forEach((achievement) => {
        const achievementData = getAchievementData(achievement)
        toast.success(`Achievement Unlocked: ${achievementData.name}`, {
          icon: <Trophy className="w-4 h-4 text-amber-400" />,
          duration: 4000,
          style: {
            background: "#1e293b",
            border: "1px solid #f59e0b",
            color: "#f1f5f9",
          },
        })
      })
    }
  }

  const getAchievementData = (id) => {
    const achievementMap = {
      "first-100": { name: "First Century", icon: "🎯", description: "Earned your first 100 XP" },
      "point-collector": { name: "XP Collector", icon: "💎", description: "Reached 500 total XP" },
      "week-warrior": { name: "Week Warrior", icon: "⚔️", description: "7-day learning streak" },
      "daily-champion": { name: "Daily Champion", icon: "👑", description: "Hit your daily XP goal" },
    }
    return achievementMap[id] || { name: "Unknown Achievement", icon: "🏆", description: "Mystery achievement" }
  }

  return {
    totalPoints,
    currentStreak,
    dailyPoints,
    achievements,
    awardPoints,
    getAchievementData,
  }
}
