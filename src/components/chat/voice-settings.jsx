
import { useState, useEffect } from "react";
import { Settings, Volume2 } from "lucide-react";
const VoiceSettings = ({ isOpen, onClose }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {

    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        const englishVoices = availableVoices.filter(voice => 
          voice.lang.startsWith('en')
        );
        setVoices(englishVoices);
        

        // Set default voice
        if (englishVoices.length > 0 && !selectedVoice) {
          setSelectedVoice(englishVoices[0].name);
        }
      };

      loadVoices();

      // Some browsers load voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, [selectedVoice]);

  const testVoice = () => {

    if ('speechSynthesis' in window && selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(
        "Hello! This is a test of the voice settings."
      );
      utterance.voice = voices.find(v => v.name === selectedVoice);

      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      window.speechSynthesis.speak(utterance);
    }
  };

  const saveSettings = () => {
    const settings = {
      voice: selectedVoice,
      rate,
      pitch,

      volume
    };
    localStorage.setItem('voiceSettings', JSON.stringify(settings));

    onClose();
  };

  useEffect(() => {
    // Load saved settings

    const saved = localStorage.getItem('voiceSettings');
    if (saved) {
      const settings = JSON.parse(saved);
      setSelectedVoice(settings.voice || '');

      setRate(settings.rate || 0.9);
      setPitch(settings.pitch || 1);
      setVolume(settings.volume || 1);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-blue-1 p-6 rounded-xl max-w-md w-full mx-4 border border-dark-blue-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Voice Settings
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-5 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Voice Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-2 mb-2">
              Voice
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full p-2 bg-dark-blue-4 border border-dark-blue-4 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-light-blue-1"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Speed */}
          <div>
            <label className="block text-sm font-medium text-neutral-2 mb-2">
              Speed: {rate.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Pitch */}
          <div>
            <label className="block text-sm font-medium text-neutral-2 mb-2">
              Pitch: {pitch.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Volume */}
          <div>
            <label className="block text-sm font-medium text-neutral-2 mb-2">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Test Button */}
          <button
            onClick={testVoice}
            className="w-full flex items-center justify-center gap-2 p-2 bg-light-blue-1 text-white rounded-lg hover:bg-light-blue-2 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            Test Voice
          </button>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 p-2 bg-dark-blue-4 text-neutral-5 rounded-lg hover:bg-dark-blue-3 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveSettings}
              className="flex-1 p-2 bg-light-blue-1 text-white rounded-lg hover:bg-light-blue-2 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default VoiceSettings; 

