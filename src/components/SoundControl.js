import React, { useState, useEffect } from 'react';

const SoundControl = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Crear audio futurista usando Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const createFuturisticSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 2);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 4);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 4);
      
      oscillator.type = 'sine';
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 4);
    };

    const playAmbientSound = () => {
      if (!isMuted && audioContext.state === 'running') {
        createFuturisticSound();
        setTimeout(playAmbientSound, 8000); // Repetir cada 8 segundos
      }
    };

    if (!isMuted) {
      playAmbientSound();
    }

    return () => {
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [isMuted]);

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed top-4 right-4 z-50 w-12 h-12 bg-gradient-to-br from-purple-600 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
    >
      {isMuted ? (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
};

export default SoundControl;