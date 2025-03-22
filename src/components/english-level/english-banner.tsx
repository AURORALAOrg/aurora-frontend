"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CertificationBannerProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

export default function CertificationBanner({
  title = "A1 Certification",
  subtitle = "Lorem Ipsum dolor sit ammet ister ejec",
  backgroundImage,
  className = "",
}: CertificationBannerProps) {
  return (
    <Card
      className={cn("w-full overflow-hidden relative", className)}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100px",
        width: "900px",
        borderRadius: "15px",
      }}
    >
      <div className="absolute inset-0 bg-black/25" />
      <CardContent className="relative z-10 p-5">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-base text-white/90 mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
