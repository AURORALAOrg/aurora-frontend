import { Trophy, Zap, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const StatsCards = ({ totalPoints, currentStreak, dailyPoints }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Points Card */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-emerald-500/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-slate-200 flex items-center gap-2 text-sm font-medium">
            <Trophy className="w-4 h-4 text-emerald-400" />
            Total XP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-400">{totalPoints.toLocaleString()}</div>
          <p className="text-xs text-slate-400 mt-1">Lifetime earned</p>
        </CardContent>
      </Card>

      {/* Streak Card */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-orange-500/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-slate-200 flex items-center gap-2 text-sm font-medium">
            <Zap className="w-4 h-4 text-orange-400" />
            Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-400">{currentStreak}</div>
          <p className="text-xs text-slate-400 mt-1">{currentStreak === 1 ? "day" : "days"} in a row</p>
        </CardContent>
      </Card>

      {/* Daily Points Card */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-slate-200 flex items-center gap-2 text-sm font-medium">
            <Target className="w-4 h-4 text-blue-400" />
            Today's XP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-400">{dailyPoints}</div>
          <p className="text-xs text-slate-400 mt-1">Points earned today</p>
        </CardContent>
      </Card>
    </div>
  )
}
