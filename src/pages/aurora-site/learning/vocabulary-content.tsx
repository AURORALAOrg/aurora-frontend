"use client";

import type React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Lock } from "lucide-react";

interface VocabTopic {
  title: string;
  progress: number;
  unlocked: boolean;
}

const VocabularyPage: React.FC = () => {
  const vocabTopics: VocabTopic[] = [
    { title: "Synonyms", progress: 100, unlocked: true },
    { title: "Antonyms", progress: 85, unlocked: true },
    { title: "Phrasal Verbs", progress: 60, unlocked: true },
    { title: "Idioms & Expressions", progress: 20, unlocked: true },
    { title: "Word Formation", progress: 0, unlocked: false },
    { title: "Collocations", progress: 0, unlocked: false },
    { title: "Homophones", progress: 0, unlocked: false },
    { title: "Commonly Confused Words", progress: 0, unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-transparent text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Vocabulary</h1>
          <p className="text-gray-600">
            Enhance your word power with engaging lessons and exercises
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          {vocabTopics.map((topic, index) => (
            <Card key={index} className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-yellow-500" />
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
                <span className="text-yellow-500">41%</span>
              </div>
              <Progress value={41} className="w-full bg-gray-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VocabularyPage;
