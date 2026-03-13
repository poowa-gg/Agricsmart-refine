"use client";

import React, { useState } from "react";
import { ShieldCheck, FileText, Download, Fingerprint, Lock, ShieldAlert, Cpu } from "lucide-react";

export default function EvidencePackView() {
    const [generating, setGenerating] = useState(false);

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => setGenerating(false), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Audit Evidence Pack</h2>
                    <p className="text-slate-500 text-sm">Immutable verification logs for compliance and auditing</p>
                </div>
                <button 
                    onClick={handleGenerate}
                    className="btn-primary flex items-center gap-2"
                >
                    <Download size={18} />
                    {generating ? "Exporting..." : "Generate Full Pack"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="premium-card bg-emerald-600 border-none text-white p-8">
                    <ShieldCheck size={40} className="mb-6 text-emerald-200" />
                    <h3 className="text-2xl font-black mb-2">Audit-Ready Compliance</h3>
                    <p className="text-emerald-100 text-sm">Every transaction is cryptographicly signed and verified against multiple integrity nodes.</p>
                </div>
                <div className="premium-card border-dashed border-2 flex flex-col items-center justify-center text-center p-8">
                    <Fingerprint size={32} className="text-slate-300 mb-4" />
                    <h4 className="font-bold text-slate-800 dark:text-white">Hash Integrity</h4>
                    <p className="text-xs text-slate-500 mt-2">SHA-256 validation of all disbursement records across 3 independent nodes.</p>
                </div>
                <div className="premium-card border-dashed border-2 flex flex-col items-center justify-center text-center p-8">
                    <Lock size={32} className="text-slate-300 mb-4" />
                    <h4 className="font-bold text-slate-800 dark:text-white">Data Residency</h4>
                    <p className="text-xs text-slate-500 mt-2">Authenticated logs compliant with local data protection regulations.</p>
                </div>
            </div>

            <div className="premium-card">
                <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                    <Cpu size={20} className="text-emerald-500" />
                    System Integrity Components
                </h3>
                <div className="space-y-4">
                    {[
                        { name: "Farmer Biometric Hash", status: "Verified", icon: Fingerprint, color: "text-blue-500" },
                        { name: "GPS Redemption Coordinates", status: "Verified", icon: ShieldAlert, color: "text-amber-500" },
                        { name: "Smart-Contract Voucher State", status: "Syncing", icon: FileText, color: "text-indigo-500" },
                    ].map((comp, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm ${comp.color}`}>
                                    <comp.icon size={18} />
                                </div>
                                <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{comp.name}</span>
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${comp.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {comp.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
