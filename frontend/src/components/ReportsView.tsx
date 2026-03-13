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

            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: "Beneficiary Growth", value: metrics?.totalFarmers || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
                    { label: "Program Utilization", value: "84.2%", icon: ClipboardList, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
                    { label: "Redemption Rate", value: "92.5%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
                    { label: "Flagged Activities", value: metrics?.totalAlerts || 0, icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
                ].map((stat, i) => (
                    <div key={i} className="premium-card">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={18} />
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 dark:text-white leading-none">{stat.value}</h3>
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
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-800 dark:text-white">Historical Transaction Stream</h3>
                    <div className="flex gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <Calendar size={14} />
                        <span>Last 30 Days</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                                <th className="pb-4">Timeline</th>
                                <th className="pb-4">Farmer</th>
                                <th className="pb-4">Vendor</th>
                                <th className="pb-4">Amount</th>
                                <th className="pb-4 text-right">Verification</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {recentTransactions?.map((tx, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                                    <td className="py-4 text-[10px] text-slate-500 font-mono">{new Date(tx.timestamp || tx.createdAt).toLocaleString()}</td>
                                    <td className="py-4 font-semibold text-slate-700 dark:text-slate-200">{tx.Farmer?.name}</td>
                                    <td className="py-4 text-slate-600 dark:text-slate-400 text-xs">{tx.Vendor?.business_name}</td>
                                    <td className="py-4 font-bold text-slate-900 dark:text-white">₦{parseFloat(tx.amount).toLocaleString()}</td>
                                    <td className="py-4 text-right">
                                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-full text-[10px] font-black italic">
                                            AI-VERIFIED
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
