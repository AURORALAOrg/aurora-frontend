import { Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AchievementCard } from "./AchievementCard"

const allAchievements = ["first-100", "point-collector", "week-warrior", "daily-champion"]

export const AchievementsSection = ({ achievements, getAchievementData }) => {
  return (
    <Card className="bg-[#0F1624] border-[#00b8d4]">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          Achievements
        </CardTitle>
        <CardDescription className="text-gray-400">Unlock achievements by reaching milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allAchievements.map((achievement) => (
            <AchievementCard
              key={achievement}
              achievement={achievement}
              isUnlocked={achievements.includes(achievement)}
              data={getAchievementData(achievement)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
