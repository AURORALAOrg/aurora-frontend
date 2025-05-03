import { useState } from 'react';
import ElizaBot from 'elizabot';
import auroraImage from "@/assets/aurora.jpg";
import {
  LightbulbIcon,
  FileIcon,
  SendIcon,
} from "lucide-react";
import styles from "./aurora-chat.module.css";
import RenderFileUploadMessage from "@/components/chat/render-file-upload-message";
import PreviewModal from "@/components/chat/file-preview-modal";
import VoiceInput from "@/components/chat/voice-input";

const AuroraChat = () => {
  const [messages, setMessages] = useState([
    {
      type: "text",
      content: "Hello! I'm your AURORA AI language assistant. How can I help you with your language learning today?",
      isEliza: true,
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [previewMessage, setPreviewMessage] = useState(null);

  const eliza = new ElizaBot();

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      type: "text",
      content: text,
      isEliza: false,
    };

    setMessages([...messages, userMessage]);
    setInputText("");

    setIsTyping(true);

    setTimeout(() => {
      const elizaResponse = {
        type: "text",
        content: eliza.transform(text),
        isEliza: true,
      };

      setMessages((prev) => [...prev, elizaResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(inputText);
    }
  };

  const handleVoiceTranscript = (transcript) => {
    setInputText(transcript);
    sendMessage(transcript);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type.split("/")[0];
    const reader = new FileReader();

    let message = {
      type: "file",
      fileType,
      fileName: file.name,
      fileSize: file.size,
      isEliza: false,
    };

    reader.onload = (event) => {
      const result = event.target.result;

      if (file.type === "application/pdf") {
        const blob = new Blob([result], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        message = {
          ...message,
          content: url,
        };
      } else {
        message = {
          ...message,
          content: result,
        };
      }

      setPreviewMessage(message);
    };

    reader.onerror = () => {
      // Handle errors during file reading
      console.error("FileReader error occurred.");
      // Optionally set some error message to the user
    };

    if (fileType === "image" || fileType === "audio") {
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      reader.readAsArrayBuffer(file);
    } else if (fileType === "text") {
      reader.readAsText(file);
    } else {
      setPreviewMessage(message); // For types without content, directly preview fileName
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
        const elizaResponse = {
          type: "text",
          content: eliza.transform(inputText),
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
    <div className="flex w-full h-screen bg-gradient-to-b from-dark-blue-6 via-dark-blue-3 to-dark-blue-5">
      {/* Left Tips Section */}
      <div className="hidden p-4 lg:block w-64 border-r border-dark-blue-4">
        <h2 className="mb-4 text-base font-semibold text-white">Learning Tips</h2>
        <div className="space-y-4">
          <div className="p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors">
            <h3 className="text-sm font-medium text-blue-400">Practice Speaking</h3>
            <p className="mt-1 text-xs text-neutral-2">Try to speak in English as much as possible during your conversations.</p>
          </div>
          <div className="p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors">
            <h3 className="text-sm font-medium text-green">Use Context</h3>
            <p className="mt-1 text-xs text-neutral-2">Pay attention to how words are used in different situations.</p>
          </div>
          <div className="p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors">
            <h3 className="text-sm font-medium text-purple-400">Review Regularly</h3>
            <p className="mt-1 text-xs text-neutral-2">Go back to previous conversations to reinforce what you&apos;ve learned.</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 mx-auto flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center w-full px-6 py-4 bg-dark-blue-1 border-b border-dark-blue-4">
          {/* AI Assistant */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full bg-light-blue-1">
              <span className="text-xl font-bold text-white">AI</span>
            </div>
            <div>
              <h1 className="text-base font-semibold text-white">AURORA AI Assistant</h1>
              <p className="text-xs text-neutral-5">Ask me anything about language learning</p>
            </div>
          </div>
        </div>

        {/* Messages Area with Scroll */}
        <div className="flex-1 px-6 py-6 overflow-y-auto bg-dark-blue-1">
          <div className="flex flex-col gap-4 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.isEliza ? "self-start pr-10" : "self-end pl-10"
                } max-w-[75%] animate-fadeIn`}
              >
                {message.type === "file" ? (
                  <div className={`${message.isEliza ? "bg-dark-blue-4 text-white" : "bg-light-blue-1 text-white"} p-3 rounded-2xl`}>
                    <RenderFileUploadMessage message={message} />
                  </div>
                ) : (
                  <div 
                    className={`p-4 rounded-2xl ${
                      message.isEliza 
                        ? "bg-dark-blue-4 text-white" 
                        : "bg-light-blue-1 text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">{message.content}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Eliza Typing */}
            {isTyping && (
              <div className="self-start max-w-[75%]">
                <div className="p-4 rounded-2xl bg-dark-blue-4 animate-pulse">
                  <div className={styles.dotAnimate}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="sticky bottom-0 w-full px-6 py-4 bg-dark-blue-1 border-t border-dark-blue-4">
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
        </div>
      </div>

      {/* Right Tips Section */}
      <div className="hidden p-4 lg:block w-64 border-l border-dark-blue-4">
        <h2 className="mb-4 text-base font-semibold text-white">Useful Links</h2>
        <div className="space-y-4">
          <a href="#" className="block p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors">
            <h3 className="text-sm font-medium text-white">Grammar Guide</h3>
            <p className="mt-1 text-xs text-neutral-5">Review essential grammar rules</p>
          </a>
          <a href="#" className="block p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors">
            <h3 className="text-sm font-medium text-white">Vocabulary List</h3>
            <p className="mt-1 text-xs text-neutral-5">Expand your word knowledge</p>
          </a>
          <a href="#" className="block p-3 bg-dark-blue-1 rounded-xl border border-dark-blue-4 hover:bg-dark-blue-4 transition-colors">
            <h3 className="text-sm font-medium text-white">Practice Exercises</h3>
            <p className="mt-1 text-xs text-neutral-5">Test your understanding</p>
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
    </div>
  );
};

export default AuroraChat;
