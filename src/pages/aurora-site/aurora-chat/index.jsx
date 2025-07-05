
import { useEffect, useRef, useState } from "react";
import ElizaBot from "elizabot";
import { Send, User, ThumbsDown, ThumbsUp, Settings } from "lucide-react";
import PreviewModal from "@/components/chat/file-preview-modal";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import styles from "./aurora-chat.module.css";
import RenderFileUploadMessage from "@/components/chat/render-file-upload-message";
import VoiceInput from "@/components/chat/voice-input";
import TextToSpeech from "@/components/chat/text-to-speech";
import VoiceSettings from "@/components/chat/voice-settings";
import VoiceStatusIndicator from "@/components/chat/voice-status-indicator";

const AuroraChat = () => {
  const [messages, setMessages] = useState([
    {
      type: "text",
      content:
        "Hello! I'm your AURORA AI language assistant. How can I help you with your language learning today?",
      isEliza: true,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [previewMessage, setPreviewMessage] = useState(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input.trim(),
          history: messages.slice(-5), // Send last 5 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
        feedback: null,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I'm having trouble connecting right now. Please try again.",
        role: "assistant",
        timestamp: new Date(),
        feedback: null,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId, feedback) => {
    // Update local state
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, feedback: msg.feedback === feedback ? null : feedback }
          : msg
      )
    );

    // Send feedback to backend
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          feedback: feedback,
          message: messages.find((m) => m.id === messageId)?.content,
        }),
      });
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const eliza = new ElizaBot();

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

      setInputText(true);

      setTimeout(() => {
        const elizaResponse = {
          type: "text",
          content: eliza.transform(inputText),
          isEliza: true,
        };

        setMessages((prev) => [...prev, elizaResponse]);
        setInputText(false);
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
    <div className="flex w-full h-screen bg-gradient-to-b from-dark-blue-6 via-dark-blue-3 to-dark-blue-5">
      {/* Left Tips Section */}
      <div className="hidden p-4 lg:block w-64 border-r border-dark-blue-4">
        <h2 className="mb-4 text-base font-semibold text-white">
          Learning Tips
        </h2>
        <div className="space-y-4">
          <div className="p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors">
            <h3 className="text-sm font-medium text-blue-400">
              Practice Speaking
            </h3>
            <p className="mt-1 text-xs text-neutral-2">
              Try to speak in English as much as possible during your
              conversations.
            </p>
          </div>
          <div className="p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors">
            <h3 className="text-sm font-medium text-green">Use Context</h3>
            <p className="mt-1 text-xs text-neutral-2">
              Pay attention to how words are used in different situations.
            </p>
          </div>
          <div className="p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors">
            <h3 className="text-sm font-medium text-purple-400">
              Review Regularly
            </h3>
            <p className="mt-1 text-xs text-neutral-2">
              Go back to previous conversations to reinforce what you&apos;ve
              learned.
            </p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 mx-auto flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center justify-between w-full px-6 py-4 bg-dark-blue-1 border-b border-dark-blue-4">
          {/* AI Assistant */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full bg-light-blue-1">
              <span className="text-xl font-bold text-white">AI</span>
            </div>
            <div>
              <h1 className="text-base font-semibold text-white">
                AURORA AI Assistant
              </h1>
              <p className="text-xs text-neutral-5">
                Ask me anything about language learning
              </p>
            </div>
          </div>

          {/* Voice Settings Button */}
          <button
            onClick={() => setShowVoiceSettings(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-5 hover:text-light-blue-2 bg-dark-blue-4 hover:bg-dark-blue-3 rounded-lg transition-colors"
            title="Voice Settings"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Voice Settings</span>
          </button>
        </div>

        {/* Messages Area with Scroll */}
        <div className="flex-1 px-6 py-6 bg-dark-blue-1">
          {/* Messages */}
          <div className="overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex space-x-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="bg-cyan-500 flex-shrink-0">
                    <AvatarFallback className="bg-cyan-500 text-white font-bold">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    "max-w-2xl",
                    message.role === "user" ? "order-1" : "order-2"
                  )}
                >
                  <Card
                    className={cn(
                      "p-4",
                      message.role === "user"
                        ? "bg-cyan-600 border-cyan-500 ml-auto"
                        : "bg-slate-700 border-slate-600"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">


                      <p className="text-sm leading-relaxed break-words flex-1">{message.content}</p>
                      {message.isEliza && (
                        <TextToSpeech 
                          text={message.content} 

                          className="flex-shrink-0 mt-1"
                        />
                      )}
                    </div>

                  </Card>

                  {message.role === "assistant" && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedback(message.id, "positive")}
                        className={cn(
                          "h-8 w-8 p-0 hover:bg-slate-600",
                          message.feedback === "positive"
                            ? "bg-green-600 hover:bg-green-700"
                            : "text-slate-400 hover:text-green-400"
                        )}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedback(message.id, "negative")}
                        className={cn(
                          "h-8 w-8 p-0 hover:bg-slate-600",
                          message.feedback === "negative"
                            ? "bg-red-600 hover:bg-red-700"
                            : "text-slate-400 hover:text-red-400"
                        )}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <Avatar className="bg-slate-600 flex-shrink-0">
                    <AvatarFallback className="bg-slate-600 text-white">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>

                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex space-x-3">
                <Avatar className="bg-cyan-500">
                  <AvatarFallback className="bg-cyan-500 text-white font-bold">
                    AI
                  </AvatarFallback>
                </Avatar>
                <Card className="bg-slate-700 border-slate-600 p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {/* Input Area */}
        <div className="bg-slate-800 p-4 border-t border-slate-700">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Bottom Controls */}
        {/* <div className="sticky bottom-0 w-full px-6 py-4 bg-dark-blue-1 border-t border-dark-blue-4">
          <div className="flex items-center w-full gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Ask the AI assistant..."
                className="w-full px-4 py-3 pr-20 text-sm placeholder-neutral-5 transition-all rounded-lg bg-dark-blue-4 text-white border border-dark-blue-4 focus:outline-none focus:ring-1 focus:ring-light-blue-1"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="absolute flex items-center gap-2 transform -translate-y-1/2 right-3 top-1/2">
                <label className="cursor-pointer p-1.5 text-neutral-5 hover:text-light-blue-2 rounded-full transition-all">
                  {!previewMessage && (
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  )}
                  <FileIcon className="w-4 h-4" />
                </label>
                <VoiceInput onTranscript={handleVoiceTranscript} />
                <button
                  onClick={() => sendMessage(inputText)}
                  className="p-1.5 bg-light-blue-1 rounded-full text-white hover:bg-light-blue-2 transition-colors"
                >
                  <SendIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Right Tips Section */}
      <div className="hidden p-4 lg:block w-64 border-l border-dark-blue-4">
        <h2 className="mb-4 text-base font-semibold text-white">
          Useful Links
        </h2>
        <div className="space-y-4">
          <a
            href="#"
            className="block p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors"
          >
            <h3 className="text-sm font-medium text-white">Grammar Guide</h3>
            <p className="mt-1 text-xs text-neutral-5">
              Review essential grammar rules
            </p>
          </a>
          <a
            href="#"
            className="block p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors"
          >
            <h3 className="text-sm font-medium text-white">Vocabulary List</h3>
            <p className="mt-1 text-xs text-neutral-5">
              Expand your word knowledge
            </p>
          </a>
          <a
            href="#"
            className="block p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors"
          >
            <h3 className="text-sm font-medium text-white">
              Practice Exercises
            </h3>
            <p className="mt-1 text-xs text-neutral-5">
              Test your understanding
            </p>
          </a>
        </div>
      </div>

      {/* File preview modal */}
      {previewMessage && (
        <PreviewModal
          message={previewMessage}
          onClose={handleCancelPreview}
          onSend={handleSendFile}
          onChangeFile={handleChangeFile}
        />
      )}


      {/* Voice Settings Modal */}
      <VoiceSettings 
        isOpen={showVoiceSettings} 
        onClose={() => setShowVoiceSettings(false)} 

      />

      {/* Voice Status Indicator */}
      <VoiceStatusIndicator />
    </div>
  );
};

export default AuroraChat;
