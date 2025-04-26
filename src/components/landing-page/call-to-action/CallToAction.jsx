import React from 'react';
import HeroSection from '../hero-section';
import SkillSection from '../skill-section';
import CoursesSection from '../courses-section';
import WhyChooseAurora from '../why-choose-aurora';
import TestimonialsSection from '../testimonials-section';
import CTASection from '../cta-section';
import { skillContent } from './Content';

const CallToActionPage = () => {
  return (
    <div className="flex w-full h-full flex-col overflow-y-scroll ">
      <div className="w-full flex-col justify-center gap-4 flex h-[582px] bg-[#030712] p-[3%]">
        <p className="text-white font-bold text-4xl  lg:text-6xl  lg:max-w-[700px]">
          Learn Languages with AI-Powered Assistance
        </p>
        <p className="font-normal mt-3 text-[#D1D5DB]  text-lg lg:text-base  lg:max-w-[600px]">
          AURORA.LA is an innovative AI-powered language learning platform that
          combines personalized tutoring, blockchain technology, and advanced
          language processing to create an engaging and effective learning
          experience.
        </p>
        <div className="w-full mt-5 items-start gap-5 flex">
          <button className="capitalize border-none bg-[#34D399] text-[#111827] rounded-[6px] font-normal text-sm">
            get Started
          </button>
          <button className="text-[#22D3EE] font-normal text-sm border-[1px] rounded-[6px] bg-white border-[#22D3EE]">
            Learn More
          </button>
        </div>
      </div>
      <div className="w-full bg-[#1F2937] lg:h-[660px] flex flex-col gap-4 p-[3%] items-center justify-center">
        <p className="lg:w-[623px] font-bold  mt-[32px] text-3xl lg:text-5xl text-white text-center">
          Improve Your Language Skills
        </p>
        <p className=" text-center font-normal text-[#D1D5DB] text-base lg:text-xl ">
          Practice your English language skills with our AI-powered learning
          platform
        </p>
        <div className="lg:max-w-[1024px] py-[48px] gap-[24px] lg:grid-cols-4  grid md:grid-cols-2  items-center justify-center">
          {skillContent.map((values, i) => {
            return <SkillCards {...values} key={i} />;
          })}
        </div>
      </div>
      <div className="lg:h-[595px] h-auto w-full items-center justify-center p-[3%] gap-4 flex-col flex bg-[#111827]">
        <p className="text-white mt-[32px] text-3xl text-center lg:text-5xl font-bold">
          Explore Our Courses
        </p>
        <p className="text-[#D1D5DB] font-normal text-center text-base lg:text-xl">
          Find the perfect course to match your learning goals
        </p>
        <div className="h-auto w-full gap-[32px] flex flex-col">
          <br />
          <div className="lg:flex-wrap grid md:grid-cols-2  lg:flex gap-4 items-center justify-center w-full">
            {courses.map((contents, i) => {
              return <CoursesCard key={i} {...contents} />;
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full p-[3%] gap-4 bg-[#374151] h-auto lg:h-[912px]">
        <p className="lg:w-[496px] text-3xl lg:text-5xl mt-[32px] font-bold text-white text-center ">
          Why Choose AURORA?
        </p>
        <p className="text-center font-normal text-[#D1D5DB] text-xl">
          Our AI-powered platform offers unique advantages for language learners
        </p>
        <div className="gap-4 grid md:grid-cols-2  lg:grid-cols-3   justify-center items-center">
          {whyChooseAuruora.map((content, i) => {
            return <WhyChooseAuruora key={i} {...content} />;
          })}
        </div>
      </div>
      <div className="bg-[#1F2937] w-full h-auto lg:h-[608px] items-center gap-4 py-[5%] px-[2%] lg:p-[3%] flex flex-col justify-center">
        <p className="block lg:w-[426px] mt-[32px] text-white text-center font-bold text-3xl lg:text-5xl ">
          What Our Users Say
        </p>
        <p className="text-[#D1D5DB] font-normal text-center text-base lg:text-xl">
          Hear from language learners who have transformed their skills with
          AURORA
        </p>
        <div className=" gap-4 grid lg:grid-cols-3 md:grid-cols-2  items-center justify-center">
          {whatOurUsersSay.map((content, i) => {
            return <WhatOurUsersSay {...content} key={i} />;
          })}
        </div>
      </div>
      <div className="bg-[#030712] h-[452px] w-full items-center gap-4 justify-center flex flex-col ">
        <p className="lg:w-[956px] text-white text-center justify-center font-bold text-4xl lg:text-5xl">
          Start Your Language Learning Journey Today
        </p>
        <p className="text-[#D1D5DB] font-normal text-base lg:text-xl text-center">
          Join thousands of learners who are transforming their language skills
          with AURORA
        </p>
        <div className="gap-4 w-full flex justify-center items-center">
          <button className="capitalize border-none bg-[#34D399] text-[#111827] rounded-[6px] font-normal text-sm">
            Signup Free
          </button>
          <button className="text-[#22D3EE] font-normal text-sm border-[1px] rounded-[6px] bg-white border-[#22D3EE]">
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToActionPage;
