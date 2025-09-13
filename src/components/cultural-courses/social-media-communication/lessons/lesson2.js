export const lesson2Data = {
  title: "Social Media Vocabulary",
  description:
    "Explore common terms and vocabulary used across social media platforms",
  content: {
    theory: {
      title: "Social Media Terminology Guide",
      rules: [
        {
          rule: "Basic Social Media Actions",
          examples: [
            "Post - To publish content on a social media platform",
            "Share/Repost - To republish someone else's content on your own profile",
            "Like - To show approval or acknowledgment of content with a single click",
            "Comment - To write a public response to a post",
            "Follow/Friend - To subscribe to someone's updates or connect with them",
            "Unfriend/Unfollow - To disconnect from someone's updates",
          ],
        },
        {
          rule: "Content Types and Features",
          examples: [
            "Profile - Your personal or business page on social media",
            "Hashtag (#) - A word or phrase preceded by # to categorize content",
            "Selfie - A photo taken of yourself, by yourself",
            "Story - Temporary content that disappears after a set time (usually 24 hours)",
            "Feed - The stream of posts you see from accounts you follow",
            "DM (Direct Message) - Private communication between users",
          ],
        },
      ],
      importantNotes: [
        "Social media vocabulary evolves rapidly as platforms update and add new features",
        "Different platforms may use slightly different terminology for similar features",
        "Understanding platform-specific terms helps you navigate each social network effectively",
        "Some terms (like 'viral' or 'trending') describe content performance rather than specific actions",
      ],
    },
    examples: [
      {
        category: "Platform-Specific Terminology",
        sentences: [
           "On X (formerly Twitter), you can repost someone's post to share it with your followers.",
          "Instagram users often use Stories to share daily moments that disappear after 24 hours.",
          "LinkedIn allows you to endorse connections for specific skills they list on their profile.",
          "On TikTok, users create short videos that can go viral if they reach the For You Page (FYP).",
        ],
      },
      {
        category: "Content Engagement",
        sentences: [
          "She posted a selfie and received over 200 likes within an hour.",
          "Don't forget to use relevant hashtags so more people can discover your content.",
          "He shared the article on his timeline with a thoughtful comment about the topic.",
          "The influencer's sponsored post generated thousands of comments from her followers.",
        ],
      },
    ],
  },
  exercises: [
    {
      type: "action_matching",
      title: "Social Media Action Matching",
      instructions:
        "Match each social media action with its correct description.",
      questions: [
        {
          question: "To show approval on social media, you:",
          options: ["Post", "Like", "Share", "Comment"],
          correctAnswer: "Like",
          explanation:
            "Liking is the action of showing approval or acknowledgment of content, typically by clicking a thumbs up or heart icon.",
        },
        {
          question: "To write your thoughts about someone's content, you:",
          options: ["Tag", "Follow", "Comment", "Unfriend"],
          correctAnswer: "Comment",
          explanation:
            "Commenting is the action of writing a response to someone's post or content.",
        },
        {
          question:
            "To republish someone else's content to your own followers, you:",
          options: ["Share", "Post", "Tag", "Direct Message"],
          correctAnswer: "Share",
          explanation:
            "Sharing (or reposting/retweeting) is the action of republishing someone else's content so your followers can see it.",
        },
        {
          question: "To subscribe to someone's content updates, you:",
          options: ["Message", "Tag", "Follow", "Poke"],
          correctAnswer: "Follow",
          explanation:
            "Following someone means you'll see their updates in your feed. On some platforms like Facebook, this action might be called 'friending'.",
        },
      ],
    },
    {
      type: "platform_vocabulary",
      title: "Platform-Specific Vocabulary",
      instructions:
        "Match each term with the platform where it's primarily used.",
      questions: [
        {
          question: "Post on X (formerly Twitter)",
          options: ["Instagram", "X (Twitter)", "Facebook", "LinkedIn"],
          correctAnswer: "X (Twitter)",
          explanation:
            "A post on X (formerly Twitter). Typical limit is 280 characters for most accounts; higher limits exist for Premium tiers.",
        },
        {
          question: "Reel",
          options: ["TikTok", "Twitter", "Instagram", "LinkedIn"],
          correctAnswer: "Instagram",
          explanation:
            "Reels are Instagram's short-form video feature, similar to TikTok videos.",
        },
        {
          question: "Connection",
          options: ["Facebook", "LinkedIn", "Twitter", "TikTok"],
          correctAnswer: "LinkedIn",
          explanation:
            "On LinkedIn, people you network with are called 'connections' rather than 'friends' or 'followers'.",
        },
        {
          question: "For You Page (FYP)",
          options: ["Instagram", "Facebook", "Twitter", "TikTok"],
          correctAnswer: "TikTok",
          explanation:
            "The For You Page (FYP) is TikTok's algorithmically-generated feed of recommended videos.",
        },
      ],
    },
    {
      type: "appropriate_usage",
      title: "Appropriate Usage",
      instructions:
        "Choose the most appropriate social media action for each scenario.",
      questions: [
        {
          question:
            "You want to privately contact someone about a job opportunity.",
          options: [
            "Comment on their post",
            "Tag them in your post",
            "Send them a direct message",
            "Share their profile",
          ],
          correctAnswer: "Send them a direct message",
          explanation:
            "Direct messages (DMs) are appropriate for private communications like job opportunities that shouldn't be visible to all followers.",
        },
        {
          question:
            "You find an article relevant to your professional network.",
          options: [
            "Post a selfie with the article",
            "Share the article with your thoughts",
            "Like your own post about it",
            "Tag random connections",
          ],
          correctAnswer: "Share the article with your thoughts",
          explanation:
            "Sharing valuable content with your own insights adds value and is appropriate professional social media behavior.",
        },
        {
          question: "You want to support a friend's new business announcement.",
          options: [
            "Ignore it",
            "Send a critical private message",
            "Like and leave a supportive comment",
            "Tag them in unrelated posts",
          ],
          correctAnswer: "Like and leave a supportive comment",
          explanation:
            "Liking and commenting positively shows public support, which is especially helpful for business announcements.",
        },
      ],
    },
  ],
};
