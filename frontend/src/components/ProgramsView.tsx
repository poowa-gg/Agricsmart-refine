"use client";

import React from "react";
import { PlusCircle, Calendar, ShieldCheck, ArrowRight, MapPin } from "lucide-react";

export default function ProgramsView({ programs }: { programs: any[] }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Program Management</h2>
                    <p className="text-slate-500 text-sm">Design and execute agricultural support initiatives</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <PlusCircle size={18} />
                    Create New Program
                </button>
            </div>

            <div className="space-y-4">
                {programs.map((program) => (
                    <div key={program.id} className="premium-card flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-24 h-24 gradient-emerald rounded-2xl flex items-center justify-center text-white p-4 shadow-inner">
                            <ShieldCheck size={48} className="opacity-50" />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center gap-2 mb-2 justify-center md:justify-start">
                                <h3 className="font-bold text-xl text-slate-800 dark:text-white">{program.name}</h3>
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">{program.status}</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-4">{program.description}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 justify-center md:justify-start">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>Ends {new Date(program.end_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{program.target_region}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-8 min-w-[150px]">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Voucher Value</p>
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white">₦{(program.voucher_value / 1000).toFixed(0)}k</h4>
                            <button className="mt-4 text-emerald-600 hover:text-emerald-700 font-bold text-sm flex items-center gap-1 mx-auto md:ml-auto">
                                Issue Vouchers
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
