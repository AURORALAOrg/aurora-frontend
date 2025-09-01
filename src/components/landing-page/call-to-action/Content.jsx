import {
  Bookmark,
  BookOpen,
  Brain,
  CirclePlay,
  Globe,
  GraduationCap,
  Headphones,
  MessageCircle,
  Users,
} from "lucide-react";

export const heroContent ={
  title: {
    textOne: "Learn Languages with",
    textTwo: "Expert Teachers",
  },
  subtitle: "AURORA.LA is an innovative language learning platform that connects students with qualified teachers worldwide. Pay for classes securely with Scrolls cryptocurrency and learn any language through personalized, one-on-one instruction. Teachers earn extra money teaching their native language.",
  buttons: [
    {
      text: "Find a Teacher",
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
  subtitle: "Learn from expert teachers and practice with our AI-powered platform",
  cards: [
    {
      icons: <BookOpen className="text-[#00B8D4] h-[40px] w-[40px]" aria-hidden="true" />,
      tag: "Reading",
      content: "Improve your reading skills with teacher-guided lessons",
    },
  
    {
      icons: <MessageCircle className="text-[#00B8D4] h-[40px] w-[40px]" aria-hidden="true" />,
      tag: "Speaking",
      content: "Practice conversations with native-speaking teachers",
    },
    {
      icons: <CirclePlay className="text-[#00B8D4] h-[40px] w-[40px]" aria-hidden="true" />,
      tag: "Listening",
      content: "Enhance your listening skills with audio lessons",
    },
    {
      icons: <Bookmark className="text-[#00B8D4] h-[40px] w-[40px]" aria-hidden="true" />,
      tag: "Writing",
      content: "Get feedback on your writing from expert teachers",
    },
  ]
};

export const courses = {
  title: "Explore Our Courses",
  subtitle: "Find the perfect course to match your learning goals",
  cards: {
    Beginner: [
      {
        icons: <Brain className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Basic Conversation",
        content: "Learn everyday phrases and expressions",
      },
      {
        icons: <GraduationCap className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Grammar Foundations",
        content: "Master the basics of English grammar",
      },
      {
        icons: <Globe className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Cultural Insights",
        content: "Learn about cultures while learning language",
      },
      {
        icons: <Headphones className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Pronunciation and Listening",
        content: "Develop clear pronunciation and listening skills",
      },
    ],
    Intermediate: [
      {
        icons: <MessageCircle className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Fluent Conversations",
        content: "Improve your speaking fluency",
      },
      {
        icons: <BookOpen className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Reading Comprehension",
        content: "Enhance your reading skills",
      },
      {
        icons: <Bookmark className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Writing Workshop",
        content: "Develop your writing skills",
      },
      {
        icons: <Headphones className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Pronunciation and Listening",
        content: "Refine pronunciation and comprehension skills",
      },
    ],
    Advanced: [
      {
        icons: <Brain className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Advanced Grammar",
        content: "Master complex grammatical structures",
      },
      {
        icons: <Globe className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Idiomatic Expressions",
        content: "Learn native-like expressions",
      },
      {
        icons: <GraduationCap className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Academic English",
        content: "Prepare for academic enviroments",
      },
      {
        icons: <Headphones className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Pronunciation and Listening",
        content: "Perfect accent and advanced listening comprehension",
      },
    ] ,
    Business: [
      {
        icons: <Users className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Business Communication",
        content: "Professional email and meeting skills",
      },
      {
        icons: <MessageCircle className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Negotiation Skills",
        content: "Learn to negotiate effectively",
      },
      {
        icons: <BookOpen className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
        tag: "Presentation Mastery",
        content: "Deliver impactful presentations",
      },
    ]
  }
  
};

export const whyChooseAuruora = {
  title: "Why Choose",
  subtitle: "AURORA?",
  content:
    "Our platform offers unique advantages for connecting students with language teachers",
  cards: [
    {
      icons: <Users className="w-12 h-12" aria-hidden="true" />,
      tag: "Expert Teachers",
      content:
        "Connect with certified language teachers from around the world who specialize in your target language.",
    },
    {
      icons: <Globe className="w-12 h-12" aria-hidden="true" />,
      tag: "Scrolls Crypto Payments",
      content:
        "Pay for classes securely with Scrolls cryptocurrency. Safe, instant transactions with no traditional banking fees.",
    },
    {
      icons: <Users className="w-12 h-12" aria-hidden="true" />,
      tag: "Community Learning",
      content:
        "Connect with other learners and native speakers to practice and improve your language skills.",
    },
    {
      icons: <GraduationCap className="w-12 h-12" aria-hidden="true" />,
      tag: "Certified Progress",
      content:
        "Track your advancement with recognized certifications that validate your language proficiency.",
    },
    {
      icons: <MessageCircle className="w-12 h-12" aria-hidden="true"  />,
      tag: "Interactive Conversations",
      content:
        "Practice real-world conversation scenarios with our advanced AI chatbot technology.",
    },
    {
      icons: <BookOpen className="w-12 h-12" aria-hidden="true" />,
      tag: "Earn as a Teacher",
      content:
        "Make extra money by teaching your native language. Get paid securely in Scrolls cryptocurrency for every class.",
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
      '"AURORA connected me with an amazing Spanish teacher. Paying with Scrolls was so secure and convenient, and the personalized lessons have dramatically improved my business Spanish."',
  },
  {
    name: "Miguel R.",
    tag: "Student",
    content:
      '"I love how easy it is to find and safely pay teachers on this platform. The Scrolls crypto payments make it simple to book classes with teachers from different countries."',
  },
  {
    name: "Aisha T.",
    tag: "Language Teacher",
    content:
      '"Teaching on AURORA has been amazing! I earn extra money teaching Arabic and get paid instantly in Scrolls cryptocurrency. No more waiting for international transfers!"',
    },
  ]
};

export const callToAction = {
  title: {
    textOne: "Start Your Language Learning Journey",
    textTwo: "Today",
  },
  subtitle: "Join thousands of learners who are connecting with expert teachers and paying safely with Scrolls crypto on AURORA. Teachers can earn extra money teaching their native language.",
  // buttons: [
  //   {
  //     text: "Signup Free",
  //     variant: "primary",
  //   },
  //   {
  //     text: "Explore Courses",
  //     variant: "outline",
  //   },
  // ],
};