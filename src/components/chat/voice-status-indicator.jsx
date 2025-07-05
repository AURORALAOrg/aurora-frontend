
import { useState } from "react";
import { Mic, Volume2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import useSpeechSupport from "@/hooks/use-speech-support";


const VoiceStatusIndicator = () => {
  const [showDetails, setShowDetails] = useState(false);
  const support = useSpeechSupport();

  const getStatusIcon = (isSupported) => {
    return isSupported ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  const getStatusText = (isSupported, feature) => {
    return isSupported ? `${feature} Available` : `${feature} Not Supported`;
  };

  if (!support.isSupported) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <div className="bg-dark-blue-1 border border-dark-blue-4 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm text-neutral-5">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span>Voice features not available</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="relative">
        {/* Main indicator */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-dark-blue-1 border border-dark-blue-4 rounded-lg p-3 shadow-lg hover:bg-dark-blue-4 transition-colors"
          title="Voice Features Status"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">

              <Mic className={`w-4 h-4 ${support.speechRecognition ? 'text-green-500' : 'text-red-500'}`} />
              <Volume2 className={`w-4 h-4 ${support.speechSynthesis ? 'text-green-500' : 'text-red-500'}`} />

            </div>
            <span className="text-sm text-neutral-2">Voice</span>
          </div>
        </button>

        {/* Details panel */}
        {showDetails && (
          <div className="absolute bottom-full right-0 mb-2 bg-dark-blue-1 border border-dark-blue-4 rounded-lg p-4 shadow-lg min-w-64">

            <h4 className="text-sm font-medium text-white mb-3">Voice Features Status</h4>
            

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-neutral-4" />
                  <span className="text-sm text-neutral-2">Speech Recognition</span>

                </div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(support.speechRecognition)}
                  <span className="text-xs text-neutral-4">

                    {getStatusText(support.speechRecognition, 'STT')}

                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-neutral-4" />

                  <span className="text-sm text-neutral-2">Speech Synthesis</span>

                </div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(support.speechSynthesis)}
                  <span className="text-xs text-neutral-4">

                    {getStatusText(support.speechSynthesis, 'TTS')}

                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-dark-blue-4">
              <p className="text-xs text-neutral-4">

                {support.isSupported 
                  ? "Voice features are ready to use!" 
                  : "Try using Chrome, Edge, or Safari for better voice support."
                }

              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default VoiceStatusIndicator; 

