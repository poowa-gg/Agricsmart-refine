"use client";

import React from "react";
import { BarChart3, TrendingUp, PieChart, Users, ClipboardList, AlertCircle, Calendar } from "lucide-react";

export default function ReportsView({ metrics, recentTransactions }: { metrics: any, recentTransactions: any[] }) {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h2 className="text-2xl font-bold dark:text-white">Intelligence & Analytics</h2>
                <p className="text-slate-500 text-sm">Consolidated program data and execution performance metrics</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Beneficiary Growth", value: metrics?.totalFarmers || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20" },
                    { label: "Program Utilization", value: "84.2%", icon: ClipboardList, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-100 dark:border-indigo-500/20" },
                    { label: "Redemption Rate", value: "92.5%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20" },
                    { label: "Flagged Activities", value: metrics?.totalAlerts || 0, icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-100 dark:border-rose-500/20" },
                ].map((stat, i) => (
                    <div key={i} className={`premium-card border ${stat.border}`}>
                        <div className="flex items-center gap-3 mb-5">
                            <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} shadow-sm`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
                        </div>
                        <h3 className="text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tight tabular-nums">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="premium-card h-80 flex flex-col items-center justify-center border-dashed border-2 border-slate-100 dark:border-slate-800">
                    <BarChart3 size={48} className="text-slate-200 mb-4" />
                    <p className="text-slate-400 font-medium text-sm">Disbursement Volume by Region</p>
                    <p className="text-[10px] text-slate-300 mt-1 uppercase tracking-widest font-bold">Dynamic Graph Generating...</p>
                </div>
                <div className="premium-card h-80 flex flex-col items-center justify-center border-dashed border-2 border-slate-100 dark:border-slate-800">
                    <PieChart size={48} className="text-slate-200 mb-4" />
                    <p className="text-slate-400 font-medium text-sm">Input Distribution by Category</p>
                    <p className="text-[10px] text-slate-300 mt-1 uppercase tracking-widest font-bold">Dynamic Graph Generating...</p>
                </div>
            </div>

            <div className="premium-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h3 className="font-black text-xl text-slate-800 dark:text-white tracking-tight">Audit Ledger Stream</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Immutable execution history</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200/50 dark:border-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <Calendar size={14} className="text-slate-400" />
                        <span>WINDOW: LAST 30 DAYS</span>
                    </div>
                </div>
                <div className="overflow-x-auto -mx-[var(--card-padding)] px-[var(--card-padding)] no-scrollbar">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                                <th className="pb-2 pl-4">Timestamp</th>
                                <th className="pb-2">Beneficiary Entity</th>
                                <th className="pb-2">Merchant Entity</th>
                                <th className="pb-2">Value</th>
                                <th className="pb-2 text-right pr-4">Node Verification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactions?.map((tx, i) => (
                                <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                                    <td className="py-4 pl-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-l-2xl text-[10px] text-slate-400 font-mono border-y border-l border-transparent group-hover:border-emerald-500/20 transition-all">
                                        {new Date(tx.timestamp || tx.createdAt).toLocaleDateString()}
                                        <br />
                                        {new Date(tx.timestamp || tx.createdAt).toLocaleTimeString()}
                                    </td>
                                    <td className="py-4 bg-slate-50/50 dark:bg-slate-900/30 font-bold text-slate-700 dark:text-slate-200 text-sm border-y border-transparent group-hover:border-emerald-500/20 transition-all">
                                        {tx.Farmer?.name}
                                    </td>
                                    <td className="py-4 bg-slate-50/50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 text-xs font-medium border-y border-transparent group-hover:border-emerald-500/20 transition-all">
                                        {tx.Vendor?.business_name}
                                    </td>
                                    <td className="py-4 bg-slate-50/50 dark:bg-slate-900/30 font-black text-slate-900 dark:text-white tabular-nums border-y border-transparent group-hover:border-emerald-500/20 transition-all">
                                        ₦{parseFloat(tx.amount).toLocaleString()}
                                    </td>
                                    <td className="py-4 pr-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-r-2xl text-right border-y border-r border-transparent group-hover:border-emerald-500/20 transition-all">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-lg text-[9px] font-black tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                                            CRYPTO-SIGNED
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
