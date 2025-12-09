import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Stethoscope, 
  Calendar, 
  WalletCards, 
  Settings, 
  Menu,
  Bell,
  Search,
  UserCircle
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ path, icon: Icon, label }: { path: string; icon: any; label: string }) => (
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
        isActive(path)
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      <Icon size={20} />
      {sidebarOpen && <span>{label}</span>}
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-slate-900 text-white flex-shrink-0 transition-all duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="h-16 flex items-center px-4 border-b border-slate-800">
            <div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${!sidebarOpen && 'justify-center w-full'}`}>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shrink-0">
                S
              </div>
              {sidebarOpen && <span className="text-blue-100">Soleh<span className="text-blue-500">Rent</span></span>}
            </div>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          <NavItem path="/" icon={LayoutDashboard} label="Dashboard" />
          <NavItem path="/patients" icon={Stethoscope} label="Patients" />
          <NavItem path="/appointments" icon={Calendar} label="Appointments" />
          <NavItem path="/accounting" icon={WalletCards} label="Accounting" />
          <NavItem path="/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4 text-slate-500">
            <h1 className="text-lg font-semibold text-slate-800 capitalize">
              {location.pathname === '/' ? 'Dashboard' : location.pathname.substring(1)}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64"
              />
            </div>
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-700">Dr. Soleh</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <UserCircle size={24} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
