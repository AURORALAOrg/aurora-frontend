import { Card, CardContent } from "@/components/ui/card"

export const AchievementCard = ({ achievement, isUnlocked, data }) => (
  <Card
    className={`${
      isUnlocked ? "bg-[#0F1624] border-[#34d399]" : "bg-gray-800 border-gray-600"
    } transition-all duration-300`}
  >
    <CardContent className="p-4 text-center">
      <div className={`text-3xl mb-2 ${isUnlocked ? "grayscale-0" : "grayscale"}`}>{data.icon}</div>
      <p className={`text-sm font-medium ${isUnlocked ? "text-white" : "text-gray-400"}`}>{data.name}</p>
    </CardContent>
  </Card>
)
