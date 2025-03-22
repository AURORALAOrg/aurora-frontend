"use client";

import type React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, CheckCircle, Lock } from "lucide-react";

interface GrammarTopic {
  title: string;
  progress: number;
  unlocked: boolean;
}

const GrammarPage: React.FC = () => {
  const grammarTopics: GrammarTopic[] = [
    { title: "Present Simple", progress: 100, unlocked: true },
    { title: "Present Continuous", progress: 75, unlocked: true },
    { title: "Articles (A/An/The)", progress: 30, unlocked: true },
    { title: "Plural Nouns", progress: 0, unlocked: true },
    { title: "Basic Pronouns", progress: 0, unlocked: false },
    { title: "Subject-Verb Agreement", progress: 0, unlocked: false },
    { title: "Possessive Adjectives", progress: 0, unlocked: false },
    { title: "Prepositions of Place", progress: 0, unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-transparent text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Grammar</h1>
          <p className="text-gray-600">
            Master the building blocks of language through structured lessons
            and exercises
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          {grammarTopics.map((topic, index) => (
            <Card key={index} className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-blue-500" />
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
          <Card
            key={grammarTopics.length + 1}
            className="bg-white border-gray-200"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <Book className="w-5 h-5 text-blue-500" />
                <span className="text-gray-900">Practice 1</span>
              </CardTitle>
              <Link
                href="/quiz"
                className="bg-blue-500 hover:text-white hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
              >
                Start
              </Link>
            </CardHeader>
          </Card>
          <Card
            key={grammarTopics.length + 2}
            className="bg-white border-gray-200"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <Book className="w-5 h-5 text-blue-500" />
                <span className="text-gray-900">Practice 2</span>
              </CardTitle>
              <Link
                href="/practice/sentence-builder"
                className="bg-blue-500 hover:text-white hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
              >
                Start
              </Link>
            </CardHeader>
          </Card>
        </div>

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-900">Total Progress</span>
                <span className="text-blue-500">41%</span>
              </div>
              <Progress value={41} className="w-full bg-gray-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GrammarPage;
