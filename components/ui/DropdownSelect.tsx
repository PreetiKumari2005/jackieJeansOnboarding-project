'use client';

import React from 'react';

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
}

export const DropdownSelect: React.FC<DropdownProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{label}</label>}
      <div className="relative">
        <select
          className={`w-full bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl px-4 py-4 text-base appearance-none focus:outline-none focus:ring-2 focus:ring-neutral-950 transition-all ${className}`}
          {...props}
        >
          <option value="" disabled hidden>Choose an option</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};