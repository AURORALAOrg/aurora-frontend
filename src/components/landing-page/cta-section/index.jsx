import { callToAction } from "../call-to-action/Content";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = ({ selectedRole }) => {
  const studentCTA = {
    title: {
      textOne: "Start Your Language Learning Journey",
      textTwo: "Today",
    },
    subtitle:
      "Join thousands of students who are connecting with expert teachers and paying safely with Scrolls crypto on AURORA.",
    buttonText: "Find Your Teacher",
    buttonLink: "/teacher-directory",
  };

  const teacherCTA = {
    title: {
      textOne: "Start Earning Money Teaching",
      textTwo: "Today",
    },
    subtitle:
      "Join our growing community of teachers who are earning extra income with secure Scrolls cryptocurrency payments.",
    buttonText: "Become a Teacher",
    buttonLink: "/teacher-signup",
  };

  const defaultCTA = {  
    title: callToAction.title,  
    subtitle: callToAction.subtitle,  
    buttonText: "Join Our Waitlist",  
    buttonLink: "/waitlist",  
  };  

  const currentCTA =
    selectedRole === "student"
      ? studentCTA
      : selectedRole === "teacher"
      ? teacherCTA
      : defaultCTA;

  return (
    <section
      className="bg-[#030712] relative overflow-hidden"
      aria-label="Call to Action Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            {currentCTA.title.textOne}{" "}
            <span className="text-light-blue-1">
              {currentCTA.title.textTwo}
            </span>
          </h2>
          <p className="mt-3 text-neutral-3 max-w-2xl mx-auto">
            {currentCTA.subtitle}
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to={currentCTA.buttonLink}
              className="inline-flex items-center gap-2 bg-light-blue-1 text-white px-6 py-3 rounded-md font-semibold hover:opacity-95"
            >
              <span>{currentCTA.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
