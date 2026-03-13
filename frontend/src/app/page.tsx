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
import { farmersApi, programsApi, reportsApi } from "@/lib/api";
import FarmersView from "@/components/FarmersView";
import ProgramsView from "@/components/ProgramsView";
import AnomaliesView from "@/components/AnomaliesView";
import AcademyView from "@/components/AcademyView";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [data, setData] = useState({
    farmers: [],
    programs: [],
    alerts: [],
    metrics: { totalFarmers: 0, totalVendors: 0, totalRedemptions: 0, totalAlerts: 0 },
    recentTransactions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [farmersRes, programsRes, summaryRes] = await Promise.all([
        farmersApi.getAll(),
        programsApi.getAll(),
        reportsApi.getSummary()
      ]);

      setData({
        farmers: farmersRes.data,
        programs: programsRes.data,
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
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col fixed h-full z-40">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 gradient-emerald rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200 dark:shadow-emerald-950">
            A
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            AgriSmart<span className="text-emerald-600">.</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={activeTab === item.name ? "sidebar-item-active w-full" : "sidebar-item w-full"}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <UserCircle size={32} className="text-slate-400" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">Ibrahim Musa</p>
              <p className="text-xs text-slate-500 truncate">Program Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{activeTab}</h1>
            <p className="text-slate-500 mt-1 uppercase tracking-widest text-[10px] font-bold">AgriSmart Connect Infrastructure Platform</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search repository..."
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-64"
              />
            </div>
            <button className="p-2.5 text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all relative">
              <Bell size={20} />
              {data.metrics?.totalAlerts > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        {activeTab === "Dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: "Total Farmers", value: data.metrics?.totalFarmers?.toLocaleString() || "0", change: "+12.5%", icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
                { label: "Active Programs", value: data.programs?.length?.toString() || "0", change: "Steady", icon: ClipboardList, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
                { label: "Total Disbursement", value: `₦${((data.metrics?.totalRedemptions || 0) * 50000 / 1000000).toFixed(1)}M`, change: "+8.2%", icon: Receipt, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
                { label: "Open Anomalies", value: data.metrics?.totalAlerts?.toString() || "0", change: "-4", icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
              ].map((stat, i) => (
                <div key={i} className="premium-card relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500 opacity-50`}></div>
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                        <stat.icon size={20} />
                      </div>
                      <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-600' : stat.change === 'Steady' ? 'text-slate-400' : 'text-rose-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stat.value}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Statistics Illustration/Chart */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 premium-card h-80 flex items-center justify-center border-dashed border-2 border-slate-100 dark:border-slate-800">
                <div className="text-center">
                  <BarChart3 size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-slate-400 text-sm font-medium">Distribution Analytics Engine Active</p>
                </div>
              </div>
              <div className="premium-card h-80 overflow-y-auto no-scrollbar">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Integrity Stream</h3>
                <div className="space-y-4">
                  {data.alerts?.slice(0, 5).map((alert: any) => (
                    <div key={alert.id} className="flex gap-3 text-sm border-l-2 border-emerald-500 pl-3">
                      <div>
                        <p className="font-semibold text-slate-700 dark:text-slate-200">{alert.type?.replace(/_/g, ' ')}</p>
                        <p className="text-[10px] text-slate-500">{new Date(alert.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity Table using real data */}
            <div className="premium-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Recent Transactions</h3>
                <button className="btn-primary flex items-center gap-2">
                  <ScanLine size={18} />
                  Scan New Voucher
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                      <th className="pb-4 pl-2">Farmer</th>
                      <th className="pb-4">Voucher ID</th>
                      <th className="pb-4">Vendor</th>
                      <th className="pb-4">Value</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 pr-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.recentTransactions?.map((tx: any, i: number) => (
                      <tr key={i} className="text-sm group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="py-4 pl-2 font-semibold text-slate-700 dark:text-slate-200">{tx.Farmer?.name}</td>
                        <td className="py-4 text-slate-500 font-mono text-xs">{tx.Voucher?.voucher_code || 'DEMO-CODE'}</td>
                        <td className="py-4 text-slate-600 dark:text-slate-400">{tx.Vendor?.business_name}</td>
                        <td className="py-4 font-bold text-slate-800 dark:text-white">₦{(parseFloat(tx.amount) / 1000).toFixed(0)}k</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${tx.status === 'Verified' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                            }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 pr-2 text-right">
                          <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Farmers" && <FarmersView farmers={data.farmers} />}
        {activeTab === "Programs" && <ProgramsView programs={data.programs} />}
        {activeTab === "Anomalies" && <AnomaliesView alerts={data.alerts} />}
        {activeTab === "Academy (VAL)" && <AcademyView />}
      </main>
    </div>
  );
}
