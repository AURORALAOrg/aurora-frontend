import { useState, useRef, useCallback } from 'react';
import { Play, Pause, Mic, MicOff, AlertCircle } from 'lu      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">{question}</h3>

        {audioError && (
          <div className="flex items-center gap-2 p-3 rounded bg-red-500/10 text-red-500">
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm">{audioError}</p>
          </div>
        )}

        <div className="space-y-4">{-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import useAudioQuality from '../../hooks/use-audio-quality';

const AudioAssessment = ({ 
  question,
  audioSources,
  options,
  type,
  onAnswer,
  showRecording = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [processedAudioUrls, setProcessedAudioUrls] = useState({});
  const audioRef = useRef(null);

  const handleQualityCheck = useCallback((audioUrl) => (result) => {
    if (result.status === 'error') {
      setAudioError(result.error);
    } else {
      setProcessedAudioUrls(prev => ({
        ...prev,
        [audioUrl]: result.data.normalizedAudio
      }));
      setAudioError(null);
    }
  }, []);

  // Apply audio quality check to each audio source
  audioSources?.forEach(audioUrl => {
    useAudioQuality(audioUrl, handleQualityCheck(audioUrl));
  });

  const handlePlay = (audioSource) => {
    if (audioRef.current) {
      if (isPlaying && selectedAudio === audioSource) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (selectedAudio !== audioSource) {
          setSelectedAudio(audioSource);
          // Use processed high-quality audio if available
          const sourceUrl = processedAudioUrls[audioSource] || audioSource;
          audioRef.current.src = sourceUrl;
        }
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setAudioError('Failed to play audio. Please try again.');
        });
        setIsPlaying(true);
      }
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const [recordedAudio, setRecordedAudio] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        setShowFeedback(true);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please ensure microphone permissions are granted.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Card className="p-6 bg-dark-blue-5 border-dark-blue-4">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">{question}</h3>

        {audioError && (
          <div className="flex items-center gap-2 p-3 rounded bg-red-500/10 text-red-500">
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm">{audioError}</p>
          </div>
        )}

        <div className="space-y-4">
          {audioSources?.map((source, index) => (
            <div key={index} className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handlePlay(source)}
                className="w-10 h-10 rounded-full bg-light-blue-1/20 hover:bg-light-blue-1/30 text-light-blue-1"
              >
                {isPlaying && selectedAudio === source ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
              <span className="text-neutral-2">Audio {String.fromCharCode(65 + index)}</span>
            </div>
          ))}
        </div>

        {showRecording && (
          <div className="mt-6">
            <Button
              onClick={toggleRecording}
              variant="outline"
              className={`flex items-center gap-2 ${
                isRecording ? 'bg-red-500/20 text-red-500' : 'text-light-blue-1'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 mt-6">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`justify-start text-left px-4 py-3 ${
                selectedAnswer === option
                  ? 'bg-light-blue-1/20 text-light-blue-1 border-light-blue-1'
                  : 'text-neutral-2 border-dark-blue-4 hover:bg-dark-blue-4'
              }`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
      />

      {showFeedback && recordedAudio && (
        <PronunciationFeedback
          studentAudio={recordedAudio}
          modelAudio={audioSources[0]}
          targetPhoneme={type === 'recording' ? 'th' : null}
          onComplete={(analysis) => {
            setShowFeedback(false);
            onAnswer(analysis);
          }}
        />
      )}
    </Card>
  );
};

export default AudioAssessment;
