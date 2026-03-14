import React, { useState } from 'react';
import { 
  CaretDown, 
  Image
} from '@phosphor-icons/react';

const AUTO_MESSAGES_DATA = [
  {
    id: 1,
    title: 'Auto-message to new Sole Trader (David Kletta AI Assistant)',
    preview: "Hi, I'm David, your AI assistant. You can ask me anything about sole trader accounting and using Kletta",
  },
  {
    id: 2,
    title: 'Auto-message to new Sole Trader',
    preview: 'English automessage',
  },
  {
    id: 3,
    title: 'Auto message after 1 day',
    preview: 'English automessage after 1 day',
  },
  {
    id: 4,
    title: 'Auto message after 2 days',
    preview: 'English automessage after 2 days',
  },
  {
    id: 5,
    title: 'Auto message after 3 days',
    preview: 'English automessage',
  },
  {
    id: 6,
    title: 'Auto message after 4 days',
    preview: 'English automessage after 4 days',
  },
  {
    id: 7,
    title: 'Auto message after 5 days',
    preview: 'English automessage after 5 days',
  },
  {
    id: 8,
    title: 'Auto message after 6 days',
    preview: 'English automessage after 6 days',
  },
  {
    id: 9,
    title: 'Auto message after 7 days',
    preview: 'English automessage after 7 days',
  },
  {
    id: 10,
    title: 'Auto message after 14 days',
    preview: 'English automessage after 8 days',
  },
];

const Account: React.FC = () => {
  // Global View State
  const [messageLanguage, setMessageLanguage] = useState('English');

  // Personal Details State
  const [isPersonalDetailsEditing, setIsPersonalDetailsEditing] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    companyName: 'JOHNDOE LLC',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    contactPerson: 'John Doe',
    language: 'English'
  });

  // Auto-messages State
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editMessageValue, setEditMessageValue] = useState('');

  const handleEditMessage = (id: number, currentText: string) => {
    setEditingMessageId(id);
    setEditMessageValue(currentText);
  };

  const handleSaveMessage = () => {
    // In a real app, save to backend
    setEditingMessageId(null);
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
      <div className="max-w-[960px] mx-auto px-6 py-8 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Account Settings</h1>
        </div>

        {/* Personal Details Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-8">
          <div className="flex items-start justify-between mb-8">
             <h2 className="text-[15px] font-semibold text-[#000000]">Personal details</h2>
             
             {isPersonalDetailsEditing ? (
               <div className="flex gap-2">
                 <button 
                   onClick={() => setIsPersonalDetailsEditing(false)}
                   className="h-[36px] px-4 bg-white border border-[#E5E7EB] hover:bg-[#F3F4F6] text-[13px] text-[#0F2F33] font-medium rounded-xl transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={() => setIsPersonalDetailsEditing(false)}
                   className="h-[36px] px-4 bg-[#0F3A3E] hover:bg-[#0F2F33] text-[13px] text-white font-medium rounded-xl transition-colors shadow-sm"
                 >
                   Save
                 </button>
               </div>
             ) : (
               <button 
                 onClick={() => setIsPersonalDetailsEditing(true)}
                 className="h-[36px] px-4 bg-white border border-[#E5E7EB] hover:bg-[#F3F4F6] text-[13px] text-[#0F2F33] font-medium rounded-xl transition-colors shadow-sm"
               >
                 Update
               </button>
             )}
          </div>

          <div className="flex gap-10">
            {/* Logo Section - Always visible */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4 pt-1">
              <div className="w-28 h-28 rounded-full bg-[#F7D84A] flex items-center justify-center overflow-hidden shadow-sm relative group">
                 <img src="https://i.ibb.co/99RKpWNq/Color-Black.png" alt="Kletta" className="w-16 h-auto opacity-90" />
              </div>
              <button className="h-[36px] px-4 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl text-[12px] text-[#0F2F33] font-medium shadow-sm transition-colors whitespace-nowrap">
                Update logo
              </button>
            </div>

            {/* Fields Section */}
            <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6">
               
               {/* Description - Full width */}
               <div className="col-span-2 space-y-2">
                  <label className="text-[13px] font-medium text-[#0F2F33]">Description</label>
                  {isPersonalDetailsEditing ? (
                    <input 
                      type="text"
                      value={personalDetails.description}
                      onChange={(e) => setPersonalDetails({...personalDetails, description: e.target.value})}
                      className="w-full h-[42px] px-3 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#0F2F33] font-medium focus:outline-none focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors"
                    />
                  ) : (
                    <div className="text-[13px] text-[#6B7280] leading-relaxed py-2">
                      {personalDetails.description}
                    </div>
                  )}
               </div>

               {/* Company Name */}
               <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#0F2F33]">Company name</label>
                  {isPersonalDetailsEditing ? (
                    <input 
                      type="text"
                      value={personalDetails.companyName}
                      onChange={(e) => setPersonalDetails({...personalDetails, companyName: e.target.value})}
                      className="w-full h-[42px] px-3 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#0F2F33] font-medium focus:outline-none focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors"
                    />
                  ) : (
                    <div className="text-[13px] text-[#6B7280] py-2 uppercase tracking-wide">
                      {personalDetails.companyName}
                    </div>
                  )}
               </div>

               {/* Contact Person */}
               <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#0F2F33]">Name of the contact person</label>
                  {isPersonalDetailsEditing ? (
                    <input 
                      type="text"
                      value={personalDetails.contactPerson}
                      onChange={(e) => setPersonalDetails({...personalDetails, contactPerson: e.target.value})}
                      className="w-full h-[42px] px-3 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#0F2F33] font-medium focus:outline-none focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors"
                    />
                  ) : (
                    <div className="text-[13px] text-[#6B7280] py-2">
                      {personalDetails.contactPerson}
                    </div>
                  )}
               </div>

               {/* Language */}
               <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#0F2F33]">Language</label>
                  {isPersonalDetailsEditing ? (
                    <div className="relative">
                      <select 
                        value={personalDetails.language}
                        onChange={(e) => setPersonalDetails({...personalDetails, language: e.target.value})}
                        className="w-full h-[42px] pl-9 pr-8 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#0F2F33] font-medium focus:outline-none focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors appearance-none cursor-pointer"
                      >
                        <option>English</option>
                        <option>Finnish</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xl">
                        🇺🇸
                      </div>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#9CA3AF]">
                        <CaretDown size={14} weight="bold" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 py-2">
                       <span className="text-xl">🇺🇸</span>
                       <span className="text-[13px] text-[#6B7280]">{personalDetails.language}</span>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>

        {/* Auto-messages Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-[#E5E7EB] pb-6">
             <h2 className="text-[15px] font-semibold text-[#000000] mb-2">Auto-messages</h2>
             <p className="text-[13px] text-[#6B7280] max-w-2xl leading-relaxed mb-6">
               Kletta will help on boarding sole traders with automatic default messages that can me amended.
             </p>

             <div className="space-y-3">
               <label className="text-[13px] font-medium text-[#0F2F33] block">Edit auto-message for users in language</label>
               <div className="flex gap-2">
                 {['Finnish', 'English (Finnish)', 'English'].map((lang) => (
                   <button
                     key={lang}
                     onClick={() => setMessageLanguage(lang)}
                     className={`h-[42px] px-5 rounded-xl text-[13px] font-medium transition-colors shadow-sm border ${
                       messageLanguage === lang
                         ? 'bg-[#0F3A3E] border-[#0F3A3E] text-white'
                         : 'bg-white border-[#E5E7EB] text-[#0F2F33] hover:bg-[#F3F4F6]'
                     }`}
                   >
                     {lang}
                   </button>
                 ))}
               </div>
             </div>
          </div>

          {/* Messages List */}
          <div className="divide-y divide-[#E5E7EB]">
            {AUTO_MESSAGES_DATA.map((msg) => (
              <div key={msg.id} className="group px-8 py-5 min-h-[80px] flex items-center hover:bg-[#F3F4F6]/50 transition-colors">
                
                {editingMessageId === msg.id ? (
                  // EDIT MODE ROW
                  <div className="w-full flex items-center gap-4">
                     <div className="flex-1">
                        <input 
                          type="text" 
                          value={editMessageValue}
                          onChange={(e) => setEditMessageValue(e.target.value)}
                          className="w-full h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#0F2F33] font-medium focus:outline-none focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors shadow-sm"
                          autoFocus
                        />
                     </div>
                     <div className="flex items-center gap-2">
                       <button 
                         onClick={() => setEditingMessageId(null)}
                         className="h-[42px] px-4 bg-white border border-[#E5E7EB] hover:bg-[#F3F4F6] text-[13px] text-[#0F2F33] font-medium rounded-xl transition-colors"
                       >
                         Cancel
                       </button>
                       <button 
                         onClick={handleSaveMessage}
                         className="h-[42px] px-4 bg-[#0F3A3E] hover:bg-[#0F2F33] text-[13px] text-white font-medium rounded-xl transition-colors shadow-sm"
                       >
                         Save
                       </button>
                     </div>
                  </div>
                ) : (
                  // VIEW MODE ROW
                  <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-1 pr-8">
                       <h3 className="text-[13px] font-medium text-[#0F2F33]">{msg.title}</h3>
                       <p className="text-[13px] text-[#6B7280] leading-relaxed line-clamp-1">{msg.preview}</p>
                    </div>
                    <div className="flex-shrink-0">
                       <button 
                         onClick={() => handleEditMessage(msg.id, msg.preview)}
                         className="h-[36px] px-4 bg-white border border-[#E5E7EB] hover:bg-[#F3F4F6] hover:border-[#D1D5DB] rounded-xl text-[12px] text-[#0F2F33] font-medium shadow-sm transition-all flex items-center gap-2"
                         disabled={editingMessageId !== null && editingMessageId !== msg.id} // Disable other edit buttons while one is active
                       >
                         Edit
                       </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;