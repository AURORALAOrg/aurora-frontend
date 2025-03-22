"use client";

import { useDrop } from "react-dnd";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  index: number;
  word: string | null;
  onDrop: (index: number, word: string) => void;
}

interface DragItem {
  word: string;
}

export default function DropZone({ index, word, onDrop }: DropZoneProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "word",
    drop: (item: DragItem) => onDrop(index, item.word),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <Card
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={cn(
        "px-4 py-2 border-2 border-dashed border-muted rounded text-center min-w-[120px] h-12 flex items-center justify-center",
        isOver && canDrop && "border-primary bg-primary/10",
        !isOver && "bg-card"
      )}
    >
      {word || <span className="text-muted-foreground">_______</span>}
    </Card>
  );
}
