import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Accounting from './pages/Accounting';
import Patients from './pages/Patients';

// Placeholder components for routes not yet fully implemented
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-96 text-slate-400">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>This module is under development.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Placeholder title="Appointments Management" />} />
          <Route path="/settings" element={<Placeholder title="System Settings" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
