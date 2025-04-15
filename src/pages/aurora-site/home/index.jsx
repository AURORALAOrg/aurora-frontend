import  { useEffect } from "react";
import {
  MessageCircleIcon,
  BookOpenIcon,
  CirclePlayIcon,
  PencilIcon,
  GlobeIcon,
  UsersIcon,
  GraduationCapIcon,
  BrainIcon,
  QuoteIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const skillsList = [
  {
    label: "Reading",
    description: "Improve your reading skills with interactive texts",
    Icon: BookOpenIcon, // just reference the icon, don't render here
  },
  {
    label: "Speaking",
    description: "Practice conversations with our AI assistant",
    Icon: MessageCircleIcon,
  },
  {
    label: "Listening",
    description: "Enhance your listening skills with audio lessons",
    Icon: CirclePlayIcon,
  },
  {
    label: "Writing",
    description: "Get feedback on your writing from our AI",
    Icon: PencilIcon,
  },
];

const whyUsList = [
  {
    title: "AI-Powered Learning",
    description:
      "Our advanced AI adapts to your learning style and pace for personalized education",
    Icon: BrainIcon, // just reference the icon, don't render here
  },
  {
    title: "Web3 Integration",
    description:
      "Built on blockchain technology for secure, transparent, and decentralized learning",
    Icon: GlobeIcon,
  },
  {
    title: "Community Learning",
    description:
      "Connect with other learners and native speakers to practice your skills",
    Icon: UsersIcon,
  },
  {
    title: "Certified Progress",
    description:
      "Earn verifiable certificates as you complete courses and achieve milestones",
    Icon: GraduationCapIcon,
  },
  {
    title: "Interactive Conversations",
    description:
      "Practice speaking with our AI assistant that provides instant feedback",
    Icon: MessageCircleIcon,
  },
  {
    title: "Comprehensive Resources",
    description:
      "Access a wide range of learning materials, exercises, and tests",
    Icon: BookOpenIcon,
  },
];


const coursesList = [
  {
    label: "Beginner",
    courses: [
      {
        title: "Basic Conversation",
        description: "Learn everyday phrases and expressions",
      },
      {
        title: "Grammar Foundations",
        description: "Master the basics of English grammar",
      },
      {
        title: "Cultural Insights",
        description: "Learn about cultures while learning language",
      },
    ],
  },
  {
    label: "Intermediate",
    courses: [
      {
        title: "Fluent Conversations",
        description: "Improve your speaking fluency",
      },
      {
        title: "Reading Comprehension",
        description: "Enhance your reading skills",
      },
      {
        title: "Writing Workshop",
        description: "Develop your writing skills",
      },
    ],
  },
  {
    label: "Advance",
    courses: [
      {
        title: "Advanced Grammar",
        description: "Master complex grammatical structures",
      },
      {
        title: "Idiomatic Expressions",
        description: "Learn native-like expressions",
      },
      {
        title: "Academic English",
        description: "Prepare for academic environments",
      },
    ],
  },
  {
    label: "Business",
    courses: [
      {
        title: "Business Communication",
        description: "Professional email and meeting skills",
      },
      {
        title: "Negotiation Skills",
        description: "Learn to negotiate effectively",
      },
      {
        title: "Presentation Mastery",
        description: "Deliver impactful presentations",
      },
    ],
  },
];

const userFeedbackList = [
  {
    username: "Sarah K.",
    profession: "Business Professional",
    comment: `"AURORA has transformed my business English skills. The AI feedback helped me improve my presentations and emails dramatically."`,
  },
  {
    username: "Miguel R.",
    profession: "Student",
    comment: `"I love how the platform adapts to my learning style. The interactive conversations with the AI feel so natural and have helped me gain confidence."`,
  },
  {
    username: "Aisha T.",
    profession: "Language Enthusiast",
    comment: `"The Web3 integration is brilliant! I love earning certificates that are verifiable on the blockchain as I complete my courses."`,
  },
];
const SkillCard = ({ label, description, Icon }) => {
  return (
    <div className="bg-white  rounded-2xl px-8 py-8 flex flex-col gap-y-2 justify-center items-center">
      <div className="text-sky-500 text-lg">
        <Icon className="w-6 h-6" /> {/* Or any size/color */}
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xl font-bold text-gray-800">{label}</p>
        <p className="text-md text-gray-700 text-center">{description}</p>
      </div>
    </div>
  );
};
const WhyUsCard = ({ title, description, Icon }) => {
  return (
    <div className="bg-gray-900  rounded-2xl px-8 py-8 flex flex-col gap-y-2 justify-center items-center">
      <div className="text-sky-500 text-lg">
        {Icon && <Icon className="w-8 h-8" />}
      </div>
      <div className="flex flex-col gap-y-4 justify-center items-center">
        <p className="text-xl font-bold text-white">{title}</p>
        <p className="text-sm sm:text-lg text-gray-600 text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

const FeedBackCard = ({ username, profession, comment }) => {
  return (
    <div className="bg-white  rounded-2xl px-8 py-8 flex flex-col gap-y-2">
      <div className="flex flex-row gap-x-2">
        <div className="text-sky-500 text-lg flex justify-center items-center">
          <QuoteIcon className="w-6 h-6" /> {/* Or any size/color */}
        </div>
        <div className="flex flex-col gap-x-2">
          <p className="text-md font-bold text-gray-800">{username}</p>
          <p className="text-sm text-gray-700">{profession}</p>
        </div>
      </div>

      <p className="text-md text-gray-700">{comment}</p>
    </div>
  );
};
const Courses = () => {
  const [courseList, setCourseList] = useState([]);
  const [currentCourse, setCurrentCourse] = useState("Beginner");

  useEffect(() => {
    const c = coursesList.find((course) => course.label === currentCourse);
    if (c) {
      setCourseList(c.courses);
    }
  }, [currentCourse]);

  return (
    <div className="w-full min-w-full flex flex-col flex-1 gap-y-8 justify-center items-center">
      <div className="max-w-full flex flex-row justify-between gap-x-2 sm:w-auto px-1 py-1 rounded-lg bg-gray-700">
        {coursesList.map((course) => (
          <div
            style={{
              backgroundColor:
                currentCourse === course.label ? "white" : "transparent",
              color: currentCourse === course.label ? "black" : "gray",
            }}
            key={course.label}
            className="sm:px-4 px-2 py-1 rounded-md hover:cursor-pointer sm:text-md text-xs "
            onClick={() => {
              setCurrentCourse(course.label);
            }}
          >
            {course.label}
          </div>
        ))}
      </div>

      <div className="grid min-w-full lg:grid-cols-3 grid-cols-1 gap-y-4  gap-x-12">
        {courseList.map((course) => (
          <div
            key={course.title}
            className="bg-white rounded-lg px-4 py-6 flex flex-col gap-y-4 w-full min-w-full"
          >
            <div className="flex flex-row gap-x-4 justify-start ">
              <PencilIcon className="w-6 h-6 text-sky-500 my-auto "></PencilIcon>
              <div className=" flex flex-col">
                <p className="text-md font-bold">{course.title}</p>
                <p className="text-sm text-gray-700">{course.description}</p>
              </div>
            </div>
            <Button className="bg-sky-500 text-white w-full">
              Start Learning
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col flex-1">
      {/*Get Started section */}
      <div className="bg-black w-full h-auto  py-8 px-4 sm:py-40 sm:px-16 flex flex-col justify-start">
        <div className="w-full sm:max-w-[700px] flex flex-col gap-y-4">
          <p className=" text-3xl sm:text-6xl text-white font-bold">
            Learn Languages with AI-Powered Assistance
          </p>
          <p className=" text:sm sm:text-xl text-white">
            AURORA.LA is an innovative AI-powered language learning platform
            that combines personalized tutoring, blockchain technology, and
            advanced language processing to create an engaging and effective
            learning experience.
          </p>
          <div className="flex gap-x-4">
            <Button size={"lg"} className="bg-emerald-500 text-gray-800">
              Get Started
            </Button>
            <Button
              size={"lg"}
              className="bg-white text-emerald-500 outline outline-emerald-500"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/*Skills section */}
      <div className="bg-gray-800 w-full h-auto py-8 px-4 sm:py-40 sm:px-8 flex flex-col justify-center items-center">
        <div className="w-full sm:max-w-[1200px] flex flex-col justify-center items-center gap-y-8 text-white">
          <div className="flex flex-col gap-y-4 justify-center items-center">
            <p className=" text-3xl sm:text-5xl font-bold text-center">
              Improve Your Language Skills
            </p>
            <p className="text-lg sm:text-2xl text-center">
              Practice your English language skills with our AI-powered learning
              platform
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-y-4 gap-x-4">
            {skillsList.map((skill) => (
              <SkillCard
                key={skill.label}
                label={skill.label}
                description={skill.description}
                Icon={skill.Icon}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Explore Courses section */}
      <div className="bg-black w-full h-auto  py-8 px-4 sm:py-40 sm:px-16 flex flex-col justify-center items-center">
        <div className="w-full sm:max-w-[1400px] flex flex-col gap-y-8 justify-center items-center">
          <div className="flex flex-col flex-1 justify-center items-center gap-y-4">
            <p className=" text-3xl sm:text-5xl text-white font-bold text-center">
              Explore Our Courses
            </p>
            <p className=" text-lg sm:text-2xl text-white text-center">
              Find the perfect course to match your learning goals
            </p>
          </div>

          <div className="flex w-full flex-col gap-y-4">
            <Courses />
          </div>
        </div>
      </div>

      {/* why use section */}
      <div className="bg-gray-800 w-full h-auto py-8 px-4 sm:py-40 sm:px-8 flex flex-col justify-center items-center">
        <div className="w-full sm:max-w-[1000px] flex flex-col justify-center items-center gap-y-8 text-white">
          <div className="flex flex-col gap-y-4 justify-center items-center">
            <p className=" text-3xl sm:text-5xl font-bold text-center">
              Why Choose AURORA?
            </p>
            <p className=" text-lg sm:text-2xl text-center">
              Our AI-powered platform offers unique advantages for language
              learners
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-y-4 gap-x-4">
            {whyUsList.map((item) => (
              <WhyUsCard
                key={item.title}
                title={item.title}
                description={item.description}
                Icon={item.Icon}
              />
            ))}
          </div>
        </div>
      </div>

      {/*Feedback section */}
      <div className="bg-gray-900 w-full h-auto py-8 px-4 sm:py-40 sm:px-8 flex flex-col justify-center items-center">
        <div className="w-full sm:max-w-[1000px] flex flex-col justify-center items-center gap-y-8 text-white">
          <div className="flex flex-col gap-y-4 justify-center items-center">
            <p className=" text-3xl sm:text-5xl font-bold text-center">
              What Our Users Say
            </p>
            <p className=" text-lg sm:text-2xl text-center">
              Hear from language learners who have transformed their skills with
              AURORA
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 gap-x-4">
            {userFeedbackList.map((feedback) => (
              <FeedBackCard
                key={feedback.username}
                username={feedback.username}
                profession={feedback.profession}
                comment={feedback.comment}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black w-full h-auto  py-8 px-4 sm:py-40 sm:px-16 flex flex-col gap-y-8 justify-center items-center">
        <div className="w-full sm:max-w-[1400px] flex flex-col gap-y-8 justify-center items-center">
          <div className="flex flex-col flex-1 justify-center items-center gap-y-4">
            <p className=" text-3xl sm:text-5xl text-white font-bold text-center">
              Start Your Language Learning Journey Today
            </p>
            <p className=" text-lg sm:text-2xl text-white text-center">
              Join thousands of learners who are transforming their language
              skills with AURORA
            </p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <Button size={"lg"} className="bg-emerald-500 text-gray-800">
            Sing Up Free
          </Button>
          <Button
            size={"lg"}
            className="bg-white text-emerald-500 outline outline-emerald-500"
          >
            Explore Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
