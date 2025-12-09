export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum TransactionStatus {
  DRAFT = 'DRAFT',
  POSTED = 'POSTED',
  CANCELLED = 'CANCELLED'
}

export interface Transaction {
  id: string;
  date: string;
  partner: string; // Patient or Vendor name
  reference: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  category: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  lastVisit: string;
  status: 'Admitted' | 'Discharged' | 'Outpatient';
  phone: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  department: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface DashboardStats {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  activePatients: number;
}
