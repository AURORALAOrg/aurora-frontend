import { memo } from "react";
import { Quote } from "lucide-react";

// Memoize components to prevent unnecessary re-renders
export const SkillCards = memo(function SkillCards({ icons, tag, content }) {
  return (
    <article className="bg-white rounded-[8px] w-full h-auto min-h-[172px] p-4 sm:p-5 flex-col flex shadow-sm items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-transparent hover:border-[#00B8D4] hover:bg-gray-50 cursor-default">
      <div className="mb-2 flex items-center justify-center" aria-hidden="true">
        {icons}
      </div>
      <h3 className="font-bold text-[#09090B] group-hover:text-[#00B8D4] text-base sm:text-lg text-center mt-1 transition-colors duration-300">
        {tag}
      </h3>
      <p className="text-center w-full flex flex-col font-normal text-sm sm:text-base lg:text-sm mt-1 text-[#71717A] group-hover:text-[#111827] transition-colors duration-300">
        {content}
      </p>
    </article>
  );
});

export const CoursesCard = memo(function CoursesCard({ icons, tag, content }) {
  return (
    <article className="flex flex-col items-center text-center w-full h-auto min-h-[220px] p-6 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-default">
      <div className="flex flex-col items-center text-center gap-2 sm:gap-2 mb-4">
        <div className="w-12 h-12 text-cyan-400" aria-hidden="true">
          {icons}
        </div>
        <div className="flex flex-col">
          <h3 className="text-white font-semibold mb-1 text-base sm:text-lg lg:text-base group-hover:text-[#22D3EE] transition-colors duration-300">
            {tag}
          </h3>
          <p className="text-[#71717A] font-normal text-sm lg:text-sm mt-1 group-hover:text-[#111827] transition-colors duration-300">
            {content}
          </p>
        </div>
      </div>
      <a href="/course-navigation">
        <button
          type="button"
          className="bg-cyan-500 hover:bg-cyan-500/80 transition-colors text-[#FAFAFA] text-sm rounded-[6px] border-none px-4 py-2 mt-auto self-start w-full"
        >
          Start Learning
        </button>
      </a>
    </article>
  );
});

// Fixed the typo in the component name
export const WhyChooseAuruora = memo(function WhyChooseAuruora({
  icons,
  tag,
  content,
}) {
  return (
    <article className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 group border border-cyan-500/30 hover:border-cyan-500/50 cursor-default h-[220px]">
      <div
        className="h-12 w-12 text-cyan-400 mb-2 group-hover:text-white transition-colors duration-300"
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
      className={`flex flex-col items-center justify-center ${
        styles ??
        "w-full max-w-[320px] bg-[#1F2937] rounded-[8px] p-4 sm:p-[24px] h-auto min-h-[220px]"
      } shadow-sm mx-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-transparent hover:border-[#00B8D4] hover:bg-[#111827] cursor-default`}
    >
      {children}
    </div>
  );
});

export const WhatOurUsersSay = memo(function WhatOurUsersSay({
  name,
  tag,
  content,
}) {
  return (
    <article className="flex-col flex w-full h-auto min-h-[228px] p-4 sm:p-[24px] bg-white/95 backdrop-blur-sm rounded-[8px] border-none shadow-sm mx-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-transparent hover:border-[#00B8D4] hover:bg-gray-50 cursor-default">
      <div className="flex flex-row gap-3 sm:gap-4 w-full mb-4">
        <div
          className="w-[40px] h-[40px] flex-shrink-0 rounded-full bg-[#00B8D41A]/10 flex items-center justify-center"
          aria-hidden="true"
        >
          <Quote className="text-[#00B8D4] w-5 h-5" />
        </div>
        <div className="flex flex-col w-full">
          <h3 className="text-gray-900 font-bold text-base group-hover:text-[#00B8D4] transition-colors duration-300">
            {name}
          </h3>
          <p className="text-cyan-500 font-medium text-sm group-hover:text-[#111827] transition-colors duration-300">
            {tag}
          </p>
        </div>
      </div>
      <p className="text-gray-600 font-normal text-sm sm:text-base w-full group-hover:text-[#111827] transition-colors duration-300">
        {content}
      </p>
    </article>
  );
});
