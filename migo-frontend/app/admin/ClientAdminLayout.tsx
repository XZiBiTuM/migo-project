"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar, { Role } from '@/components/admin/AdminSidebar';

export default function ClientAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin' || pathname === '/admin/';

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedRole = localStorage.getItem('user_role') as Role;

    if (!token && !isLoginPage) {
      router.push('/admin');
    } else if (token) {
      // Имитируем получение роли, если ее нет в localStorage
      // В реальном проекте здесь будет запрос к /api/me или декодирование JWT
      setRole(storedRole || 'admin');
    }
    setLoading(false);
  }, [pathname, isLoginPage, router]);

  if (loading && !isLoginPage) {
    return (
      <div className="min-h-screen bg-[#F0F7FC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2196D3]"></div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminSidebar userRole={role || 'admin'} />
      <main className={`transition-all duration-300 min-h-screen pt-2 md:pt-4 px-4 pb-20 md:pl-80`}>
        <div className="max-w-7xl mx-auto pt-24 md:pt-10">
           {children}
        </div>
      </main>
    </div>
  );
}
