"use client";

import React from "react";
import { Ticket, Search, Filter, Calendar, User, ArrowRight } from "lucide-react";

export default function VouchersView({ vouchers }: { vouchers: any[] }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Voucher Inventory</h2>
                    <p className="text-slate-500 text-sm">Track issuance and redemption status across all programs</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search voucher code..."
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>
                    <button className="p-2 text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="premium-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                                <th className="pb-4 pl-4">Voucher Code</th>
                                <th className="pb-4">Beneficiary</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Expiry Date</th>
                                <th className="pb-4 text-right pr-4">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {vouchers && vouchers.length > 0 ? (
                                vouchers.map((voucher) => (
                                    <tr key={voucher.id} className="text-sm group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="py-4 pl-4 font-mono text-xs font-bold text-emerald-600">{voucher.voucher_code}</td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                                    {voucher.Farmer?.name[0]}
                                                </div>
                                                <span className="text-slate-700 dark:text-slate-200">{voucher.Farmer?.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                voucher.status === 'Redeemed' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' : 
                                                voucher.status === 'Issued' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                                'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                                            }`}>
                                                {voucher.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-slate-500">
                                            {new Date(voucher.expiry_date).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 text-right pr-4">
                                            <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                                                <ArrowRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-slate-400">
                                        <Ticket size={40} className="mx-auto mb-3 opacity-20" />
                                        No vouchers found
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
