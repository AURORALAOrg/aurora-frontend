import { Toaster } from "sonner";
import { PointsBar } from "@/components/rewards/PointsBar";
import { StatsCards } from "@/components/rewards/StatsCards";
import { DemoLesson } from "@/components/rewards/DemoLesson";
import { AchievementsSection } from "@/components/rewards/AchievementsSection";
import { usePointsSystem } from "@/hooks/usePointsSystem";

export default function RewardsSystem() {
  const {
    totalPoints,
    currentStreak,
    dailyPoints,
    achievements,
    awardPoints,
    getAchievementData,
  } = usePointsSystem();

  return (
    <div className="min-h-screen bg-[#0F1624] p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Points & Rewards System
          </h1>
          <p className="text-slate-400 text-lg">
            Experience gamified learning with real-time rewards
          </p>
        </div>

        {/* Points Overview */}
        <StatsCards
          totalPoints={totalPoints}
          currentStreak={currentStreak}
          dailyPoints={dailyPoints}
        />

        {/* Points Bar - Lesson Header Style */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">
            Daily Progress
          </h2>
          <PointsBar points={dailyPoints} />
        </div>

        {/* Demo Lesson Section */}
        <DemoLesson awardPoints={awardPoints} />

        {/* Achievements */}
        <AchievementsSection
          achievements={achievements}
          getAchievementData={getAchievementData}
        />

        {/* Sonner Toaster */}
        <Toaster
          position="top-center"
          richColors
          closeButton
          theme="dark"
          toastOptions={{
            style: {
              background: "#1e293b",
              border: "1px solid #334155",
              color: "#f1f5f9",
            },
          }}
        />
      </div>
    </div>
  );
}
