import React, { useState, useRef, useEffect } from 'react';
import { ExpenseTransaction } from '../types';
import { 
  FileText, 
  SealCheck, 
  Trash, 
  CaretDown, 
  ArrowsDownUp,
  Storefront,
  Car,
  Users,
  Buildings,
  Wrench,
  Gavel,
  CreditCard,
  Phone as PhoneIcon,
  Archive,
  WarningCircle,
  Bank,
  User as UserIcon,
  Money,
  Check,
  X,
  PlusCircle,
  Briefcase,
  FileSearch
} from '@phosphor-icons/react';

interface ExpensesTableProps {
  transactions: ExpenseTransaction[];
}

interface CategoryOption {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'c1', label: 'Costs of goods bought for resale or goods used', description: 'Inventory and cost of sales', icon: Storefront },
  { id: 'c2', label: 'Car, van and travel expenses', description: 'Fuel, maintenance, travel', icon: Car },
  { id: 'c3', label: 'Wages, salaries and other staff costs', description: 'Employee related expenses', icon: Users },
  { id: 'c4', label: 'Rent, rates, power and insurance costs', description: 'Office and facility costs', icon: Buildings },
  { id: 'c5', label: 'Repairs and maintenance of property and equipment', description: 'Fixing business assets', icon: Wrench },
  { id: 'c6', label: 'Accountancy, legal and other professional fees', description: 'Professional service fees', icon: Gavel },
  { id: 'c7', label: 'Interest and bank and credit card financial charges', description: 'Financial fees and interest', icon: CreditCard },
  { id: 'c8', label: 'Phone, fax, stationery and other office costs', description: 'Comm. and office supplies', icon: PhoneIcon },
  { id: 'c9', label: 'Other allowable business expenses', description: 'Misc business costs', icon: Archive },
  { id: 'c10', label: 'Non-allowable business expenses', description: 'Not tax deductible', icon: WarningCircle },
  { id: 'c11', label: 'Withdrawal, transfer and credit card', description: 'Money movement', icon: Bank },
  { id: 'c12', label: 'Business owner wages', description: 'Owner drawings', icon: UserIcon },
  { id: 'c13', label: 'Capital', description: 'Large asset purchases', icon: Money },
];

const ExpensesTable: React.FC<ExpensesTableProps> = ({ transactions: initialTransactions }) => {
  const [transactions, setTransactions] = useState<ExpenseTransaction[]>(initialTransactions);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [hoveredColKey, setHoveredColKey] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [modifiedCells, setModifiedCells] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTransactions(initialTransactions);
    setModifiedCells(new Set());
  }, [initialTransactions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);

  const calculateTotals = () => {
    const subtotal = transactions.reduce((sum, t) => sum + t.subtotal, 0);
    const vat = transactions.reduce((sum, t) => sum + t.vat, 0);
    const total = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    return { subtotal, vat, total };
  };
  
  const totals = calculateTotals();

  const handleUpdateTransaction = (id: string, updates: Partial<ExpenseTransaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    const keys = Object.keys(updates);
    if (keys.length > 0) {
      setModifiedCells(prev => {
        const next = new Set(prev);
        keys.forEach(key => next.add(`${id}-${key}`));
        return next;
      });
    }
  };

  const handleSaveAll = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setHoveredRowId(null);
    setHoveredColKey(null);
    setOpenDropdownId(null);
    setModifiedCells(new Set());
  };

  const getCategoryIcon = (category: string) => {
    const opt = CATEGORY_OPTIONS.find(o => o.label === category);
    return opt ? opt.icon : Briefcase;
  };

  const InlineSaveButton = ({ visible }: { visible: boolean }) => {
    if (!visible) return null;
    return (
      <button 
        onClick={(e) => handleSaveAll(e)}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full border border-[#1E6F73] bg-white text-[#1E6F73] flex items-center justify-center shadow-sm z-[60] hover:bg-[#EFF6F7] transition-all transform active:scale-90"
      >
        <Check size={14} weight="bold" />
      </button>
    );
  };

  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden mt-2 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar flex flex-col">
        <table className="text-left table-fixed w-full border-collapse">
          <thead className="bg-[#F9FAFB] text-[#000000] sticky top-0 z-50">
            <tr>
              <th className="px-4 py-3 font-medium text-[13px] w-[140px] text-left align-top border-b border-[#E5E7EB]">
                <div className="flex items-center gap-1 mb-1">
                  <span>Total amount</span>
                  <ArrowsDownUp size={14} className="text-[#6B7280]" />
                </div>
                <div className="text-[12px] font-semibold text-[#000000]">{formatCurrency(totals.total)}</div>
              </th>
              
              <th className="px-4 py-3 font-medium text-[13px] w-[200px] text-left align-middle border-b border-[#E5E7EB]">
                <div className="flex items-center gap-1">
                  <span>Category</span>
                  <ArrowsDownUp size={14} className="text-[#6B7280]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-medium text-[13px] w-[130px] text-left align-middle border-b border-[#E5E7EB]">
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <ArrowsDownUp size={14} className="text-[#6B7280]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-medium text-[13px] w-[240px] text-left align-middle border-b border-[#E5E7EB]">
                <div className="flex items-center gap-1">
                  <span>Customer</span>
                  <ArrowsDownUp size={14} className="text-[#6B7280]" />
                </div>
              </th>

              <th className="px-4 py-3 font-medium text-[13px] w-[60px] text-center align-middle border-b border-[#E5E7EB]">Doc</th>
              <th className="px-4 py-3 font-medium text-[13px] w-[140px] text-left align-middle border-b border-[#E5E7EB]">Receipt ID</th>
              <th className="px-4 py-3 font-medium text-[13px] w-[100px] text-left align-middle border-b border-[#E5E7EB]">Tax rate</th>
              <th className="px-4 py-3 font-medium text-[13px] w-[120px] text-right align-top border-b border-[#E5E7EB]">
                <div className="mb-1">VAT</div>
                <div className="text-[12px] font-semibold text-[#000000]">{formatCurrency(totals.vat)}</div>
              </th>
              <th className="px-4 py-3 font-medium text-[13px] w-[140px] text-right align-top border-b border-[#E5E7EB]">
                <div className="flex items-center justify-end gap-1 mb-1">
                  <span>Subtotal</span>
                  <ArrowsDownUp size={14} className="text-[#6B7280]" />
                </div>
                <div className="text-[12px] font-semibold text-[#000000]">{formatCurrency(totals.subtotal)}</div>
              </th>
              <th className="px-4 py-3 font-medium text-[13px] w-[80px] text-center align-middle border-b border-[#E5E7EB]">Verified</th>
              <th className="px-4 py-3 font-medium text-[13px] w-[80px] text-center align-middle border-b border-[#E5E7EB]">AI Ver..</th>
              <th className="px-4 py-3 font-medium text-[13px] w-[80px] text-center align-middle border-b border-[#E5E7EB]"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((t, index) => {
              const isRowHovered = hoveredRowId === t.id;
              const isDropdownOpen = openDropdownId === t.id;
              const CategoryIcon = getCategoryIcon(t.category);
              const isCellEditable = (colKey: string) => isRowHovered && hoveredColKey === colKey;
              const bgClass = isRowHovered ? 'bg-[#FAFAF8]' : 'bg-white';

              return (
                <tr 
                  key={t.id} 
                  className={`group transition-all h-[64px] border-b border-[#E5E7EB] last:border-0 ${bgClass}`} 
                  onMouseEnter={() => setHoveredRowId(t.id)} 
                  onMouseLeave={() => { setHoveredRowId(null); setHoveredColKey(null); }}
                >
                  {/* Total Amount */}
                  <td className="p-0" onMouseEnter={() => setHoveredColKey('totalAmount')}>
                    <div className="h-full flex items-center justify-start px-4 relative">
                      {isCellEditable('totalAmount') ? (
                        <div className="relative w-full">
                           <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[12px]">€</span>
                           <input 
                             type="number"
                             value={t.totalAmount}
                             onChange={(e) => handleUpdateTransaction(t.id, { totalAmount: parseFloat(e.target.value) || 0 })}
                             className="w-full h-[36px] pl-6 pr-8 bg-white border border-[#1E6F73] rounded-lg text-[14px] font-medium text-[#000000] focus:outline-none"
                           />
                           <InlineSaveButton visible={modifiedCells.has(`${t.id}-totalAmount`)} />
                        </div>
                      ) : (
                        <span className="font-medium text-[#000000] text-[14px]">{formatCurrency(t.totalAmount)}</span>
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-0 relative" onMouseEnter={() => setHoveredColKey('category')}>
                    <div 
                      className="h-full flex items-center px-4 cursor-pointer relative overflow-hidden"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(isDropdownOpen ? null : t.id);
                      }}
                    >
                      <div className={`flex items-center gap-2 px-3 h-[32px] rounded-lg transition-all border w-full max-w-full min-w-0 ${isDropdownOpen || isCellEditable('category') ? 'border-[#1E6F73] bg-white' : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB]'}`}>
                        <CategoryIcon size={16} weight="regular" className="text-[#000000] flex-shrink-0" />
                        <span className="text-[#000000] text-[12px] font-medium truncate flex-1 min-w-0">{t.category}</span>
                        <CaretDown size={14} className={`text-[#9CA3AF] transition-all flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>

                      {isDropdownOpen && (
                        <div 
                          ref={dropdownRef}
                          className="absolute top-[calc(100%+8px)] left-0 w-[420px] bg-white rounded-[16px] shadow-[0px_12px_30px_0px_rgba(0,0,0,0.16)] border-[0.5px] border-[rgba(0,0,0,0.1)] max-h-[500px] overflow-y-auto z-50 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(0,0,0,0.05)] sticky top-0 bg-white z-10">
                            <span className="text-[14px] font-normal text-[#000000] tracking-tight">Choose category</span>
                            <button 
                              onClick={() => setOpenDropdownId(null)}
                              className="p-1.5 text-[#616A6B] hover:text-[#000000] hover:bg-[#f5f5f5] rounded-full transition-colors"
                            >
                              <X size={18} weight="bold" />
                            </button>
                          </div>
                          
                          <div className="flex flex-col gap-[4px] p-[14px]">
                            {CATEGORY_OPTIONS.map((option) => {
                              const isActive = t.category === option.label;
                              return (
                                <button
                                  key={option.id}
                                  onClick={() => {
                                    handleUpdateTransaction(t.id, { category: option.label });
                                    setOpenDropdownId(null);
                                    handleSaveAll();
                                  }}
                                  className={`w-full rounded-[8px] p-[8px] flex items-center gap-[12px] transition-colors text-left ${
                                    isActive ? 'bg-gray-100' : 'hover:bg-[#f5f5f5]'
                                  }`}
                                >
                                  <div className="size-[24px] shrink-0 flex items-center justify-center">
                                    <option.icon 
                                      size={20} 
                                      weight="regular" 
                                      className={isActive ? "text-[#0F3A3E]" : "text-[#616A6B]"} 
                                    />
                                  </div>
                                  <div className="flex flex-col font-['Aktifo-A',sans-serif] text-[14px] font-medium leading-[20px] flex-1 min-w-0">
                                    <p className={`font-normal ${isActive ? 'text-[#0F3A3E]' : 'text-black'}`}>
                                      {option.label}
                                    </p>
                                    <p className="text-[#616a6b] text-[11px] truncate">
                                      {option.description}
                                    </p>
                                  </div>
                                  {isActive && (
                                    <div className="ml-2 flex items-center justify-center shrink-0">
                                      <div className="size-5 rounded-full bg-[#1E6F73] flex items-center justify-center shadow-sm">
                                        <Check size={12} weight="bold" className="text-white" />
                                      </div>
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="p-0" onMouseEnter={() => setHoveredColKey('date')}>
                    <div className="h-full flex items-center px-4">
                      {isCellEditable('date') ? (
                        <input 
                          type="date"
                          value={t.date.split('.').reverse().join('-')}
                          onChange={(e) => {
                            const val = e.target.value.split('-').reverse().join('.');
                            handleUpdateTransaction(t.id, { date: val });
                          }}
                          className="w-full h-[36px] px-2 bg-white border border-[#1E6F73] rounded-lg text-[12px] font-medium text-[#000000] focus:outline-none"
                        />
                      ) : (
                        <span className="text-[#000000] text-[12px] font-normal">{t.date}</span>
                      )}
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="p-0" onMouseEnter={() => setHoveredColKey('customer')}>
                    <div className="h-full flex flex-col justify-center items-start px-4 overflow-hidden relative">
                      <div className="text-[#000000] font-normal truncate text-[12px]">{t.customer}</div>
                      {isCellEditable('customer') ? (
                        <div className="mt-1 relative">
                          <input 
                            type="text"
                            value={t.receipt || ''}
                            onChange={(e) => handleUpdateTransaction(t.id, { receipt: e.target.value })}
                            className="w-full h-[24px] px-2 bg-white border border-[#1E6F73]/50 rounded text-[11px] font-normal text-[#616A6B] focus:outline-none pr-6"
                          />
                          <InlineSaveButton visible={modifiedCells.has(`${t.id}-receipt`)} />
                        </div>
                      ) : (
                        <div className="text-[#616A6B] text-[11px] truncate mt-0.5 font-normal">{t.receipt}</div>
                      )}
                    </div>
                  </td>

                  {/* Doc */}
                  <td className="p-0 text-center">
                    <div className="h-full flex items-center justify-center px-4">
                      {t.document ? (
                        <div className="w-[26px] h-[34px] rounded border border-[#E5E7EB] overflow-hidden transition-all bg-[#f9fafb] cursor-pointer">
                          <img 
                            src="https://images.unsplash.com/photo-1626262323430-39bc79bc052c?q=80&w=200&auto=format&fit=crop" 
                            alt="Receipt preview"
                            className="w-full h-full object-cover block"
                          />
                        </div>
                      ) : (
                        <span className="text-[#E5E7EB]">-</span>
                      )}
                    </div>
                  </td>

                  {/* Receipt ID */}
                  <td className="px-4 align-middle"><div className="text-[#000000] font-normal text-[12px]">{t.receipt}</div></td>

                  {/* Tax Rate */}
                  <td className="px-4 align-middle"><div className="text-[#616A6B] font-normal text-[13px]">{t.taxRate}</div></td>

                  {/* VAT */}
                  <td className="px-4 align-middle text-right"><div className="text-[#616A6B] font-medium text-[13px]">{formatCurrency(t.vat)}</div></td>

                  {/* Subtotal */}
                  <td className="px-4 align-middle text-right"><div className="text-[#000000] font-medium text-[13px]">{formatCurrency(t.subtotal)}</div></td>

                  {/* Verified */}
                  <td className="p-0">
                    <div className="h-full flex items-center justify-center px-4">
                      <SealCheck size={20} weight="fill" className={t.verified ? "text-[#E5E7EB]" : "text-[#E5E7EB]/50"} />
                    </div>
                  </td>

                  {/* AI Ver. */}
                  <td className="p-0">
                    <div className="h-full flex items-center justify-center px-4">
                      <SealCheck size={20} weight="fill" className={t.aiVerified ? "text-[#E5E7EB]" : "text-[#E5E7EB]/50"} />
                    </div>
                  </td>

                  <td className="p-0 text-center">
                    <div className="h-full flex items-center justify-center px-4">
                      {isRowHovered && (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleSaveAll()} className="text-[#9CA3AF] hover:text-[#166534] transition-colors p-1.5"><Check size={18} weight="bold" /></button>
                          <button className="text-[#9CA3AF] hover:text-red-600 transition-colors p-1.5"><Trash size={18} /></button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-[#F9F9F8] rounded-full flex items-center justify-center mb-4">
              <FileSearch size={32} className="text-[#9CA3AF]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#000000] mb-1">No expenses found</h3>
            <p className="text-[13px] text-[#616A6B]">There are no records to display for this period.</p>
          </div>
        )}
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{transactions.length}</span> expenses found</div>
      </div>
    </div>
  );
};

export default ExpensesTable;