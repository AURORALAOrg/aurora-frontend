"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Target, Users } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
}

const CommunityInteractionPage = () => {
  const features: Feature[] = [
    {
      title: "Study Rooms",
      description:
        "Join virtual study rooms to collaborate with peers in real-time.",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      buttonText: "Join Study Rooms",
    },
    {
      title: "Mentorship",
      description:
        "Connect with experienced mentors for guidance and personalized advice.",
      icon: <GraduationCap className="w-6 h-6 text-green-500" />,
      buttonText: "Find a Mentor",
    },
    {
      title: "Group Challenges",
      description:
        "Participate in group challenges to test and improve your skills.",
      icon: <Target className="w-6 h-6 text-amber-500" />,
      buttonText: "Join Challenges",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Community Interaction</h1>
          <p className="text-muted-foreground">
            Engage with peers, mentors, and exciting challenges to enhance your
            learning experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-col items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4 text-xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button>{feature.buttonText}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityInteractionPage;
