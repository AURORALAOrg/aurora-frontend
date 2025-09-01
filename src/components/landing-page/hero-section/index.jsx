import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import logger from '@/lib/logger';

const HeroSection = ({ selectedRole, onRoleChange }) => {
  const navigate = useNavigate();

  const studentContent = {
    title: "Learn Languages with Expert Teachers",
    subtitle:
      "Connect with qualified teachers worldwide and pay securely with Scrolls cryptocurrency. Get personalized, one-on-one instruction in any language.",
    cta: "Find Your Perfect Teacher",
    benefits: [
      "Safe & secure payments with Scrolls crypto",
      "Personalized learning experience",
      "Certified teachers from around the world",
      "Flexible scheduling",
    ],
  };

  const teacherContent = {
    title: "Earn Extra Money Teaching Your Language",
    subtitle:
      "Join our platform and start earning immediately with secure Scrolls cryptocurrency payments. Share your native language skills and help students worldwide.",
    cta: "Start Teaching Today",
    benefits: [
      "Get paid instantly in Scrolls crypto",
      "Set your own rates and schedule",
      "No traditional banking fees",
      "Global student base",
    ],
  };

  const handleStudentClick = () => {
    logger.debug("Student button clicked");
    if (onRoleChange && typeof onRoleChange === "function") {
      onRoleChange("student");
    } else {
      logger.error("onRoleChange is not a function", { onRoleChange });
    }
  };

  const handleTeacherClick = () => {
    logger.debug("Teacher button clicked");
    navigate("/teacher-signup");
  };

  return (
    <>
      {/* Hero Section with Role Selection */}
      <section className="relative overflow-hidden bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                {selectedRole === "teacher"
                  ? teacherContent.title
                  : studentContent.title}
              </h1>
              <p className="mt-4 text-neutral-3">
                {selectedRole === "teacher"
                  ? teacherContent.subtitle
                  : studentContent.subtitle}
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleStudentClick}
                  className="bg-dark-blue-5 border border-dark-blue-4 text-white px-5 py-3 rounded-md hover:bg-dark-blue-4"
                >
                  {studentContent.cta}
                </button>
                <button
                  onClick={handleTeacherClick}
                  className="inline-flex items-center gap-2 bg-light-blue-1 text-white px-5 py-3 rounded-md font-semibold hover:opacity-95"
                >
                  <span>{teacherContent.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
