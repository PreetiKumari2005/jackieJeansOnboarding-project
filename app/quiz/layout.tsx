'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { QUIZ_STEPS } from '@/lib/quiz-config';

export default function QuizShellLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const currentStepId = pathname?.split('/').pop() || 'height';
  const currentIndex = QUIZ_STEPS.findIndex(s => s.id === currentStepId);
  const progressPercent = QUIZ_STEPS.length > 0 ? ((currentIndex + 1) / QUIZ_STEPS.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between max-w-md mx-auto border-x border-neutral-100 shadow-2xl">
      <header className="px-6 pt-6 pb-4 bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between mb-4">
          <button 
            type="button"
            onClick={() => {
              if (currentIndex > 0) {
                router.push(`/quiz/${QUIZ_STEPS[currentIndex - 1].id}`);
              } else {
                router.push('/');
              }
            }} 
            className="text-neutral-500 hover:text-neutral-900 transition-all p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className="text-xs font-bold tracking-wider text-neutral-400">
            {currentIndex !== -1 ? currentIndex + 1 : 1} / {QUIZ_STEPS.length}
          </span>
        </div>
        <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-neutral-950 transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </header>

      <main className="flex-1 px-6 py-4 overflow-y-auto">{children}</main>
    </div>
  );
}