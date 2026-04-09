"use client";

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export function FAQItem({ question, answer }: { question: React.ReactNode, answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-[48px] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-10 flex justify-between items-center group cursor-pointer"
      >
        <span className="text-2xl font-black text-[#163A5C] group-hover:text-[#1E58B1] transition-colors leading-tight">{question}</span>
        <ChevronRight className={`text-[#1E58B1] transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} size={32} />
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-10 pt-0 text-gray-700 text-lg leading-relaxed font-medium border-t border-gray-50">
          {answer}
        </div>
      </div>
    </div>
  );
}
