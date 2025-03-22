"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Chapter {
  title: string;
  description: string;
}

interface LearningModuleDetailsProps {
  title: string;
  subtitle: string;
  chapters: Chapter[];
}

export default function LearningModuleDetails({
  title,
  subtitle,
  chapters,
}: LearningModuleDetailsProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {subtitle}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {chapters.map((chapter, index) => (
          <div key={index}>
            {index > 0 && <Separator className="mb-4" />}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center rounded-full shrink-0">
                {index + 1}
              </div>
              <div>
                <h3 className="font-medium text-foreground">{chapter.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {chapter.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
