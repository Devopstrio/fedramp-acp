import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShieldCheck, Activity, Database, Users, TrendingUp, BarChart4, Settings, LayoutDashboard, Globe, Zap, Box, Anchor, Share2, Server, Repeat, AlertTriangle, Layers, Book, Search, Binary, Terminal, HardDrive, Cpu, FileCheck, Share, Network, Fingerprint, Lock, ShieldAlert } from 'lucide-react';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
        {/* Navigation Sidebar */}
        <aside className="w-72 bg-slate-900/40 backdrop-blur-3xl border-r border-slate-800 flex flex-col p-8 fixed h-full shadow-2xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl shadow-indigo-900/20 text-white">
               <ShieldCheck size={28} />
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">FedRAMPACP</span>
          </div>
          
          <nav className="flex-1 space-y-2">
            <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Executive Summary" active />
            <NavItem to="/ssp" icon={<Book size={20} />} label="SSP Workspace" />
            <NavItem to="/poam" icon={<ShieldAlert size={20} />} label="POA&M Tracker" />
            <NavItem to="/controls" icon={<Layers size={20} />} label="Control Catalog" />
            <NavItem to="/monitoring" icon={<Activity size={20} />} label="Continuous Monitoring" />
            <NavItem to="/scans" icon={<Search size={20} />} label="Compliance Scans" />
            <NavItem to="/risk" icon={<TrendingUp size={20} />} label="Risk Insights" />
            <NavItem to="/audit" icon={<FileCheck size={20} />} label="Audit Readiness" />
          </nav>

          <div className="pt-6 border-t border-slate-800">
            <NavItem to="/settings" icon={<Settings size={20} />} label="ACP Settings" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-72">
          <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-widest">
              <span>Industrial Federal Compliance</span>
              <span>/</span>
              <span className="text-white font-bold">FedRAMP ACP Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-white">Compliance Architect</p>
                <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-black">Authorized Personnel</p>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-slate-300">CA</div>
            </div>
          </header>

          <div className="p-10 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

const NavItem = ({ to, icon, label, active }: any) => (
  <Link 
    to={to} 
    className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/10 shadow-lg shadow-indigo-950/50' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
  >
    <span className={`${active ? 'text-indigo-400' : 'group-hover:text-indigo-400 transition transform group-hover:scale-110'}`}>{icon}</span>
    <span className="font-bold text-sm tracking-tight">{label}</span>
  </Link>
);

export default App;
