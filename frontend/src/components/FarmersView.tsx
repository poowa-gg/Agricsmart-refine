"use client";

import React from "react";
import { UserPlus, MapPin, Phone, CheckCircle2 } from "lucide-react";

export default function FarmersView({ farmers }: { farmers: any[] }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Farmer Registry</h2>
                    <p className="text-slate-500 text-sm">Verify and manage beneficiary records</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <UserPlus size={18} />
                    Register New Farmer
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {farmers.map((farmer) => (
                    <div key={farmer.id} className="premium-card group hover:border-emerald-500/50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                <span className="font-bold text-lg">{farmer.name[0]}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${farmer.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-rose-100 text-rose-700'
                                }`}>
                                {farmer.status}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white">{farmer.name}</h3>
                            {farmer.agri_score !== undefined && (
                                <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 px-2 py-0.5 rounded text-xs font-bold border border-blue-200 dark:border-blue-800">
                                    <span className="text-[10px] uppercase">AgriScore</span>
                                    <span>{Math.round(farmer.agri_score)}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-slate-500 text-xs font-mono mb-4">{farmer.farmer_id}</p>

                        <div className="space-y-2 mt-4">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <Phone size={14} />
                                <span>{farmer.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <MapPin size={14} />
                                <span>{farmer.state}, {farmer.lga}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Consent Verified</span>
                            <CheckCircle2 size={16} className="text-emerald-500" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
