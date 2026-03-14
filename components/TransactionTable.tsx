import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { IncomeTransaction } from '../types';
import SaleDocumentModal from './SaleDocumentModal';
import { 
  FileText, 
  SealCheck, 
  Trash, 
  CaretDown, 
  ArrowsDownUp,
  Handshake,
  Percent,
  XSquare,
  Checks,
  CurrencyCircleDollar,
  Users,
  Package,
  Buildings,
  Coffee,
  GasPump,
  Bank,
  Taxi,
  X,
  Check,
  TrendUp,
  Globe,
  Desktop,
  PlusCircle,
  Sparkle,
  Briefcase,
  Article,
  Money,
  FileSearch,
  Pencil,
  MagnifyingGlass,
  Funnel,
  CalendarBlank,
  Plus
} from '@phosphor-icons/react';

interface TransactionTableProps {
  transactions: IncomeTransaction[];
}

interface CategoryOption {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  // Income specific from screenshot
  { id: 'bus_inc', label: 'Business Income', description: 'Core business revenue', icon: TrendUp },
  { id: 'cons_fees', label: 'Consulting Fees', description: 'Professional consulting services', icon: Handshake },
  { id: 'srv_inc', label: 'Service Income', description: 'General service revenue', icon: Sparkle },
  { id: 'onl_sales', label: 'Online Sales', description: 'E-commerce and web sales', icon: Globe },
  { id: 'merch', label: 'Merchandise', description: 'Product and merch sales', icon: Package },
  { id: 'soft_sales', label: 'Software Sales', description: 'SaaS and license sales', icon: Desktop },
  { id: 'grants', label: 'Grants', description: 'Government and private grants', icon: Bank },
  { id: 'oth_inc', label: 'Other Income', description: 'Miscellaneous revenue sources', icon: PlusCircle },
  
  // Expense specific from screenshot
  { id: 'ext_srv', label: 'External services', description: 'Purchased external services', icon: Handshake },
  { id: 'int_exp', label: 'Interest expenses', description: 'Loan interest payments', icon: Percent },
  { id: 'non_all', label: 'Non-allowable expenses', description: 'Not tax-deductible', icon: XSquare },
  { id: 'oth_ded', label: 'Other deductible expenses', description: 'Misc. tax-deductible costs', icon: Checks },
  { id: 'oth_fin', label: 'Other financial cost', description: 'Other financial expenses not included in interest', icon: CurrencyCircleDollar },
  { id: 'pers_cost', label: 'Personnel cost', description: 'Employee salaries, wages and social costs', icon: Users },
  { id: 'pur_inv', label: 'Purchases & inventory changes', description: 'Purchase of goods and changes in stock', icon: Package },
  { id: 'rents_cat', label: 'Rents', description: 'Rental of space or equipment', icon: Buildings },
  { id: 'rep_exp', label: 'Representation expenses', description: 'Client meetings & representation', icon: Coffee },
  { id: 'adv_tax', label: 'Advance tax', description: 'Prepaid taxes', icon: Article },
  { id: 'veh_cost', label: 'Vehicle cost', description: 'Fuel, maintenance, leasing', icon: GasPump },
  { id: 'cash_wd', label: 'Cash withdrawal', description: 'Cash taken from company account for business use', icon: Money },
  { id: 'taxi_van', label: 'Taxi and van costs', description: 'Taxi or van transportation costs', icon: Taxi },
];

const VAT_OPTIONS = [
  "0%",
  "Construction services and scrap metal - 0%",
  "Goods outside EU - 0%",
  "Services outside EU - 0%",
  "5%",
  "20%",
  "24%",
  "25.5%"
];

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions: initialTransactions }) => {
  const [transactions, setTransactions] = useState<IncomeTransaction[]>(initialTransactions);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [hoveredColKey, setHoveredColKey] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [taxRateDropdownId, setTaxRateDropdownId] = useState<string | null>(null);
  const [selectedVat, setSelectedVat] = useState<string | null>(null);
  const [dropdownCoords, setDropdownCoords] = useState<{ top: number, left: number } | null>(null);
  const [selectedDocTransaction, setSelectedDocTransaction] = useState<IncomeTransaction | null>(null);
  const [manuallyReconciledRows, setManuallyReconciledRows] = useState<Set<string>>(new Set());
  
  const [modifiedCells, setModifiedCells] = useState<Set<string>>(new Set());
  const [taxSearch, setTaxSearch] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const vatDropdownRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  useEffect(() => {
    setTransactions(initialTransactions);
    setModifiedCells(new Set());
  }, [initialTransactions]);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);

  const calculateTotals = () => {
    const subtotal = transactions.reduce((sum, t) => sum + t.subtotal, 0);
    const vat = transactions.reduce((sum, t) => sum + t.vat, 0);
    const total = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    return { subtotal, vat, total };
  };
  
  const totals = calculateTotals();

  const groupedTransactions = transactions.reduce((groups: { [key: string]: IncomeTransaction[] }, t) => {
    // Parse DD.MM.YYYY
    const parts = t.date.split('.');
    const date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (!groups[monthYear]) groups[monthYear] = [];
    groups[monthYear].push(t);
    return groups;
  }, {});

  const groupKeys = Object.keys(groupedTransactions).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

  const handleUpdateTransaction = (id: string, updates: Partial<IncomeTransaction>) => {
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
    setTaxRateDropdownId(null);
    setModifiedCells(new Set());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
      if (vatDropdownRef.current && !vatDropdownRef.current.contains(event.target as Node)) {
        setTaxRateDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (taxRateDropdownId && triggerRefs.current[taxRateDropdownId]) {
      const updatePosition = () => {
        const trigger = triggerRefs.current[taxRateDropdownId!];
        if (trigger) {
          const rect = trigger.getBoundingClientRect();
          setDropdownCoords({
            top: rect.bottom + 8,
            left: rect.left - 120,
          });
        }
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      setDropdownCoords(null);
    }
  }, [taxRateDropdownId]);

  const handleApplyVat = () => {
    if (taxRateDropdownId && selectedVat) {
        handleUpdateTransaction(taxRateDropdownId, { taxRate: selectedVat });
    }
    setTaxRateDropdownId(null);
    handleSaveAll();
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
        className="absolute right-2 top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full border border-[#1E6F73] bg-white text-[#1E6F73] flex items-center justify-center shadow-sm z-[60] hover:bg-[#EFF6F7] transition-all transform active:scale-90 animate-in zoom-in-50 fade-in duration-200"
      >
        <Check size={14} weight="bold" />
      </button>
    );
  };

  const handleManualReconcile = (id: string) => {
    setManuallyReconciledRows(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const renderReconciliationPill = (t: IncomeTransaction, index: number) => {
    if (!t.reconciled) {
      // Badge type C — "+ Cash" (action to assign)
      return (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleManualReconcile(t.id);
          }}
          className="h-[24px] px-2.5 rounded-full border border-[#D1D5DB] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors group/plus"
        >
          <Plus size={12} className="mr-1 text-[#374151]" />
          <span className="text-[12px] font-medium text-[#374151]">Cash</span>
        </button>
      );
    }

    const isCash = index % 3 === 0; // Simulate different types

    if (isCash) {
      // Badge type A — "Cash" (unreconciled / needs assignment)
      return (
        <div className="h-[24px] px-2.5 rounded-full border border-[#D1D5DB] bg-transparent flex items-center gap-1.5">
          <span className="text-[12px]">🪙</span>
          <span className="text-[12px] font-medium text-[#374151]">Cash</span>
        </div>
      );
    }

    // Badge type B — "Transaction XXXXX" (reconciled)
    return (
      <div className="inline-flex items-center gap-2 bg-transparent">
        <div className="w-2 h-2 rounded-full bg-[#1D9E75]" />
        <span className="text-[13px] font-normal text-[#374151]">Transaction {28000 + index}</span>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden mt-2 bg-white border border-[#E5E5E0] rounded-xl">
      {/* Filter Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E5E0]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9CA3AF]">
              <MagnifyingGlass size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Search..."
              className="h-[40px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] transition-colors w-[260px] focus:outline-none"
            />
          </div>
          <button className="h-[40px] px-4 bg-white border border-[#E5E7EB] rounded-lg text-[13px] text-[#374151] font-medium flex items-center gap-2 hover:border-[#D1D5DB] transition-colors">
            <Funnel size={16} className="text-[#9CA3AF]" />
            Filters
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-[40px] py-2 px-4 bg-[#F5C518] hover:bg-[#E5B510] text-black text-[13px] font-bold rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={16} weight="bold" />
            Create Income
          </button>
          <div className="flex items-center gap-2 h-[40px] py-2 px-3 bg-white border border-[#E5E5E0] rounded-lg text-[13px] text-[#374151] font-medium cursor-pointer hover:border-[#D1D5DB] transition-colors">
            <CalendarBlank size={16} className="text-[#6B7280]" />
            <span>This tax year (01.01 → 31.12.2025)</span>
          </div>
        </div>
      </div>

      <div className="overflow-auto flex-1 custom-scrollbar flex flex-col">
        <table className="text-left table-fixed w-full border-collapse">
          <thead className="bg-[#F9FAFB] text-[#6B7280] sticky top-0 z-50">
            <tr className="border-b border-[#E5E7EB]">
              <th className="px-4 py-3 font-medium text-[12px] w-[140px] text-left align-top">
                <div className="flex items-center gap-1 mb-1">
                  <span>Total amount</span>
                  <ArrowsDownUp size={12} className="text-[#9CA3AF]" />
                </div>
                <div className="text-[13px] font-bold text-[#111827]">{formatCurrency(totals.total)}</div>
              </th>

              <th className="px-4 py-3 font-medium text-[12px] w-[100px] text-left align-middle">
                <span>Document</span>
              </th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[180px] text-left align-middle">
                <div className="flex items-center gap-1">
                  <span>Category</span>
                  <ArrowsDownUp size={12} className="text-[#9CA3AF]" />
                  <CaretDown size={12} className="text-[#9CA3AF]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[110px] text-left align-middle">
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <ArrowsDownUp size={12} className="text-[#9CA3AF]" />
                  <CaretDown size={12} className="text-[#9CA3AF]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[200px] text-left align-middle">
                <div className="flex items-center gap-1">
                  <span>Customer</span>
                  <ArrowsDownUp size={12} className="text-[#9CA3AF]" />
                  <CaretDown size={12} className="text-[#9CA3AF]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[120px] text-left align-middle">Type ID</th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[160px] text-left align-middle">Reconciled</th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[200px] text-left align-middle">Tax rate</th>

              <th className="px-4 py-3 font-medium text-[12px] w-[80px] text-center align-middle">VAT%</th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[100px] text-right align-middle">VAT</th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[120px] text-right align-middle">
                <div className="flex items-center justify-end gap-1">
                  <span>Subtotal</span>
                  <ArrowsDownUp size={12} className="text-[#9CA3AF]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[70px] text-center align-middle">Verified</th>
              <th className="px-4 py-3 font-medium text-[12px] w-[80px] text-center align-middle">AI Verified</th>
              <th className="px-4 py-3 font-medium text-[12px] w-[60px] text-center align-middle">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {groupKeys.map((groupKey) => (
              <React.Fragment key={groupKey}>
                {/* Group Header */}
                <tr className="bg-[#F3F4F6] h-[32px] border-y border-[#E5E7EB]">
                  <td colSpan={14} className="px-4 py-0 align-middle">
                    <span className="text-[13px] font-bold text-[#111827]">{groupKey}</span>
                  </td>
                </tr>

                {groupedTransactions[groupKey].map((t, index) => {
                  const isRowHovered = hoveredRowId === t.id;
                  const isDropdownOpen = openDropdownId === t.id;
                  const isTaxRateOpen = taxRateDropdownId === t.id;
                  
                  const isCellEditable = (colKey: string) => isRowHovered && hoveredColKey === colKey;
                  const bgClass = isRowHovered ? 'bg-[#FAFAF8]' : 'bg-white';

                  return (
                    <tr 
                      key={t.id} 
                      className={`group transition-all h-[44px] border-b border-[#E5E7EB] last:border-0 ${bgClass}`} 
                      onMouseEnter={() => setHoveredRowId(t.id)} 
                      onMouseLeave={() => { setHoveredRowId(null); setHoveredColKey(null); }}
                    >
                      {/* Total Amount */}
                      <td className="p-0" onMouseEnter={() => setHoveredColKey('totalAmount')}>
                        <div className="h-full flex items-center justify-start px-4 relative">
                          {isCellEditable('totalAmount') ? (
                            <div className="relative w-full">
                               <input 
                                 type="number"
                                 value={t.totalAmount}
                                 onChange={(e) => handleUpdateTransaction(t.id, { totalAmount: parseFloat(e.target.value) || 0 })}
                                 className="w-full h-[32px] px-2 bg-white border border-[#F5C518] rounded text-[13px] font-semibold text-[#111827] focus:outline-none"
                               />
                            </div>
                          ) : (
                            <span className="font-semibold text-[#111827] text-[14px]">{formatCurrency(t.totalAmount)}</span>
                          )}
                        </div>
                      </td>

                      {/* Document */}
                      <td className="p-0">
                        <div className="h-full flex items-center px-4">
                          <span className="text-[#D1D5DB]">—</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-0 relative" onMouseEnter={() => setHoveredColKey('category')}>
                        <div 
                          className="h-full flex items-center px-4 cursor-pointer relative group/cat"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(isDropdownOpen ? null : t.id);
                          }}
                        >
                          <div className="flex items-center gap-1 hover:underline decoration-[#D1D5DB] underline-offset-4">
                            <span className="text-[#374151] text-[13px] font-normal truncate">{t.category}</span>
                            <CaretDown size={10} className="text-[#9CA3AF]" />
                          </div>

                          {isDropdownOpen && (
                            <div 
                              ref={dropdownRef}
                              className="absolute top-[calc(100%+4px)] left-0 w-[320px] bg-white rounded-lg shadow-xl border border-[#E5E7EB] max-h-[400px] overflow-y-auto z-[100] flex flex-col"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex flex-col p-2">
                                {CATEGORY_OPTIONS.map((option) => (
                                  <button
                                    key={option.id}
                                    onClick={() => {
                                      handleUpdateTransaction(t.id, { category: option.label });
                                      setOpenDropdownId(null);
                                      handleSaveAll();
                                    }}
                                    className="w-full rounded-md px-3 py-2 flex items-center gap-3 hover:bg-[#F3F4F6] text-left transition-colors"
                                  >
                                    <option.icon size={18} className="text-[#6B7280]" />
                                    <span className="text-[13px] text-[#374151]">{option.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="p-0" onMouseEnter={() => setHoveredColKey('date')}>
                        <div className="h-full flex items-center px-4 relative">
                          <span className="text-[#374151] text-[13px] font-normal">{t.date}</span>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="p-0" onMouseEnter={() => setHoveredColKey('customer')}>
                        <div className="h-full flex items-center px-4 relative">
                          <span className="text-[#374151] text-[13px] font-normal truncate">{t.customer}</span>
                        </div>
                      </td>

                      {/* Type ID */}
                      <td className="p-0" onMouseEnter={() => setHoveredColKey('typeId')}>
                        <div className="h-full flex items-center px-4 relative">
                          <span className="text-[#9CA3AF] text-[12px] font-normal truncate">{t.typeId}</span>
                        </div>
                      </td>

                      {/* Reconciled */}
                      <td className="p-0">
                        <div className="h-full flex items-center px-4">
                          {renderReconciliationPill(t, index)}
                        </div>
                      </td>

                      {/* Tax Rate */}
                      <td className="p-0" onMouseEnter={() => setHoveredColKey('taxRate')}>
                        <div 
                          ref={el => triggerRefs.current[t.id] = el}
                          className="h-full flex items-center px-4 cursor-pointer group/tax"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTaxRateDropdownId(isTaxRateOpen ? null : t.id);
                            setSelectedVat(t.taxRate);
                          }}
                        >
                          <div className="flex items-center gap-1 hover:underline decoration-[#D1D5DB] underline-offset-4 overflow-hidden">
                            <span className="text-[#374151] text-[13px] font-normal truncate">
                              {t.taxRate.includes('0%') ? '0% 470/83 or 470 KLVK HARA EUR' : t.taxRate}
                            </span>
                            <CaretDown size={10} className="text-[#9CA3AF] flex-shrink-0" />
                          </div>
                        </div>
                      </td>

                      {/* VAT% */}
                      <td className="p-0 text-center">
                        <div className="h-full flex items-center justify-center px-4">
                          <span className="text-[#D1D5DB]">—</span>
                        </div>
                      </td>

                      {/* VAT */}
                      <td className="p-0 text-right">
                        <div className="h-full flex items-center justify-end px-4">
                          <span className="text-[#374151] font-normal text-[13px]">{formatCurrency(t.vat)}</span>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td className="p-0 text-right" onMouseEnter={() => setHoveredColKey('subtotal')}>
                        <div className="h-full flex items-center justify-end px-4 relative">
                          <span className="text-[#111827] font-semibold text-[13px]">{formatCurrency(t.subtotal)}</span>
                        </div>
                      </td>

                      {/* Verified */}
                      <td className="p-0 text-center">
                        <div className="h-full flex items-center justify-center px-4">
                          <div className="w-4 h-4 rounded-full border-[1.5px] border-[#D1D5DB] hover:border-[#9CA3AF] transition-colors cursor-pointer bg-transparent" />
                        </div>
                      </td>

                      {/* AI Verified */}
                      <td className="p-0 text-center">
                        <div className="h-full flex items-center justify-center px-4">
                          <span className="text-[#D1D5DB]">—</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-0 text-center">
                        <div className="h-full flex items-center justify-center px-4">
                          <Pencil 
                            size={16} 
                            className={`text-[#9CA3AF] cursor-pointer transition-opacity ${isRowHovered ? 'opacity-100' : 'opacity-40'}`} 
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-[#F9F9F8] rounded-full flex items-center justify-center mb-4">
              <FileSearch size={32} className="text-[#9CA3AF]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#000000] mb-1">No transactions found</h3>
            <p className="text-[13px] text-[#616A6B]">There are no records to display for this period.</p>
          </div>
        )}
      </div>
      
      <SaleDocumentModal 
        isOpen={!!selectedDocTransaction} 
        onClose={() => setSelectedDocTransaction(null)} 
        transaction={selectedDocTransaction} 
      />

      {taxRateDropdownId && dropdownCoords && createPortal(
        <div 
          ref={vatDropdownRef}
          style={{ 
            position: 'fixed',
            top: dropdownCoords.top,
            left: dropdownCoords.left,
            zIndex: 9999
          }}
          className="w-[340px] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3 border-b border-[#F3F4F6]">
            <div className="relative">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input 
                type="text"
                placeholder="Search tax rate..."
                value={taxSearch}
                onChange={(e) => setTaxSearch(e.target.value)}
                className="w-full h-[36px] pl-9 pr-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:border-[#F5C518]"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-[240px] overflow-y-auto p-1 custom-scrollbar">
            {VAT_OPTIONS.filter(opt => opt.toLowerCase().includes(taxSearch.toLowerCase())).map((option) => (
              <button
                key={option}
                onClick={() => setSelectedVat(option)}
                className={`w-full px-3 py-2.5 flex items-center justify-between rounded-lg transition-colors ${
                  selectedVat === option ? 'bg-[#FFFBEB] text-[#92400E]' : 'hover:bg-[#F9FAFB] text-[#374151]'
                }`}
              >
                <span className="text-[13px] font-medium text-left">{option}</span>
                {selectedVat === option && <Check size={16} weight="bold" />}
              </button>
            ))}
          </div>
          <div className="p-3 bg-[#F9FAFB] border-t border-[#F3F4F6] flex items-center justify-end gap-2">
            <button 
              onClick={() => setTaxRateDropdownId(null)}
              className="px-4 py-2 text-[13px] font-medium text-[#6B7280] hover:text-[#374151]"
            >
              Cancel
            </button>
            <button 
              onClick={handleApplyVat}
              className="px-5 py-2 bg-[#F5C518] hover:bg-[#E5B510] text-black text-[13px] font-bold rounded-lg transition-colors shadow-sm"
            >
              Apply
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default TransactionTable;