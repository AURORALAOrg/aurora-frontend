"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CertificationCardProps {
  title: string;
  description: string;
  variant?: "blue" | "pink";
  onClick: () => void;
  imageSrc?: string;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  description,
  variant = "blue",
  onClick,
  imageSrc,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {/* Banner Image */}
      <div
        className={`h-32 relative ${
          variant === "pink" ? "bg-pink-400" : "bg-blue-600"
        }`}
      >
        {imageSrc ? (
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={`${title} Banner`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-full h-full"
            viewBox="0 0 400 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stars and decorative elements */}
            <circle cx="30" cy="30" r="4" fill="#FFF" opacity="0.6" />
            <circle cx="350" cy="40" r="4" fill="#FFF" opacity="0.6" />
            <path d="M200 20l2 2-2 2-2-2z" fill="#FF69B4" opacity="0.8" />
            <path d="M320 70l2 2-2 2-2-2z" fill="#FF69B4" opacity="0.8" />

            {/* Laptop/Certificate illustration */}
            <rect
              x="120"
              y="40"
              width="160"
              height="100"
              rx="8"
              fill="#FFF"
              opacity="0.2"
            />
            <rect
              x="140"
              y="60"
              width="120"
              height="60"
              fill="#FFF"
              opacity="0.3"
            />

            {/* Certificate elements */}
            <circle cx="180" cy="90" r="15" fill="#FFD700" opacity="0.8" />
            <path d="M175 90l5 5 10-10" stroke="#FFF" strokeWidth="2" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
        <Button
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          onClick={onClick}
        >
          Start learning
        </Button>
      </div>
    </div>
  );
};

interface Certification {
  title: string;
  description: string;
  variant: "blue" | "pink";
  imageSrc: string;
  link: string;
}

const LearningContent: React.FC = () => {
  const router = useRouter();

  const certifications: Certification[] = [
    {
      title: "Level A1 ",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "blue",
      imageSrc: "/assets/certification_banner.png",
      link: "/certification-content",
    },
    {
      title: "Level A2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "blue",
      imageSrc: "/assets/certification_banner_2.png",
      link: "/certification-content",
    },
    {
      title: "Level B1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "pink",
      imageSrc: "/assets/certification_banner.png",
      link: "/certification-content",
    },
    {
      title: "Level B2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "pink",
      imageSrc: "/assets/certification_banner_2.png",
      link: "/certification-content",
    },
    {
      title: "Level C1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "blue",
      imageSrc: "/assets/certification_banner.png",
      link: "/certification-content",
    },
    {
      title: "Level C2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "pink",
      imageSrc: "/assets/certification_banner_2.png",
      link: "/certification-content",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Learning content</h1>
      <div>
        <h2 className="text-base text-gray-900 mb-4">
          {certifications.length} Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={index}
              title={cert.title}
              description={cert.description}
              variant={cert.variant}
              imageSrc={cert.imageSrc}
              onClick={() =>
                router.push(cert.link, {
                  query: { title: cert.title, description: cert.description },
                } as any)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningContent;
