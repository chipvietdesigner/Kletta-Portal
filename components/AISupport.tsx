import React, { useState } from 'react';
import { DownloadSimple } from '@phosphor-icons/react';

const MOCK_MESSAGES = `Hei, olen Kletta, tekoälykirjanpitäjäsi...`;

const AISupport: React.FC = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-white flex flex-col h-full">
      <div className="mb-6 flex items-center justify-between flex-shrink-0">
        <h1 className="text-2xl font-medium text-[#000000]">AI Support Intelligence</h1>
        <button className="bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] text-xs font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm h-[36px]"><DownloadSimple size={16} weight="bold" />Download CSV</button>
      </div>
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
          <div className="px-8 py-6 border-b border-[#E5E7EB] flex-shrink-0"><h2 className="text-[14px] font-medium text-[#616A6B] uppercase tracking-wide">MESSAGES</h2></div>
          <div className="p-8 flex-1 flex flex-col min-h-0"><textarea value={messages} onChange={(e) => setMessages(e.target.value)} className="w-full h-full p-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] font-medium text-[#000000] leading-relaxed focus:outline-none focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors resize-none custom-scrollbar" placeholder="Enter AI support messages here..." /></div>
          <div className="px-8 py-6 border-t border-[#E5E7EB] flex justify-end flex-shrink-0 bg-white rounded-b-xl"><button className="h-[42px] px-6 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] text-[13px] font-medium rounded-xl transition-colors shadow-sm">Save</button></div>
        </div>
      </div>
    </div>
  );
};

export default AISupport;