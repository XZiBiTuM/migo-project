import { Manrope, Montserrat } from "next/font/google";

export const manrope = Manrope({ 
  subsets: ["latin", "cyrillic"], 
  variable: "--font-manrope", 
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'] 
});

export const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"], 
  variable: "--font-montserrat", 
  display: 'swap',
  weight: ["400", "500", "600", "700", "800", "900"] 
});
