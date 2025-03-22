"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CategoryCardProps {
  title: string;
  modules: number;
  color: string;
  icon: React.ReactNode;
  imageSrc?: string;
  onClick?: () => void;
}

export default function CategoryCard({
  title,
  modules,
  color,
  icon,
  imageSrc,
  onClick,
}: CategoryCardProps) {
  return (
    <Card
      className={cn(
        color,
        "overflow-hidden h-48 transition-transform hover:scale-105 cursor-pointer relative border-0"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 h-full flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <div className="text-white">{icon}</div>
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="mt-auto">
          <p className="text-white/80 text-sm">{modules} Modules</p>
        </div>
      </CardContent>

      {/* Image in the bottom right corner */}
      {imageSrc && (
        <div className="absolute bottom-2 right-2 w-16 h-16 pointer-events-none">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={`${title} Illustration`}
            fill
            className="object-contain"
          />
        </div>
      )}
    </Card>
  );
}
