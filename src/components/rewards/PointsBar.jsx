import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { POINTS_CONFIG } from "@/hooks/usePointsSystem";

export const PointsBar = ({ points, dailyGoal = POINTS_CONFIG.DAILY_GOAL }) => {
  const progress = Math.min((points / dailyGoal) * 100, 100);
  const isComplete = progress >= 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star
            className={`w-5 h-5 ${
              isComplete ? "text-amber-400" : "text-emerald-400"
            }`}
          />
          <span className="text-slate-200 font-medium">Daily XP Goal</span>
        </div>
        <Badge
          className={`${
            isComplete
              ? "bg-amber-500 text-slate-900"
              : "bg-emerald-500 text-slate-900"
          } font-semibold`}
        >
          {points}/{dailyGoal} XP
        </Badge>
      </div>
      <div className="relative h-4 bg-slate-800/80 border border-slate-600/50 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out ${
            isComplete
              ? "bg-gradient-to-r from-amber-400 to-orange-500"
              : "bg-gradient-to-r from-emerald-400 to-emerald-500"
          }`}
          style={{ width: `${progress}%` }}
        />
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow-sm">
              GOAL REACHED!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
