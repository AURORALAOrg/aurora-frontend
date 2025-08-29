import { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Info } from 'lucide-react';

const PronunciationFeedback = ({
  studentAudio,
  modelAudio,
  targetPhoneme,
  onComplete
}) => {
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const studentWaveformRef = useRef(null);
  const modelWaveformRef = useRef(null);

  // Visualization setup using Web Audio API
  useEffect(() => {
    if (studentAudio && modelAudio) {
      setupWaveformVisualizations();
    }
  }, [studentAudio, modelAudio]);

  const setupWaveformVisualizations = async () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Set up audio analysis for both recordings
    try {
      const [studentBuffer, modelBuffer] = await Promise.all([
        fetchAudioBuffer(studentAudio, audioContext),
        fetchAudioBuffer(modelAudio, audioContext)
      ]);

      // Draw waveforms
      drawWaveform(studentBuffer, studentWaveformRef.current);
      drawWaveform(modelBuffer, modelWaveformRef.current);

      // Analyze pronunciation
      analyzePronunciation(studentBuffer, modelBuffer);
    } catch (error) {
      console.error('Error setting up audio analysis:', error);
    }
  };

  const fetchAudioBuffer = async (audioUrl, context) => {
    const response = await fetch(audioUrl);
    const arrayBuffer = await response.arrayBuffer();
    return await context.decodeAudioData(arrayBuffer);
  };

  const drawWaveform = (audioBuffer, canvas) => {
    const ctx = canvas.getContext('2d');
    const data = audioBuffer.getChannelData(0);
    const step = Math.ceil(data.length / canvas.width);
    const amp = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, amp);

    for (let i = 0; i < canvas.width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = data[(i * step) + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      ctx.lineTo(i, (1 + min) * amp);
      ctx.lineTo(i, (1 + max) * amp);
    }

    ctx.strokeStyle = '#00b8d4';
    ctx.stroke();
  };

  const analyzePronunciation = async (studentBuffer, modelBuffer) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis (replace with actual API call)
    try {
      // TODO: Integrate with speech analysis API
      const mockAnalysis = {
        accuracy: 0.75,
        feedback: {
          phonemeAccuracy: 0.8,
          intonation: 0.7,
          rhythm: 0.75,
          suggestions: [
            {
              type: 'tongue_position',
              message: 'Place your tongue between your teeth for the "th" sound'
            },
            {
              type: 'duration',
              message: 'Try to hold the sound slightly longer'
            }
          ]
        }
      };

      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Error analyzing pronunciation:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="p-6 bg-dark-blue-5 border-dark-blue-4">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Pronunciation Analysis</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-neutral-2 mb-2">Your Pronunciation</p>
            <canvas ref={studentWaveformRef} className="w-full h-32 bg-dark-blue-4 rounded" />
          </div>
          <div>
            <p className="text-sm text-neutral-2 mb-2">Native Speaker</p>
            <canvas ref={modelWaveformRef} className="w-full h-32 bg-dark-blue-4 rounded" />
          </div>
        </div>

        {isAnalyzing ? (
          <div className="text-center text-neutral-2">Analyzing pronunciation...</div>
        ) : analysis ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-blue-4 p-4 rounded">
                <p className="text-sm text-neutral-2">Accuracy</p>
                <p className="text-2xl font-bold text-light-blue-1">
                  {Math.round(analysis.accuracy * 100)}%
                </p>
              </div>
              <div className="bg-dark-blue-4 p-4 rounded">
                <p className="text-sm text-neutral-2">Intonation</p>
                <p className="text-2xl font-bold text-light-blue-1">
                  {Math.round(analysis.feedback.intonation * 100)}%
                </p>
              </div>
              <div className="bg-dark-blue-4 p-4 rounded">
                <p className="text-sm text-neutral-2">Rhythm</p>
                <p className="text-2xl font-bold text-light-blue-1">
                  {Math.round(analysis.feedback.rhythm * 100)}%
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-white font-semibold">Suggestions for Improvement:</p>
              {analysis.feedback.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2 text-neutral-2">
                  <Info className="w-4 h-4 mt-1 flex-shrink-0 text-light-blue-1" />
                  <p>{suggestion.message}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex justify-end">
          <Button
            onClick={() => onComplete(analysis)}
            className="bg-light-blue-1 hover:bg-light-blue-2 text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PronunciationFeedback;
