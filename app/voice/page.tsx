'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/quiz-store';
import { QUIZ_STEPS, BRANDS } from '@/lib/quiz-config';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { localVoiceParse } from '@/lib/voice-parser';
import { VoiceOrb } from '@/components/voice/VoiceOrb';
import { Button } from '@/components/ui/Button';

export default function VoiceQuizPage() {
  const router = useRouter();
  const { setAnswer, answers } = useQuizStore();
  const [stepIndex, setStepIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [assistantText, setAssistantText] = useState('Welcome back to Jackie Jeans. Let’s calibrate your style seamlessly. What is your height?');

  const currentStep = QUIZ_STEPS[stepIndex];
  const { speak, speaking } = useTextToSpeech();

  const handleVoiceInput = useCallback((text: string) => {
    setTranscript(text);
    const result = localVoiceParse(currentStep.id, text, { allBrands: BRANDS });

    // 1. Handle Skip Triggers for Optional Questions
    if (result === 'SKIP' && currentStep.optional) {
      advanceStep("Skipping that, perfectly fine.");
      return;
    }

    // 2. Intercept Brand Selection Flow Contextually
    if (currentStep.id === 'brands') {
      let selected = BRANDS.filter(b => text.toLowerCase().includes(b.toLowerCase()));
      if (selected.length === 0) {
        selected = ["Levi's"]; // Safe fallback
      }
      setAnswer('brands', selected);
      setTranscript('');
      advanceStep(`Got it — using standard sizing patterns for ${selected.join(', ')}.`);
      return;
    }

    // 3. Unify All Regular Standard Form Answers
    if (result !== null) {
      setAnswer(currentStep.id as any, result);
      setTranscript('');
      advanceStep(`Understood, ${result}.`);
    } else {
      // Reprompt cleanly if parser output returns null
      speak("I missed that. Could you repeat it for me clearly?", () => startListening());
    }
  }, [stepIndex, currentStep, speak, setAnswer]);

  const { isListening, startListening, stopListening } = useSpeechRecognition(handleVoiceInput);

  const advanceStep = (prefix: string) => {
    if (stepIndex < QUIZ_STEPS.length - 1) {
      const nextIdx = stepIndex + 1;
      setStepIndex(nextIdx);
      const nextPrompt = `${prefix} ${QUIZ_STEPS[nextIdx].title}`;
      setAssistantText(QUIZ_STEPS[nextIdx].title);
      speak(nextPrompt, () => startListening());
    } else {
      speak("Splendid! We have calculated your perfect cut. Passing you to our flagship portal.", () => {
        window.location.href = "https://jackie-jeans.vercel.app/";
      });
    }
  };

  useEffect(() => {
    speak(assistantText, () => startListening());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-12 flex flex-col justify-between max-w-md mx-auto">
      <div className="text-center pt-8">
        <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Voice Concierge</span>
        <h2 className="text-2xl font-semibold mt-4 text-neutral-900 leading-snug px-4">{assistantText}</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <VoiceOrb isListening={isListening} speaking={speaking} />
        {transcript && (
          <p className="text-center italic text-sm text-neutral-500 bg-white shadow-sm border p-3 rounded-xl transition-all">
            "{transcript}"
          </p>
        )}
      </div>

      <div className="space-y-3">
        {!isListening && !speaking && (
          <Button variant="primary" onClick={() => startListening()}>Tap to Speak</Button>
        )}
        <Button variant="outline" onClick={() => router.push('/quiz/height')}>
          Switch to Manual Entry
        </Button>
      </div>
    </div>
  );
}