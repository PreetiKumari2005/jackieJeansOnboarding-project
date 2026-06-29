'use client';

import React from 'react';

export const SkipButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-center text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-neutral-600 transition-colors py-2"
    >
      I'd rather skip this
    </button>
  );
};