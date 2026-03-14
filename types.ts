
export interface IncomeTransaction {
  id: string;
  date: string;
  customer: string;
  description?: string; // For sub-text like "Torstai Timma..."
  category: string;
  typeId: string;
  hasDocument: boolean;
  reference: string;
  reconciled: boolean;
  subtotal: number;
  taxRate: string;
  vat: number;
  totalAmount: number;
  isVerified: boolean;
  isAiVerified: boolean;
  // New fields for horizontal scroll
  paymentMethod: string;
  dueDate: string;
  project?: string;
  costCenter?: string;
  createdBy: string;
}

export interface ExpenseTransaction {
  id: string;
  date: string;
  customer: string;
  category: string;
  receipt: string;
  document: string | null;
  reconciled: boolean;
  subtotal: number;
  taxRate: string;
  vat: number;
  totalAmount: number;
  verified: boolean;
  aiVerified: boolean;
}

export interface ReconciledItem {
  id: string;
  type: 'Expense' | 'Income' | 'Invoice' | 'Receipt';
  amount: number;
  date: string;
  label: string; // e.g., "Expenses 62925", "Receipt 202520007"
  description: string; // e.g., "Last Orders Drink", "Harrods Limited"
  categoryLabel?: string; // e.g. "Car, van and travel expenses"
  pillColor?: 'gray' | 'yellow'; // To force visual style matching screenshot
  iconType?: 'default' | 'receipt' | 'invoice'; // To show specific icons like the receipt image
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  reference: string;
  amount: number;
  reconciled: boolean;
  reconciledItems?: ReconciledItem[];
}

export interface VatReturn {
  id: string;
  email: string;
  companyName: string;
  firstName: string;
  lastName: string;
  utr: string;
  isUtrVerified: boolean;
  taxPeriod: string;
  edited: string;
}

export interface TaxReturnRow {
  id: string;
  sendStatus: 'SENT' | 'NOT SENT';
  email: string;
  companyName: string;
  firstName: string;
  lastName: string;
  plan: string;
  status: string;
  utr: string;
  isUtrVerified: boolean;
  year: number;
}

export interface Client {
  id: number;
  email: string;
  countryCode: string; // 'FI' or 'UK' for flag rendering
  plan: string;
  utr: string;
  isUtrVerified: boolean;
  isPrepaymentRegistered: boolean;
  companyName: string;
  firstName: string;
  lastName: string;
  phone: string;
  salesPerson: string;
  cardAddedDate: string;
  bankName: string;
  profession: string;
  city: string;
}

export interface Invitation {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  status: 'INVITE SENT' | 'ACCEPTED' | 'EXPIRED' | 'PENDING' | 'DRAFT';
  lastUpdated: string;
  paymentLink: string;
}

export interface MileageTrip {
  id: string | number;
  startAddress: string;
  endAddress: string;
  startCityCountry: string;
  endCityCountry: string;
  duration: string;
  distanceKm: number;
  claimAmount: number;
  vehicle: string;
  drivePurpose: string;
  country: string;
  date: string;
}

export type InvoiceStatus = 'Draft' | 'Open' | 'Paid' | 'Due';

export interface Invoice {
  id: string;
  invoiceId: string;
  customer: string;
  status: InvoiceStatus;
  totalAmount: number;
  documentUrl?: string;
  dueDate: string;
  date: string;
}

export const MOCK_INVOICES: Invoice[] = [
  { id: '1', invoiceId: 'Invoice 959', customer: 'Sami', status: 'Draft', totalAmount: 100.40, dueDate: '28.02.2025', date: '15.01.2025' },
  { id: '2', invoiceId: 'Invoice 958', customer: 'Sami ITA', status: 'Open', totalAmount: 2000.00, dueDate: '20.02.2025', date: '10.01.2025' },
  { id: '3', invoiceId: 'Invoice 957', customer: 'France man', status: 'Paid', totalAmount: -50.20, dueDate: '30.01.2025', date: '05.01.2025' },
  { id: '4', invoiceId: 'Invoice 956', customer: 'Sami Nigeria', status: 'Due', totalAmount: 500.00, dueDate: '25.12.2024', date: '10.12.2024' },
  { id: '5', invoiceId: 'Invoice 955', customer: 'Timma Oy', status: 'Paid', totalAmount: 1250.00, dueDate: '15.01.2025', date: '01.01.2025' },
  { id: '6', invoiceId: 'Invoice 954', customer: 'Danny Pham', status: 'Open', totalAmount: 75.50, dueDate: '28.02.2025', date: '20.01.2025' },
  { id: '7', invoiceId: 'Invoice 953', customer: 'James Bond', status: 'Draft', totalAmount: 3000.00, dueDate: '10.03.2025', date: '25.01.2025' },
  { id: '8', invoiceId: 'Invoice 952', customer: 'Origami Studio', status: 'Paid', totalAmount: 450.00, dueDate: '10.01.2025', date: '05.01.2025' },
  { id: '9', invoiceId: 'Invoice 951', customer: 'Kletta Ltd', status: 'Due', totalAmount: -120.00, dueDate: '01.12.2024', date: '15.11.2024' },
  { id: '10', invoiceId: 'Invoice 950', customer: 'Test User', status: 'Open', totalAmount: 99.99, dueDate: '25.02.2025', date: '22.01.2025' },
  { id: '11', invoiceId: 'Invoice 949', customer: 'Consulting Corp', status: 'Paid', totalAmount: 5000.00, dueDate: '20.12.2024', date: '01.12.2024' },
  { id: '12', invoiceId: 'Invoice 948', customer: 'Design Agency', status: 'Draft', totalAmount: 800.00, dueDate: '15.03.2025', date: '28.01.2025' },
  { id: '13', invoiceId: 'Invoice 947', customer: 'Sami', status: 'Open', totalAmount: 150.00, dueDate: '20.02.2025', date: '12.01.2025' },
  { id: '14', invoiceId: 'Invoice 946', customer: 'Local Shop', status: 'Paid', totalAmount: 25.00, dueDate: '05.01.2025', date: '02.01.2025' },
  { id: '15', invoiceId: 'Invoice 945', customer: 'Tech Startup', status: 'Due', totalAmount: 1200.50, dueDate: '30.11.2024', date: '10.11.2024' },
];

export interface DashboardData {
  kpi: {
    income: number;
    expenses: number;
    profit: number;
  };
  chart: {
    month: string;
    income: number;
    expenses: number;
    profit: number;
  }[];
}

export interface WelcomeSectionItem {
  title: string;
  description?: string;
  cta: string;
  secondary_cta?: string;
  image_url?: string;
  video_url?: string;
  gallery_images?: string[];
  items?: string[];
  modalSubtitle?: string;
  longDescription?: string;
}

export interface WelcomeData {
  sections: {
    get_started: WelcomeSectionItem[];
    quick_start: WelcomeSectionItem[];
    resources: WelcomeSectionItem[];
    support: WelcomeSectionItem[];
    community: WelcomeSectionItem[];
    newsletter: WelcomeSectionItem[];
  };
}

export enum NavItemType {
  WELCOME = 'Welcome',
  CHAT = 'Chat',
  ALL_CLIENTS = 'All Clients',
  INVITATIONS = 'Invitations',
  ACCOUNT = 'Account',
  AI_SUPPORT = 'AI Support',
  TAX_RETURN = 'Tax Return',
  DASHBOARD = 'Dashboard',
  TRANSACTIONS = 'Transactions',
  INCOME = 'Income',
  EXPENSES = 'Expenses',
  MILEAGES = 'Mileages',
  VAT_RETURNS = 'VAT Return',
  INVOICES = 'Invoices',
  REPORTS = 'Reports',
}
