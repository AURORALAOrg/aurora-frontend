import {
  Bookmark,
  BookOpen,
  Brain,
  CirclePlay,
  Globe,
  GraduationCap,
  MessageCircle,
  Users,
} from "lucide-react";

export const heroContent ={
  title: {
    textOne: "Learn Languages with",
    textTwo: "AI-Powered Assistance",
  },
  subtitle: "AURORA.LA is an innovative AI-powered language learning platform that combines personalized tutoring, blockchain technology, and advanced language processing to create an engaging and effective learning experience.",
  buttons: [
    {
      text: "Get Started",
      variant: "primary",
    },
    {
      text: "Learn More",
      variant: "outline",
    },
  ]
}

export const skillContent = {
  title: "Improve Your Language Skills",
  subtitle: "Practice your English language skills with our AI-powered learning platform",
  cards: [
    {
      icons: <BookOpen className="text-[#00B8D4] h-[40px] w-[40px]" aria-hidden="true" />,
      tag: "Reading",
      content: "Improve your reading skills with interactive texts",
    },
  
    {
      icons: <MessageCircle className="text-[#00B8D4] h-[40px] w-[40px]" aria-hidden="true" />,
      tag: "Speaking",
      content: "Practice conversations with our AI assistant",
    },
    {
      icons: <CirclePlay className="text-[#00B8D4] h-[40px] w-[40px]" aria-hidden="true" />,
      tag: "Listening",
      content: "Enhance your listening skills with audio lessons",
    },
    {
      icons: <Bookmark className="text-[#00B8D4] h-[40px] w-[40px]" aria-hidden="true" />,
      tag: "Writing",
      content: "Get feedback on your writing from our AI",
    },
  ]
};

export const courses = {
  title: "Explore Our Courses",
  subtitle: "Find the perfect course to match your learning goals",
  cards: {
    Beginner: [
      {
        icons: <Brain className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Basic Conversation",
        content: "Learn everyday phrases and expressions",
      },
      {
        icons: <GraduationCap className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Grammar Foundations",
        content: "Master the basics of English grammar",
      },
      {
        icons: <Globe className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Cultural Insights",
        content: "Learn about cultures while learning language",
      },
    ],
    Intermediate: [
      {
        icons: <Brain className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Intermediate Conversation",
        content: "Practice conversations with our AI assistant",
      },
      {
        icons: <GraduationCap className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Intermediate Grammar",
        content: "Practice advanced grammar with our AI assistant",
      },
      {
        icons: <Globe className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Intermediate Vocabulary",
        content: "Practice advanced vocabulary with our AI assistant",
      },
    ],
    Advanced: [
      {
        icons: <Brain className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Advanced Conversation",
        content: "Practice advanced conversation with our AI assistant",
      },
      {
        icons: <GraduationCap className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Advanced Grammar",
        content: "Practice advanced grammar with our AI assistant",
      },
      {
        icons: <Globe className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Advanced Vocabulary",
        content: "Practice advanced vocabulary with our AI assistant",
      },
    ] ,
    Business: [
      {
        icons: <Brain className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Business Conversation",
        content: "Practice business conversation with our AI assistant",
      },
      {
        icons: <GraduationCap className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Business Vocabulary",
        content: "Practice business vocabulary with our AI assistant",
      },
      {
        icons: <Globe className="text-[#00B8D4] h-[32px] w-[32px]" aria-hidden="true" />,
        tag: "Business Grammar",
        content: "Practice business grammar with our AI assistant",
      },
    ]
  }
  
};

export const whyChooseAuruora = {
  title: "Why Choose",
  subtitle: "AURORA?",
  content:
    "Our AI-powered platform offers unique advantages for language learners",
  cards: [
    {
      icons: <Brain className="w-full h-full" aria-hidden="true" />,
      tag: "AI-Powered Learning",
      content:
        "Our AI technology personalizes your language learning journey for maximum efficiency and results.",
    },
    {
      icons: <Globe className="w-full h-full" aria-hidden="true" />,
      tag: "Web3 Integration",
      content:
        "Earn rewards and certificates on blockchain as you progress through your language learning journey.",
    },
    {
      icons: <Users className="w-full h-full" aria-hidden="true" />,
      tag: "Community Learning",
      content:
        "Connect with other learners and native speakers to practice and improve your language skills.",
    },
    {
      icons: <GraduationCap className="w-full h-full" aria-hidden="true" />,
      tag: "Certified Progress",
      content:
        "Track your advancement with recognized certifications that validate your language proficiency.",
    },
    {
      icons: <MessageCircle className="w-full h-full" aria-hidden="true"  />,
      tag: "Interactive Conversations",
      content:
        "Practice real-world conversation scenarios with our advanced AI chatbot technology.",
    },
    {
      icons: <BookOpen className="w-full h-full" aria-hidden="true" />,
      tag: "Comprehensive Resources",
      content:
        "Access a vast library of learning materials, exercises, and tools to enhance your language skills.",
    },
  ],
};

export const whatOurUsersSay = 
{
  title: {
    textOne: "What Our Users",
    textTwo: "Say",
  },
  subtitle: "Hear from our community about their experience with AURORA",
  cards: [
  {
    name: "Sarah K.",
    tag: "Business Professional",
    content:
      '"AURORA has transformed my business English skills. The AI feedback helped me improve my presentations and emails dramatically."',
  },
  {
    name: "Miguel R.",
    tag: "Student",
    content:
      '"I love how the platform adapts to my learning style. The interactive conversations with the AI feel so natural and have helped me gain confidence."',
  },
  {
    name: "Aisha T.",
    tag: "Language Enthusiast",
    content:
      '"The Web3 integration is brilliant! I love earning certificates that are verifiable on the blockchain as I complete my courses."',
    },
  ]
};

export const callToAction = {
  title: {
    textOne: "Start Your Language Learning Journey",
    textTwo: "Today",
  },
  subtitle: "Join thousands of learners who are transforming their language skills with AURORA",
  buttons: [
    {
      text: "Signup Free",
      variant: "primary",
    },
    {
      text: "Explore Courses",
      variant: "outline",
    },
  ],
};