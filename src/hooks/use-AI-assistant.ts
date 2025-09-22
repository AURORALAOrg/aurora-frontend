import { useState, useCallback, useEffect } from "react";
import { User } from "@/types/user-types";

/**
 * AI assistant message types
 */
export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

/**
 * AI assistant state
 */
export interface AIAssistantState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

/**
 * AI assistant configuration
 */
export interface AIAssistantConfig {
  initialSystemPrompt?: string;
  userContext?: Partial<User>;
  persistMessages?: boolean;
  maxHistoryLength?: number;
}

/**
 * Hook for interacting with AI assistant
 * @param config Configuration for the AI assistant
 * @returns AI assistant state and methods
 */
const useAIAssistant = (config?: AIAssistantConfig) => {
  const {
    initialSystemPrompt = "You are Aurora, an AI assistant helping users learn languages.",
    userContext,
    persistMessages = true,
    maxHistoryLength = 50,
  } = config || {};

  // Initialize state
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load persisted messages if available
    if (persistMessages) {
      const savedMessages = localStorage.getItem("aiAssistantMessages");
      if (savedMessages) {
        try {
          return JSON.parse(savedMessages);
        } catch (e) {
          console.error("Failed to parse saved messages", e);
        }
      }
    }

    // Default initial message
    return initialSystemPrompt
      ? [
          {
            id: "system-1",
            role: "system",
            content: initialSystemPrompt,
            timestamp: Date.now(),
          },
        ]
      : [];
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (persistMessages && messages.length > 0) {
      localStorage.setItem("aiAssistantMessages", JSON.stringify(messages));
    }
  }, [messages, persistMessages]);

  /**
   * Send a message to the AI assistant
   * @param content Message content
   */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      // Generate unique ID for message
      const messageId = `user-${Date.now()}`;

      // Add user message to history
      const userMessage: Message = {
        id: messageId,
        role: "user",
        content,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        // This would be an API call to your AI backend
        // Mocking a response for now
        setTimeout(() => {
          const assistantMessage: Message = {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: `I received your message: "${content}". As this is a placeholder implementation, I'm responding with this automated message.`,
            timestamp: Date.now(),
          };

          setMessages((prev) => {
            // Keep history within limits
            const updatedMessages = [...prev, assistantMessage];
            if (updatedMessages.length > maxHistoryLength) {
              // Remove oldest messages (except system messages)
              const systemMessages = updatedMessages.filter(
                (m) => m.role === "system"
              );
              const nonSystemMessages = updatedMessages
                .filter((m) => m.role !== "system")
                .slice(-maxHistoryLength + systemMessages.length);
              return [...systemMessages, ...nonSystemMessages];
            }
            return updatedMessages;
          });

          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to get AI response"
        );
        setIsLoading(false);
      }
    },
    [maxHistoryLength]
  );

  /**
   * Clear conversation history
   */
  const clearMessages = useCallback(() => {
    // Preserve system messages
    const systemMessages = messages.filter((m) => m.role === "system");
    setMessages(systemMessages);

    if (persistMessages) {
      localStorage.setItem(
        "aiAssistantMessages",
        JSON.stringify(systemMessages)
      );
    }
  }, [messages, persistMessages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};

export default useAIAssistant;
