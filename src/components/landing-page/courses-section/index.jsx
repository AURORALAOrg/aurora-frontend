import { useState } from 'react';
import { courses } from '../call-to-action/content';
import { CoursesCard } from '../call-to-action/cards';

const tabs = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Business',
];

function CoursesTabs({ active, setActive }) {
  return (
    <div 
      role='tablist'  
      aria-label='Courses Tabs'
      className="grid grid-cols-4 gap-1 w-full max-w-[400px] bg-[#374151] rounded-lg p-1 mb-8"
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
              ? 'bg-white text-[#111827] shadow-sm'
              : 'bg-transparent text-gray-400 hover:text-gray-200'}
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

const CoursesSection = () => {
  const [activeTab, setActiveTab] = useState('Beginner');
  return (
    <section className="h-auto w-full items-center justify-center px-0 py-20 gap-4 flex-col flex bg-[#111827]" aria-label="Courses Section">
      <div className="flex flex-col gap-4 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-12">
      <p className="text-white text-3xl text-center lg:text-5xl font-bold">
        {courses.title}
      </p>
      <p className="text-[#D1D5DB] font-normal text-center text-base lg:text-xl">
        {courses.subtitle}
      </p>
      <div className="flex flex-col justify-center items-center h-auto w-full mt-5">
        <CoursesTabs active={activeTab} setActive={setActiveTab} />
        <div 
          role='tabpanel'
          id={`${activeTab.toLowerCase()}-panel`}
          aria-labelledby={`${activeTab}-tab`}
          className="lg:grid-cols-3 grid md:grid-cols-2 lg:flex gap-4 items-stretch justify-center w-full" 
        >
          {courses?.cards[activeTab].map((contents, i) => (
            <CoursesCard key={`${activeTab}-course-${i}`} {...contents} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default CoursesSection; 