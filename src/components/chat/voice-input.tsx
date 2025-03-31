"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import styles from "../../../public/styles/voice-input.module.css";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
}

export default function VoiceInput({ onTranscript }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        if (event.results[0].isFinal) {
          onTranscript(transcript);
          setIsListening(false);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognition) {
      alert(
        "Speech recognition is not supported in your browser. Please try using a modern browser like Chrome."
      );
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className={styles.voiceInputContainer}>
      <button
        onClick={toggleListening}
        className={`${styles.voiceButton} ${
          isListening ? styles.recording : ""
        }`}
        aria-label={isListening ? "Stop voice input" : "Start voice input"}
        title={
          isListening ? "Click to stop recording" : "Click to start recording"
        }
      >
        {isListening ? (
          <>
            <MicOff className="w-5 h-5 relative z-10" />
            <div className={styles.recordingIndicator}>
              <div className={styles.pulse}></div>
              <div
                className={styles.pulse}
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </>
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>
      {isListening && <div className={styles.recordingLabel}>Recording...</div>}
    </div>
  );
}
