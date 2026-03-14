"use client";

import React from "react";
import { Ticket, Search, Filter, Calendar, User, ArrowRight } from "lucide-react";

export default function VouchersView({ vouchers }: { vouchers: any[] }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-black dark:text-white tracking-tight uppercase">Voucher Ledger</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Issuance and lifecycle tracking</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative group flex-1 sm:flex-none">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Voucher ID Search..."
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-11 pr-4 text-xs focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 w-full sm:w-64 transition-all"
                        />
                    </div>
                    <button className="p-2.5 text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:text-emerald-500 transition-all flex items-center justify-center gap-2 sm:w-auto">
                        <Filter size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest sm:hidden">Filters</span>
                    </button>
                </div>
            </div>

            <div className="premium-card">
                <div className="overflow-x-auto -mx-[var(--card-padding)] px-[var(--card-padding)] no-scrollbar">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                                <th className="pb-2 pl-4">Voucher Asset</th>
                                <th className="pb-2">Beneficiary Mapping</th>
                                <th className="pb-2">Cycle State</th>
                                <th className="pb-2">Maturity Date</th>
                                <th className="pb-2 text-right pr-4">Trace</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vouchers && vouchers.length > 0 ? (
                                vouchers.map((voucher) => (
                                    <tr key={voucher.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                                        <td className="py-4 pl-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-l-2xl border-y border-l border-transparent group-hover:border-emerald-500/20 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
                                                    <Ticket size={18} className="text-emerald-600" />
                                                </div>
                                                <span className="font-mono text-xs font-black text-slate-700 dark:text-slate-200 tracking-tighter uppercase">{voucher.voucher_code}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 bg-slate-50/50 dark:bg-slate-900/30 border-y border-transparent group-hover:border-emerald-500/20 transition-all font-bold text-slate-600 dark:text-slate-400 text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-[10px] font-black shadow-sm border border-slate-100 dark:border-slate-800 uppercase">
                                                    {voucher.Farmer?.name[0]}
                                                </div>
                                                <span className="truncate max-w-[120px]">{voucher.Farmer?.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 bg-slate-50/50 dark:bg-slate-900/30 border-y border-transparent group-hover:border-emerald-500/20 transition-all">
                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                                                voucher.status === 'Redeemed' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100 dark:border-indigo-500/20' : 
                                                voucher.status === 'Issued' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 dark:border-emerald-500/20' :
                                                'bg-slate-50 text-slate-400 border border-slate-100 dark:border-slate-800'
                                            }`}>
                                                {voucher.status}
                                            </span>
                                        </td>
                                        <td className="py-4 bg-slate-50/50 dark:bg-slate-900/30 border-y border-transparent group-hover:border-emerald-500/20 transition-all text-slate-400 font-mono text-[10px] font-bold">
                                            {new Date(voucher.expiry_date).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 pr-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-r-2xl text-right border-y border-r border-transparent group-hover:border-emerald-500/20 transition-all">
                                            <button className="p-2 text-slate-300 hover:text-emerald-500 transition-colors">
                                                <ArrowRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center">
                                        <div className="flex flex-col items-center opacity-20">
                                            <Ticket size={56} className="mb-4" />
                                            <p className="font-black text-[10px] uppercase tracking-[0.3em]">Zero Assets Indexed</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
