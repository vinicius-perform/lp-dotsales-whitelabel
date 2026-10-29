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
    <div className={clsx('space-y-3.5 w-full max-w-3xl mx-auto', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentId = `faq-item-${index}`;

        return (
          <div
            key={index}
            className={clsx(
              'border rounded-2xl bg-white overflow-hidden transition-all duration-300',
              isOpen
                ? 'border-brand-primary/60 shadow-sm ring-1 ring-brand-primary/10'
                : 'border-brand-border hover:border-brand-mint'
            )}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-brand-dark hover:text-brand-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary select-none"
              aria-expanded={isOpen}
              aria-controls={contentId}
            >
              <span className="text-base sm:text-lg leading-snug">{item.question}</span>
              <div
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300',
                  isOpen
                    ? 'bg-brand-primary text-white rotate-180 shadow-2xs'
                    : 'bg-brand-pale text-brand-primary'
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Smooth CSS Grid Row Animation for Fluid Height */}
            <div
              id={contentId}
              className={clsx(
                'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 pt-1">
                  <p className="text-brand-muted text-sm sm:text-base leading-relaxed pt-3 border-t border-brand-border/60">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
