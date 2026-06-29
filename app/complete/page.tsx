'use client';

import React, { useEffect, useState } from 'react';
import { useQuizStore } from '@/lib/quiz-store';
import { Button } from '@/components/ui/Button';

export default function OnboardingCompletionPage() {
  const { answers, resetQuiz } = useQuizStore();
  const [countdown, setCountdown] = useState(4);
  const TARGET_URL = 'https://jackie-jeans.vercel.app/';

  useEffect(() => {
    // Fire off async state payload sync in the background to target origin if required
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = TARGET_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleImmediateRedirect = () => {
    window.location.href = TARGET_URL;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 py-12 max-w-md mx-auto border-x border-neutral-100 shadow-2xl">
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center mb-6 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-3">
          Profile Computed!
        </h1>
        <p className="text-neutral-500 text-sm leading-relaxed mb-6">
          Your custom fit algorithms have run successfully. Transporting you back to your exclusive storefront profile view.
        </p>

        <div className="bg-neutral-50 px-4 py-2.5 rounded-full border border-neutral-100 text-xs text-neutral-500 font-medium animate-pulse">
          Redirecting automatically in <span className="font-bold text-neutral-800">{countdown}s</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        <Button variant="primary" onClick={handleImmediateRedirect}>
          Enter Storefront Instantly
        </Button>
        <button 
          onClick={() => { resetQuiz(); window.location.reload(); }}
          className="w-full text-center text-xs font-semibold text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Clear Calculated Store Cache
        </button>
      </div>
    </div>
  );
}