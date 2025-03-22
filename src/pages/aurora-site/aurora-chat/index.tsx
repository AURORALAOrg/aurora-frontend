"use client";

import type React from "react";

import { useState } from "react";
import ElizaBot from "elizabot";
import { Mic, ChevronLeft, ChevronRight, Lightbulb, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import RenderFileUploadMessage from "@/components/chat/render-file-upload-message";
import { cn } from "@/lib/utils";
import PreviewModal from "@/components/chat/file-preview-modal";
import Image from "next/image";
import auroraImage from "@/assets/aurora.jpg";

interface Message {
  type: "text" | "file";
  content: string;
  isEliza: boolean;
  fileType?: string;
  fileName?: string;
  fileSize?: number;
}

interface FileMessage {
  type: "file";
  fileType: string;
  content: string;
  fileName: string;
  fileSize: number;
  isEliza: boolean;
}

const AuroraChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [previewMessage, setPreviewMessage] = useState<FileMessage | null>(
    null
  );

  const eliza = new ElizaBot();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputText.trim()) {
      const userMessage: Message = {
        type: "text",
        content: inputText,
        isEliza: false,
      };

      setMessages([...messages, userMessage]);
      setInputText("");

      setIsTyping(true);

      setTimeout(() => {
        const elizaResponse: Message = {
          type: "text",
          content: eliza.transform(inputText),
          isEliza: true,
        };

        setMessages((prev) => [...prev, elizaResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.split("/")[0];
    const reader = new FileReader();

    let message: Partial<FileMessage> = {
      type: "file",
      fileType,
      fileName: file.name,
      fileSize: file.size,
      isEliza: false,
    };

    reader.onload = (event) => {
      const result = event.target?.result;

      if (file.type === "application/pdf") {
        const blob = new Blob([result as ArrayBuffer], {
          type: "application/pdf",
        });
        const url = URL.createObjectURL(blob);
        message = {
          ...message,
          content: url,
        };
      } else {
        message = {
          ...message,
          content: result as string,
        };
      }

      setPreviewMessage(message as FileMessage);
    };

    reader.onerror = () => {
      console.error("FileReader error occurred.");
    };

    if (fileType === "image" || fileType === "audio") {
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      reader.readAsArrayBuffer(file);
    } else if (fileType === "text") {
      reader.readAsText(file);
    } else {
      setPreviewMessage(message as FileMessage); // For types without content, directly preview fileName
    }
  };

  const handleSendFile = () => {
    if (previewMessage) {
      setMessages((prevMessages) => [...prevMessages, previewMessage]);

      if (
        previewMessage.content &&
        previewMessage.content.startsWith("blob:")
      ) {
        setTimeout(() => URL.revokeObjectURL(previewMessage.content), 10000);
      }

      setPreviewMessage(null);

      setIsTyping(true);

      setTimeout(() => {
        const elizaResponse: Message = {
          type: "text",
          content: eliza.transform("I sent you a file"),
          isEliza: true,
        };

        setMessages((prev) => [...prev, elizaResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleCancelPreview = () => {
    if (
      previewMessage &&
      previewMessage.content &&
      previewMessage.content.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewMessage.content); // Revoke URL if preview cancelled for PDFs
    }
    setPreviewMessage(null);
  };

  const handleChangeFile = () => {
    handleCancelPreview();
    setPreviewMessage(null);
  };

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Header */}
      <div className="flex items-center w-full px-6 py-2 border-b">
        {/* Left: Profile Section */}
        <div className="flex items-center gap-4">
          <Image
            src={auroraImage}
            alt="Aurora Profile"
            width={55}
            height={55}
            className="w-12 h-12 object-cover rounded-full"
          />
          <div>
            <h1 className="text-lg font-semibold text-foreground">AURORA</h1>
            <h2 className="text-sm text-muted-foreground">
              Software Architecture lesson - Chapter 1
            </h2>
          </div>
        </div>

        {/* Right: Unit Navigation */}
        <div className="flex items-center gap-4 ml-auto">
          <span className="text-sm text-muted-foreground">Current unit: 1</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Previous unit"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Next unit"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-full gap-4 px-6 py-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "max-w-[80%]",
              message.isEliza ? "self-start" : "self-end"
            )}
          >
            {message.type === "file" ? (
              <RenderFileUploadMessage message={message} />
            ) : (
              <Card
                className={cn(
                  message.isEliza
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                )}
              >
                <CardContent className="p-3">
                  <p className="break-words">{message.content}</p>
                </CardContent>
              </Card>
            )}
          </div>
        ))}

        {/* Eliza Typing */}
        {isTyping && (
          <div className="self-start max-w-[80%]">
            <Card className="bg-muted">
              <CardContent className="p-3">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="sticky bottom-0 w-full px-6 py-4 bg-background border-t shadow-lg">
        <div className="flex items-center w-full gap-4">
          <Button className="flex items-center gap-2" variant="default">
            <Lightbulb className="w-5 h-5" />
            <span>Start learning</span>
          </Button>

          <div className="relative flex-1 w-full">
            <Input
              type="text"
              placeholder="Write something related to the topic"
              className="w-full pr-24"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute flex items-center gap-2 transform -translate-y-1/2 right-2 top-1/2">
              <label className="cursor-pointer p-1.5 text-primary hover:bg-primary/10 rounded-full transition-colors">
                {!previewMessage && (
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                )}
                <File className="w-5 h-5" />
              </label>
              <Button
                variant="ghost"
                size="icon"
                className="p-1.5 text-primary hover:bg-primary/10 rounded-full"
                aria-label="Voice Input"
              >
                <Mic className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* File preview modal */}
      {previewMessage && (
        <PreviewModal
          message={previewMessage}
          onClose={handleCancelPreview}
          onSend={handleSendFile}
          onChangeFile={handleChangeFile}
          open={!!previewMessage}
        />
      )}
    </div>
  );
};

export default AuroraChat;
