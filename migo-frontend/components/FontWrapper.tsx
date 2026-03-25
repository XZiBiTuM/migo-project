'use client';

import dynamic from 'next/dynamic';

const ClientFontLoader = dynamic(() => import('./ClientFontLoader'), { ssr: false });

export default function FontWrapper() {
  return <ClientFontLoader />;
}
