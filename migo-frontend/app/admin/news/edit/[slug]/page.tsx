"use client";

import AdminNewsEditor from '@/components/AdminNewsEditor';
import { use } from 'react';

export default function EditNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <main className="min-h-screen bg-[#F0F7FC] pt-28 pb-20 px-4">
      <AdminNewsEditor slug={slug} />
    </main>
  );
}
