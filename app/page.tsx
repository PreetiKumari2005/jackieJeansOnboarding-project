'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function WelcomeLandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between px-6 py-12 max-w-md mx-auto border-x border-neutral-100 shadow-2xl">
      <div className="flex-1 flex flex-col justify-center text-center px-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-4">
          JACKIE JEANS
        </h1>
        <p className="text-neutral-500 text-base leading-relaxed max-w-sm mx-auto">
          Skip the guessing games, sizing variants, and retail return cycles. Meet your perfect premium cut in under 2 minutes.
        </p>
      </div>

      <div className="space-y-3.5 w-full">
        <Button variant="primary" onClick={() => router.push('/quiz/height')}>
          Take Fit Quiz Manual
        </Button>
        <Button variant="outline" onClick={() => router.push('/voice')} className="flex items-center justify-center gap-2 border-neutral-300">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Onboard via Voice Stylist
        </Button>
      </div>
    </div>
  );
}