import React from 'react';
import "../globals.css";
import ClientAdminLayout from './ClientAdminLayout';
import dynamic from 'next/dynamic';

const ClientFontLoader = dynamic(() => import('@/components/ClientFontLoader'), { ssr: false });

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
    <html lang="ru" suppressHydrationWarning>
      <ClientFontLoader />
      <body className="font-sans bg-[#F0F7FC] text-[#163A5C] min-h-screen">
        <ClientAdminLayout>
          {children}
        </ClientAdminLayout>
      </body>
    </html>
  );
}
