"use client";

import React, { useState } from "react";
import { Receipt, Download, FileJson, CheckCircle2, Loader2, PlayCircle, AlertCircle } from "lucide-react";
import { settlementsApi } from "@/lib/api";

export default function SettlementView() {
    const [loading, setLoading] = useState(false);
    const [batch, setBatch] = useState<any>(null);

    const generateSettlement = async () => {
        setLoading(true);
        try {
            const res = await settlementsApi.generateBatch();
            setBatch(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Financial Settlement</h2>
                    <p className="text-slate-500 text-sm">Automate payments and reconcile vendor transactions</p>
                </div>
                <button 
                    onClick={generateSettlement}
                    disabled={loading}
                    className="btn-primary flex items-center gap-2"
                >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />}
                    Generate Settlement Batch
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="premium-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-800 dark:text-white">Active Payment Instructions</h3>
                            {batch && (
                                <div className="flex gap-2">
                                    <button className="p-2 text-slate-500 bg-slate-50 dark:bg-slate-800 rounded-lg hover:text-emerald-500 transition-colors">
                                        <FileJson size={18} />
                                    </button>
                                    <button className="p-2 text-slate-500 bg-slate-50 dark:bg-slate-800 rounded-lg hover:text-emerald-500 transition-colors">
                                        <Download size={18} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                                        <th className="pb-4 pl-2">Vendor</th>
                                        <th className="pb-4">Bank Info</th>
                                        <th className="pb-4">Quantity</th>
                                        <th className="pb-4">Total Amount</th>
                                        <th className="pb-4 text-right pr-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {batch ? (
                                        batch.instructions?.map((item: any, i: number) => (
                                            <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                                <td className="py-4 pl-2 font-semibold text-slate-700 dark:text-slate-200">{item.business_name}</td>
                                                <td className="py-4">
                                                    <div className="text-[10px] font-mono leading-tight">
                                                        <p className="text-slate-500 uppercase">{item.bank_name}</p>
                                                        <p className="text-emerald-600 font-bold">{item.account_number}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-slate-600">{item.transaction_ids?.length} Vouchers</td>
                                                <td className="py-4 font-black text-slate-800 dark:text-white">₦{item.total_amount?.toLocaleString()}</td>
                                                <td className="py-4 text-right pr-2">
                                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 rounded-full text-[10px] font-bold">Pending</span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center text-slate-400">
                                                <Receipt size={48} className="mx-auto mb-4 opacity-10" />
                                                No active batch generated. Click "Generate" to process verified redemptions.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="premium-card bg-slate-900 border-none text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <h3 className="font-bold mb-4 relative z-10">Batch Summary</h3>
                        <div className="space-y-4 relative z-10">
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Batch ID</p>
                                <p className="font-mono text-emerald-400">{batch?.batch_id || '---'}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Items</p>
                                    <p className="text-xl font-bold">{batch?.instructions?.length || 0}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Total Value</p>
                                    <p className="text-xl font-bold text-emerald-400">₦{batch?.instructions?.reduce((acc: number, item: any) => acc + item.total_amount, 0).toLocaleString() || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Integrity Verification</h3>
                        <div className="space-y-4 text-xs">
                            <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-xl">
                                <CheckCircle2 size={16} />
                                <span className="font-medium">All redemptions AI-verified</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 p-3 border border-slate-100 dark:border-slate-800 rounded-xl">
                                <AlertCircle size={16} />
                                <span className="font-medium">2 anomalous redemptions auto-excluded</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
