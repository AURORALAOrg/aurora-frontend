import { MoveRight } from "lucide-react";

const WhyBusinessEnglishCard = ({ content }) => {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center w-full sm:max-w-[450px]">
      <div className=" bg-cyan-400/30 px-2 py-2 rounded-full">
        {content.icon}
      </div>
      <strong className="font-bold text-center text-[#FFFFFF] text-lg">
        {content.tag}
      </strong>
      <p className="text-center w-full text-[#e6f8fb] flex font-normal text-base">
        {content.content}
      </p>
    </div>
  );
};

const BusinessEnglishCourseCard = ({ course }) => {
  return (
    <div className="flex flex-col gap-y-4  w-full  sm:max-w-[450px] bg-[#1F2937] px-4 sm:px-6 py-4 justify-start mx-auto rounded-md">
      <div className=" bg-cyan-400/30 px-2 py-2 rounded-full w-[40px] h-[40px]">
        {course.icon}
      </div>
      <strong className="font-bold  text-[#FFFFFF] text-md  sm:text-lg">
        {course.title}
      </strong>
      <p className="w-full text-[#e6f8fb] flex font-normal text-base">
        {course.content}
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-y-4 sm:justify-between gap-x-4 ">
        <p className="text-white text-sm sm:text-md bg-[#22d3ee] w-full px-2 py-2 text-center rounded-md ">
          {course.type}
        </p>
        <div className="flex justify-center items-center gap-x-1 border border-[#22d3ee] w-full px-2 py-2 text-center rounded-md">
          <p className="text-[#22d3ee] text-sm sm:text-md ">Start learning</p>
          <MoveRight
            className="w-3 h-3 text-[#22d3ee] items-center justify-center font-bold"
            strokeWidth={4}
          />
        </div>
      </div>
    </div>
  );
};

const BusinessEnglishSkillCard = ({ skill }) => {
  return (
    <div className="flex flex-col justify-start items-center gap-y-2">
      <div className="bg-[#111827] px-2 py-2 w-[40px] h-[40px] justify-center items-center rounded-md">
        {skill.icon}
      </div>
      <p className="text-lg sm:text-xl text-white font-bold">{skill.tag}</p>
      <p className="text-white text-center">{skill.content}</p>
    </div>
  );
};

const UserReviewCard = ({ review }) => {
  return (
    <div className="flex flex-col px-4 py-4 gap-4 text-white bg-[#111827]">
      <div className="flex flex-row gap-x-4">
        <div className="w-[40px] h-[40px] rounded-full">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-full h-full rounded-full"
          ></img>
        </div>
        <div className="flex flex-col gap-x-2">
          <p className="font-bold ">{review.name}</p>
          <p className="text-sm">{review.location}</p>
        </div>
      </div>
      <p className="text-sm italic">{review.testimonial}</p>
    </div>
  );
};

export {
  WhyBusinessEnglishCard,
  BusinessEnglishCourseCard,
  BusinessEnglishSkillCard,
  UserReviewCard,
};
