"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Search, Shield, 
  Trash2, Edit3, CheckCircle, XCircle, Mail, RefreshCw
} from 'lucide-react';

interface TeamMember {
  id: number;
  username: string;
  role: string;
  email: string;
  is_active: boolean;
  last_login: string | null;
}

export default function UsersPage() {
  const [users, setUsers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-[#163A5C] mb-2 flex items-center gap-3">
            <Users className="text-[#2196D3]" /> Пользователи (Команда)
          </h1>
          <p className="text-gray-500 font-medium tracking-wide leading-relaxed">Управление доступом сотрудников и их ролями в системе</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchUsers}
            className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#2196D3] transition-colors shadow-sm"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button className="px-8 py-3.5 bg-[#163A5C] hover:bg-[#0F2942] text-white font-black rounded-2xl text-sm transition-all shadow-md active:scale-95 flex items-center gap-2">
             <UserPlus size={18} /> Добавить пользователя
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm mb-10">
         <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" size={20} />
               <input 
                 type="text" 
                 placeholder="Поиск по имени или email..."
                 className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-50 focus:border-[#2196D3] outline-none transition-all font-medium text-[#163A5C]"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2196D3]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center relative overflow-hidden group">
               <div className="w-20 h-20 rounded-[28px] bg-[#F0F7FC] flex items-center justify-center text-[#2196D3] mb-6 relative">
                  <Shield size={32} />
                  {user.is_active && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                  )}
               </div>
               
               <h3 className="text-2xl font-black text-[#163A5C] mb-1">{user.username}</h3>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6 min-h-[1rem]">{user.email || 'Email не указан'}</p>
               
               <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    user.role === 'admin' ? 'bg-[#163A5C] text-white' : 
                    user.role === 'editor' ? 'bg-[#2196D3] text-white' : 
                    'bg-[#F0F7FC] text-[#163A5C]'
                  }`}>
                     {user.role}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    user.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                     {user.is_active ? 'Активен' : 'Заблокирован'}
                  </span>
               </div>
               
               <div className="w-full flex items-center gap-3">
                 <button className="flex-1 py-4 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-[#2196D3] rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm">
                    <Edit3 size={14} /> Изменить
                 </button>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
