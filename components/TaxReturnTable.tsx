import React, { useState } from 'react';
import { TaxReturnRow } from '../types';
import { SealCheck, FileSearch } from '@phosphor-icons/react';

interface TaxReturnTableProps {
  data: TaxReturnRow[];
}

const TaxReturnTable: React.FC<TaxReturnTableProps> = ({ data }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'SENT': return 'bg-[#DCFCE7] text-[#166534] border-[#DCFCE7]';
      case 'NOT SENT': return 'bg-[#FEE2E2] text-[#991B1B] border-[#FEE2E2]';
      default: return 'bg-[#F3F4F6] text-[#4B5563] border-[#F3F4F6]';
    }
  };

  const getPlanStyle = (plan: string) => {
    if (plan.includes('PRO')) return 'bg-[#F3E8FF] text-[#6B21A8] border-[#F3E8FF]';
    if (plan.includes('DUO')) return 'bg-[#DBEAFE] text-[#1E40AF] border-[#DBEAFE]';
    if (plan.includes('TRIAL')) return 'bg-[#FEF3C7] text-[#92400E] border-[#FEF3C7]';
    return 'bg-[#F3F4F6] text-[#4B5563] border-[#F3F4F6]';
  };

  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden mt-2 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0 flex flex-col">
        <table className="text-left table-fixed w-full border-collapse">
          {/* Header */}
          <thead className="bg-[#F9FAFB] text-[#000000] sticky top-0 z-10 h-[48px]">
            <tr>
              <th className="px-4 font-medium text-[13px] w-[60px] text-center border-b border-[#E5E7EB]">#</th>
              <th className="px-4 font-medium text-[13px] w-[120px] text-center border-b border-[#E5E7EB]">Send status</th>
              <th className="px-4 font-medium text-[13px] w-[220px] border-b border-[#E5E7EB]">E-mail</th>
              <th className="px-4 font-medium text-[13px] w-[180px] border-b border-[#E5E7EB]">Company name</th>
              <th className="px-4 font-medium text-[13px] w-[120px] border-b border-[#E5E7EB]">First name</th>
              <th className="px-4 font-medium text-[13px] w-[120px] border-b border-[#E5E7EB]">Last name</th>
              <th className="px-4 font-medium text-[13px] w-[120px] border-b border-[#E5E7EB]">Plan</th>
              <th className="px-4 font-medium text-[13px] w-[100px] border-b border-[#E5E7EB]">Status</th>
              <th className="px-4 font-medium text-[13px] w-[140px] border-b border-[#E5E7EB]">UTR</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, index) => {
              const isRowHovered = hoveredRowId === row.id;
              const bgClass = isRowHovered ? 'bg-[#FAFAF8]' : 'bg-white';
              
              return (
                <tr
                  key={row.id}
                  className={`group transition-colors h-[64px] border-b border-[#E5E7EB] last:border-0 ${bgClass}`}
                  onMouseEnter={() => setHoveredRowId(row.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                >
                  <td className="p-0">
                    <div className="h-full flex items-center justify-center px-4 text-[#9CA3AF] font-medium text-[13px]">{index + 1}</div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center justify-center px-4">
                        <span className={`px-3 py-1 rounded-lg text-[12px] font-bold border ${getStatusColor(row.sendStatus)}`}>
                          {row.sendStatus}
                        </span>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center px-4 text-[#000000] font-medium truncate hover:text-[#1E6F73] cursor-pointer transition-colors text-[13px]">
                      {row.email}
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center px-4 text-[#000000] font-medium truncate text-[13px]">
                      {row.companyName || <span className="text-[#E5E7EB]">-</span>}
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center px-4 text-[#000000] truncate text-[13px] font-normal">
                      {row.firstName || <span className="text-[#E5E7EB]">-</span>}
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center px-4 text-[#000000] truncate text-[13px] font-normal">
                      {row.lastName || <span className="text-[#E5E7EB]">-</span>}
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center px-4">
                        <span className={`px-3 py-1 rounded-lg text-[12px] font-normal border ${getPlanStyle(row.plan)}`}>
                          {row.plan}
                        </span>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center px-4 text-[13px] text-[#000000] font-normal">
                      {row.status}
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center px-4 text-[#000000] text-[13px] font-normal">
                      <span className="mr-2">{row.utr}</span>
                      {row.isUtrVerified ? (
                        <SealCheck size={16} weight="fill" className="text-[#000000]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#FCD34D] bg-[#FEF3C7] flex items-center justify-center">
                          <span className="text-[10px] text-[#000000] font-normal">!</span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-[#F9F9F8] rounded-full flex items-center justify-center mb-4">
              <FileSearch size={32} className="text-[#9CA3AF]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#000000] mb-1">No tax returns found</h3>
            <p className="text-[13px] text-[#616A6B]">There are no records to display for this period.</p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{data.length}</span> results found</div>
      </div>
    </div>
  );
};

export default TaxReturnTable;