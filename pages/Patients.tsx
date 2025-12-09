import React from 'react';
import { MOCK_PATIENTS } from '../constants';
import { User, Phone, Calendar, Clock, MoreVertical } from 'lucide-react';

const Patients: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Patients</h2>
          <p className="text-slate-500 text-sm">Directory of all registered patients</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-blue-500/30 transition-colors">
          Add Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PATIENTS.map((patient) => (
          <div key={patient.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{patient.name}</h3>
                    <p className="text-xs text-slate-500">{patient.id}</p>
                  </div>
                </div>
                <button className="text-slate-300 hover:text-slate-600">
                  <MoreVertical size={18} />
                </button>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <User size={16} className="mr-3 text-slate-400" />
                  <span>{patient.gender}, {patient.age} years</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Phone size={16} className="mr-3 text-slate-400" />
                  <span>{patient.phone}</span>
                </div>
                 <div className="flex items-center text-sm text-slate-600">
                  <Clock size={16} className="mr-3 text-slate-400" />
                  <span>Last Visit: {patient.lastVisit}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  patient.status === 'Admitted' ? 'bg-indigo-100 text-indigo-700' :
                  patient.status === 'Outpatient' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {patient.status}
                </span>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  View History
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;
