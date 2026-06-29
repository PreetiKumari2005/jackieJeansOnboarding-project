'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizRootIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/quiz/height');
  }, [router]);

  return null;
}