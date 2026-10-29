'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={clsx('space-y-4 w-full max-w-3xl mx-auto', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-brand-border rounded-2xl bg-white overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-brand-dark hover:text-brand-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg leading-snug">{item.question}</span>
              <div
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200',
                  isOpen
                    ? 'bg-brand-primary text-white rotate-180'
                    : 'bg-brand-pale text-brand-primary'
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            <div
              className={clsx(
                'transition-all duration-300 ease-in-out px-6',
                isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'
              )}
            >
              <p className="text-brand-muted text-sm sm:text-base leading-relaxed pt-2 border-t border-brand-border/60">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
