"use client";

import { Plus, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TopHeadersProps {
  currentQuestion: number;
  totalQuestion: number;
  scorePercentage: number;
}

const TopHeaders = ({
  currentQuestion,
  totalQuestion,
  scorePercentage,
}: TopHeadersProps) => {
  return (
    <div className="flex flex-col sm:flex-row w-full sm:w-full md:w-[80%] lg:w-[70%] gap-4">
      <Card className="flex-1">
        <CardContent className="flex items-center p-4">
          <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center">
            <Plus className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm text-muted-foreground">Current Question</h2>
            <span className="font-bold text-lg">
              {currentQuestion + 1} of <span>{totalQuestion}</span>
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardContent className="flex items-center p-4">
          <div className="rounded-full bg-green-100 w-10 h-10 flex items-center justify-center">
            <Award className="h-5 w-5 text-green-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm text-muted-foreground">Score</h2>
            <span className="font-extrabold text-lg">{scorePercentage}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopHeaders;
