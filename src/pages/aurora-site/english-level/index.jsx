import React from 'react';
import CertificationBanner from '@/components/english-level/english-banner'; 
import LearningModule from '@/components/learning-path/learning-module'; 
import learningModuleImg from "@/assets/learning_module.png"; 
import certificationBanner from "@/assets/certification_banner.png"; 

const Certification = () => {
  const learningModules = [
    {
      title: "Basis of the computer",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      slides: 10,
      tags: ["Basic", "Present"],
      imageUrl: learningModuleImg,
    },
    {
      title: "Software Architecture",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      slides: 10,
      tags: ["Basic", "Present"],
      imageUrl: learningModuleImg,
    },
    {
      title: "Operating Systems",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      slides: 10,
      tags: ["Basic", "Present"],
      imageUrl: learningModuleImg,
    },
  ];

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Banner */}
        <CertificationBanner
          title="A1 Certification"
          subtitle="Lorem Ipsum dolor sit ammet ister ejec"
          backgroundImage={certificationBanner} 
          className="mb-6"
        />

        {/* Lista de módulos */}
        <div className="space-y-4">
          {learningModules.map((module, index) => (
            <LearningModule
              key={index}
              title={module.title}
              description={module.description}
              slides={module.slides}
              tags={module.tags}
              imageUrl={module.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certification;
