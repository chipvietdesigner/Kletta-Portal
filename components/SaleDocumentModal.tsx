import React, { useEffect } from 'react';
import { X } from '@phosphor-icons/react';
import { IncomeTransaction } from '../types';

interface SaleDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: IncomeTransaction | null;
}

const SaleDocumentModal: React.FC<SaleDocumentModalProps> = ({ isOpen, onClose, transaction }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !transaction) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#002b31]/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-[840px] max-h-[90vh] overflow-y-auto custom-scrollbar relative p-12 animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#616A6B] hover:text-[#000000] hover:bg-gray-100 rounded-full transition-all"
        >
          <X size={20} weight="bold" />
        </button>

        {/* Content */}
        <div className="space-y-12">
          {/* Header Title */}
          <h1 className="text-[42px] font-bold text-[#002b31] tracking-tight">Sale</h1>

          {/* Top Section: From and Info Box */}
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-[14px] font-bold text-[#002b31]">From</h3>
                <p className="text-[14px] text-[#002b31] font-medium">Sam's Barber</p>
                <p className="text-[14px] text-[#002b31] font-medium">sami+multireconcile@kletta.com</p>
                <p className="text-[14px] text-[#002b31] font-medium">Church Street, EC8, London, United Kingdom</p>
              </div>
            </div>

            <div className="flex border border-[#002b31]/30 rounded-2xl overflow-hidden min-w-[340px]">
              <div className="flex-1 p-4 px-6 bg-white">
                <div className="text-[12px] font-bold text-[#002b31] mb-1">Date</div>
                <div className="text-[16px] font-bold text-[#002b31]">{transaction.date}</div>
              </div>
              <div className="w-px bg-[#002b31]/30 my-3"></div>
              <div className="flex-1 p-4 px-6 bg-white">
                <div className="text-[12px] font-bold text-[#002b31] mb-1">Sale number</div>
                <div className="text-[16px] font-bold text-[#002b31]">202510001</div>
              </div>
            </div>
          </div>

          {/* Billed To Section */}
          <div className="space-y-1">
            <h3 className="text-[14px] font-bold text-[#002b31]">Billed to</h3>
            <p className="text-[14px] text-[#002b31] font-medium">{transaction.customer}</p>
            <p className="text-[14px] text-[#002b31] font-medium">Laajis, 01620, Vantaa, United Kingdom</p>
          </div>

          {/* Items Section */}
          <div className="pt-4">
            <h2 className="text-[28px] font-bold text-[#002b31] mb-6">Item</h2>
            <div className="w-full">
              <div className="flex border-b border-gray-100 pb-2 mb-4">
                <div className="flex-[3] text-[13px] font-medium text-[#616A6B]">Name / description</div>
                <div className="flex-1 text-center text-[13px] font-medium text-[#616A6B]">Quantity</div>
                <div className="flex-1 text-center text-[13px] font-medium text-[#616A6B]">Unit</div>
                <div className="flex-1 text-right text-[13px] font-medium text-[#616A6B]">Price</div>
                <div className="flex-1 text-right text-[13px] font-medium text-[#616A6B]">Total</div>
              </div>
              <div className="flex items-center">
                <div className="flex-[3] text-[15px] font-medium text-[#002b31]">Materials</div>
                <div className="flex-1 text-center text-[15px] font-medium text-[#002b31]">460</div>
                <div className="flex-1 text-center text-[15px] font-medium text-[#002b31]"></div>
                <div className="flex-1 text-right text-[15px] font-medium text-[#002b31]">£1.00</div>
                <div className="flex-1 text-right text-[15px] font-bold text-[#002b31]">£460.00</div>
              </div>
            </div>
          </div>

          {/* Subtotal & Total aligned to right */}
          <div className="flex flex-col items-end pt-8 gap-4 pr-1">
            <div className="flex justify-between w-56 text-[15px]">
              <span className="font-medium text-[#616A6B]">Subtotal</span>
              <span className="font-bold text-[#002b31]">£460.00</span>
            </div>
            <div className="flex justify-between w-56 text-[18px]">
              <span className="font-bold text-[#002b31]">Total</span>
              <span className="font-bold text-[#002b31]">£460.00</span>
            </div>
          </div>

          {/* Footer Grid */}
          <div className="pt-16 grid grid-cols-3 gap-8 border-t border-gray-50">
            <div className="space-y-3">
              <h4 className="text-[12px] font-bold text-[#002b31] uppercase tracking-wide">Address</h4>
              <div className="text-[11px] text-[#002b31] font-medium space-y-1">
                <p>Sam's Barber</p>
                <p>Church Street, EC8, London, United Kingdom</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-[12px] font-bold text-[#002b31] uppercase tracking-wide">Contact details</h4>
              <div className="text-[11px] text-[#002b31] font-medium space-y-1">
                <p>Sam Smith</p>
                <p>sami+multireconcile@kletta.com</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-[12px] font-bold text-[#002b31] uppercase tracking-wide">Payment details</h4>
              <div className="text-[11px] text-[#002b31] font-medium space-y-1">
                <p>Bank: Natwest</p>
                <p>Account name: Sales</p>
                <p>Account no: 12345678</p>
                <p>Sort code: 123456</p>
              </div>
            </div>
          </div>

          {/* Powered by Kletta */}
          <div className="flex justify-end pt-4">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#616A6B] uppercase tracking-widest mb-1">Powered by</span>
              <img src="https://i.ibb.co/99RKpWNq/Color-Black.png" alt="Kletta Logo" className="h-5 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDocumentModal;