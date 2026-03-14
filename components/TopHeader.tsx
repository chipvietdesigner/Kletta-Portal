import React from 'react';
import { 
  Info, 
  DownloadSimple, 
  CalendarBlank, 
  Plus, 
  Globe, 
  ChatCircle,
  User,
  SealCheck
} from '@phosphor-icons/react';

interface TopHeaderProps {
  centerContent?: React.ReactNode;
  rightAction?: React.ReactNode;
}

const TopHeader: React.FC<TopHeaderProps> = ({ centerContent, rightAction }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#616A6B]"><User size={20} weight="fill" /></div>
          <div className="flex flex-col -space-y-0.5">
             <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-[#000000]">Sam Smith</span>
                <span className="text-[13px] font-bold text-[#0F3A3E] tracking-tight uppercase">PARTNER TRIAL</span>
                <Info size={16} className="text-[#000000]" weight="bold" />
             </div>
             <div className="flex items-center gap-1 text-[11px] text-[#0F3A3E] font-medium">
                <span>Sam's Barber (1234567890</span>
                <div className="flex items-center justify-center">
                  <SealCheck size={14} weight="fill" className="text-[#F7D84A]" />
                </div>
                <span>)</span>
                <span className="ml-2 font-bold uppercase tracking-wider">Not set</span>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-xs font-medium px-3 py-1.5 rounded flex items-center gap-2 transition-colors"><DownloadSimple size={14} />diary.csv</button>
           <button className="bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-xs font-medium px-4 py-1.5 rounded transition-colors">Edit</button>
        </div>
      </div>

      {/* Center content slot */}
      <div className="flex-1 flex justify-center px-4">
        {centerContent}
      </div>

      <div className="flex items-center gap-4">
        {rightAction}
        <button className="h-[32px] px-3 flex items-center gap-2 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white transition-colors shadow-sm">
           <CalendarBlank size={16} className="text-[#616A6B]" />
           <span className="text-[12px] font-medium text-[#616A6B]">This tax year (01.01 → 31.12.2025)</span>
        </button>
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        <div className="flex items-center gap-3 text-[#616A6B]">
          <button className="hover:text-[#000000] transition-colors"><Plus size={18} weight="bold" /></button>
          <button className="hover:text-[#000000] transition-colors"><Globe size={18} /></button>
          <button className="hover:text-[#000000] transition-colors flex items-center justify-center w-5 h-5"><span className="text-xs font-medium">🇬🇧</span></button>
          <button className="hover:text-[#000000] transition-colors"><ChatCircle size={18} /></button>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;