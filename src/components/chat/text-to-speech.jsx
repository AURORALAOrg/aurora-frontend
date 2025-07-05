
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Pause, Volume2 } from "lucide-react";

const TextToSpeech = ({ text, className = "" }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    // Check if browser supports speech synthesis

    setIsSupported('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);

  }, []);

  const getVoiceSettings = () => {
    try {

      const saved = localStorage.getItem('voiceSettings');

      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {

      console.error('Error loading voice settings:', error);
    }
    
    // Default settings
    return {
      voice: '',
      rate: 0.9,
      pitch: 1,
      volume: 1

    };
  };

  const speak = () => {
    if (!isSupported || !text) return;

    // Cancel any ongoing speech
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

    // Create new utterance
    utteranceRef.current = new SpeechSynthesisUtterance(text);

    
    // Apply saved settings
    const settings = getVoiceSettings();
    utteranceRef.current.lang = 'en-US';

    utteranceRef.current.rate = settings.rate || 0.9;
    utteranceRef.current.pitch = settings.pitch || 1;
    utteranceRef.current.volume = settings.volume || 1;

    // Set voice if available
    if (settings.voice) {
      const voices = window.speechSynthesis.getVoices();

      const selectedVoice = voices.find(v => v.name === settings.voice);

      if (selectedVoice) {
        utteranceRef.current.voice = selectedVoice;
      }
    }

    // Set up event handlers
    utteranceRef.current.onstart = () => setIsPlaying(true);
    utteranceRef.current.onend = () => setIsPlaying(false);
    utteranceRef.current.onerror = (event) => {

      console.error('Speech synthesis error:', event.error);

      setIsPlaying(false);
    };

    // Start speaking
    window.speechSynthesis.speak(utteranceRef.current);
  };

  const stop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      speak();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isSupported) {
    return null; // Hide button if not supported
  }

  return (
    <button
      onClick={togglePlay}
      className={`flex items-center justify-center w-6 h-6 rounded-full bg-light-blue-1/20 hover:bg-light-blue-1/30 text-light-blue-2 hover:text-light-blue-1 transition-all duration-200 ${className}`}

      aria-label={isPlaying ? 'Stop audio playback' : 'Play audio message'}
      title={isPlaying ? 'Stop audio playback' : 'Play audio message'}

    >
      {isPlaying ? (
        <Pause className="w-3 h-3" />
      ) : (
        <Volume2 className="w-3 h-3" />
      )}
    </button>
  );
};

TextToSpeech.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};


export default TextToSpeech; 

