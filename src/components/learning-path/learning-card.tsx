"use client";

import { Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LearningCardProps {
  title?: string;
  description?: string;
  slides?: number;
  tags?: string[];
  imageUrl?: string;
}

export default function LearningCard({
  title = "Basis of the computer",
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
  slides = 10,
  tags = ["Basic", "Present"],
  imageUrl = "",
}: LearningCardProps) {
  return (
    <Card className="flex bg-background shadow-md border border-border rounded-xl overflow-hidden max-w-[900px]">
      <div className="w-1/4 bg-muted overflow-hidden">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      <CardContent className="flex-1 p-6 flex flex-col relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 rounded-full h-9 w-9"
        >
          <Bookmark className="h-5 w-5" />
        </Button>

        <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="mt-auto flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{slides} Slides</span>

          <div className="flex gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  index === 0
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                    : "bg-pink-100 text-pink-800 hover:bg-pink-100 border-pink-200"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
