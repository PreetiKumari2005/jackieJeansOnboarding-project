import { useState, useEffect } from 'react';

export const useTextToSpeech = () => {
  const [speaking, setSpeaking] = useState(false);

  const speak = (text: string, callback?: () => void) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
        if (callback) callback();
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  return { speak, speaking };
};