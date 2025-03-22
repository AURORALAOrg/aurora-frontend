"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CertificationCardProps {
  title: string;
  description: string;
  variant?: "blue" | "pink";
  imageSrc?: string;
}

export default function CertificationCard({
  title,
  description,
  variant = "blue",
  imageSrc,
}: CertificationCardProps) {
  return (
    <Card className="overflow-hidden">
      <div
        className={cn(
          "h-32 relative",
          variant === "pink" ? "bg-pink-400" : "bg-primary"
        )}
      >
        {imageSrc ? (
          <img
            src={imageSrc || "/placeholder.svg"}
            alt="Certification Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-full h-full"
            viewBox="0 0 400 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="4" fill="#FFF" opacity="0.6" />
            <circle cx="350" cy="40" r="4" fill="#FFF" opacity="0.6" />
            <path d="M200 20l2 2-2 2-2-2z" fill="#FF69B4" opacity="0.8" />
            <path d="M320 70l2 2-2 2-2-2z" fill="#FF69B4" opacity="0.8" />
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
            <circle cx="180" cy="90" r="15" fill="#FFD700" opacity="0.8" />
            <path d="M175 90l5 5 10-10" stroke="#FFF" strokeWidth="2" />
          </svg>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <Button
          className="w-full"
          variant={variant === "pink" ? "destructive" : "default"}
        >
          Start learning
        </Button>
      </CardContent>
    </Card>
  );
}
