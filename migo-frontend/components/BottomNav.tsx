import Link from 'next/link';
import { Home, FileText, MessageCircle, Menu } from 'lucide-react';
import { getBotUrl } from '@/utils/bot';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-migo-gray pb-safe z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link href="/work" className="flex flex-col items-center justify-center w-full h-full text-migo-navy hover:text-migo-blue transition-colors cursor-pointer">
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Работа</span>
        </Link>
        <Link href="/services" className="flex flex-col items-center justify-center w-full h-full text-migo-navy hover:text-migo-blue transition-colors cursor-pointer">
          <FileText className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Документы</span>
        </Link>
        <Link href={getBotUrl({ source: 'site', medium: 'bottom_nav' })} target="_blank" className="flex flex-col items-center justify-center w-full h-full text-migo-blue cursor-pointer">
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Telegram</span>
        </Link>
        <button className="flex flex-col items-center justify-center w-full h-full text-migo-navy hover:text-migo-blue transition-colors cursor-pointer">
          <Menu className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Меню</span>
        </button>
      </div>
    </nav>
  );
}