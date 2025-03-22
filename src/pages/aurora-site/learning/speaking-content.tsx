"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lock, Mic } from "lucide-react";

interface SpeakingTopic {
  title: string;
  progress: number;
  unlocked: boolean;
}

const SpeakingPage: React.FC = () => {
  const speakingTopics: SpeakingTopic[] = [
    { title: "Introduction & Greetings", progress: 100, unlocked: true },
    { title: "Talking About Daily Routines", progress: 80, unlocked: true },
    { title: "Describing People & Places", progress: 50, unlocked: true },
    { title: "Expressing Opinions", progress: 25, unlocked: true },
    { title: "Debating Skills", progress: 0, unlocked: false },
    { title: "Storytelling", progress: 0, unlocked: false },
    { title: "Making Requests", progress: 0, unlocked: false },
    { title: "Giving Presentations", progress: 0, unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-transparent text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Speaking Practice</h1>
          <p className="text-gray-600">
            Develop your speaking skills with practical topics and exercises
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          {speakingTopics.map((topic, index) => (
            <Card key={index} className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-red-500" />
                  <span className="text-gray-900">{topic.title}</span>
                </CardTitle>
                {topic.unlocked ? (
                  <CheckCircle
                    className={`w-5 h-5 ${
                      topic.progress === 100
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  />
                ) : (
                  <Lock className="w-5 h-5 text-gray-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Progress
                    value={topic.progress}
                    className="flex-1 bg-gray-200"
                  />
                  <span className="text-sm text-gray-600">
                    {topic.progress}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-900">Total Progress</span>
                <span className="text-red-500">39%</span>
              </div>
              <Progress value={39} className="w-full bg-gray-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpeakingPage;
