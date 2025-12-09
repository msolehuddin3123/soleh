import React, { useState } from 'react';
import { Plus, Filter, Download, MoreHorizontal, FileText, CheckCircle, XCircle } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../constants';
import { Transaction, TransactionType, TransactionStatus } from '../types';

const Accounting: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');

  const filteredTransactions = MOCK_TRANSACTIONS.filter(t => {
    if (filter === 'ALL') return true;
    return t.type === filter;
  });

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.POSTED:
        return <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center w-fit gap-1"><CheckCircle size={12}/> Posted</span>;
      case TransactionStatus.DRAFT:
        return <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold flex items-center w-fit gap-1"><FileText size={12}/> Draft</span>;
      case TransactionStatus.CANCELLED:
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold flex items-center w-fit gap-1"><XCircle size={12}/> Cancelled</span>;
    }
  };

  const getTypeColor = (type: TransactionType) => {
    return type === TransactionType.INCOME ? 'text-blue-600' : 'text-slate-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Accounting</h2>
          <p className="text-slate-500 text-sm">Manage invoices, bills, and financial records</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
            <Plus size={16} /> New Invoice
          </button>
        </div>
      </div>

      {/* Overview Cards (Odoo Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200 border-l-4 border-l-blue-500 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div>
               <h3 className="font-bold text-slate-700">Customer Invoices</h3>
               <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Waiting for Payment</p>
             </div>
             <div className="bg-blue-50 p-2 rounded text-blue-600">
               <FileText size={20} />
             </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">Rp 22.250.000</p>
          <div className="mt-4 flex gap-2">
             <button className="text-xs font-medium text-blue-600 hover:text-blue-800">2 Invoices to validate</button>
             <span className="text-slate-300">|</span>
             <button className="text-xs font-medium text-blue-600 hover:text-blue-800">1 Unpaid</button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 border-l-4 border-l-rose-500 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div>
               <h3 className="font-bold text-slate-700">Vendor Bills</h3>
               <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">To Pay</p>
             </div>
             <div className="bg-rose-50 p-2 rounded text-rose-600">
               <FileText size={20} />
             </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">Rp 8.700.000</p>
           <div className="mt-4 flex gap-2">
             <button className="text-xs font-medium text-rose-600 hover:text-rose-800">1 Bill to validate</button>
             <span className="text-slate-300">|</span>
             <button className="text-xs font-medium text-rose-600 hover:text-rose-800">Pay Now</button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
           <div className="flex gap-2">
             <button 
               onClick={() => setFilter('ALL')}
               className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'ALL' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
             >
               All
             </button>
             <button 
                onClick={() => setFilter('INCOME')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'INCOME' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
             >
               Income
             </button>
             <button 
                onClick={() => setFilter('EXPENSE')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'EXPENSE' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
             >
               Expenses
             </button>
           </div>
           <button className="text-slate-400 hover:text-slate-600">
             <Download size={18} />
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Number</th>
                <th className="px-6 py-4">Partner</th>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-slate-600">{t.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{t.id}</td>
                  <td className="px-6 py-4 text-slate-600">{t.partner}</td>
                  <td className="px-6 py-4 text-slate-500">{t.reference}</td>
                  <td className={`px-6 py-4 font-bold ${getTypeColor(t.type)}`}>
                    {t.type === TransactionType.EXPENSE ? '-' : '+'}{' '}
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(t.amount)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(t.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
           <span>Showing {filteredTransactions.length} records</span>
           <div className="flex gap-2">
             <button className="px-3 py-1 border border-slate-300 rounded bg-white disabled:opacity-50" disabled>Previous</button>
             <button className="px-3 py-1 border border-slate-300 rounded bg-white disabled:opacity-50" disabled>Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Accounting;
