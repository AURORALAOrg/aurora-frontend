"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

interface CustomAudioPlayerProps {
  src: string;
}

export default function CustomAudioPlayer({ src }: CustomAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={togglePlay}
        variant="ghost"
        size="icon"
        className="absolute z-10 p-0 -translate-x-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full top-1/2 left-1/2"
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </Button>
      <audio ref={audioRef} src={src} />
    </div>
  );
}
