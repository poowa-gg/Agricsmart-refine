"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Store,
  ClipboardList,
  Ticket,
  ScanLine,
  Receipt,
  AlertTriangle,
  BarChart3,
  ShieldCheck,
  Search,
  Bell,
  UserCircle,
  ChevronRight,
  Loader2,
  GraduationCap
} from "lucide-react";
import { farmersApi, programsApi, reportsApi, vendorsApi, vouchersApi } from "@/lib/api";
import FarmersView from "@/components/FarmersView";
import ProgramsView from "@/components/ProgramsView";
import AnomaliesView from "@/components/AnomaliesView";
import AcademyView from "@/components/AcademyView";
import VendorsView from "@/components/VendorsView";
import VouchersView from "@/components/VouchersView";
import RedemptionView from "@/components/RedemptionView";
import SettlementView from "@/components/SettlementView";
import ReportsView from "@/components/ReportsView";
import EvidencePackView from "@/components/EvidencePackView";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [data, setData] = useState({
    farmers: [],
    programs: [],
    vendors: [],
    vouchers: [],
    alerts: [],
    metrics: { totalFarmers: 0, totalVendors: 0, totalRedemptions: 0, totalAlerts: 0 },
    recentTransactions: []
  });
  const [loading, setLoading] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFarmerModal, setShowFarmerModal] = useState(false);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [farmersRes, programsRes, summaryRes, vendorsRes, vouchersRes] = await Promise.all([
        farmersApi.getAll(),
        programsApi.getAll(),
        reportsApi.getSummary(),
        vendorsApi.getAll(),
        vouchersApi.getAll()
      ]);

      setData({
        farmers: farmersRes.data,
        programs: programsRes.data,
        vendors: vendorsRes.data,
        vouchers: vouchersRes.data,
        alerts: summaryRes.data.alerts || [],
        metrics: summaryRes.data.metrics,
        recentTransactions: summaryRes.data.recentTransactions
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Programs", icon: ClipboardList },
    { name: "Farmers", icon: Users },
    { name: "Vendors", icon: Store },
    { name: "Vouchers", icon: Ticket },
    { name: "Redemption", icon: ScanLine },
    { name: "Settlement", icon: Receipt },
    { name: "Anomalies", icon: AlertTriangle },
    { name: "Academy (VAL)", icon: GraduationCap },
    { name: "Reports", icon: BarChart3 },
    { name: "Evidence Pack", icon: ShieldCheck },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-emerald-500">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50/50 dark:bg-slate-950 min-h-screen">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`w-72 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-r border-slate-200/60 dark:border-slate-800/60 p-6 flex flex-col fixed h-full z-[70] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-emerald rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              AgriSmart<span className="text-emerald-600">.</span>
            </span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-rose-500 transition-colors">
            <ChevronRight className="rotate-180" size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar pr-1">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => { setActiveTab(item.name); setIsSidebarOpen(false); }}
              className={activeTab === item.name ? "sidebar-item-active w-full" : "sidebar-item w-full hover:bg-slate-100/50 dark:hover:bg-slate-800/30"}
            >
              <item.icon size={20} className={activeTab === item.name ? "text-white" : "text-slate-400 group-hover:text-emerald-500"} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-slate-100/60 dark:border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="relative">
              <UserCircle size={36} className="text-slate-300 dark:text-slate-600" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">Ibrahim Musa</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Program Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 xl:ml-72 flex-1 w-full min-h-screen transition-all duration-300">
        <div className="max-w-[1600px] mx-auto p-[var(--page-padding)]">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-6">
            <div className="flex items-center justify-between md:justify-start gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2.5 lg:hidden text-slate-500 hover:text-emerald-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition-all active:scale-95"
                >
                  <LayoutDashboard size={20} />
                </button>
                <div>
                  <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">{activeTab}</h1>
                  <p className="text-slate-400 mt-0.5 uppercase tracking-[0.2em] text-[10px] font-black">Infrastructure System</p>
                </div>
              </div>
              <div className="md:hidden flex items-center gap-2">
                <button className="p-2.5 text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                  <Bell size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
              <div className="relative group flex-1 md:flex-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Global search command..."
                  className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all w-full md:w-80 placeholder:text-slate-400 placeholder:font-medium"
                />
                <kbd className="hidden lg:inline-flex absolute right-4 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200 rounded uppercase">⌘K</kbd>
              </div>
              <button className="hidden md:flex p-3 text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all relative">
                <Bell size={20} />
                {data.metrics?.totalAlerts > 0 && (
                  <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 ring-4 ring-rose-500/20"></span>
                )}
              </button>
            </div>
          </header>

        {/* Dynamic Content */}
        {activeTab === "Dashboard" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: "Total Farmers", value: data.metrics?.totalFarmers?.toLocaleString() || "0", change: "+12.5%", icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20" },
                { label: "Active Programs", value: data.programs?.length?.toString() || "0", change: "Steady", icon: ClipboardList, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-100 dark:border-indigo-500/20" },
                { label: "Total Disbursement", value: `₦${((data.metrics?.totalRedemptions || 0) * 50000 / 1000000).toFixed(1)}M`, change: "+8.2%", icon: Receipt, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20" },
                { label: "Open Anomalies", value: data.metrics?.totalAlerts?.toString() || "0", change: "-4", icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-100 dark:border-rose-500/20" },
              ].map((stat, i) => (
                <div key={i} className={`premium-card group border ${stat.border}`}>
                  <div className={`absolute top-0 right-0 w-20 h-20 ${stat.bg} rounded-bl-[60px] -mr-4 -mt-4 transition-transform group-hover:scale-125 duration-700 opacity-40`}></div>
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-sm`}>
                        <stat.icon size={22} />
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : stat.change === 'Steady' ? 'bg-slate-50 text-slate-400' : 'bg-rose-50 text-rose-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                      <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-1 tabular-nums">{stat.value}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Statistics Illustration/Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
              <div className="lg:col-span-2 premium-card h-[400px] flex flex-col items-center justify-center border-dashed border-2 border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40">
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-all duration-700"></div>
                    <BarChart3 size={64} className="relative mx-auto text-slate-300 group-hover:text-emerald-500/50 transition-all duration-700 " />
                  </div>
                  <p className="text-slate-500 text-sm font-bold tracking-tight">Real-time Distribution Intelligence Active</p>
                  <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.3em] font-black">Scanning Geospatial Nodes...</p>
                </div>
              </div>
              <div className="premium-card h-[400px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tight">Integrity Stream</h3>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                </div>
                <div className="flex-1 space-y-5 overflow-y-auto no-scrollbar pr-2">
                  {data.alerts?.slice(0, 8).map((alert: any) => (
                    <div key={alert.id} className="flex gap-4 group cursor-default">
                      <div className="relative flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border-2 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                        <div className="w-0.5 flex-1 bg-slate-100 dark:bg-slate-800 my-1 group-last:hidden"></div>
                      </div>
                      <div className="pb-5">
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight">{alert.type?.replace(/_/g, ' ')}</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-mono">{new Date(alert.createdAt).toLocaleTimeString()} • NODE-04</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="premium-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-6">
                <div>
                  <h3 className="font-black text-xl text-slate-800 dark:text-white tracking-tight">Recent Live Redemptions</h3>
                  <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-black">Verified Transaction Ledger</p>
                </div>
                <button onClick={() => setActiveTab("Redemption")} className="btn-primary w-full sm:w-auto">
                  <ScanLine size={20} />
                  Initiate New Scan
                </button>
              </div>
              <div className="overflow-x-auto -mx-[var(--card-padding)] px-[var(--card-padding)] no-scrollbar">
                <table className="w-full text-left border-separate border-spacing-y-4">
                  <thead>
                    <tr className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                      <th className="pb-2">Beneficiary / ID</th>
                      <th className="pb-2">Voucher Alpha</th>
                      <th className="pb-2">Merchant Entity</th>
                      <th className="pb-2">Disbursement</th>
                      <th className="pb-2">Security Status</th>
                      <th className="pb-2 text-right">Insight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentTransactions?.map((tx: any, i: number) => (
                      <tr key={i} className="group cursor-pointer">
                        <td className="py-4 bg-slate-100/50 dark:bg-slate-900/30 rounded-l-2xl pl-5 border-y border-l border-transparent group-hover:border-emerald-500/20 group-hover:bg-emerald-50/20 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-xs font-bold shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                              {tx.Farmer?.name[0]}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{tx.Farmer?.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">FMR-{tx.Farmer?.id?.slice(0,6)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 bg-slate-100/50 dark:bg-slate-900/30 border-y border-transparent group-hover:border-emerald-500/20 group-hover:bg-emerald-50/20 transition-all">
                          <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                            {tx.Voucher?.voucher_code || 'PRM-VCH-44'}
                          </span>
                        </td>
                        <td className="py-4 bg-slate-100/50 dark:bg-slate-900/30 border-y border-transparent group-hover:border-emerald-500/20 group-hover:bg-emerald-50/20 transition-all font-medium text-slate-600 dark:text-slate-400 text-sm">
                          {tx.Vendor?.business_name}
                        </td>
                        <td className="py-4 bg-slate-100/50 dark:bg-slate-900/30 border-y border-transparent group-hover:border-emerald-500/20 group-hover:bg-emerald-50/20 transition-all font-black text-slate-900 dark:text-white tabular-nums">
                          ₦{(parseFloat(tx.amount) / 1000).toFixed(0)}k
                        </td>
                        <td className="py-4 bg-slate-100/50 dark:bg-slate-900/30 border-y border-transparent group-hover:border-emerald-500/20 group-hover:bg-emerald-50/20 transition-all">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Verified</span>
                          </div>
                        </td>
                        <td className="py-4 bg-slate-100/50 dark:bg-slate-900/30 rounded-r-2xl pr-5 border-y border-r border-transparent group-hover:border-emerald-500/20 group-hover:bg-emerald-50/20 transition-all text-right">
                          <ChevronRight size={18} className="inline text-slate-300 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Farmers" && <FarmersView farmers={data.farmers} onRegister={() => setShowFarmerModal(true)} />}
        {activeTab === "Programs" && <ProgramsView programs={data.programs} onCreate={() => setShowProgramModal(true)} />}
        {activeTab === "Vendors" && <VendorsView vendors={data.vendors} onOnboard={() => setShowVendorModal(true)} />}
        {activeTab === "Vouchers" && <VouchersView vouchers={data.vouchers} />}
        {activeTab === "Redemption" && <RedemptionView />}
        {activeTab === "Settlement" && <SettlementView />}
        {activeTab === "Anomalies" && <AnomaliesView alerts={data.alerts} />}
        {activeTab === "Academy (VAL)" && <AcademyView />}
        {activeTab === "Reports" && <ReportsView metrics={data.metrics} recentTransactions={data.recentTransactions} />}
        {activeTab === "Evidence Pack" && <EvidencePackView />}
        </div>
      </main>

      {/* Registration Modals */}
      {showFarmerModal && <RegisterFarmerModal onClose={() => setShowFarmerModal(false)} onRefresh={fetchData} />}
      {showProgramModal && <CreateProgramModal onClose={() => setShowProgramModal(false)} onRefresh={fetchData} />}
      {showVendorModal && <RegisterVendorModal onClose={() => setShowVendorModal(false)} onRefresh={fetchData} />}
    </div>
  );
}

function RegisterFarmerModal({ onClose, onRefresh }: { onClose: () => void, onRefresh: () => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", state: "", lga: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await farmersApi.register(formData);
      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Register New Beneficiary</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Full Name" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, name: e.target.value})} />
          <input required placeholder="Phone Number" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, phone: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="State" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, state: e.target.value})} />
            <input required placeholder="LGA" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, lga: e.target.value})} />
          </div>
          <div className="flex gap-4 mt-6">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 btn-primary py-3">
              {loading ? "Registering..." : "Confirm Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CreateProgramModal({ onClose, onRefresh }: { onClose: () => void, onRefresh: () => void }) {
  const [formData, setFormData] = useState({ name: "", description: "", voucher_value: 50000, target_region: "", end_date: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await programsApi.create(formData);
      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Create New Program</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Program Name" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, name: e.target.value})} />
          <textarea required placeholder="Description" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 h-24" onChange={e => setFormData({...formData, description: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <input required type="number" placeholder="Voucher Value" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, voucher_value: parseInt(e.target.value)})} />
            <input required placeholder="Target Region" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, target_region: e.target.value})} />
          </div>
          <input required type="date" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, end_date: e.target.value})} />
          <div className="flex gap-4 mt-6">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 btn-primary py-3">
              {loading ? "Creating..." : "Launch Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RegisterVendorModal({ onClose, onRefresh }: { onClose: () => void, onRefresh: () => void }) {
  const [formData, setFormData] = useState({ business_name: "", product_category: "", shop_location: "", contact_info: "", bank_name: "", account_number: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await vendorsApi.register(formData);
      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Onboard New Vendor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Business Name" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, business_name: e.target.value})} />
          <input required placeholder="Product Category (e.g., Seeds, Tools)" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, product_category: e.target.value})} />
          <input required placeholder="Shop Location" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, shop_location: e.target.value})} />
          <input required placeholder="Contact Info" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, contact_info: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="Bank Name" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, bank_name: e.target.value})} />
            <input required placeholder="Account Number" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950" onChange={e => setFormData({...formData, account_number: e.target.value})} />
          </div>
          <div className="flex gap-4 mt-6">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 btn-primary py-3">
              {loading ? "Onboarding..." : "Confirm Onboarding"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
