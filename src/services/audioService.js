// Mock audio service for listening exercises
// In a real implementation, this would handle actual audio files

class MockAudioService {
  constructor() {
    this.audioElements = new Map();
    this.isPlaying = new Map();
  }

  // Create a mock audio element for the given URL
  createAudio(audioUrl) {
    if (this.audioElements.has(audioUrl)) {
      return this.audioElements.get(audioUrl);
    }

    // Create a mock audio element
    const audio = {
      play: () => {
        console.log(`🎵 Playing audio: ${audioUrl}`);
        this.isPlaying.set(audioUrl, true);
        
        // Simulate audio duration (2-5 seconds)
        const duration = Math.random() * 3000 + 2000;
        
        setTimeout(() => {
          this.isPlaying.set(audioUrl, false);
          if (audio.onended) {
            audio.onended();
          }
        }, duration);
        
        return Promise.resolve();
      },
      pause: () => {
        console.log(`⏸️ Paused audio: ${audioUrl}`);
        this.isPlaying.set(audioUrl, false);
      },
      onended: null,
      onerror: null,
      currentTime: 0,
      duration: 0
    };

    this.audioElements.set(audioUrl, audio);
    return audio;
  }

  // Check if audio is currently playing
  isAudioPlaying(audioUrl) {
    return this.isPlaying.get(audioUrl) || false;
  }

  // Stop all audio
  stopAll() {
    this.audioElements.forEach((audio, url) => {
      if (this.isPlaying.get(url)) {
        audio.pause();
      }
    });
    this.isPlaying.clear();
  }

  // Get audio status for display purposes
  getAudioStatus(audioUrl) {
    return {
      isPlaying: this.isPlaying.get(audioUrl) || false,
      duration: '2-5 seconds',
      url: audioUrl
    };
  }
}

// Create a singleton instance
const audioService = new MockAudioService();

export default audioService;
