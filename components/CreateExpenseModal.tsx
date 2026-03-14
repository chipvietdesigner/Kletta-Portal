import React, { useState, useRef } from 'react';
import {
  X,
  UploadSimple,
  CalendarBlank,
  TextT,
  Storefront,
  Car,
  Users,
  Buildings,
  Wrench,
  Gavel,
  CreditCard,
  Phone,
  Archive,
  WarningCircle,
  Bank,
  User,
  Money,
  House,
  PaintBrush,
  Scroll,
  FilePdf,
  Trash,
} from '@phosphor-icons/react';

interface CreateExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_GROUPS = [
  {
    title: 'Category',
    items: [
      { id: 'c1', label: 'Costs of goods bought for resale or goods used', icon: Storefront },
      { id: 'c2', label: 'Car, van and travel expenses', icon: Car },
      { id: 'c3', label: 'Wages, salaries and other staff costs', icon: Users },
      { id: 'c4', label: 'Rent, rates, power and insurance costs', icon: Buildings },
      { id: 'c5', label: 'Repairs and maintenance of property and equipment', icon: Wrench },
      { id: 'c6', label: 'Accountancy, legal and other professional fees', icon: Gavel },
      { id: 'c7', label: 'Interest and bank and credit card financial charges', icon: CreditCard },
      { id: 'c8', label: 'Phone, fax, stationery and other office costs', icon: Phone },
      { id: 'c9', label: 'Other allowable business expenses', icon: Archive },
      { id: 'c10', label: 'Non-allowable business expenses', icon: WarningCircle },
      { id: 'c11', label: 'Withdrawal, transfer and credit card', icon: Bank },
      { id: 'c12', label: 'Business owner wages', icon: User },
      { id: 'c13', label: 'Capital', icon: Money },
    ],
  },
  {
    title: 'UK Property',
    items: [
      { id: 'p1', label: 'Rental rent, rates, insurance, ground rents', icon: House },
      { id: 'p2', label: 'Rental property repairs and maintenance', icon: PaintBrush },
      { id: 'p3', label: 'Rental loan interest and other financial costs', icon: CreditCard },
      { id: 'p4', label: 'Rental legal, management and professional fees', icon: Scroll },
      { id: 'p5', label: 'Rental costs of services', icon: Wrench },
      { id: 'p6', label: 'Rental other allowable property expenses', icon: Archive },
    ],
  },
];

const CreateExpenseModal: React.FC<CreateExpenseModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  const getCategoryName = () => {
    for (const group of CATEGORY_GROUPS) {
      const item = group.items.find((i) => i.id === selectedCategory);
      if (item) return item.label;
    }
    return '';
  };

  const hasAmount = amount && parseFloat(amount) > 0;
  const hasCategory = !!selectedCategory;
  const isFormValid = hasAmount && hasCategory;

  const getFooterText = () => {
    if (!hasAmount && !hasCategory) return 'Enter an amount and choose a category to continue.';
    if (hasAmount && !hasCategory) return 'Choose a category to continue.';
    if (!hasAmount && hasCategory) return 'Enter an amount to continue.';

    const formattedAmount = parseFloat(amount).toLocaleString('en-IE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-GB');

    let text = `€${formattedAmount} will be recorded as an expense on ${formattedDate} under “${getCategoryName()}”.`;

    if (description) {
      const shortDesc = description.length > 30 ? description.substring(0, 30) + '...' : description;
      text += ` Description: “${shortDesc}”`;
    }
    return text;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#002b31]/60 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-[1400px] h-[85vh] max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#E5E7EB] bg-white flex-shrink-0">
          <h2 className="text-[20px] font-bold text-[#000000]">Add new expense</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} weight="bold" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 grid grid-cols-12 divide-x divide-[#E5E7EB] overflow-hidden bg-white">
          {/* LEFT: Attachment */}
          <div className="col-span-4 p-8 flex flex-col min-h-0 overflow-y-auto custom-scrollbar">
            {file ? (
              <div className="flex-1 min-h-0 flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-2xl relative group overflow-hidden">
                {file.type.includes('image') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <FilePdf size={64} className="text-[#0F2F33]" />
                    <span className="mt-4 text-[13px] font-medium text-[#0F2F33]">{file.name}</span>
                    <span className="text-[12px] text-gray-400 mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setFile(null)}
                  className="absolute top-4 right-4 p-2.5 bg-white text-red-600 rounded-xl shadow-md hover:bg-red-50 transition-colors border border-gray-100"
                >
                  <Trash size={20} />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex-1 min-h-0 flex flex-col items-center justify-center border-2 border-dashed border-[#E5E7EB] rounded-2xl bg-white hover:bg-gray-50/50 transition-colors p-8 text-center cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={handleFileChange}
                />
                <div className="w-12 h-12 mb-4 text-[#1E6F73] group-hover:scale-110 transition-transform duration-300">
                  <UploadSimple size={48} weight="light" />
                </div>
                <p className="text-[16px] font-bold text-[#0F2F33] mb-2">Upload statement</p>
                <p className="text-[13px] text-[#6B7280] leading-relaxed max-w-[240px]">
                  Kletta will automatically read the necessary data.
                </p>
                <button className="mt-8 h-[40px] px-6 bg-white border border-[#E5E7EB] hover:border-[#1E6F73] rounded-xl text-[13px] font-bold text-[#0F2F33] shadow-sm transition-all">
                  Select file
                </button>
              </div>
            )}
          </div>

          {/* MIDDLE: Details */}
          <div className="col-span-4 p-8 flex flex-col min-h-0 overflow-y-auto custom-scrollbar">
            <div className="space-y-8 pr-4">
              <div>
                <label className="block text-[13px] font-medium text-[#000000] mb-2">Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
                    <span className="text-[16px] font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full h-[52px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#0F2F33] placeholder-[#9CA3AF] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#000000] mb-2">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
                    <CalendarBlank size={20} />
                  </div>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-[52px] pl-12 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#0F2F33] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="block text-[13px] font-medium text-[#000000] mb-2">Description</label>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none text-[#9CA3AF]">
                    <TextT size={20} />
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What was this expense for?"
                    className="w-full h-[140px] pl-12 pr-4 py-4 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#0F2F33] placeholder-[#9CA3AF] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Categories */}
          <div className="col-span-4 py-8 px-4 flex flex-col min-h-0 bg-[#FDFDFD] overflow-hidden">
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-6 pb-6">
              {CATEGORY_GROUPS.map((group) => (
                <div key={group.title} className="mb-6 last:mb-0">
                  <h4 className="text-[13px] font-medium text-[#000000] mb-3 sticky top-0 bg-[#FDFDFD] py-1 z-10">
                    {group.title}
                  </h4>
                  <div className="space-y-2">
                    {group.items.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg border transition-all text-left ${
                          selectedCategory === cat.id
                            ? 'bg-[#FFFBEB] border-[#F7D84A] ring-1 ring-[#F7D84A] shadow-sm'
                            : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                            selectedCategory === cat.id ? 'bg-[#FDE68A] text-[#92400E]' : 'bg-[#F3F4F6] text-[#6B7280]'
                          }`}
                        >
                          <cat.icon size={18} weight="fill" />
                        </div>
                        <span
                          className={`text-[14px] font-normal leading-snug ${
                            selectedCategory === cat.id ? 'text-[#0F2F33]' : 'text-[#4B5563]'
                          }`}
                        >
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-[#002b31] border-t border-[#003840] flex items-center justify-between flex-shrink-0">
          <div className={`text-[13px] font-medium ${isFormValid ? 'text-white' : 'text-gray-300'}`}>
            {getFooterText()}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-white hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (isFormValid) onClose();
              }}
              disabled={!isFormValid}
              className={`h-[44px] px-8 text-[13px] font-medium rounded-xl transition-colors shadow-lg ${
                isFormValid
                  ? 'bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E]'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-70'
              }`}
            >
              Preview & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExpenseModal;