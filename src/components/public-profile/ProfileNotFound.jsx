import { Link } from 'react-router-dom';

const ProfileNotFound = ({ username }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-neutral-3 mb-6">The user profile &quot;@{username}&quot; doesn&apos;t exist.</p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ProfileNotFound; 