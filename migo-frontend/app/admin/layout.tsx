import React from 'react';
import { Manrope, Montserrat } from 'next/font/google';
import '../globals.css';
import ClientAdminLayout from './ClientAdminLayout';

const manrope = Manrope({ 
  subsets: ["latin", "cyrillic"], 
  variable: "--font-manrope", 
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'] 
});

const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"], 
  variable: "--font-montserrat", 
  display: 'swap',
  weight: ["400", "500", "600", "700", "800", "900"] 
});

export const metadata = {
  title: 'MIGO | Admin Panel',
  description: 'MIGO Administrative Dashboard',
  metadataBase: new URL('https://migohelp.com'),
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${manrope.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-[#F0F7FC] text-[#163A5C] min-h-screen">
        <ClientAdminLayout>
          {children}
        </ClientAdminLayout>
      </body>
    </html>
  );
}
