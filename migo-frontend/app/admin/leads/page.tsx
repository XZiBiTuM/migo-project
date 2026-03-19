"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Filter, Calendar, MessageCircle, User, 
  CheckCircle, Clock, XCircle, ChevronRight, Briefcase, Phone,
  Mail, ExternalLink, RefreshCw
} from 'lucide-react';

interface Lead {
  id: number;
  lead_type: string;
  name: string;
  phone: string;
  citizenship: string;
  city: string;
  comment: string;
  is_processed: boolean;
  created_at: string;
  utm_source?: string;
}

const getStatusLabel = (processed: boolean) => {
  return processed ? 'Обработано' : 'Новая';
};

const getLeadTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    'job': 'Работа',
    'housing': 'Жильё',
    'service': 'Услуга'
  };
  return types[type] || type;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      } else {
        setError('Не удалось загрузить заявки');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const toggleProcessed = async (id: number) => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}/process/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, is_processed: true } : l));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.phone.includes(searchTerm)
  );

  return (
    <div className="pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-[#163A5C] mb-2 flex items-center gap-3">
            <Briefcase className="text-[#2196D3]" /> Заявки
          </h1>
          <p className="text-gray-500 font-medium tracking-wide leading-relaxed">Просмотр и обработка анкет пользователей с сайта</p>
        </div>
        <button 
          onClick={fetchLeads}
          className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#2196D3] transition-colors shadow-sm"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm mb-10">
         <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
               <input 
                 type="text" 
                 placeholder="Поиск по имени или телефону..."
                 className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:border-[#2196D3] outline-none transition-all font-medium text-[#163A5C]"
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
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-8 rounded-[32px] text-center border border-red-100 font-bold">
           {error}
        </div>
      ) : filteredLeads.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group">
               <div className="flex items-start gap-6 flex-grow min-w-0">
                  <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 ${lead.is_processed ? 'bg-gray-50 text-gray-400' : 'bg-[#F0F7FC] text-[#2196D3]'}`}>
                     <User size={28} />
                  </div>
                  <div className="min-w-0 flex-grow">
                     <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-black text-[#163A5C] text-xl truncate tracking-tight">{lead.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          lead.is_processed ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                           {getStatusLabel(lead.is_processed)}
                        </span>
                        <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                           {getLeadTypeLabel(lead.lead_type)}
                        </span>
                     </div>
                     <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-gray-500 font-bold">
                        <span className="flex items-center gap-2 text-[#163A5C]"><Phone size={16} className="text-[#B8D430]" /> {lead.phone}</span>
                        <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(lead.created_at).toLocaleDateString()}</span>
                        {lead.city && <span className="flex items-center gap-2 text-gray-400 font-medium">г. {lead.city}</span>}
                     </div>
                     {lead.comment && (
                       <p className="mt-4 text-sm text-gray-400 font-medium italic line-clamp-2 md:line-clamp-none bg-gray-50 p-4 rounded-2xl border border-gray-100">
                         "{lead.comment}"
                       </p>
                     )}
                  </div>
               </div>
               
               <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  {!lead.is_processed && (
                    <button 
                      onClick={() => toggleProcessed(lead.id)}
                      className="flex-1 md:flex-none px-8 py-4 bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] font-black rounded-2xl text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} /> Обработать
                    </button>
                  )}
                  <a 
                    href={`tel:${lead.phone}`}
                    className="flex-1 md:flex-none px-8 py-4 bg-[#163A5C] hover:bg-[#0F2942] text-white font-black rounded-2xl text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={18} /> Позвонить
                  </a>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[40px] p-32 text-center border border-dashed border-gray-100">
           <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageCircle className="text-gray-200" size={48} />
           </div>
           <h3 className="text-2xl font-black text-[#163A5C] mb-3 uppercase tracking-wider">Заявок пока нет</h3>
           <p className="text-gray-400 font-bold max-w-xs mx-auto text-sm uppercase tracking-widest leading-loose">Поздравляем! Все запросы обработаны или еще не поступали.</p>
        </div>
      )}
    </div>
  );
}
