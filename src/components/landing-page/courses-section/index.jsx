import { useState } from 'react';
import { courses } from '../call-to-action/Content';
import { CoursesCard } from '../call-to-action/Cards';
import { Headphones } from 'lucide-react';

const studentTabs = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Business',
];

const teacherTabs = [
  'Getting Started',
  'Teaching Tools',
  'Earning Tips',
  'Success Stories',
];

function CoursesTabs({ active, setActive, tabs }) {
  return (
    <div 
      role='tablist'  
      aria-label='Courses Tabs'
      className="grid grid-cols-4 gap-1 w-full max-w-[400px] bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-1 mb-8"
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role='tab'
          aria-selected={active === tab}
          aria-controls={`${tab.toLowerCase()}-panel`}
          onClick={() => setActive(tab)}
          className={`transition-all font-semibold text-sm rounded-md px-2 py-2
            ${active === tab
              ? 'bg-white text-black shadow-sm'
              : 'bg-gray-800/50 text-gray-300 hover:text-white'}
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

const CoursesSection = ({ selectedRole }) => {
  const [activeTab, setActiveTab] = useState('Beginner');

  const studentContent = {
    title: "Explore Our Courses",
    subtitle: "Find the perfect course to match your learning goals",
    cards: courses.cards
  };

  const teacherContent = {
    title: "Teaching Resources",
    subtitle: "Everything you need to start earning as a language teacher",
    cards: {
      'Getting Started': [
        {
          icons: <span className="text-2xl">🚀</span>,
          tag: "Profile Setup",
          content: "Create your teacher profile and showcase your expertise",
        },
        {
          icons: <span className="text-2xl">📋</span>,
          tag: "Lesson Planning",
          content: "Learn how to structure effective language lessons",
        },
        {
          icons: <span className="text-2xl">💰</span>,
          tag: "Pricing Strategy",
          content: "Set competitive rates that maximize your earnings",
        },
      ],
      'Teaching Tools': [
        {
          icons: <span className="text-2xl">💻</span>,
          tag: "Platform Features",
          content: "Master our teaching tools and interactive features",
        },
        {
          icons: <span className="text-2xl">📚</span>,
          tag: "Resource Library",
          content: "Access our extensive collection of teaching materials",
        },
        {
          icons: <span className="text-2xl">🎯</span>,
          tag: "Assessment Tools",
          content: "Track student progress and provide meaningful feedback",
        },
      ],
      'Earning Tips': [
        {
          icons: <span className="text-2xl">📈</span>,
          tag: "Maximize Income",
          content: "Strategies to increase your teaching revenue",
        },
        {
          icons: <span className="text-2xl">⏰</span>,
          tag: "Time Management",
          content: "Optimize your schedule for maximum efficiency",
        },
        {
          icons: <span className="text-2xl">🌟</span>,
          tag: "Student Retention",
          content: "Build lasting relationships with your students",
        },
      ],
      'Success Stories': [
        {
          icons: <span className="text-2xl">🏆</span>,
          tag: "Top Earners",
          content: "Learn from teachers who earn $1000+ monthly",
        },
        {
          icons: <span className="text-2xl">📖</span>,
          tag: "Case Studies",
          content: "Real stories from successful language teachers",
        },
        {
          icons: <span className="text-2xl">🎓</span>,
          tag: "Career Growth",
          content: "How teaching can advance your professional development",
        },
      ],
    }
  };

  const defaultContent = {
    ...courses,
    cards: {
      ...courses.cards,
      Beginner: [
        courses.cards.Beginner[0], // Basic Conversation
        courses.cards.Beginner[1], // Grammar Foundations  
        courses.cards.Beginner[2], // Cultural Insights
        {
          icons: <Headphones className="text-[#00B8D4] h-12 w-12" aria-hidden="true" />,
          tag: "Pronunciation and Listening",
          content: "Develop clear pronunciation and listening skills",
        },
      ]
    }
  };

  const currentContent = selectedRole === 'student' ? studentContent : 
                        selectedRole === 'teacher' ? teacherContent : 
                        defaultContent;

  const currentTabs = selectedRole === 'student' ? studentTabs : 
                     selectedRole === 'teacher' ? teacherTabs : 
                     studentTabs;

  return (
    <section className="h-auto w-full items-center justify-center px-0 py-20 gap-4 flex-col flex bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-black/95 bg-[radial-gradient(ellipse_at_top_left,_rgba(6,182,212,0.07),_transparent)]" aria-label="Courses Section">
      <div className="flex flex-col gap-4 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-12">
      <p className="text-white text-3xl text-center lg:text-5xl font-bold">
        {currentContent.title}
      </p>
      <p className="text-[#71717A] font-normal text-center text-base lg:text-xl">
        {currentContent.subtitle}
      </p>
      <div className="flex flex-col justify-center items-center h-auto w-full mt-5">
        <CoursesTabs active={activeTab} setActive={setActiveTab} tabs={currentTabs} />
        <div 
          role='tabpanel'
          id={`${activeTab.toLowerCase()}-panel`}
          aria-labelledby={`${activeTab}-tab`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch justify-center w-full" 
        >
          {currentContent?.cards[activeTab].map((contents, i) => (
            <CoursesCard key={`${activeTab}-course-${i}`} {...contents} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default CoursesSection; 