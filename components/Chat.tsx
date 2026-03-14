import React, { useState } from 'react';
import { 
  MagnifyingGlass, 
  PaperPlaneRight, 
  Paperclip, 
  Smiley, 
  DotsThreeVertical,
  CheckCircle,
  Clock,
  DownloadSimple,
  PencilSimple,
  Phone,
  VideoCamera,
  Archive
} from '@phosphor-icons/react';

interface Message {
  id: string;
  text: string;
  sender: 'customer' | 'internal';
  timestamp: string;
  attachments?: string[];
}

interface Conversation {
  id: string;
  customerName: string;
  customerAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  plan: string;
  status: 'active' | 'archived';
  messages: Message[];
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    customerName: 'Sami Kletta',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Is the VAT report ready for download?',
    timestamp: '10:42 AM',
    unreadCount: 2,
    plan: 'Kletta Solo',
    status: 'active',
    messages: [
      { id: 'm1', sender: 'customer', text: 'Hi, I was checking my dashboard and noticed the VAT calculation seems a bit off for last month.', timestamp: 'Yesterday 14:30' },
      { id: 'm2', sender: 'internal', text: 'Hello Sami! Thanks for reaching out. Let me take a look at your account details. One moment please.', timestamp: 'Yesterday 14:35' },
      { id: 'm7', sender: 'customer', text: 'Great, thank you! One more question: Is the VAT report ready for download now?', timestamp: '10:42 AM' }
    ]
  },
  { id: '2', customerName: 'Timma Oy', lastMessage: 'Thanks for the update.', timestamp: 'Yesterday', unreadCount: 0, plan: 'Kletta Care', status: 'active', messages: [] },
  { id: '3', customerName: 'Origami Studio', lastMessage: 'Can we schedule a call?', timestamp: 'Tue', unreadCount: 0, plan: 'Kletta Solo', status: 'active', messages: [] },
];

const Chat: React.FC = () => {
  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId) || MOCK_CONVERSATIONS[0];

  return (
    <div className="flex h-full bg-white font-sans overflow-hidden">
      <div className="w-[320px] border-r border-[#E5E7EB] flex flex-col flex-shrink-0 bg-white">
        <div className="h-[64px] px-4 border-b border-[#E5E7EB] flex items-center flex-shrink-0">
           <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#616A6B]"><MagnifyingGlass size={16} /></div>
              <input type="text" placeholder="Search conversations..." className="w-full h-[42px] pl-10 pr-3 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl text-[14px] text-[#000000] font-medium placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors focus:outline-none" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {MOCK_CONVERSATIONS.map((conv) => (
            <div key={conv.id} onClick={() => setActiveConversationId(conv.id)} className={`h-[72px] px-4 flex items-center gap-3 cursor-pointer border-b border-[#F9FAFB] transition-colors ${activeConversationId === conv.id ? 'bg-[#FFF7D6] border-l-4 border-l-[#F7D84A] pl-[12px]' : 'bg-white hover:bg-[#F9FAFB] border-l-4 border-l-transparent pl-[12px]'}`}>
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#E5E7EB] overflow-hidden flex items-center justify-center border border-[#E5E7EB]">{conv.customerAvatar ? (<img src={conv.customerAvatar} alt="" className="w-full h-full object-cover" />) : (<span className="text-[#616A6B] font-medium text-xs">{conv.customerName.substring(0, 2).toUpperCase()}</span>)}</div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#166534] rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center h-full py-2">
                <div className="flex justify-between items-baseline mb-0.5"><span className="text-[13px] truncate font-medium text-[#000000]">{conv.customerName}</span><span className="text-[11px] text-[#616A6B] ml-2 flex-shrink-0 whitespace-nowrap">{conv.timestamp}</span></div>
                <div className="flex justify-between items-center"><p className="text-[12px] text-[#616A6B] truncate pr-2 font-medium">{conv.lastMessage}</p>{conv.unreadCount > 0 && (<div className="w-4 h-4 rounded-full bg-[#F7D84A] text-[#0F3A3E] text-[10px] font-medium flex items-center justify-center flex-shrink-0">{conv.unreadCount}</div>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <div className="h-[64px] px-6 border-b border-[#E5E7EB] flex items-center justify-between flex-shrink-0 bg-white">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F9FAFB] flex items-center justify-center border border-[#E5E7EB]">{activeConversation.customerAvatar ? (<img src={activeConversation.customerAvatar} alt="" className="w-full h-full object-cover rounded-full" />) : (<span className="text-[#616A6B] font-medium text-sm">{activeConversation.customerName.substring(0, 2)}</span>)}</div>
              <div className="flex flex-col">
                 <div className="flex items-center gap-2"><h2 className="text-[14px] font-medium text-[#000000]">{activeConversation.customerName}</h2><span className="bg-[#F9FAFB] text-[#616A6B] px-2 py-0.5 rounded-lg text-[10px] font-medium border border-[#E5E7EB] uppercase tracking-wide">{activeConversation.plan}</span></div>
                 <div className="flex items-center gap-1.5 mt-0.5"><span className="w-2 h-2 rounded-full bg-[#166534]"></span><span className="text-[11px] text-[#616A6B] font-medium">Active now</span><span className="text-[11px] text-[#616A6B]">Local time 14:22</span></div>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <button className="h-[36px] w-[36px] flex items-center justify-center rounded-xl border border-[#E5E7EB] text-[#616A6B] hover:bg-[#F9FAFB] hover:text-[#000000] transition-colors"><Phone size={18} /></button>
              <button className="h-[36px] w-[36px] flex items-center justify-center rounded-xl border border-[#E5E7EB] text-[#616A6B] hover:bg-[#F9FAFB] hover:text-[#000000] transition-colors"><VideoCamera size={18} /></button>
              <div className="h-4 w-px bg-[#E5E7EB] mx-1"></div>
              <button className="h-[36px] px-3 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl text-[13px] text-[#000000] font-medium flex items-center gap-2 shadow-sm transition-colors"><DownloadSimple size={16} className="text-[#616A6B]" />History</button>
              <button className="h-[36px] px-3 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl text-[13px] text-[#000000] font-medium flex items-center gap-2 shadow-sm transition-colors"><PencilSimple size={16} className="text-[#616A6B]" />Edit</button>
              <button className="h-[36px] w-[36px] flex items-center justify-center rounded-xl border border-[#E5E7EB] text-[#616A6B] hover:bg-[#F9FAFB] hover:text-[#000000] transition-colors ml-1"><DotsThreeVertical size={18} /></button>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-white space-y-6">
           {activeConversation.messages.map((msg) => (
             <div key={msg.id} className={`flex w-full ${msg.sender === 'internal' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[70%] ${msg.sender === 'internal' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                   <div className="flex-shrink-0 mt-auto">{msg.sender === 'internal' ? (<div className="w-8 h-8 rounded-full bg-[#0F3A3E] flex items-center justify-center text-[#F7D84A] text-xs font-medium border border-[#E5E7EB]">YOU</div>) : (<div className="w-8 h-8 rounded-full bg-[#E5E7EB] overflow-hidden border border-[#E5E7EB]">{activeConversation.customerAvatar ? (<img src={activeConversation.customerAvatar} alt="" className="w-full h-full object-cover" />) : (<div className="w-full h-full flex items-center justify-center text-[#616A6B] text-[10px] font-medium">{activeConversation.customerName.substring(0, 2)}</div>)}</div>)}</div>
                   <div className="flex flex-col gap-1 min-w-0"><div className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${msg.sender === 'internal' ? 'bg-[#FFF7D6] border border-[#F7D84A]/50 text-[#000000] rounded-br-none' : 'bg-white border border-[#E5E7EB] text-[#000000] rounded-bl-none'}`}>{msg.text}</div><span className={`text-[10px] text-[#616A6B] ${msg.sender === 'internal' ? 'text-right' : 'text-left'}`}>{msg.timestamp}</span></div>
                </div>
             </div>
           ))}
        </div>
        <div className="flex-shrink-0 p-4 bg-white border-t border-[#E5E7EB]">
           <div className="relative">
              <input type="text" placeholder="Type a message..." className="w-full h-[48px] pl-4 pr-[120px] bg-white border border-[#E5E7EB] rounded-xl text-[14px] font-medium text-[#000000] placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-all shadow-sm focus:outline-none" />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                 <button className="h-[36px] px-4 bg-[#F7D84A] hover:bg-[#fbbf24] text-[#0F3A3E] rounded-xl text-[12px] font-medium flex items-center gap-2 transition-colors ml-1 shadow-sm">Send <PaperPlaneRight size={14} weight="bold" /></button>
              </div>
           </div>
           <div className="text-center mt-2"><span className="text-[10px] text-[#616A6B]">Press Enter to send • Shift + Enter for new line</span></div>
        </div>
      </div>
    </div>
  );
};

export default Chat;