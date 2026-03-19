"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, Newspaper, Briefcase, TrendingUp, 
  MessageSquare, Clock, CheckCircle, AlertCircle, RefreshCw
} from 'lucide-react';

export default function OverviewPage() {
  const [stats, setStats] = useState({
    news: 0,
    leads: 0,
    unprocessed: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-[#163A5C] mb-2 flex items-center gap-3">
            <TrendingUp className="text-[#2196D3]" /> Панель управления
          </h1>
          <p className="text-gray-500 font-medium tracking-wide leading-relaxed">Добро пожаловать в админ-панель MIGO. Обзор активности за всё время.</p>
        </div>
        <button 
          onClick={fetchStats}
          className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#2196D3] transition-colors shadow-sm"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          icon={<Newspaper size={24} />} 
          title="Новости" 
          value={loading ? '...' : stats.news} 
          color="bg-blue-50 text-blue-600" 
          desc="Активных публикаций"
        />
        <StatCard 
          icon={<Briefcase size={24} />} 
          title="Все заявки" 
          value={loading ? '...' : stats.leads} 
          color="bg-[#B8D43015] text-[#163A5C]" 
          desc="За всё время"
        />
        <StatCard 
          icon={<AlertCircle size={24} />} 
          title="Новые заявки" 
          value={loading ? '...' : stats.unprocessed} 
          color="bg-orange-50 text-orange-600" 
          desc="Ожидают обработки"
        />
        <StatCard 
          icon={<Users size={24} />} 
          title="Команда" 
          value={loading ? '...' : stats.users} 
          color="bg-gray-50 text-gray-400" 
          desc="Сотрудников в системе"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black text-[#163A5C] mb-8 flex items-center gap-3 underline decoration-[#B8D430] decoration-4 underline-offset-8">
               Последние события
            </h2>
            <div className="space-y-6">
               <EventItem 
                 icon={<MessageSquare size={16} />} 
                 title="Система работает" 
                 time="Только что" 
                 user="System"
               />
               <p className="text-xs text-center text-gray-300 font-bold uppercase tracking-widest py-10">
                  Журнал событий будет доступен в следующих обновлениях
               </p>
            </div>
         </div>

         <div className="bg-[#163A5C] rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2196D3] rounded-full blur-[100px] opacity-20"></div>
            <h2 className="text-3xl font-black mb-6 relative z-10 leading-tight">MIGO Admin 🚀</h2>
            <p className="text-white/60 text-lg font-medium leading-relaxed mb-10 relative z-10">
               Все сервисы запущены. Интеграция с Telegram-ботом активна. Последняя синхронизация с базой данных выполнена успешно.
            </p>
            <div className="flex gap-4 relative z-10">
               <div className="px-6 py-2 bg-white/10 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-[#B8D430]">База данных: OK</div>
               <div className="px-6 py-2 bg-white/10 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-[#2196D3]">API: Online</div>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color, desc }: any) {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${color}`}>
          {icon}
       </div>
       <div className="text-4xl font-black text-[#163A5C] mb-1">{value}</div>
       <div className="text-sm font-bold text-gray-500 mb-4">{title}</div>
       <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">{desc}</div>
    </div>
  );
}

function EventItem({ icon, title, time, user }: any) {
  return (
    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-default border border-transparent hover:border-gray-100">
       <div className="w-10 h-10 bg-[#F0F7FC] rounded-xl flex items-center justify-center text-[#2196D3] shrink-0">
          {icon}
       </div>
       <div>
          <h4 className="font-bold text-[#163A5C] text-sm leading-snug">{title}</h4>
          <div className="flex items-center gap-3 mt-1 text-[10px] font-black uppercase tracking-widest">
             <span className="text-gray-300">{time}</span>
             <span className="w-1 h-1 bg-[#B8D430] rounded-full"></span>
             <span className="text-[#2196D3] font-bold">{user}</span>
          </div>
       </div>
    </div>
  );
}
