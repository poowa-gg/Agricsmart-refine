"use client";

import React, { useState } from "react";
import { ScanLine, Smartphone, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { vouchersApi } from "@/lib/api";

export default function RedemptionView() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        voucherCode: "",
        farmerPhone: "",
        vendorId: "demo-vendor-id" // In real app, this would be from auth
    });
    const [result, setResult] = useState<any>(null);

    const handleRedeem = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const res = await vouchersApi.redeem(formData);
            setResult(res.data);
            setStep(3);
        } catch (err: any) {
            setError(err.response?.data?.error || "Redemption failed. Please check the code and phone number.");
            setStep(2);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
            <div>
                <h2 className="text-2xl font-bold dark:text-white">Voucher Redemption</h2>
                <p className="text-slate-500 text-sm">Process digital vouchers for agricultural inputs</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-1 space-y-4">
                    <div className={`p-4 rounded-2xl border-2 transition-all ${step === 1 ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/5' : 'border-slate-100 dark:border-slate-800 opacity-50'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">1</div>
                            <h4 className="font-bold text-slate-800 dark:text-white">Scan & Verify</h4>
                        </div>
                        <p className="text-xs text-slate-500">Enter voucher code and farmer contact</p>
                    </div>
                    <div className={`p-4 rounded-2xl border-2 transition-all ${step === 2 ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-500/5' : step === 3 ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 dark:border-slate-800 opacity-50'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center font-bold">2</div>
                            <h4 className="font-bold text-slate-800 dark:text-white">Processing</h4>
                        </div>
                        <p className="text-xs text-slate-500">System validation and integrity checks</p>
                    </div>
                </div>

                <div className="col-span-2 premium-card">
                    {step === 1 && (
                        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Voucher Code</label>
                                    <div className="relative">
                                        <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            required
                                            value={formData.voucherCode}
                                            onChange={(e) => setFormData({...formData, voucherCode: e.target.value.toUpperCase()})}
                                            placeholder="AGRI-XXXX-XXXX"
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono tracking-widest"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Farmer Phone Number</label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="tel"
                                            required
                                            value={formData.farmerPhone}
                                            onChange={(e) => setFormData({...formData, farmerPhone: e.target.value})}
                                            placeholder="e.g. 08012345678"
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2">
                                Verify Voucher
                                <ArrowRight size={20} />
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="py-10 text-center space-y-6">
                            {!error ? (
                                <>
                                    <Loader2 className="animate-spin text-emerald-500 mx-auto" size={48} />
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-800 dark:text-white">Validating Request</h3>
                                        <p className="text-slate-500 mt-2">Connecting to AgriSmart Core Infrastructure...</p>
                                    </div>
                                    <button 
                                        onClick={handleRedeem}
                                        className="btn-primary px-8"
                                    >
                                        Confirm Redemption
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/20 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                                        <AlertCircle size={32} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-800 dark:text-white">Validation Failed</h3>
                                        <p className="text-rose-500 mt-2">{error}</p>
                                    </div>
                                    <button onClick={() => setStep(1)} className="text-emerald-600 font-bold hover:underline">
                                        Try again with different details
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {step === 3 && result && (
                        <div className="py-10 text-center space-y-6 animate-in zoom-in-95 duration-500">
                            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-100 dark:shadow-none">
                                <CheckCircle2 size={40} />
                            </div>
                            <div>
                                <h3 className="font-bold text-2xl text-slate-800 dark:text-white">Redemption Successful</h3>
                                <p className="text-slate-500 mt-2">Transaction ID: <span className="font-mono text-emerald-600 uppercase">{result.transaction?.id?.split('-')[0]}</span></p>
                            </div>
                            
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl space-y-4 text-left border border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Value Disbursed</span>
                                    <span className="font-black text-slate-900 dark:text-white text-lg">₦{result.transaction?.amount}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100 dark:border-slate-800">
                                    <span className="text-slate-500 font-medium">Farmer</span>
                                    <span className="font-bold text-slate-700 dark:text-slate-200">{formData.farmerPhone}</span>
                                </div>
                            </div>

                            <button onClick={() => { setStep(1); setFormData({...formData, voucherCode: "", farmerPhone: ""}); }} className="w-full py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold hover:opacity-90 transition-all">
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
