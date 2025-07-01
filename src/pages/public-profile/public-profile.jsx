import { BookOpen, Clock, Target, Award, Flame } from 'lucide-react';
import { PiPulse } from 'react-icons/pi';
import { usePublicProfile } from '@/hooks/use-public-profile';
import {
  ProfileHeader,
  StatCard,
  AchievementCard,
  ActivityChart,
  ShareProfile,
  ProfileNotFound
} from '@/components/public-profile';

const PublicProfile = () => {
  const { username, userProfile, profileUrl, handleCopy, handleSocialShare } = usePublicProfile();

  if (!userProfile) {
    return <ProfileNotFound username={username} />;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <ProfileHeader userProfile={userProfile} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            icon={BookOpen}
            title="Classes Completed"
            value={userProfile.stats.classesCompleted}
          />
          <StatCard
            icon={Clock}
            title="Study Hours"
            value={userProfile.stats.studyHours}
          />
          <StatCard
            icon={Target}
            title="Exercises Solved"
            value={userProfile.stats.exercisesSolved}
          />
          <StatCard
            icon={Flame}
            title="Current Streak"
            value={`${userProfile.stats.currentStreak} days`}
            color='#FF6B35'
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div>
            <div className="bg-[#192436] h-full p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-light-blue-1" />
                Achievements ({userProfile.achievements.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProfile.achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-[#192436] h-full p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <PiPulse className="w-5 h-5 text-light-blue-1" />
              Activity (Last 7 Days)
            </h2>
            <ActivityChart data={userProfile.activityData} />
          </div>
        </div>

        {/* Share Profile */}
        <ShareProfile
          profileUrl={profileUrl}
          handleCopy={handleCopy}
          handleSocialShare={handleSocialShare}
          displayName={userProfile.displayName}
        />
      </div>
    </div>
  );
};

export default PublicProfile; 