import React, { memo } from "react";
import { Quote } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext"; 

/* eslint-disable react/prop-types */
export function SkillCards({ icons, tag, content }) {
  const { theme } = useTheme(); 
  const darkModeStyles =
    theme === "dark"
      ? "bg-[#111827] text-white hover:bg-[#0F172A] hover:shadow-xl hover:border-[#00B8D4] border border-transparent"
      : "bg-white text-[#09090B]";

  return (
    <div
      className={`rounded-[8px] w-full h-auto min-h-[172px] p-4 sm:p-5 flex-col flex shadow-sm items-center justify-center transition-all duration-300 ${darkModeStyles}`}
    >
      <div className="mb-2 flex items-center justify-center">{icons}</div>
      <strong className="font-bold text-base sm:text-lg text-center mt-1">
        {tag}
      </strong>
      <p className="text-center w-full flex flex-col font-normal text-sm sm:text-base lg:text-sm mt-1">
        {content}
      </p>
    </div>
  );
});

export function CoursesCard({ icons, tag, content }) {
  const { theme } = useTheme(); 
  const darkModeStyles =
    theme === "dark"
      ? "bg-[#1F2937] text-white hover:bg-[#111827] hover:shadow-xl hover:border-[#00B8D4] border border-transparent"
      : "bg-[#FFFFFF] text-[#09090B]";

  return (
    <div
      className={`flex-col flex w-full lg:w-[434px] h-[148px] p-[24px] rounded-[8px] transition-all duration-300 ${darkModeStyles}`}
    >
      <div className="flex flex-row gap-4">
        {icons}
        <div className="flex flex-col">
          <p className="capitalize font-bold text-xl lg:text-base">{tag}</p>
          <p className="font-normal text-sm lg:text-sm mt-1">{content}</p>
        </div>
      </div>
      <button
        type="button"
        className="bg-[#00B8D4] hover:bg-[#00a5c0] w-full transition-colors text-[#FAFAFA] text-sm rounded-[6px] border-none px-4 py-2 mt-auto self-start"
      >
        Start Learning
      </button>
    </div>
  );
});

// Fixed the typo in the component name
export const WhyChooseAuruora = memo(function WhyChooseAuruora({
  icons,
  tag,
  content,
}) {
  return (
    <article className="bg-[#1F2937] rounded-xl p-6 flex flex-col items-center text-center hover:bg-[#111827] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 group border border-transparent hover:border-[#00B8D4] cursor-default h-[220px]">
      <div
        className="h-12 w-12 text-[#00B8D4] group-hover:text-white transition-colors duration-300"
        aria-hidden="true"
      >
        {icons}
      </div>
      <h3 className="text-white font-medium text-lg mb-2 group-hover:text-[#00B8D4] transition-colors duration-300">
        {tag}
      </h3>
      <p className="text-[#71717A] group-hover:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
        {content}
      </p>
    </article>
  );
});

export const CTACard = memo(function CTACard({ children, styles }) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${styles ?? "w-full max-w-[320px] bg-[#1F2937] rounded-[8px] p-4 sm:p-[24px] h-auto min-h-[220px]"
        } shadow-sm mx-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-transparent hover:border-[#00B8D4] hover:bg-[#111827] cursor-default`}
    >
      {children}
    </div>
  );
});

export function WhatOurUsersSay({ name, tag, content }) {
  const { theme } = useTheme(); 
  const darkModeStyles =
    theme === "dark"
      ? "bg-[#111827] text-white hover:bg-[#0F172A] hover:shadow-xl hover:border-[#00B8D4] border border-transparent"
      : "bg-[#FFFFFF] text-[#09090B]";

  return (
    <div
      className={`flex-col flex w-full sm:max-w-[320px] md:max-w-[360px] lg:w-[320px] h-auto min-h-[228px] p-4 sm:p-[24px] rounded-[8px] shadow-sm mx-auto transition-all duration-300 ${darkModeStyles}`}
    >
      <div className="flex flex-row gap-3 sm:gap-4 w-full mb-4">
        <div
          className="w-[40px] h-[40px] flex-shrink-0 rounded-full bg-[#00B8D41A]/10 flex items-center justify-center"
          aria-hidden="true"
        >
          <Quote className="text-[#00B8D4] w-5 h-5" />
        </div>
        <div className="flex flex-col w-full">
          <p className="font-semibold text-base">{name}</p>
          <p className="font-normal text-sm">{tag}</p>
        </div>
      </div>
      <p className="font-normal text-sm sm:text-base w-full">{content}</p>
    </div>
  );
}