'use client';

import React from 'react';

interface MultiSelectProps {
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedValues, onChange }) => {
  const toggleOption = (opt: string) => {
    if (selectedValues.includes(opt)) {
      onChange(selectedValues.filter((v) => v !== opt));
    } else {
      onChange([...selectedValues, opt]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2.5 max-h-[45vh] overflow-y-auto pr-1">
      {options.map((opt) => {
        const isSelected = selectedValues.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggleOption(opt)}
            className={`px-4 py-3.5 border text-sm font-medium rounded-xl transition-all duration-200 text-center active:scale-[0.99] ${
              isSelected
                ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};