'use client';

import { useEffect } from 'react';
import { manrope, montserrat } from '@/utils/fonts';

export default function ClientFontLoader() {
  useEffect(() => {
    // Apply the font variables to the html element after initial paint
    document.documentElement.classList.add(manrope.variable);
    document.documentElement.classList.add(montserrat.variable);
    
    // Also set the CSS variables explicitly just in case
    document.documentElement.style.setProperty('--font-manrope', manrope.style.fontFamily);
    document.documentElement.style.setProperty('--font-montserrat', montserrat.style.fontFamily);
  }, []);

  return null;
}
