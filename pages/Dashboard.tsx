import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CHART_DATA, MOCK_PATIENTS, MOCK_TRANSACTIONS, MOCK_APPOINTMENTS } from '../constants';
import { TransactionType } from '../types';

const Dashboard: React.FC = () => {
  // Calculate some simple stats based on mock data
  const totalIncome = MOCK_TRANSACTIONS
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpense = MOCK_TRANSACTIONS
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const profit = totalIncome - totalExpense;
  const activePatients = MOCK_PATIENTS.filter(p => p.status === 'Admitted').length;

  const pieData = [
    { name: 'Admitted', value: activePatients },
    { name: 'Outpatient', value: MOCK_PATIENTS.filter(p => p.status === 'Outpatient').length },
    { name: 'Discharged', value: MOCK_PATIENTS.filter(p => p.status === 'Discharged').length },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#94a3b8'];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(val);
  };

  const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        {trend > 0 ? (
          <span className="text-emerald-500 flex items-center font-medium">
            <ArrowUpRight size={16} className="mr-1" /> {trend}%
          </span>
        ) : (
          <span className="text-rose-500 flex items-center font-medium">
            <ArrowDownRight size={16} className="mr-1" /> {Math.abs(trend)}%
          </span>
        )}
        <span className="text-slate-400 ml-2">vs last month</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(totalIncome)} 
          icon={DollarSign} 
          trend={12.5}
          color="bg-blue-500 text-blue-600"
        />
        <StatCard 
          title="Net Profit" 
          value={formatCurrency(profit)} 
          icon={TrendingUp} 
          trend={8.2}
          color="bg-emerald-500 text-emerald-600"
        />
        <StatCard 
          title="Active Patients" 
          value={activePatients} 
          icon={Users} 
          trend={-2.4}
          color="bg-indigo-500 text-indigo-600"
        />
        <StatCard 
          title="Appointments" 
          value={MOCK_APPOINTMENTS.length} 
          icon={Activity} 
          trend={5.1}
          color="bg-violet-500 text-violet-600"
        />
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Financial Overview</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Patient Status</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
             {MOCK_APPOINTMENTS.slice(0, 3).map((apt) => (
               <div key={apt.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-10 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{apt.patientName}</p>
                      <p className="text-xs text-slate-500">{apt.time} - {apt.doctorName}</p>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
