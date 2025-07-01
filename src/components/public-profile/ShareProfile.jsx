import { Copy, Facebook, Linkedin, Twitter, Share2 } from 'lucide-react';

const ShareProfile = ({ profileUrl, handleCopy, handleSocialShare, displayName }) => {
  return (
    <div className="bg-[#192436] p-6 rounded-lg border border-gray-700 mb-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Share2 className="w-5 h-5 text-light-blue-1" />
        Share Profile
      </h2>

      <p className="text-neutral-3 mb-4">
        Share {displayName}&apos;s learning progress with others!
      </p>

      <div className="mb-4">
        <label className="block text-sm font-bold text-white mb-2">Profile Link</label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={profileUrl}
            readOnly
            aria-label="Profile URL"
            className="flex-1 px-4 py-3 rounded-lg border text-sm font-mono bg-gray-850 border border-gray-600 rounded-l text-white text-sm"
          />
          <button
            onClick={handleCopy}
            aria-label="Copy profile URL to clipboard"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background bg-primary text-light-blue-1 h-11 rounded-md transition-all duration-200 hover:scale-105 px-6 hover:border-light-blue-1 border-2 border-light-blue-1 bg-gray-850"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-3">Share on Social Media</label>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleSocialShare('twitter')}
            aria-label="Share profile on Twitter"
            className="transition-all duration-200 hover:scale-105  flex items-center justify-center gap-2 px-4 py-3 bg-gray-850 border-2 border-light-blue-1 hover:text-white rounded hover:border-white transition-colors text-[#1DA1F1]"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </button>
          <button
            onClick={() => handleSocialShare('facebook')}
            aria-label="Share profile on Facebook"
            className="transition-all duration-200 hover:scale-105  flex items-center justify-center gap-2 px-4 py-3 bg-gray-850 border-2 border-light-blue-1 hover:text-white rounded hover:border-white transition-colors text-[#4267B2]"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </button>
          <button
            onClick={() => handleSocialShare('linkedin')}
            aria-label="Share profile on LinkedIn"
            className="transition-all duration-200 hover:scale-105  flex items-center justify-center gap-2 px-4 py-3 bg-gray-850 border-2 border-light-blue-1 hover:text-white rounded hover:border-white transition-colors text-[#0077B5]"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareProfile; 