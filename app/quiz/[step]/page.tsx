'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import QuizStepClient from '@/components/quiz/QuizStepClient';

export default function DynamicQuizPage() {
  const params = useParams();
  const stepId = (params?.step as string) || 'height';

  return <QuizStepClient stepId={stepId} />;
}