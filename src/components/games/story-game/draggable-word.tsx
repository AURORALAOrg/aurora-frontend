"use client";

import { useDrag } from "react-dnd";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DraggableWordProps {
  word: string;
  disabled?: boolean;
}

interface DragItem {
  word: string;
}

export default function DraggableWord({
  word,
  disabled = false,
}: DraggableWordProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "word",
    item: { word } as DragItem,
    canDrag: !disabled,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Button
      ref={drag as unknown as React.RefObject<HTMLButtonElement>}
      variant={disabled ? "ghost" : "default"}
      className={cn(
        "px-4 py-2 font-bold",
        disabled
          ? "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
          : "cursor-grab",
        isDragging && "opacity-50"
      )}
      disabled={disabled}
    >
      {word}
    </Button>
  );
}
