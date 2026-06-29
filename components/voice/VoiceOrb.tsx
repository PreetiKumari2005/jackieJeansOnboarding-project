import React from 'react';

export const VoiceOrb: React.FC<{ isListening: boolean; speaking: boolean }> = ({ isListening, speaking }) => {
  return (
    <div className="relative flex items-center justify-center w-40 h-40 mx-auto my-12">
      {isListening && (
        <>
          <div className="absolute inset-0 bg-blue-400 opacity-20 rounded-full animate-ping duration-1000" />
          <div className="absolute inset-4 bg-blue-300 opacity-30 rounded-full animate-pulse" />
        </>
      )}
      {speaking && (
        <>
          <div className="absolute inset-2 bg-neutral-400 opacity-20 rounded-full animate-pulse duration-700" />
        </>
      )}
      <div className={`w-28 h-28 rounded-full flex items-center justify-center shadow-2xl border transition-all duration-500 ${
        isListening ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 border-blue-400 text-white' : 
        speaking ? 'bg-gradient-to-tr from-neutral-800 to-neutral-900 border-neutral-700 text-white' :
        'bg-white border-neutral-200 text-neutral-800'
      }`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 0 3-3v-6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
        </svg>
      </div>
    </div>
  );
};