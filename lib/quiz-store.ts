import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuizAnswers {
  height?: string;
  weight?: string;
  waist?: string;
  hip?: string;
  waistFit?: 'Snug' | 'Slightly relaxed' | 'Relaxed';
  rise?: 'High rise' | 'Mid rise' | 'Low rise';
  thighFit?: 'Fitted' | 'Relaxed' | 'Loose';
  brands?: string[];
  brandSizes?: Record<string, string>;
  frustration?: string;
}

interface QuizState {
  answers: QuizAnswers;
  setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: {},
      setAnswer: (key, value) =>
        set((state) => ({ answers: { ...state.answers, [key]: value } })),
      resetQuiz: () => set({ answers: {} }),
    }),
    { name: 'jackie-jeans-quiz-store' }
  )
);