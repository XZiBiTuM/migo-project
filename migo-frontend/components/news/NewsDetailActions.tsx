"use client";

import React from 'react';
import { Share2, ChevronDown } from 'lucide-react';

export default function NewsDetailActions({ articleTitle, articleUrl, goBtnText }: { articleTitle: string, articleUrl: string, goBtnText: string }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: articleTitle,
        url: articleUrl || window.location.href,
      }).catch(console.error);
    } else {
       // Fallback for desktop: copy to clipboard
       navigator.clipboard.writeText(articleUrl || window.location.href);
       alert('Ссылка скопирована!');
    }
  };

  const scrollToContent = () => {
    document.getElementById('article-content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={scrollToContent}
        className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#F0F7FF] text-[#1E58B1] font-black text-xs uppercase tracking-widest hover:bg-[#1E58B1] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
      >
        <span>{goBtnText}</span>
        <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
      </button>

      <button
        onClick={handleShare}
        className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#2196D3] hover:text-white hover:border-[#2196D3] transition-all cursor-pointer"
      >
        <Share2 size={20} />
      </button>
    </div>
  );
}
