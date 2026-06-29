'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/quiz-store';
import { QUIZ_STEPS, BRANDS, SIZES } from '@/lib/quiz-config';
import { Button } from '@/components/ui/Button';

interface QuizStepClientProps {
  stepId: string;
}

// CRITICAL: Ensure 'export default' is exactly present here
export default function QuizStepClient({ stepId }: QuizStepClientProps) {
  const router = useRouter();
  const { answers, setAnswer } = useQuizStore();

  const currentStepIndex = QUIZ_STEPS.findIndex((s) => s.id === stepId);
  const stepConfig = QUIZ_STEPS[currentStepIndex];

  if (!stepConfig) {
    return (
      <div className="p-6 text-center">
        <p className="text-neutral-500 mb-4">Step layout could not be found.</p>
        <Button onClick={() => router.push('/')}>Return Home</Button>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStepIndex < QUIZ_STEPS.length - 1) {
      router.push(`/quiz/${QUIZ_STEPS[currentStepIndex + 1].id}`);
    } else {
      window.location.href = "/complete";
    }
  };

  return (
    <div className="h-full flex flex-col justify-between py-2">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">{stepConfig.title}</h1>
        <p className="text-neutral-500 text-sm mt-1.5 mb-8">{stepConfig.description}</p>

        {/* Height Dropdown Input Selector */}
        {stepId === 'height' && (
          <select 
            value={answers.height || ''} 
            onChange={(e) => setAnswer('height', e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-4 text-base appearance-none focus:outline-none focus:ring-2 focus:ring-neutral-900"
          >
            <option value="">Select Height</option>
            {Array.from({ length: 17 }, (_, i) => {
              const feet = Math.floor((58 + i) / 12);
              const inches = (58 + i) % 12;
              return `${feet}'${inches}"`;
            }).map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        )}

        {/* Weight Optional Input Selector */}
        {stepId === 'weight' && (
          <div className="relative">
            <input 
              type="number" 
              placeholder="e.g. 145"
              value={answers.weight || ''}
              onChange={(e) => setAnswer('weight', e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <span className="absolute right-4 top-4.5 text-neutral-400 text-sm">lbs</span>
          </div>
        )}

        {/* ADDED: Waist Measurement Numerical Input Box */}
        {stepId === 'waist' && (
          <div className="relative">
            <input 
              type="number" 
              placeholder="e.g. 28"
              value={answers.waist || ''}
              onChange={(e) => setAnswer('waist', e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-neutral-900"
              min="20"
              max="60"
            />
            <span className="absolute right-4 top-4.5 text-neutral-400 text-sm">inches</span>
          </div>
        )}

        {/* ADDED: Hip Measurement Numerical Input Box */}
        {stepId === 'hip' && (
          <div className="relative">
            <input 
              type="number" 
              placeholder="e.g. 36"
              value={answers.hip || ''}
              onChange={(e) => setAnswer('hip', e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-neutral-900"
              min="20"
              max="70"
            />
            <span className="absolute right-4 top-4.5 text-neutral-400 text-sm">inches</span>
          </div>
        )}

        {/* Fit Profiles Configurations Grid */}
        {['waistFit', 'rise', 'thighFit'].includes(stepId) && (
          <div className="space-y-3">
            {(stepId === 'waistFit' ? ['Snug', 'Slightly relaxed', 'Relaxed'] :
              stepId === 'rise' ? ['High rise', 'Mid rise', 'Low rise'] : ['Fitted', 'Relaxed', 'Loose']).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAnswer(stepId as any, option)}
                  className={`w-full text-left px-5 py-4 rounded-xl border font-medium transition-all duration-200 ${
                    (answers as any)[stepId] === option 
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' 
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {option}
                </button>
            ))}
          </div>
        )}

        {/* Brands Multi-Select Selector Layout */}
        {stepId === 'brands' && (
          <div className="grid grid-cols-2 gap-2 max-h-[45vh] overflow-y-auto pr-1">
            {BRANDS.map(brand => {
              const isSelected = answers.brands?.includes(brand);
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => {
                    const current = answers.brands || [];
                    setAnswer('brands', isSelected ? current.filter(b => b !== brand) : [...current, brand]);
                  }}
                  className={`px-4 py-3 border rounded-xl text-sm font-medium transition-all text-center ${
                    isSelected ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 text-neutral-700 bg-neutral-50'
                  }`}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        )}

        {/* Brand Sizes Sizing Normalization Form */}
        {stepId === 'brandSizes' && (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {(answers.brands && answers.brands.length > 0 ? answers.brands : [BRANDS[0]]).map(brand => (
              <div key={brand} className="flex items-center justify-between border-b pb-3 border-neutral-100">
                <span className="font-medium text-sm text-neutral-800">{brand}</span>
                <select
                  value={answers.brandSizes?.[brand] || ''}
                  onChange={(e) => {
                    const sizes = answers.brandSizes || {};
                    setAnswer('brandSizes', { ...sizes, [brand]: e.target.value });
                  }}
                  className="bg-neutral-50 border rounded-lg px-3 py-1.5 text-sm"
                >
                  <option value="">Select Size</option>
                  {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Frustrations Sizing Panel */}
        {stepId === 'frustration' && (
          <div className="space-y-3">
            {['Waist gap', 'Hip tightness', 'Wrong length', 'Thigh fit', 'Rise', 'Other'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setAnswer('frustration', option)}
                className={`w-full text-left px-5 py-4 rounded-xl border font-medium transition-all duration-200 ${
                  answers.frustration === option 
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' 
                    : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 pt-4 bg-white border-t border-neutral-100 space-y-3">
        <Button onClick={handleNext}>
          {currentStepIndex === QUIZ_STEPS.length - 1 ? 'Calculate My Perfect Fit' : 'Continue'}
        </Button>
        {stepConfig.optional && (
          <button 
            type="button"
            onClick={handleNext} 
            className="w-full text-center text-sm font-medium text-neutral-400 hover:text-neutral-600 transition-all py-1"
          >
            Skip this step
          </button>
        )}
      </div>
    </div>
  );
}