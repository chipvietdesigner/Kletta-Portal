import React, { useState } from 'react';
import { BankTransaction, ReconciledItem } from '../types';
import { X, Image, FileText } from '@phosphor-icons/react';

interface BankTransactionsTableProps {
  data: BankTransaction[];
  onReconcile?: (transaction: BankTransaction) => void;
}

const BankTransactionsTable: React.FC<BankTransactionsTableProps> = ({ data, onReconcile }) => {
  const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(Math.abs(amount));
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const getPillStyle = (item: ReconciledItem) => {
    if (item.pillColor === 'yellow' || (item.type === 'Income' || item.amount > 0)) return 'bg-[#FDE047] border-[#FDE047] text-[#000000] hover:bg-[#FCD34D]'; 
    return 'bg-[#F3F4F6] border-[#F3F4F6] text-[#000000] hover:bg-[#E5E7EB]';
  };

  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden mt-2 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="text-left table-fixed w-full border-collapse">
          <thead className="bg-[#F9FAFB] text-[#000000] sticky top-0 z-10 h-[48px]">
            <tr>
              <th className="px-4 font-medium text-[13px] w-[140px] border-b border-[#E5E7EB]">Date</th>
              <th className="px-4 font-medium text-[13px] w-[140px] border-b border-[#E5E7EB]">Amount</th>
              <th className="px-4 font-medium text-[13px] w-[240px] border-b border-[#E5E7EB]">Description</th>
              <th className="px-4 font-medium text-[13px] w-[120px] border-b border-[#E5E7EB]">Reference</th>
              <th className="px-4 font-medium text-[13px] w-[420px] border-b border-[#E5E7EB]">Reconciled</th>
              <th className="px-4 font-medium text-[13px] w-[280px] border-b border-[#E5E7EB]">Category</th>
              <th className="px-4 font-medium text-[13px] w-[100px] text-right border-b border-[#E5E7EB]">ID</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((t, index) => {
              const bgClass = 'bg-white';
              return (
                <tr key={t.id} className={`group transition-colors min-h-[64px] border-b border-[#E5E7EB] last:border-0 hover:bg-[#F3F4F6] ${bgClass}`}>
                  <td className="px-4 py-3 align-middle"><div className="text-[#616A6B] font-normal text-[13px]">{t.date}</div></td>
                  <td className="px-4 py-3 align-middle"><div className={`text-[13px] font-medium ${t.amount >= 0 ? 'text-[#10B981]' : 'text-[#000000]'}`}>{formatCurrency(t.amount)}</div></td>
                  <td className="px-4 py-3 align-middle"><div className="text-[#000000] font-medium text-[13px]">{t.description}</div></td>
                  <td className="px-4 py-3 align-middle"><div className="text-[#616A6B] text-[13px] font-normal">{t.reference || '-'}</div></td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex flex-col gap-2">
                      {!t.reconciled || !t.reconciledItems || t.reconciledItems.length === 0 ? (
                          <div className="self-start"><button onClick={() => onReconcile && onReconcile(t)} className="h-[30px] px-3 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-full text-[13px] font-medium text-[#000000] shadow-sm flex items-center gap-2"><span className="text-[#616A6B]">—</span> Unreconciled</button></div>
                      ) : (t.reconciledItems.map((item, idx) => (
                          <div key={idx} className={`flex items-center justify-between px-3 py-1.5 rounded-full border text-[12px] font-medium w-full max-w-[380px] ${getPillStyle(item)}`}>
                              <div className="flex items-center gap-3 overflow-hidden min-w-0"><span className="font-medium">{formatCurrency(item.amount)}</span><span className="truncate">{item.label} • {item.description}</span></div>
                              <button className="ml-2 text-current opacity-60 hover:opacity-100"><X size={12} weight="bold" /></button>
                          </div>
                        )))}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle"><div className="flex flex-col gap-2 items-start">{t.reconciledItems?.map((item, idx) => (<span key={idx} className="px-3 py-1.5 rounded-full text-[12px] font-medium border bg-[#F3F4F6] border-[#F3F4F6] text-[#000000]">{item.categoryLabel || '— Uncategorized'}</span>)) || <span className="px-3 py-1.5 rounded-full text-[12px] font-medium border bg-white border-[#E5E7EB] text-[#000000] shadow-sm">— Uncategorized</span>}</div></td>
                  <td className="px-4 py-3 align-middle text-right"><div className="text-[#616A6B] text-[12px] font-normal">{t.id}</div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{data.length}</span> results found</div>
      </div>
    </div>
  );
};

export default BankTransactionsTable;