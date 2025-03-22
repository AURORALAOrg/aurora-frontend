"use client";

import { useRouter } from "next/router";
import CertificationBanner from "@/components/english-level/english-banner";
import LearningCard from "@/components/learning-path/learning-card";
import learningModuleImg from "@/assets/learning_module.png";
import certificationBanner from "@/assets/certification_banner.png";
import softwarearquitectureImg from "@/assets/software_arquitecture.png";
import operatingsystemsImg from "@/assets/operating_systems.png";

interface LocationState {
  title?: string;
  description?: string;
}

import type { StaticImageData } from "next/image";

interface LearningModule {
  title: string;
  description: string;
  slides: number;
  tags: string[];
  imageUrl: StaticImageData;
}

const CertificationContent: React.FC = () => {
  const router = useRouter();
  const { query } = router;

  const { title = "Default Title", description = "Default Description" } =
    (query as LocationState) || {};

  const learningModules: LearningModule[] = [
    {
      title: "Basis of the computer",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      slides: 10,
      tags: ["Basic", "Present"],
      imageUrl: learningModuleImg,
    },
    {
      title: "Software Architecture",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      slides: 10,
      tags: ["Basic", "Present"],
      imageUrl: softwarearquitectureImg,
    },
    {
      title: "Operating Systems",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      slides: 10,
      tags: ["Basic", "Present"],
      imageUrl: operatingsystemsImg,
    },
  ];

  const handleModuleClick = (module: LearningModule) => {
    router.push({
      pathname: "/module-details",
      query: {
        title: module.title,
        description: module.description,
        slides: module.slides.toString(),
        tags: module.tags.join(","),
        imageUrl: module.imageUrl.src,
      },
    });
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Banner */}
        <CertificationBanner
          title={title}
          subtitle={description}
          backgroundImage={certificationBanner}
          className="mb-6"
        />

        {/* LearningCard list */}
        <div className="space-y-4">
          {learningModules.map((module, index) => (
            <div
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleModuleClick(module)}
            >
              <LearningCard
                title={module.title}
                description={module.description}
                slides={module.slides}
                tags={module.tags}
                imageUrl={module.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationContent;
