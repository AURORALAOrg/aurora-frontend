import {
  BusinessEnglishCourseCard,
  BusinessEnglishSkillCard,
  UserReviewCard,
  WhyBusinessEnglishCard,
} from "@/components/business-english/Cards";
import {
  businessEnglishCourses,
  businessEnglishSkills,
  whyBusinessEnglish,
} from "@/components/business-english/Content";
import ResponsiveCard from "@/components/common/ResponsiveCard";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { successStories } from "@/data/mock-data-community";
import { Link } from "react-router-dom";

import React from "react";

const BusinessEnglishPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 justify-center flex">
      <div className="flex w-full h-full flex-col overflow-y-scroll justify-center items-center">
        <SectionCard className="bg-[#111827]">
          <p className="text-white font-bold text-4xl  lg:text-6xl  lg:max-w-[700px] text-center">
            Master Business English
          </p>
          <p className="font-normal mt-3 text-[#D1D5DB]  text-lg lg:text-base  lg:max-w-[600px] text-center">
            Enhance your professional communication skills with out AI-powered
            business English Courses designed for career advancement and
            international business success
          </p>
          <div className="w-full mt-5 justify-center items-center gap-5 flex flex-col sm:flex-row">
            <button className="capitalize border-none bg-[#22d3ee] text-[#FFFFFF] rounded-[6px] font-normal text-sm">
              Explore Courses
            </button>
            <button className="text-[#22d3ee] font-normal text-sm border-[1px] rounded-[6px] bg-transparent border-[#22d3ee]">
              Take Assessment
            </button>
          </div>
        </SectionCard>

        {/* why learn with us section */}

        <SectionCard className="bg-[#1F2937]">
          <p className="text-white font-bold text-2xl  lg:text-4xl  lg:max-w-[700px] text-center">
            Why learn Business English with Us
          </p>
          <ResponsiveCard className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-items-center">
            {whyBusinessEnglish.map((content, i) => (
              <WhyBusinessEnglishCard content={content} key={i} />
            ))}
          </ResponsiveCard>
        </SectionCard>

        {/* courses */}

        <SectionCard className="bg-[#111827]">
          <p className="text-white font-bold text-2xl  lg:text-4xl  lg:max-w-[700px] text-center">
            Our Business English Courses
          </p>
          <ResponsiveCard className="grid grid-cols-1  lg:grid-cols-2">
            {businessEnglishCourses.map((course) => (
              <Link
                to={`/learning/business-english/:${course.id}`}
                key={course.id}
              >
                <BusinessEnglishCourseCard course={course} />
              </Link>
            ))}
          </ResponsiveCard>
        </SectionCard>

        {/* Business English Skills section */}

        <SectionCard className="bg-[#1F2937]">
          <p className="text-white font-bold text-2xl  lg:text-4xl  lg:max-w-[700px] text-center">
            Business English Skills
          </p>
          <ResponsiveCard className="grid grid-cols-1  lg:grid-cols-4">
            {businessEnglishSkills.map((skill, i) => (
              <BusinessEnglishSkillCard skill={skill} key={i} />
            ))}
          </ResponsiveCard>
        </SectionCard>

        <SectionCard className="bg-[#111827]">
          <p className="text-white font-bold text-2xl  lg:text-4xl  lg:max-w-[700px] text-center">
            Accesses Your Business English Level
          </p>
          <p className="text-white lg:max-w-[700px] text-center">
            Take our comprehensive Assessment to identify your strengths and
            ares for improvement. Our all will create a personalize learning
            path based on your results.
          </p>
          <Button className="bg-[#22d3ee] hover:bg-[#00b8d4]">
            Start Free Assessment
          </Button>
        </SectionCard>

        <SectionCard className="bg-[#1F2937]">
          <p className="text-white font-bold text-2xl  lg:text-4xl  lg:max-w-[700px] text-center">
            Success Stories
          </p>
          <ResponsiveCard className="grid grid-cols-1  lg:grid-cols-3">
            {successStories.map((review) => (
              <UserReviewCard review={review} key={review.id} />
            ))}
          </ResponsiveCard>
        </SectionCard>

        <SectionCard className="bg-[#22d3ee]">
          <p className="text-white font-bold text-2xl  lg:text-4xl  lg:max-w-[700px] text-center">
            Ready to Advance Your Career?
          </p>
          <p className="text-white lg:max-w-[700px] text-center">
            Join thousands of professionals who have transformed their business
            communication skills with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-y-4 gap-x-4">
            <Button className="bg-black w-[150px]">Get Started</Button>
            <Button
              variant={"outline"}
              className="bg-transparent text-white w-[150px]"
            >
              Request Demo
            </Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default BusinessEnglishPage;
