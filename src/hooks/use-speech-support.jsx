import { useState, useEffect } from "react";

export const useSpeechSupport = () => {
  const [support, setSupport] = useState({
    speechRecognition: false,
    speechSynthesis: false,
    isSupported: false,
  });

  useEffect(() => {
    const checkSupport = () => {
      const speechRecognition =
        "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
      const speechSynthesis =
        "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

      setSupport({
        speechRecognition,
        speechSynthesis,
        isSupported: speechRecognition || speechSynthesis,
      });
    };

    checkSupport();
  }, []);

  return support;
};

export default useSpeechSupport;
