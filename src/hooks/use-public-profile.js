import { useParams } from 'react-router-dom';
import { getUserProfile } from '@/data/mock-user-profiles';
import { useToast } from '@/context/ToastContext';

export const usePublicProfile = () => {
  const { username } = useParams();
  const userProfile = getUserProfile(username);
  const { showToast } = useToast();

  
  // Handle case where profile doesn't exist
  if (!userProfile) {
    return {
      username,
      userProfile: null,
      profileUrl: null,
      displayName: username,
      handleCopy: () => {},
      handleSocialShare: () => {},
    };
  }

  const profileUrl = `${window.location.origin}/u/${username}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(profileUrl);
        showToast({
          title: "Success",
          description: "Profile URL copied to clipboard",
          variant: "success",
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = profileUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast({
          title: "Success",
          description: "Profile URL copied to clipboard",
          variant: "success",
        });
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      showToast({
        title: "Error",
        description: "Failed to copy profile URL to clipboard",
        variant: "error",
      });
    }
  };

  const handleSocialShare = (platform) => {
    const message = `Check out my Aurora learning progress!`;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(profileUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return {
    username,
    userProfile,
    profileUrl,
    displayName: userProfile?.displayName || username,
    handleCopy,
    handleSocialShare,
  };
}; 