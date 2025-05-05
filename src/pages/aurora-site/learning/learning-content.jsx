import React from "react";
import { useNavigate } from "react-router-dom";

const CertificationCard = ({ title, description, variant = "blue", onClick, imageSrc }) => {
  return (
    <div className="bg-[#1f2937] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Banner Image or SVG */}
      <div className={`h-32 relative ${variant === "pink" ? "bg-pink-400" : "bg-blue-600"}`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${title} certification banner`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <svg className="w-full h-full" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="4" fill="#FFF" opacity="0.6" />
            <circle cx="350" cy="40" r="4" fill="#FFF" opacity="0.6" />
            <path d="M200 20l2 2-2 2-2-2z" fill="#FF69B4" opacity="0.8" />
            <path d="M320 70l2 2-2 2-2-2z" fill="#FF69B4" opacity="0.8" />
            <rect x="120" y="40" width="160" height="100" rx="8" fill="#FFF" opacity="0.2" />
            <rect x="140" y="60" width="120" height="60" fill="#FFF" opacity="0.3" />
            <circle cx="180" cy="90" r="15" fill="#FFD700" opacity="0.8" />
            <path d="M175 90l5 5 10-10" stroke="#FFF" strokeWidth="2" />
          </svg>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-[#ffffff] mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{description}</p>
        <button
          className="w-full bg-[#22d3ee] text-white py-2.5 rounded-lg hover:bg-[#1cc9dd] transition-colors text-sm font-medium"
          onClick={onClick}
        >
          Start learning
        </button>
      </div>
    </div>
  );
};

const LearningContent = () => {
  const navigate = useNavigate();

  const certifications = [
    {
      title: "Level A1",
      description: "Learn the basics of grammar and essential everyday vocabulary.",
      variant: "blue",
      imageSrc: "/src/assets/certification_banner.png",
      link: "/certification-content",
    },
    {
      title: "Level A2",
      description: "Strengthen your foundation in speaking and understanding simple dialogues.",
      variant: "blue",
      imageSrc: "/src/assets/certification_banner_2.png",
      link: "/certification-content",
    },
    {
      title: "Level B1",
      description: "Start building intermediate fluency and writing basic compositions.",
      variant: "pink",
      imageSrc: "/src/assets/certification_banner.png",
      link: "/certification-content",
    },
    {
      title: "Level B2",
      description: "Become more confident with reading and speaking complex ideas.",
      variant: "pink",
      imageSrc: "/src/assets/certification_banner_2.png",
      link: "/certification-content",
    },
    {
      title: "Level C1",
      description: "Master near-native fluency and academic writing.",
      variant: "blue",
      imageSrc: "/src/assets/certification_banner.png",
      link: "/certification-content",
    },
    {
      title: "Level C2",
      description: "Perfect for advanced learners aiming for native-level mastery.",
      variant: "pink",
      imageSrc: "/src/assets/certification_banner_2.png",
      link: "/certification-content",
    },
  ];

  return (
    <section
      aria-labelledby="learning-content"
      className="bg-[#111827] px-6 md:px-24 py-16"
    >
      <h2 id="learning-content" className="text-3xl font-bold text-[#ffffff] mb-6">
        Learning Content
      </h2>
      <div>
        <h3 className="text-base text-[#ffffff] mb-4">
          {certifications.length} Certifications Available
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={index}
              title={cert.title}
              description={cert.description}
              variant={cert.variant}
              imageSrc={cert.imageSrc}
              onClick={() =>
                navigate(cert.link, {
                  state: { title: cert.title, description: cert.description },
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningContent;
