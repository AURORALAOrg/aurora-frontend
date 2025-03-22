"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import RenderFileUploadMessage from "@/components/chat/render-file-upload-message";

interface FileMessage {
  type: string;
  fileType: string;
  content: string;
  fileName: string;
  fileSize: number;
}

interface PreviewModalProps {
  message: FileMessage | null;
  onClose: () => void;
  onSend: () => void;
  onChangeFile: () => void;
  open: boolean;
}

export default function PreviewModal({
  message,
  onClose,
  onSend,
  onChangeFile,
  open,
}: PreviewModalProps) {
  if (!message) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>File Preview</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="flex flex-col max-w-full gap-2 mb-4">
          <RenderFileUploadMessage message={message} />
        </div>

        <DialogFooter className="flex flex-row gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={onChangeFile}>
            Change File
          </Button>
          <Button onClick={onSend}>Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
