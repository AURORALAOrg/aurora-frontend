"use client";

import MainLayout from "@/layouts/Layout";
import CertificationCard from "../english-level/english-card";

interface Certification {
  title: string;
  description: string;
  variant: "blue" | "pink";
}

export default function LearningContent() {
  const certifications: Certification[] = [
    {
      title: "A1 Certification",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "blue",
    },
    {
      title: "A2 Certification",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "pink",
    },
    {
      title: "B1 Certification",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "blue",
    },
    {
      title: "B2 Certification",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "pink",
    },
    {
      title: "C1 Certification",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "blue",
    },
    {
      title: "C2 Certification",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      variant: "pink",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Learning content
        </h1>
        <div>
          <h2 className="text-base text-foreground mb-4">
            {certifications.length} Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={index}
                title={cert.title}
                description={cert.description}
                variant={cert.variant}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
