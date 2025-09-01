import { Github } from 'lucide-react';
import getGitHubProfiles from './profiles';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const GitHubProfiles = () => {

  const [gitHubProfiles, setGitHubProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const data = await getGitHubProfiles(); 
        setGitHubProfiles(data);
      } catch (error) {
+        setError(err);
+        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profiles</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-black overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)'
      }}>
        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            aria-label="Back to main page"
          >
            <img src="/aurora-logo.png" alt="AURORA Logo" className="w-10 h-10" />
          </Link>
        </div>

        <div className="text-white py-20 px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Our Team
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The brilliant minds behind AURORA's revolutionary language learning platform
          </p>
        </div>
      </div>

      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {gitHubProfiles.map((profile) => (
              <div key={profile.id} className="text-center w-72">
                <div className="mb-6 flex justify-center">
                  <div className="w-48 h-48 rounded-full p-2 bg-[#00b8d4]">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover bg-gray-200"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-black">{profile.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{profile.role}</p>

                <div className="flex justify-center">
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 text-white font-medium transition-all duration-300 hover:text-black bg-[#00b8d4]"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubProfiles;