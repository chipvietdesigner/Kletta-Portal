import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import TransactionTable from './components/TransactionTable';
import ExpensesTable from './components/ExpensesTable';
import ClientTable from './components/ClientTable';
import VatReturnsTable from './components/VatReturnsTable';
import TaxReturnTable from './components/TaxReturnTable';
import BankTransactionsTable from './components/BankTransactionsTable';
import InvitationsTable from './components/InvitationsTable';
import MileagesList from './components/MileagesList';
import Reports from './components/Reports';
import InvoicesTable from './components/InvoicesTable';
import Chat from './components/Chat';
import Account from './components/Account';
import Login from './components/Login';
import AISupport from './components/AISupport';
import Dashboard from './components/Dashboard';
import Welcome from './components/Welcome';
import CreateExpenseModal from './components/CreateExpenseModal';
import CreateIncomeModal from './components/CreateIncomeModal';
import ChooseExpensesModal from './components/ChooseExpensesModal';
import { NavItemType, IncomeTransaction, Client, ExpenseTransaction, VatReturn, TaxReturnRow, BankTransaction, DashboardData, Invitation, MileageTrip, MOCK_INVOICES } from './types';
import { 
  Tray, 
  TrendUp, 
  CheckCircle, 
  Clock,
  Play,
  Funnel,
  Stack,
  MagnifyingGlass,
  CaretDown,
  DownloadSimple,
  Plus,
  Upload,
  WarningCircle,
  CurrencyDollar,
  Handshake,
  Car,
  XCircle,
  Package,
  Buildings,
  Check,
  Bank,
  CalendarBlank,
  SteeringWheel,
  MapPin,
  FileText,
  Users,
  ArrowsLeftRight,
  HandCoins,
  Percent,
  HouseLine
} from '@phosphor-icons/react';

// Mock Data based on the Income screenshot + Additional data
const INITIAL_INCOME_DATA: IncomeTransaction[] = [
  {
    id: '1',
    date: '20.11.2025',
    customer: 'Cash sale - no customer',
    category: 'Business Income',
    typeId: 'Sale 570',
    hasDocument: true,
    reference: 'POS-001',
    reconciled: true,
    subtotal: 200.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 200.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Cash',
    dueDate: '20.11.2025',
    project: 'Store 1',
    costCenter: 'Sales',
    createdBy: 'Sami Kletta'
  },
  {
    id: '2',
    date: '20.11.2025',
    customer: 'Manual entry - no customer',
    description: 'Torstai Timma Myynti 25,5%',
    category: 'Business Income',
    typeId: 'Manual Entry 62720',
    hasDocument: false,
    reference: 'DAILY-02',
    reconciled: false,
    subtotal: 796.81,
    taxRate: '25.5%: ', 
    vat: 203.19,
    totalAmount: 1000.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Manual',
    dueDate: '20.11.2025',
    project: 'HQ',
    costCenter: 'Ops',
    createdBy: 'Sami Kletta'
  },
  {
    id: '3',
    date: '19.11.2025',
    customer: 'TechSolutions Inc.',
    description: 'Q4 Consulting Retainer',
    category: 'Consulting Fees',
    typeId: 'Inv-1024',
    hasDocument: true,
    reference: 'PO-9921',
    reconciled: true,
    subtotal: 4500.00,
    taxRate: '24%: ',
    vat: 1080.00,
    totalAmount: 5580.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Bank Transfer',
    dueDate: '19.12.2025',
    project: 'Consulting',
    costCenter: 'Services',
    createdBy: 'Admin User'
  },
  {
    id: '4',
    date: '18.11.2025',
    customer: 'Nordic Design Studio',
    description: 'Web Development Services',
    category: 'Service Income',
    typeId: 'Inv-1023',
    hasDocument: true,
    reference: 'REF-882',
    reconciled: false,
    subtotal: 1250.00,
    taxRate: '24%: ',
    vat: 300.00,
    totalAmount: 1550.00,
    isVerified: false,
    isAiVerified: true,
    paymentMethod: 'Stripe',
    dueDate: '18.12.2025',
    project: 'Web Dev',
    costCenter: 'IT',
    createdBy: 'Sami Kletta'
  },
  {
    id: '5',
    date: '15.11.2025',
    customer: 'Stripe Payout',
    description: 'Weekly settlement',
    category: 'Online Sales',
    typeId: 'Payout 22',
    hasDocument: false,
    reference: 'STR-9912',
    reconciled: true,
    subtotal: 890.50,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 890.50,
    isVerified: true,
    isAiVerified: false,
    paymentMethod: 'Stripe',
    dueDate: '15.11.2025',
    project: 'Online',
    costCenter: 'Sales',
    createdBy: 'System'
  },
  {
    id: '6',
    date: '14.11.2025',
    customer: 'Local Cafe Partnership',
    description: 'Merchandise reselling',
    category: 'Merchandise',
    typeId: 'Sale 562',
    hasDocument: true,
    reference: 'INV-009',
    reconciled: false,
    subtotal: 320.00,
    taxRate: '14%: ',
    vat: 44.80,
    totalAmount: 364.80,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Cash',
    dueDate: '14.11.2025',
    project: 'Retail',
    costCenter: 'Sales',
    createdBy: 'Sami Kletta'
  },
  {
    id: '7',
    date: '12.11.2025',
    customer: 'Consulting Project Alpha',
    description: 'Milestone 2 payment',
    category: 'Consulting Fees',
    typeId: 'Inv-1021',
    hasDocument: true,
    reference: 'MST-2',
    reconciled: true,
    subtotal: 2100.00,
    taxRate: '24%: ',
    vat: 504.00,
    totalAmount: 2604.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Bank Transfer',
    dueDate: '12.12.2025',
    project: 'Alpha',
    costCenter: 'Consulting',
    createdBy: 'Admin User'
  },
  {
    id: '8',
    date: '10.11.2025',
    customer: 'Cash sale - no customer',
    category: 'Business Income',
    typeId: 'Sale 555',
    hasDocument: false,
    reference: 'POS-002',
    reconciled: true,
    subtotal: 150.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 150.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Cash',
    dueDate: '10.11.2025',
    project: 'Store 1',
    costCenter: 'Sales',
    createdBy: 'Sami Kletta'
  },
  {
    id: '9',
    date: '08.11.2025',
    customer: 'Marketing GIG',
    description: 'Ad campaign management',
    category: 'Service Income',
    typeId: 'Inv-1019',
    hasDocument: true,
    reference: 'AD-2025',
    reconciled: false,
    subtotal: 5000.00,
    taxRate: '24%: ',
    vat: 1200.00,
    totalAmount: 6200.00,
    isVerified: false,
    isAiVerified: false,
    paymentMethod: 'Bank Transfer',
    dueDate: '08.12.2025',
    project: 'Marketing',
    costCenter: 'Services',
    createdBy: 'Sami Kletta'
  },
  {
    id: '10',
    date: '05.11.2025',
    customer: 'Subscription Renewal',
    description: 'Yearly SaaS License',
    category: 'Software Sales',
    typeId: 'Sub-441',
    hasDocument: true,
    reference: 'LIC-99',
    reconciled: true,
    subtotal: 800.00,
    taxRate: '24%: ',
    vat: 192.00,
    totalAmount: 992.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Credit Card',
    dueDate: '05.11.2025',
    project: 'SaaS',
    costCenter: 'IT',
    createdBy: 'System'
  },
  {
    id: '11',
    date: '02.11.2025',
    customer: 'Manual entry - Adjustment',
    description: 'Correction for Oct',
    category: 'Other Income',
    typeId: 'Adj-01',
    hasDocument: false,
    reference: 'MEMO-01',
    reconciled: true,
    subtotal: 50.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 50.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'N/A',
    dueDate: '02.11.2025',
    project: 'Internal',
    costCenter: 'Admin',
    createdBy: 'Sami Kletta'
  },
  {
    id: '12',
    date: '01.11.2025',
    customer: 'StartUp Grant',
    description: 'Government assistance',
    category: 'Grants',
    typeId: 'Gov-2025',
    hasDocument: true,
    reference: 'FIN-GRANT',
    reconciled: true,
    subtotal: 8000.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 8000.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Grant',
    dueDate: '01.11.2025',
    project: 'Funding',
    costCenter: 'Finance',
    createdBy: 'Admin User'
  }
];

// Generate more data for scrolling
const MOCK_INCOME_DATA: IncomeTransaction[] = [
  ...INITIAL_INCOME_DATA,
  ...INITIAL_INCOME_DATA.map(item => ({ ...item, id: item.id + '_dup1', date: '01.10.2025' })),
  ...INITIAL_INCOME_DATA.map(item => ({ ...item, id: item.id + '_dup2', date: '28.09.2025' })),
];

// EXPENSES DATA
const EXPENSE_CATEGORIES = [
  'All',
  'External services',
  'Non-allowable expenses',
  'Other deductible expenses',
  'Purchases and inventory changes',
  'Rents',
  'Vehicle cost',
  'Vehicle depreciation'
];

const MOCK_EXPENSES_DATA: ExpenseTransaction[] = [
  {
    id: 'e1',
    date: '12.05.2025',
    customer: 'Test',
    category: 'Non-allowable expenses',
    receipt: 'Manual entry 5280',
    document: null,
    reconciled: false,
    subtotal: 978.00,
    taxRate: '14%: €10.00',
    vat: 22.00,
    totalAmount: 1000.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e2',
    date: '21.03.2025',
    customer: 'Autokulut',
    category: 'Vehicle cost',
    receipt: 'Manual entry 5162',
    document: null,
    reconciled: false,
    subtotal: 5000.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 5000.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e3',
    date: '01.02.2025',
    customer: 'Kulu',
    category: 'Purchases and inventory changes',
    receipt: 'Manual entry 5219',
    document: null,
    reconciled: false,
    subtotal: 4385.96,
    taxRate: '14%',
    vat: 614.04,
    totalAmount: 5000.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e4',
    date: '01.02.2025',
    customer: 'Welcome Keele Break North Group Fct',
    category: 'Other deductible expenses',
    receipt: 'Receipt 202520001',
    document: 'doc1.jpg',
    reconciled: true,
    subtotal: 21.65,
    taxRate: 'Exempted from VAT',
    vat: 0.00,
    totalAmount: 21.65,
    verified: false,
    aiVerified: false
  },
  {
    id: 'e5',
    date: '01.02.2025',
    customer: 'WHSmith',
    category: 'External services',
    receipt: 'Receipt 202520002',
    document: 'doc2.jpg',
    reconciled: true,
    subtotal: 13.49,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 13.49,
    verified: false,
    aiVerified: false
  },
  {
    id: 'e6',
    date: '08.01.2025',
    customer: 'Kulu',
    category: 'External services',
    receipt: 'Manual entry 5220',
    document: null,
    reconciled: false,
    subtotal: 4385.96,
    taxRate: '14%',
    vat: 614.04,
    totalAmount: 5000.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e7',
    date: '01.01.2025',
    customer: 'Private car 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4812',
    document: null,
    reconciled: false,
    subtotal: 750.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 750.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e8',
    date: '01.01.2025',
    customer: 'MKV-740 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4811',
    document: null,
    reconciled: false,
    subtotal: 2500.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 2500.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e9',
    date: '01.01.2025',
    customer: 'Auto 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4807',
    document: null,
    reconciled: false,
    subtotal: 1250.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 1250.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e10',
    date: '01.01.2025',
    customer: 'Kia 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4786',
    document: null,
    reconciled: false,
    subtotal: 2500.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 2500.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e11',
    date: '01.01.2025',
    customer: 'Lexus CT200h 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4785',
    document: null,
    reconciled: false,
    subtotal: 2500.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 2500.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e12',
    date: '01.01.2025',
    customer: 'Teollisuusviuouskone 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4780',
    document: null,
    reconciled: false,
    subtotal: 2500.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 2500.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e13',
    date: '01.01.2025',
    customer: 'New 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4779',
    document: null,
    reconciled: false,
    subtotal: 4000.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 4000.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e14',
    date: '01.01.2025',
    customer: 'Double tap 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4778',
    document: null,
    reconciled: false,
    subtotal: 2500.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 2500.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e15',
    date: '01.01.2025',
    customer: 'Rents 1',
    category: 'Rents',
    receipt: 'Manual entry 9991',
    document: null,
    reconciled: false,
    subtotal: 415.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 415.00,
    verified: true,
    aiVerified: true
  },
];

const EXPENSE_SUMMARY = [
    { id: 'All', label: 'All expenses', value: 29626.26, icon: Tray },
    { id: 'Vehicle cost', label: 'Vehicle cost', value: 5000.00, icon: Car },
    { id: 'External services', label: 'External services', value: 4399.45, icon: Handshake },
    { id: 'Non-allowable expenses', label: 'Non-allowable expenses', value: 978.00, icon: XCircle },
    { id: 'Purchases and inventory changes', label: 'Purchases & inventory', value: 4385.96, icon: Package },
    { id: 'Rents', label: 'Rents', value: 415.00, icon: Buildings },
    { id: 'Vehicle depreciation', label: 'Vehicle depreciation', value: 16750.00, icon: Check },
    { id: 'Other deductible expenses', label: 'Other deductible', value: 21.65, icon: FileText },
];

// UPDATED MOCK BANK TRANSACTIONS TO MATCH SCREENSHOT
const MOCK_BANK_TRANSACTIONS: BankTransaction[] = [
  {
    id: '12748',
    date: '15.12.2025',
    amount: -5.40,
    description: 'Uber 063015 SF**POOL**',
    reference: '',
    reconciled: true,
    reconciledItems: [
      { id: 'r1', type: 'Expense', amount: -5.40, date: '15.12.2025', label: 'Expenses 62925', description: 'Uber 063015 SF*...', categoryLabel: 'Car, van and travel expenses', pillColor: 'gray' }
    ]
  },
  {
    id: '12733',
    date: '13.12.2025',
    amount: 500.00,
    description: 'United Airlines',
    reference: '',
    reconciled: false
  },
  {
    id: '12726',
    date: '12.12.2025',
    amount: -4.33,
    description: 'Starbucks',
    reference: '',
    reconciled: false
  },
  {
    id: '12725',
    date: '12.12.2025',
    amount: -12.00,
    description: "McDonald's",
    reference: '',
    reconciled: true,
    reconciledItems: [
      { id: 'r2', type: 'Expense', amount: -12.00, date: '12.12.2025', label: 'Expenses 62901', description: "McDonald's", categoryLabel: 'Costs of goods bought for res...', pillColor: 'gray' }
    ]
  },
  {
    id: '12720',
    date: '11.12.2025',
    amount: -89.40,
    description: 'SparkFun',
    reference: '',
    reconciled: true,
    reconciledItems: [
      { id: 'r3a', type: 'Expense', amount: -10000.00, date: '11.12.2025', label: 'Expenses 62869', description: 'Chevrolet', categoryLabel: 'Non-allowable business expe...', pillColor: 'gray' },
      { id: 'r3b', type: 'Income', amount: 11910.60, date: '11.12.2025', label: 'Income 62923', description: 'SparkFun', categoryLabel: 'Unclassified income', pillColor: 'yellow' }
    ]
  },
  {
    id: '12678',
    date: '28.11.2025',
    amount: -6.33,
    description: 'Uber 072515 SF**POOL**',
    reference: '',
    reconciled: true,
    reconciledItems: [
      { id: 'r4', type: 'Expense', amount: -6.33, date: '28.11.2025', label: 'Expenses 62798', description: 'Uber 072515 SF*...', categoryLabel: 'Car, van and travel expenses', pillColor: 'gray' }
    ]
  },
  {
    id: '12605',
    date: '15.11.2025',
    amount: -5.40,
    description: 'Uber 063015 SF**POOL**',
    reference: '',
    reconciled: true,
    reconciledItems: [
      { id: 'r5', type: 'Expense', amount: -5.40, date: '15.11.2025', label: 'Expenses 62786', description: 'Uber 063015 SF*...', categoryLabel: 'Car, van and travel expenses', pillColor: 'gray' }
    ]
  },
  {
    id: '12606',
    date: '13.11.2025',
    amount: 500.00,
    description: 'United Airlines',
    reference: '',
    reconciled: true,
    reconciledItems: [
      { id: 'r6a', type: 'Invoice', amount: 40.00, date: '13.11.2025', label: 'Invoice 1175', description: 'Sami', categoryLabel: 'Business Income', pillColor: 'gray', iconType: 'invoice' },
      { id: 'r6b', type: 'Income', amount: 460.00, date: '13.11.2025', label: 'Income 62824', description: 'United Airlines', categoryLabel: 'Unclassified income', pillColor: 'yellow' }
    ]
  },
  {
    id: '12608',
    date: '12.11.2025',
    amount: -4.33,
    description: 'Starbucks',
    reference: '',
    reconciled: true,
    reconciledItems: [
      { id: 'r7', type: 'Receipt', amount: -4.33, date: '12.11.2025', label: 'Receipt 202520026', description: 'Starbucks', categoryLabel: 'Car, van and travel expenses', pillColor: 'gray', iconType: 'receipt' }
    ]
  },
  {
    id: '12607',
    date: '12.11.2025',
    amount: -12.00,
    description: "McDonald's",
    reference: '',
    reconciled: true,
    reconciledItems: [
      { id: 'r8', type: 'Expense', amount: -12.00, date: '12.11.2025', label: 'Expenses 62840', description: "McDonald's", categoryLabel: 'Costs of goods bought for res...', pillColor: 'gray' }
    ]
  },
  {
    id: '12609',
    date: '11.11.2025',
    amount: -89.40,
    description: 'SparkFun',
    reference: '',
    reconciled: true,
    reconciledItems: [
      { id: 'r9a', type: 'Expense', amount: -120.00, date: '11.11.2025', label: 'Expenses 62848', description: 'SparkFun', categoryLabel: 'Unclassified expense', pillColor: 'yellow' },
      { id: 'r9b', type: 'Income', amount: 30.60, date: '11.11.2025', label: 'Income 62849', description: 'SparkFun', categoryLabel: 'Unclassified income', pillColor: 'yellow' }
    ]
  },
  {
    id: '12610',
    date: '29.10.2025',
    amount: -6.33,
    description: 'Uber 072515 SF**POOL**',
    reference: '',
    reconciled: false
  },
  {
    id: '12611',
    date: '16.10.2025',
    amount: -5.40,
    description: 'Uber 063015 SF**POOL**',
    reference: '',
    reconciled: true,
    reconciledItems: [
      { id: 'r10', type: 'Expense', amount: -5.40, date: '16.10.2025', label: 'Expenses 62787', description: 'Uber 063015 SF*...', categoryLabel: 'Car, van and travel expenses', pillColor: 'gray' }
    ]
  },
  {
    id: '12612',
    date: '14.10.2025',
    amount: 500.00,
    description: 'United Airlines',
    reference: '',
    reconciled: false
  },
  {
    id: '12613',
    date: '13.10.2025',
    amount: -12.00,
    description: "McDonald's",
    reference: '',
    reconciled: true,
    reconciledItems: [
      { id: 'r11', type: 'Expense', amount: -12.00, date: '13.10.2025', label: 'Expenses 62841', description: "McDonald's", categoryLabel: 'Costs of goods bought for res...', pillColor: 'gray' }
    ]
  }
];

const MOCK_VAT_RETURNS_DATA: VatReturn[] = [
  { id: '1', email: 'sami@kletta.com', companyName: 'Sami Tmi', firstName: 'Sami', lastName: 'Kletta', utr: '12345 67890', isUtrVerified: true, taxPeriod: 'Q1 2025', edited: '2 days ago' },
  { id: '2', email: 'danny@pham.com', companyName: 'Danny Design', firstName: 'Danny', lastName: 'Pham', utr: '55522 33311', isUtrVerified: false, taxPeriod: 'Q1 2025', edited: 'Today' },
];

const MOCK_TAX_RETURNS_DATA: TaxReturnRow[] = [
  { id: '1', sendStatus: 'SENT', email: 'sami@kletta.com', companyName: 'Sami Tmi', firstName: 'Sami', lastName: 'Kletta', plan: 'Kletta Solo', status: 'Submitted', utr: '12345 67890', isUtrVerified: true, year: 2024 },
  { id: '2', sendStatus: 'NOT SENT', email: 'john@doe.com', companyName: 'JD LLC', firstName: 'John', lastName: 'Doe', plan: 'Kletta Pro', status: 'Draft', utr: '99988 77766', isUtrVerified: true, year: 2024 },
];

const MOCK_DASHBOARD_DATA: DashboardData = {
  kpi: {
    income: 7418.00,
    expenses: 7095.53,
    profit: 322.47
  },
  chart: [
    { month: 'Apr', income: 0, expenses: 680, profit: -680 },
    { month: 'May', income: 0, expenses: 680, profit: -680 },
    { month: 'Jun', income: 0, expenses: 680, profit: -680 },
    { month: 'Jul', income: 0, expenses: 680, profit: -680 },
    { month: 'Aug', income: 518, expenses: 680, profit: -162 },
    { month: 'Sept', income: 4200, expenses: 3195.53, profit: 1004.47 },
    { month: 'Oct', income: 2700, expenses: 500, profit: 2200 },
  ]
};

const MOCK_INVITATIONS: Invitation[] = [
  { id: '1', email: 'invitee@test.com', phone: '+358 50 1234567', firstName: 'Test', lastName: 'Invitee', status: 'INVITE SENT', lastUpdated: '1 hour ago', paymentLink: 'https://kletta.com/pay/1' },
  { id: '2', email: 'client@new.com', phone: '+44 7700 900000', firstName: 'Client', lastName: 'Two', status: 'ACCEPTED', lastUpdated: 'Yesterday', paymentLink: 'https://kletta.com/pay/2' },
];

const MOCK_MILEAGES: MileageTrip[] = [
  { id: '1', startAddress: 'Mannerheimintie 1', endAddress: 'Fredrikinkatu 42', startCityCountry: 'Helsinki, Finland', endCityCountry: 'Helsinki, Finland', duration: '15 min', distanceKm: 2.5, claimAmount: 1.13, vehicle: 'Toyota Yaris', drivePurpose: 'Client Meeting', country: 'Finland', date: '20.11.2025' },
  { id: '2', startAddress: 'Fredrikinkatu 42', endAddress: 'Mannerheimintie 1', startCityCountry: 'Helsinki, Finland', endCityCountry: 'Helsinki, Finland', duration: '18 min', distanceKm: 2.6, claimAmount: 1.17, vehicle: 'Toyota Yaris', drivePurpose: 'Return trip', country: 'Finland', date: '20.11.2025' },
];

const MOCK_CLIENT_DATA: Client[] = [
  { id: 1, email: 'sami@kletta.com', countryCode: 'FI', plan: 'Kletta Solo', utr: '12345', isUtrVerified: true, isPrepaymentRegistered: true, companyName: 'Sami Tmi', firstName: 'Sami', lastName: 'Kletta', phone: '0401234567', salesPerson: 'Sami', cardAddedDate: '2024-01-01', bankName: 'Nordea', profession: 'Dev', city: 'Helsinki' },
  { id: 2, email: 'client@uk.com', countryCode: 'UK', plan: 'Kletta Care', utr: '54321', isUtrVerified: false, isPrepaymentRegistered: false, companyName: 'UK Ltd', firstName: 'James', lastName: 'Bond', phone: '07700900123', salesPerson: 'James', cardAddedDate: '2024-02-01', bankName: 'Barclays', profession: 'Agent', city: 'London' },
];

const App: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeItem, setActiveItem] = useState<NavItemType>(NavItemType.INCOME);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  
  // Expenses Filter State
  const [expenseFilterCategory, setExpenseFilterCategory] = useState<string>('All');
  
  // Transactions Filter State
  const [transactionsFilter, setTransactionsFilter] = useState<'All' | 'Reconciled' | 'Unreconciled'>('All');

  // Clients Filter State
  const [clientsFilter, setClientsFilter] = useState<'All' | 'Paying'>('All');

  // VAT Returns Search
  const [vatSearch, setVatSearch] = useState('');

  // Tax Return State
  const [taxReturnTab, setTaxReturnTab] = useState<'SENT' | 'NOT SENT'>('SENT');
  const [taxReturnYear, setTaxReturnYear] = useState('2024');
  const [taxReturnSearch, setTaxReturnSearch] = useState('');

  // Invoices State
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<'All' | 'Open' | 'Paid' | 'Due'>('All');

  // Modal State
  const [isCreateExpenseModalOpen, setIsCreateExpenseModalOpen] = useState(false);
  const [isCreateIncomeModalOpen, setIsCreateIncomeModalOpen] = useState(false);
  const [isChooseExpensesModalOpen, setIsChooseExpensesModalOpen] = useState(false);
  const [selectedTransactionForReconciliation, setSelectedTransactionForReconciliation] = useState<BankTransaction | null>(null);

  const filteredTransactions = useMemo(() => {
    if (!filterCategory) return MOCK_INCOME_DATA;
    return MOCK_INCOME_DATA.filter(t => t.category === filterCategory);
  }, [filterCategory]);

  const filteredExpenses = useMemo(() => {
    if (expenseFilterCategory === 'All') return MOCK_EXPENSES_DATA;
    return MOCK_EXPENSES_DATA.filter(t => t.category === expenseFilterCategory);
  }, [expenseFilterCategory]);

  const filteredBankTransactions = useMemo(() => {
    if (transactionsFilter === 'All') return MOCK_BANK_TRANSACTIONS;
    if (transactionsFilter === 'Reconciled') return MOCK_BANK_TRANSACTIONS.filter(t => t.reconciled);
    if (transactionsFilter === 'Unreconciled') return MOCK_BANK_TRANSACTIONS.filter(t => !t.reconciled);
    return MOCK_BANK_TRANSACTIONS;
  }, [transactionsFilter]);

  const filteredVatReturns = useMemo(() => {
    if (!vatSearch) return MOCK_VAT_RETURNS_DATA;
    const lowerSearch = vatSearch.toLowerCase();
    return MOCK_VAT_RETURNS_DATA.filter(row => 
      row.email.toLowerCase().includes(lowerSearch) ||
      row.companyName.toLowerCase().includes(lowerSearch) ||
      row.firstName.toLowerCase().includes(lowerSearch) ||
      row.lastName.toLowerCase().includes(lowerSearch)
    );
  }, [vatSearch]);

  const filteredTaxReturns = useMemo(() => {
    if (taxReturnTab === 'NOT SENT') return [];
    
    let data = MOCK_TAX_RETURNS_DATA.filter(r => r.sendStatus === taxReturnTab);
    
    // Filter by year (mock data is mostly 2024 but logic is here)
    data = data.filter(r => r.year.toString() === taxReturnYear);

    if (taxReturnSearch) {
      const lower = taxReturnSearch.toLowerCase();
      data = data.filter(r => 
        r.email.toLowerCase().includes(lower) ||
        r.companyName.toLowerCase().includes(lower) ||
        r.firstName.toLowerCase().includes(lower) ||
        r.lastName.toLowerCase().includes(lower)
      );
    }
    return data;
  }, [taxReturnTab, taxReturnYear, taxReturnSearch]);

  const totalBusinessIncome = MOCK_INCOME_DATA.filter(t => t.category === 'Business Income')
    .reduce((sum, t) => sum + t.totalAmount, 0);

  // Transactions Summary Calculations
  const bankTransactionsSummary = useMemo(() => {
    const all = MOCK_BANK_TRANSACTIONS;
    const reconciled = all.filter(t => t.reconciled);
    const unreconciled = all.filter(t => !t.reconciled);
    
    // Sum logic: Sum of bank transaction amounts
    return {
      all: { count: all.length, amount: all.reduce((sum, t) => sum + t.amount, 0) },
      reconciled: { count: reconciled.length, amount: reconciled.reduce((sum, t) => sum + t.amount, 0) },
      unreconciled: { count: unreconciled.length, amount: unreconciled.reduce((sum, t) => sum + t.amount, 0) },
    };
  }, []);

  const headerRightAction = useMemo(() => {
    if (activeItem === NavItemType.INCOME || activeItem === NavItemType.EXPENSES) {
      return (
        <button 
          onClick={() => activeItem === NavItemType.INCOME ? setIsCreateIncomeModalOpen(true) : setIsCreateExpenseModalOpen(true)}
          className="h-[32px] px-3 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#000000] text-[12px] font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus size={16} weight="bold" />
          {activeItem === NavItemType.INCOME ? "Create income" : "Create expense"}
        </button>
      );
    }
    return null;
  }, [activeItem]);

  const handleOpenReconcile = (tx: BankTransaction) => {
    setSelectedTransactionForReconciliation(tx);
    setIsChooseExpensesModalOpen(true);
  };

  const handleReconcileConfirm = (expenseId: string) => {
    // In a real app, this would link the expense to the transaction.
    // For this UI demo, we'll just close the modal.
    console.log(`Reconciling transaction ${selectedTransactionForReconciliation?.id} with expense ${expenseId}`);
    setIsChooseExpensesModalOpen(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // --- RENDER CONTENT BASED ON ACTIVE ITEM ---
  const renderContent = () => {
    if (activeItem === NavItemType.WELCOME) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col bg-white">
          <Welcome />
        </main>
      );
    }

    if (activeItem === NavItemType.CHAT) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col bg-white">
          <Chat />
        </main>
      );
    }
    
    if (activeItem === NavItemType.ACCOUNT) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col bg-white">
          <Account />
        </main>
      );
    }

    if (activeItem === NavItemType.AI_SUPPORT) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col bg-white">
          <AISupport />
        </main>
      );
    }

    if (activeItem === NavItemType.DASHBOARD) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col bg-white">
          <Dashboard data={MOCK_DASHBOARD_DATA} />
        </main>
      );
    }

    if (activeItem === NavItemType.REPORTS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col bg-white">
          <Reports />
        </main>
      );
    }

    if (activeItem === NavItemType.VAT_RETURNS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 bg-white">
           <div className="mb-6 flex items-center justify-between">
             <h1 className="text-2xl font-bold text-[#0F2F33]">VAT returns</h1>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9CA3AF]">
                  <MagnifyingGlass size={16} />
                </div>
                <input 
                  type="text" 
                  value={vatSearch}
                  onChange={(e) => setVatSearch(e.target.value)}
                  placeholder="Search..."
                  className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] placeholder-[#9CA3AF] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[260px] focus:outline-none font-normal"
                />
             </div>
           </div>
           <VatReturnsTable data={filteredVatReturns} />
        </main>
      );
    }

    if (activeItem === NavItemType.TAX_RETURN) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 bg-white">
           <div className="mb-3 flex items-center justify-between">
             <div className="flex flex-col gap-4">
               <h1 className="text-2xl font-bold text-[#0F2F33]">Tax return</h1>
               
               {/* Segmented Toggle */}
               <div className="inline-flex bg-[#F1EDDA] p-1 rounded-xl self-start">
                 <button 
                   onClick={() => setTaxReturnTab('SENT')}
                   className={`px-5 py-2 text-[14px] font-medium rounded-lg transition-all ${
                     taxReturnTab === 'SENT' 
                       ? 'bg-white text-[#0F2F33] shadow-sm' 
                       : 'text-[#000000] hover:text-[#0F2F33]'
                   }`}
                 >
                   Sent
                 </button>
                 <button 
                   onClick={() => setTaxReturnTab('NOT SENT')}
                   className={`px-5 py-2 text-[14px] font-medium rounded-lg transition-all ${
                     taxReturnTab === 'NOT SENT' 
                       ? 'bg-white text-[#0F2F33] shadow-sm' 
                       : 'text-[#000000] hover:text-[#0F2F33]'
                   }`}
                 >
                   Not sent
                 </button>
               </div>
             </div>
             
             {/* Right Controls */}
             <div className="flex items-center gap-4 self-start mt-1">
                {/* Year Dropdown */}
                <div className="flex items-center gap-2">
                   <span className="text-[14px] text-[#000000] font-medium">Tax return year</span>
                   <div className="relative">
                      <select 
                        value={taxReturnYear}
                        onChange={(e) => setTaxReturnYear(e.target.value)}
                        className="h-[42px] pl-4 pr-10 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors appearance-none cursor-pointer"
                      >
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#9CA3AF]">
                        <CaretDown size={14} weight="bold" />
                      </div>
                   </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9CA3AF]">
                    <MagnifyingGlass size={16} />
                  </div>
                  <input 
                    type="text" 
                    value={taxReturnSearch}
                    onChange={(e) => setTaxReturnSearch(e.target.value)}
                    placeholder="Search..."
                    className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] placeholder-[#9CA3AF] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[260px] focus:outline-none font-normal"
                  />
                </div>
             </div>
           </div>

           <TaxReturnTable data={filteredTaxReturns} />
        </main>
      );
    }

    if (activeItem === NavItemType.INVITATIONS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 bg-white">
           {/* Page Title */}
           <div className="mb-6 flex items-center justify-between">
             <h1 className="text-2xl font-bold text-[#0F2F33]">Invitations</h1>
           </div>

           {/* Toolbar (Search & Filter) */}
           <div className="mb-4 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                   All statuses
                   <CaretDown size={14} className="text-[#9CA3AF]" />
                </button>
             </div>
             <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#616A6B]">
                    <MagnifyingGlass size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search invitations..."
                    className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] placeholder-[#9CA3AF] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[260px] focus:outline-none font-normal"
                  />
                </div>
                <button className="h-[42px] px-5 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#000000] text-[14px] font-medium rounded-xl flex items-center gap-2 transition-colors shadow-sm">
                   <Plus size={16} weight="bold" />
                   Create Invitation
                </button>
             </div>
           </div>

           <InvitationsTable invitations={MOCK_INVITATIONS} />
        </main>
      );
    }
    
    if (activeItem === NavItemType.MILEAGES) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 bg-white">
           {/* Page Title */}
           <div className="mb-6 flex items-center justify-between">
             <h1 className="text-2xl font-bold text-[#0F2F33]">Mileage</h1>
           </div>

           {/* Toolbar (Filter & Actions) */}
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                  <div className="relative">
                     <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                       Last 30 days
                       <CaretDown size={14} className="text-[#9CA3AF]" />
                     </button>
                  </div>
                  <div className="relative">
                     <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                       <Car size={16} className="text-[#9CA3AF]" />
                       All Vehicles
                       <CaretDown size={14} className="text-[#9CA3AF]" />
                     </button>
                  </div>
                  <div className="relative">
                     <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                       <SteeringWheel size={16} className="text-[#9CA3AF]" />
                       All Purposes
                       <CaretDown size={14} className="text-[#9CA3AF]" />
                     </button>
                  </div>
              </div>
               <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9CA3AF]">
                          <MagnifyingGlass size={16} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="Search..."
                          className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] placeholder-[#9CA3AF] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[220px] focus:outline-none font-normal"
                        />
                    </div>
                    <button className="h-[42px] px-5 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#000000] text-[14px] font-medium rounded-xl flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap">
                       <Plus size={16} weight="bold" />
                       Add Trip
                    </button>
               </div>
           </div>

           {/* List */}
           <div className="flex-1 overflow-y-auto custom-scrollbar">
              <MileagesList mileages={MOCK_MILEAGES} />
           </div>
        </main>
      );
    }
    
    if (activeItem === NavItemType.INVOICES) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 bg-white">
           {/* Page Title */}
           <div className="mb-6 flex items-center justify-between">
             <h1 className="text-2xl font-bold text-[#0F2F33]">Invoices</h1>
           </div>

           {/* Toolbar (Tabs) */}
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                  <div className="bg-[#F1EDDA] p-1 rounded-xl flex">
                      {(['All', 'Open', 'Paid', 'Due'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => setInvoiceStatusFilter(status)}
                          className={`px-5 py-2 text-[14px] font-medium rounded-lg transition-all ${
                            invoiceStatusFilter === status 
                              ? 'bg-white text-[#0F2F33] shadow-sm' 
                              : 'text-[#000000] hover:text-[#0F2F33]'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                  </div>
              </div>
               <div className="flex items-center gap-3">
                    <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                       Last 30 days
                       <CaretDown size={14} className="text-[#9CA3AF]" />
                    </button>
                    <button className="h-[42px] px-5 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#000000] text-[14px] font-medium rounded-xl flex items-center gap-2 transition-colors shadow-sm">
                       <Plus size={16} weight="bold" />
                       Create Invoice
                    </button>
               </div>
           </div>

           {/* List */}
           <InvoicesTable invoices={MOCK_INVOICES} statusFilter={invoiceStatusFilter} />
        </main>
      );
    }

    if (activeItem === NavItemType.TRANSACTIONS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 bg-white">
           {/* Page Title */}
           <div className="mb-2">
             <h1 className="text-2xl font-bold text-[#0F2F33]">Transactions</h1>
           </div>

           {/* Wallet and Date Selectors */}
           <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                  <div className="relative">
                     <select className="h-[42px] pl-4 pr-10 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors appearance-none cursor-pointer min-w-[280px]">
                        <option>£100.00 Plaid Standard Current Account</option>
                        <option>Savings</option>
                     </select>
                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#9CA3AF]">
                        <CaretDown size={14} weight="bold" />
                     </div>
                  </div>
                  <div className="flex items-center gap-2 h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl transition-colors cursor-pointer hover:border-[#D1D5DB]">
                     <span className="text-[#6B7280] text-[13px] font-normal mr-1">First fetch date</span>
                     <span className="text-[13px] text-[#0F2F33] font-medium">6 April 2025</span>
                     <CalendarBlank size={16} className="text-[#9CA3AF] ml-2" />
                  </div>
              </div>
           </div>

           {/* Filter Cards - Compact & Background-free icons */}
           <div className="flex gap-2 mb-3">
              <div 
                onClick={() => setTransactionsFilter('All')}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer min-w-[180px] transition-all bg-white border-[#E5E7EB] hover:border-[#D1D5DB] ${transactionsFilter === 'All' ? 'border-[#1E6F73] ring-1 ring-[#1E6F73] shadow-sm' : ''}`}
              >
                 <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-[#0F2F33]" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#0F2F33]">All {bankTransactionsSummary.all.count}</span>
                    <span className="text-[11px] text-[#6B7280] font-medium">-£45,169.00</span>
                 </div>
              </div>

              <div 
                onClick={() => setTransactionsFilter('Reconciled')}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer min-w-[180px] transition-all bg-white border-[#E5E7EB] hover:border-[#D1D5DB] ${transactionsFilter === 'Reconciled' ? 'border-[#1E6F73] ring-1 ring-[#1E6F73] shadow-sm' : ''}`}
              >
                 <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={20} weight="bold" className="text-[#166534]" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#0F2F33]">Reconciled {bankTransactionsSummary.reconciled.count}</span>
                    <span className="text-[11px] text-[#6B7280] font-medium">-£4,492.58</span>
                 </div>
              </div>

              <div 
                onClick={() => setTransactionsFilter('Unreconciled')}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer min-w-[180px] transition-all bg-white border-[#E5E7EB] hover:border-[#D1D5DB] ${transactionsFilter === 'Unreconciled' ? 'border-[#1E6F73] ring-1 ring-[#1E6F73] shadow-sm' : ''}`}
              >
                 <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle size={20} className="text-[#991B1B]" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#0F2F33]">Unreconciled {bankTransactionsSummary.unreconciled.count}</span>
                    <span className="text-[11px] text-[#6B7280] font-medium">-£40,676.42</span>
                 </div>
              </div>
              
              <div className="ml-auto mt-auto">
                 <input 
                   type="text" 
                   placeholder="Search by amount or description"
                   className="h-[42px] px-4 w-[280px] bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#0F2F33] placeholder-[#9CA3AF] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors focus:outline-none font-normal"
                 />
              </div>
           </div>

           <BankTransactionsTable 
             data={filteredBankTransactions} 
             onReconcile={handleOpenReconcile}
           />
           <ChooseExpensesModal 
             isOpen={isChooseExpensesModalOpen}
             onClose={() => setIsChooseExpensesModalOpen(false)}
             onConfirm={handleReconcileConfirm}
             transaction={selectedTransactionForReconciliation}
           />
        </main>
      );
    }

    if (activeItem === NavItemType.EXPENSES) {
      return (
            <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 bg-white">
               {/* Page Title */}
               <div className="mb-3 flex items-center justify-between">
                 <h1 className="text-2xl font-bold text-[#0F2F33]">Expenses</h1>
               </div>

               {/* Summary Cards - Compact & No backgrounds/shadows */}
               <div className="flex gap-4 mb-0 overflow-x-auto custom-scrollbar pb-2">
                 {EXPENSE_SUMMARY.map((card) => {
                    const isActive = expenseFilterCategory === card.id;
                    return (
                        <div 
                        key={card.id}
                        onClick={() => setExpenseFilterCategory(card.id)}
                        className={`relative overflow-hidden rounded-xl px-4 py-3 border flex items-center gap-2 min-w-[220px] transition-all group cursor-pointer flex-shrink-0 ${
                            isActive 
                            ? 'bg-white border-[#1E6F73]' 
                            : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB]'
                        }`}
                        >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            isActive ? 'text-[#1E6F73]' : 'text-[#6B7280]'
                        }`}>
                            <card.icon size={22} weight={isActive ? "fill" : "regular"} className={isActive ? "opacity-100" : "opacity-60"} />
                        </div>
                        <div className="flex flex-col z-10">
                            <span className={`text-[12px] font-normal tracking-wide transition-colors truncate max-w-[160px] ${isActive ? 'text-[#1E6F73]' : 'text-[#6B7280]'}`}>
                                {card.label}
                            </span>
                            <span className="text-[15px] text-[#0F2F33] font-medium leading-none mt-0.5 ">
                                €{card.value.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                        </div>
                    );
                 })}
               </div>

               {/* Logs-style Toolbar - Removed Spacer */}
               <ExpensesTable transactions={filteredExpenses} />
               <CreateExpenseModal isOpen={isCreateExpenseModalOpen} onClose={() => setIsCreateExpenseModalOpen(false)} />
            </main>
        );
    }

    if (activeItem === NavItemType.ALL_CLIENTS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 bg-white">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#0F2F33]">Clients</h1>
          </div>
          
          <div className="flex gap-2 mb-3">
             <div 
               onClick={() => setClientsFilter('All')}
               className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer min-w-[200px] transition-all bg-white border-[#E5E7EB] hover:border-[#D1D5DB] ${clientsFilter === 'All' ? 'border-[#1E6F73]' : ''}`}
             >
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
                   <Users size={20} className="text-[#0F2F33]" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[13px] font-bold text-[#0F2F33]">Paying customers</span>
                   <span className="text-[11px] text-[#6B7280] font-medium">19</span>
                </div>
             </div>

             <div 
               onClick={() => setClientsFilter('Paying')}
               className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer min-w-[200px] transition-all bg-white border-[#E5E7EB] hover:border-[#D1D5DB] ${clientsFilter === 'Paying' ? 'border-[#1E6F73]' : ''}`}
             >
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
                   <Clock size={20} className="text-[#0F2F33]" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[13px] font-bold text-[#0F2F33]">MRR</span>
                   <span className="text-[11px] text-[#6B7280] font-medium">€991.00</span>
                </div>
             </div>
          </div>

          <div className="mb-2 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                   All statuses
                   <CaretDown size={14} className="text-[#9CA3AF]" />
                </button>
                <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                   All countries
                   <CaretDown size={14} className="text-[#9CA3AF]" />
                </button>
                <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                   All plans
                   <CaretDown size={14} className="text-[#9CA3AF]" />
                </button>
             </div>
             <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9CA3AF]">
                    <MagnifyingGlass size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search clients..."
                    className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] placeholder-[#9CA3AF] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[220px] focus:outline-none font-normal"
                  />
                </div>
                <div className="h-6 w-px bg-[#E5E7EB] mx-1"></div>
                <button className="h-[42px] px-5 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#000000] text-[14px] font-medium rounded-xl flex items-center gap-2 transition-colors shadow-sm">
                   <Plus size={16} weight="bold" />
                   Invite client
                </button>
                <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                   <Upload size={16} className="text-[#9CA3AF]" />
                   Import Clients
                </button>
                <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                   Invite with link
                </button>
             </div>
          </div>
          <ClientTable clients={MOCK_CLIENT_DATA} />
        </main>
      );
    }

    const incomeWidgets = [
      { id: null, label: 'All income', value: 29626.26, icon: Tray },
      { id: 'Business Income', label: 'Business income', value: totalBusinessIncome, icon: TrendUp },
      { id: 'Deposit & transfer', label: 'Deposit & transfer', value: 12500.00, icon: ArrowsLeftRight },
      { id: 'Reimbursement', label: 'Reimbursement', value: 3420.50, icon: HandCoins },
      { id: 'Interest income', label: 'Interest income', value: 120.75, icon: Percent },
      { id: 'Rental income', label: 'Rental income', value: 5800.00, icon: HouseLine },
    ];

    return (
      <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 bg-white">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#0F2F33]">Income</h1>
          </div>
          
          {/* Income Summary Widgets - Compact & Background-free icons */}
          <div className="flex gap-4 mb-0 overflow-x-auto custom-scrollbar pb-2">
            {incomeWidgets.map((widget) => {
              const isActive = filterCategory === widget.id;
              return (
                <div 
                  key={widget.label}
                  onClick={() => setFilterCategory(widget.id as string | null)}
                  className={`relative overflow-hidden rounded-xl px-4 py-3 border flex items-center gap-2 min-w-[220px] transition-all group cursor-pointer flex-shrink-0 ${
                    isActive 
                      ? 'bg-white border-[#1E6F73]' 
                      : 'bg-white border-[#E5E7EB]'
                  }`}
                >
                   <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                     isActive ? 'text-[#1E6F73]' : 'text-[#6B7280]'
                   }`}>
                      <widget.icon size={22} weight={isActive ? "fill" : "regular"} className={isActive ? "opacity-100" : "opacity-60"} />
                   </div>
                   <div className="flex flex-col z-10">
                      <span className={`text-[12px] font-normal tracking-wide transition-colors ${isActive ? 'text-[#1E6F73]' : 'text-[#6B7280]'}`}>
                        {widget.label}
                      </span>
                      <span className="text-[15px] text-[#0F2F33] font-medium leading-none mt-0.5">
                        €{widget.value.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                   </div>
                </div>
              );
            })}
          </div>

          {/* Logs-style Toolbar - Removed Spacer */}
          <TransactionTable transactions={filteredTransactions} />
          <CreateIncomeModal isOpen={isCreateIncomeModalOpen} onClose={() => setIsCreateIncomeModalOpen(false)} />
        </main>
    );
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      <Sidebar 
        activeItem={activeItem} 
        setActiveItem={setActiveItem} 
        onLogout={() => setIsAuthenticated(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <TopHeader rightAction={headerRightAction} />
        {renderContent()}
      </div>
    </div>
  );
};

export default App;