import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  PlusCircle, Edit3, Calendar, Tag, ChevronRight, LogOut, Newspaper, 
  Trash2, LayoutDashboard, FileText, Users, Settings, Database,
  Briefcase, MessageSquare, ShieldCheck, Search, Menu, X, Info
} from 'lucide-react';

export type Role = 'admin' | 'editor' | 'moderator' | 'reviewer' | 'viewer';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  roles: Role[];
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Обзор', href: '/admin/overview', roles: ['admin', 'editor', 'moderator'] },
  { icon: <Newspaper size={20} />, label: 'Новости', href: '/admin/news', roles: ['admin', 'editor'] },
  { icon: <Briefcase size={20} />, label: 'Заявки', href: '/admin/leads', roles: ['admin', 'moderator'] },
  { icon: <Users size={20} />, label: 'Пользователи', href: '/admin/users', roles: ['admin'] },
  { icon: <Info size={20} />, label: 'Инфо', href: '/admin/info', roles: ['admin', 'editor', 'moderator'] },
];

export default function AdminSidebar({ userRole }: { userRole: Role }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    router.push('/admin');
  };

  const filteredItems = SIDEBAR_ITEMS.filter(item => item.roles.includes(userRole));

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg border border-gray-100 shadow-md md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`fixed left-0 top-0 h-full bg-[#163A5C] text-white transition-all duration-300 z-40 ${isOpen ? 'w-72' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'}`}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Section */}
          <div className="p-8 border-b border-white/5 flex items-center gap-4">
             <div className="w-10 h-10 bg-[#B8D430] rounded-xl flex items-center justify-center shrink-0">
               <ShieldCheck size={24} className="text-[#163A5C]" />
             </div>
             {isOpen && (
               <div className="flex flex-col">
                 <span className="font-black text-xl tracking-tight leading-none">MIGO Panel</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8D430] mt-1">{userRole}</span>
               </div>
             )}
          </div>

          {/* Navigation */}
          <nav className="flex-grow p-4 space-y-2 py-8">
            {filteredItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive ? 'bg-[#2196D3] text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  <div className={`${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                    {item.icon}
                  </div>
                  {isOpen && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Section / Logout */}
          <div className="p-4 border-t border-white/5 bg-black/10">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm group"
            >
              <LogOut size={20} className="text-red-500/70 group-hover:text-red-400" />
              {isOpen && <span>Выход</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
