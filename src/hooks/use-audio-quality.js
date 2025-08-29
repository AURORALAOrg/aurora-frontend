import { useEffect } from 'react';

const useAudioQuality = (audioUrl, onQualityCheck) => {
  useEffect(() => {
    const checkAudioQuality = async () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        // Check audio duration
        const duration = audioBuffer.duration;
        if (duration < 0.1) {
          throw new Error('Audio file is too short');
        }

        // Check sample rate
        const sampleRate = audioBuffer.sampleRate;
        if (sampleRate < 44100) {
          throw new Error('Audio quality is too low');
        }

        // Check for silence or very low volume
        const channelData = audioBuffer.getChannelData(0);
        let sumSquares = 0;
        for (let i = 0; i < channelData.length; i++) {
          sumSquares += channelData[i] * channelData[i];
        }
        const rms = Math.sqrt(sumSquares / channelData.length);
        if (rms < 0.01) {
          throw new Error('Audio volume is too low');
        }

        // Normalize audio if needed
        const normalizedBuffer = normalizeAudio(channelData);
        
        // Create high-quality audio blob
        const highQualityBlob = await processAudioToHighQuality(normalizedBuffer, audioContext);

        onQualityCheck({
          status: 'success',
          data: {
            duration,
            sampleRate,
            volume: rms,
            normalizedAudio: URL.createObjectURL(highQualityBlob)
          }
        });
      } catch (error) {
        onQualityCheck({
          status: 'error',
          error: error.message
        });
      }
    };

    if (audioUrl) {
      checkAudioQuality();
    }
  }, [audioUrl, onQualityCheck]);
};

const normalizeAudio = (channelData) => {
  // Find the maximum amplitude
  let maxAmplitude = 0;
  for (let i = 0; i < channelData.length; i++) {
    const absValue = Math.abs(channelData[i]);
    if (absValue > maxAmplitude) {
      maxAmplitude = absValue;
    }
  }

  // Normalize if the maximum amplitude is too low
  if (maxAmplitude < 0.5) {
    const normalizedData = new Float32Array(channelData.length);
    const scaleFactor = 0.8 / maxAmplitude; // Target 80% of maximum possible amplitude
    for (let i = 0; i < channelData.length; i++) {
      normalizedData[i] = channelData[i] * scaleFactor;
    }
    return normalizedData;
  }

  return channelData;
};

const processAudioToHighQuality = async (audioData, audioContext) => {
  // Create a new buffer with optimal settings
  const highQualityBuffer = audioContext.createBuffer(
    1, // mono
    audioData.length,
    48000 // high-quality sample rate
  );

  // Copy the normalized audio data
  highQualityBuffer.copyToChannel(audioData, 0);

  // Create a high-quality WAV file
  const offlineContext = new OfflineAudioContext(
    1,
    audioData.length,
    48000
  );

  const source = offlineContext.createBufferSource();
  source.buffer = highQualityBuffer;
  source.connect(offlineContext.destination);
  source.start();

  const renderedBuffer = await offlineContext.startRendering();

  // Convert to WAV blob
  const wavBlob = await new Promise(resolve => {
    const numberOfChannels = 1;
    const sampleRate = 48000;
    const bitsPerSample = 16;

    const dataView = encodeWAV(renderedBuffer, numberOfChannels, sampleRate, bitsPerSample);
    const audioBlob = new Blob([dataView], { type: 'audio/wav' });
    resolve(audioBlob);
  });

  return wavBlob;
};

const encodeWAV = (audioBuffer, numChannels, sampleRate, bitsPerSample) => {
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;

  const buffer = audioBuffer.getChannelData(0);
  const dataSize = buffer.length * bytesPerSample;
  const view = new DataView(new ArrayBuffer(44 + dataSize));

  // WAV header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Write audio data
  floatTo16BitPCM(view, 44, buffer);

  return view;
};

const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

const floatTo16BitPCM = (view, offset, input) => {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
};

export default useAudioQuality;
