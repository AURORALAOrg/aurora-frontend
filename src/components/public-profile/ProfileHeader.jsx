import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Globe, Users, Calendar, Award, ExternalLink } from 'lucide-react';

const ProfileHeader = ({ userProfile }) => {
  return (
    <div className="bg-[#1A2435] rounded-lg p-8 border border-gray-700">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative">
          {userProfile.avatarUrl ? (
            <img
              src={userProfile.avatarUrl}
              alt={`${userProfile.displayName}'s profile picture`}
              className="w-28 h-28 rounded-full border-4 border-light-blue-1"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-light-blue-1 bg-gray-600 flex items-center justify-center text-gray-300 text-2xl font-bold">
              {userProfile.displayName?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{userProfile.displayName}</h1>
          <div className="flex flex-col sm:flex-row gap-4 text-gray-300 text-sm mb-4">
            <div className="flex items-center gap-1 text-neutral-3">
              <Globe className="w-4 h-4" />
              {userProfile.country}
            </div>
            <div className="flex items-center gap-1 text-neutral-3">
              <Users className="w-4 h-4" />
              {userProfile.community}
            </div>
            <div className="flex items-center gap-1 text-neutral-3">
              <Calendar className="w-4 h-4" />
              Joined {userProfile.joinDate}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-[#00b8d4]/20 text-light-blue-1 border-[#00b8d4]/30 text-sm px-3 py-1">
              Level {userProfile.level}
            </span>
            <div className="text-right">
              <div className="text-xl font-bold text-light-blue-1">#{userProfile.globalRank} Global</div>
              <div className="text-sm text-neutral-3">{(userProfile.totalPoints || 0).toLocaleString()} points</div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span className='text-white font-bold'>Overall Progress</span>
              <span>{userProfile.overallProgress}%</span>
            </div>
            <div
              className="h-3 bg-white rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={userProfile.overallProgress}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`Overall learning progress: ${userProfile.overallProgress}%`}
            >
              <div
                className="h-full bg-[#0F172A] rounded-full transition-all duration-500"
                style={{ width: `${userProfile.overallProgress}%` }}
              />
            </div>
          </div>

          {/* Teacher Link */}
          {userProfile.isTeacher && (
            <Link
              to={userProfile.teacherProfile}
              className="inline-flex items-center gap-2 text-light-blue-1 hover:text-white text-sm"
            >
              <Award className="w-4 h-4" />
              View Teacher Profile
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  userProfile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    community: PropTypes.string.isRequired,
    joinDate: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    globalRank: PropTypes.number.isRequired,
    totalPoints: PropTypes.number.isRequired,
    overallProgress: PropTypes.number.isRequired,
    isTeacher: PropTypes.bool,
    teacherProfile: PropTypes.string,
  }),
};

export default ProfileHeader; 