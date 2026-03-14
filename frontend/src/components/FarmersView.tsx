"use client";

import React from "react";
import { UserPlus, MapPin, Phone, CheckCircle2 } from "lucide-react";

export default function FarmersView({ farmers, onRegister }: { farmers: any[], onRegister?: () => void }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Farmer Registry</h2>
                    <p className="text-slate-500 text-sm">Verify and manage beneficiary records</p>
                </div>
                <button 
                    onClick={onRegister}
                    className="btn-primary flex items-center gap-2"
                >
                    <UserPlus size={18} />
                    Register New Farmer
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {farmers.map((farmer) => (
                    <div key={farmer.id} className="premium-card group hover:border-emerald-500/30 transition-all duration-500">
                        <div className="flex justify-between items-start mb-6">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-inner">
                                    <span className="font-black text-xl">{farmer.name[0]}</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${farmer.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                {farmer.status}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-black text-lg text-slate-800 dark:text-white tracking-tight">{farmer.name}</h3>
                            {farmer.agri_score !== undefined && (
                                <div className="flex items-center gap-1.5 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 px-2 py-1 rounded-lg text-[10px] font-black border border-blue-100 dark:border-blue-500/20 uppercase tracking-tighter">
                                    <span>AgriScore</span>
                                    <span className="text-sm">{Math.round(farmer.agri_score)}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-slate-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-6 px-1 italic">UID: {farmer.farmer_id}</p>

                        <div className="space-y-3 mt-4">
                            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-50/50 dark:bg-slate-900/30 p-2.5 rounded-xl border border-transparent hover:border-slate-200/50 transition-all">
                                <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                    <Phone size={14} className="text-slate-400" />
                                </div>
                                <span>{farmer.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-50/50 dark:bg-slate-900/30 p-2.5 rounded-xl border border-transparent hover:border-slate-200/50 transition-all">
                                <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                    <MapPin size={14} className="text-slate-400" />
                                </div>
                                <span>{farmer.state}, {farmer.lga}</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-5 border-t border-slate-100/60 dark:border-slate-800/60 flex justify-between items-center">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">KYC Verified</span>
                            </div>
                            <button className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest transition-colors">Details →</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
