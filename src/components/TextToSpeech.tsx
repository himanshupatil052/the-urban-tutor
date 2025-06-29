
import React from 'react';
import { Volume2 } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  className?: string;
  size?: number;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, className = "", size = 16 }) => {
  const playTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-speech not supported in this browser');
      alert('Text-to-speech is not supported in your browser');
    }
  };

  return (
    <button
      onClick={playTextToSpeech}
      className={`p-1 hover:bg-gray-100 rounded-full transition-colors ${className}`}
      title="Play text aloud"
    >
      <Volume2 size={size} className="text-gray-600" />
    </button>
  );
};

export default TextToSpeech;
