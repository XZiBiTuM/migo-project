import React from 'react';
import { Manrope, Montserrat } from 'next/font/google';
import '../globals.css';
import ClientAdminLayout from './ClientAdminLayout';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-manrope', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'], variable: '--font-montserrat', display: 'swap' });

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
    <html lang="ru">
      <body className={`${manrope.variable} ${montserrat.variable} bg-[#F0F7FC] text-[#163A5C] min-h-screen`} style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
        <ClientAdminLayout>
          {children}
        </ClientAdminLayout>
      </body>
    </html>
  );
}
