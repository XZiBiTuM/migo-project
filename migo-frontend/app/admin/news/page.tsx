"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlusCircle, Edit3, Calendar, Tag, ChevronRight, LogOut, Newspaper, Trash2 } from 'lucide-react';
import { getCategoryLabel } from '@/utils/news';

export default function AdminNewsDashboard() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/admin');
      return;
    }
    setIsAuth(true);
    fetchNews();
  }, [router]);

  const fetchNews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setNews(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/admin');
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту статью?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${slug}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      if (res.ok) {
        setNews(news.filter(item => item.slug !== slug));
      } else {
        alert('Ошибка при удалении статьи');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка подключения к серверу');
    }
  };

  if (!isAuth) return null;

  return (
    <div className="pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-[#163A5C] mb-2 flex items-center gap-3">
            <Newspaper className="text-[#2196D3]" /> Управление новостями
          </h1>
          <p className="text-gray-500 font-medium">Добавляйте, редактируйте и публикуйте новости сайта</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Link href="/admin/news/create" className="flex-1 md:flex-none bg-[#B8D430] hover:opacity-90 text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 whitespace-nowrap">
            <PlusCircle size={20} /> Создать статью
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2196D3]"></div>
        </div>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-[#2196D3] bg-[#2196D3]/10">
                    {getCategoryLabel(item.category)}
                  </span>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${item.status === 'published' ? 'text-green-600 bg-green-50' : 'text-orange-500 bg-orange-50'}`}>
                    {item.status === 'published' ? 'Опубликовано' : 'Черновик'}
                  </span>
                </div>
                <h3 className="font-bold text-[#163A5C] text-lg mb-2 group-hover:text-[#2196D3] transition-colors">{item.title}</h3>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5 font-medium"><Calendar size={14} /> {new Date(item.published_at || item.created_at).toLocaleDateString('ru-RU')}</span>
                  <span className="font-mono text-[10px] text-gray-300">/{item.slug}</span>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                 <Link href={`/news/${item.slug}`} target="_blank" className="flex-1 md:flex-none px-4 py-2 bg-gray-50 text-gray-400 font-bold rounded-lg text-xs border border-gray-100 hover:bg-gray-100 text-center transition-all">
                   Просмотр
                 </Link>
                 <Link href={`/admin/news/edit/${item.slug}`} className="flex-1 md:flex-none px-4 py-2 bg-[#2196D3] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 hover:bg-[#1976B0] transition-all">
                   <Edit3 size={16} /> Правка
                 </Link>
                 <button 
                   onClick={() => handleDelete(item.slug)}
                   className="flex-1 md:flex-none px-4 py-2 bg-white text-red-500 font-bold rounded-lg text-xs flex items-center justify-center gap-2 border border-red-100 hover:bg-red-50 transition-all"
                 >
                   <Trash2 size={16} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-gray-200 shadow-sm">
           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Newspaper className="text-gray-200" size={40} />
           </div>
           <h3 className="text-xl font-bold text-[#163A5C] mb-2">Новостей пока нет</h3>
           <p className="text-gray-400 mb-8 max-w-xs mx-auto font-medium">Самое время создать вашу первую публикацию!</p>
           <Link href="/admin/news/create" className="inline-flex bg-[#B8D430] text-white px-8 py-4 rounded-xl font-bold shadow-md hover:opacity-90 transition-all">
             Создать статью
           </Link>
        </div>
      )}
    </div>
  );
}
