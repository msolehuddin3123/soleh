import { Transaction, TransactionType, TransactionStatus, Patient, Appointment } from './types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'INV/2023/001', date: '2023-10-01', partner: 'BPJS Kesehatan', reference: 'Claim #9921', amount: 15000000, type: TransactionType.INCOME, status: TransactionStatus.POSTED, category: 'Insurance Claim' },
  { id: 'BILL/2023/045', date: '2023-10-02', partner: 'Medical Supplies Co.', reference: 'PO-2023-88', amount: 4500000, type: TransactionType.EXPENSE, status: TransactionStatus.POSTED, category: 'Medical Supplies' },
  { id: 'INV/2023/002', date: '2023-10-03', partner: 'Siti Aminah', reference: 'Consultation', amount: 750000, type: TransactionType.INCOME, status: TransactionStatus.POSTED, category: 'Patient Service' },
  { id: 'INV/2023/003', date: '2023-10-03', partner: 'Budi Santoso', reference: 'Surgery Downpayment', amount: 5000000, type: TransactionType.INCOME, status: TransactionStatus.POSTED, category: 'Patient Service' },
  { id: 'BILL/2023/046', date: '2023-10-04', partner: 'PLN (Electricity)', reference: 'Oct Bill', amount: 1200000, type: TransactionType.EXPENSE, status: TransactionStatus.DRAFT, category: 'Utilities' },
  { id: 'INV/2023/004', date: '2023-10-05', partner: 'Ahmad Dahlan', reference: 'Lab Tests', amount: 1250000, type: TransactionType.INCOME, status: TransactionStatus.POSTED, category: 'Laboratory' },
  { id: 'BILL/2023/047', date: '2023-10-06', partner: 'CleanServices Ltd', reference: 'Cleaning Oct', amount: 3000000, type: TransactionType.EXPENSE, status: TransactionStatus.POSTED, category: 'Maintenance' },
];

export const MOCK_PATIENTS: Patient[] = [
  { id: 'P001', name: 'Siti Aminah', age: 34, gender: 'Female', lastVisit: '2023-10-03', status: 'Outpatient', phone: '08123456789' },
  { id: 'P002', name: 'Budi Santoso', age: 45, gender: 'Male', lastVisit: '2023-10-03', status: 'Admitted', phone: '08198765432' },
  { id: 'P003', name: 'Ahmad Dahlan', age: 29, gender: 'Male', lastVisit: '2023-10-05', status: 'Outpatient', phone: '08122334455' },
  { id: 'P004', name: 'Dewi Sartika', age: 62, gender: 'Female', lastVisit: '2023-09-28', status: 'Discharged', phone: '08155566677' },
  { id: 'P005', name: 'Rahmat Hidayat', age: 12, gender: 'Male', lastVisit: '2023-10-01', status: 'Admitted', phone: '08188899900' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'APT-101', patientName: 'Siti Aminah', doctorName: 'Dr. John Doe', date: '2023-10-10', time: '09:00', department: 'General', status: 'Scheduled' },
  { id: 'APT-102', patientName: 'Budi Santoso', doctorName: 'Dr. Jane Smith', date: '2023-10-10', time: '10:30', department: 'Surgery', status: 'Scheduled' },
  { id: 'APT-103', patientName: 'Rahmat Hidayat', doctorName: 'Dr. Emily Chen', date: '2023-10-11', time: '14:00', department: 'Pediatrics', status: 'Scheduled' },
];

export const CHART_DATA = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
  { name: 'Aug', income: 6000, expense: 2400 },
  { name: 'Sep', income: 7500, expense: 3200 },
  { name: 'Oct', income: 8100, expense: 4100 },
];
