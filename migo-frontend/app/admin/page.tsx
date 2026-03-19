"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, LogIn, AlertCircle } from 'lucide-react';
import Image from 'next/image';

const COLORS = {
  navy: '#163A5C',
  blue: '#2196D3',
  accent: '#B8D430',
};

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access_token', data.access);
        // Используем роль, которую прислал бэкенд
        localStorage.setItem('user_role', data.role || 'viewer'); 
        if (data.refresh) {
          localStorage.setItem('refresh_token', data.refresh);
        }
        router.push('/admin/news');
      } else {
        const errData = await res.json();
        setError(errData.detail || 'Неверные учетные данные');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center bg-[#F0F7FC] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
        <div className="flex justify-center mb-8">
            <Image src="/logo.webp" alt="MIGO" width={60} height={60} className="w-16 h-auto object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-center text-[#163A5C] mb-8">Панель администратора</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-500 mb-2">Логин</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196D3] focus:ring-2 focus:ring-[#2196D3]/20 transition-all outline-none text-[#163A5C] font-medium"
              placeholder="Введите логин"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-500 mb-2">Пароль</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196D3] focus:ring-2 focus:ring-[#2196D3]/20 transition-all outline-none text-[#163A5C] font-medium"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#2196D3] hover:bg-[#1976B0] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all mt-6 shadow-md disabled:opacity-70"
          >
            {loading ? 'Вход...' : <><LogIn size={20} /> Войти</>}
          </button>
        </form>
      </div>
    </main>
  );
}
