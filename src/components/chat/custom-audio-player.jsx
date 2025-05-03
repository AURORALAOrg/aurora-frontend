import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Play, Pause } from "lucide-react";

export default function CustomAudioPlayer({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <button 
        onClick={togglePlay} 
        className="absolute z-10 flex items-center justify-center w-8 h-8 rounded-full bg-light-blue-1/80 text-white -translate-x-1/2 -translate-y-1/2 hover:bg-light-blue-1 transition-colors top-1/2 left-1/2"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
      />
    </>
  );
}

CustomAudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};
