import React, { useState } from 'react';
import { X, MagnifyingGlass, Image, FileText, Receipt } from '@phosphor-icons/react';
import { BankTransaction } from '../types';

interface ChooseExpensesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (expenseId: string) => void;
  transaction: BankTransaction | null;
}

const ChooseExpensesModal: React.FC<ChooseExpensesModalProps> = ({ isOpen, onClose, onConfirm, transaction }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  if (!isOpen) return null;
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Math.abs(val));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#002b31]/60 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[1000px] h-[80vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#E5E7EB] bg-white flex-shrink-0 relative">
          <div className="absolute left-0 right-0 text-center pointer-events-none"><h2 className="text-[16px] font-medium text-[#000000] tracking-wide uppercase">CHOOSE EXPENSES</h2></div>
          <div className="flex-1"></div>
          <button onClick={onClose} className="p-2 text-[#616A6B] hover:text-[#000000] hover:bg-gray-100 rounded-full transition-colors z-10"><X size={20} weight="bold" /></button>
        </div>
        {transaction && (<div className="px-8 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between flex-shrink-0">
             <div className="flex flex-col"><span className="text-[12px] text-[#616A6B] font-medium">{transaction.date}</span><span className="text-[16px] font-medium text-[#000000]">{transaction.description}</span></div>
             <div className={`text-[20px] font-medium ${transaction.amount >= 0 ? 'text-[#10B981]' : 'text-[#000000]'}`}>{formatCurrency(transaction.amount)}</div>
          </div>)}
        <div className="px-8 py-4 border-b border-[#E5E7EB] flex-shrink-0">
           <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#616A6B]"><MagnifyingGlass size={18} /></div>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full h-[48px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors focus:outline-none font-medium" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
           <div className="px-8 py-2">
              <span className="text-[13px] text-[#616A6B] font-medium">Select an expense to reconcile</span>
           </div>
        </div>
        <div className="px-8 py-5 border-t border-[#E5E7EB] bg-white flex items-center justify-between flex-shrink-0">
           <div className="flex gap-4">
              <button onClick={onClose} className="px-6 py-2.5 text-[14px] font-medium text-[#000000] hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-200">Cancel</button>
              <button onClick={() => selectedId && onConfirm(selectedId)} disabled={!selectedId} className={`px-8 py-2.5 text-[14px] font-medium rounded-xl transition-colors shadow-sm ${selectedId ? 'bg-[#F7D84A] text-[#0F3A3E]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>Confirm selection</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseExpensesModal;