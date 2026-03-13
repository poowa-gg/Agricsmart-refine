"use client";

import React from "react";
import { AlertTriangle, ShieldCheck, CheckCircle2, Clock, MapPin } from "lucide-react";

export default function AnomaliesView({ alerts }: { alerts: any[] }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 className="text-2xl font-bold dark:text-white">AI Integrity Layer</h2>
                <p className="text-slate-500 text-sm">Automated fraud detection and anomaly monitoring</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`premium-card border-l-4 ${alert.severity === 'Critical' ? 'border-l-rose-500' :
                            alert.severity === 'High' ? 'border-l-orange-500' : 'border-l-amber-500'
                        }`}>
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-2xl ${alert.severity === 'Critical' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10' :
                                    alert.severity === 'High' ? 'bg-orange-50 text-orange-600 dark:bg-orange-500/10' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10'
                                }`}>
                                <AlertTriangle size={24} />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-slate-800 dark:text-white">{alert.type.replace(/_/g, ' ')}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${alert.status === 'New' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                                        }`}>
                                        {alert.status}
                                    </span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{alert.description}</p>

                                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} />
                                        <span>{new Date(alert.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ShieldCheck size={12} />
                                        <span>Integrity Score: 42%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all">Review</button>
                                <button className="px-4 py-1.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all">Dismiss</button>
                            </div>
                        </div>
                    </div>
                ))}

                {alerts.length === 0 && (
                    <div className="premium-card flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">System Integrity Optimal</h3>
                        <p className="text-slate-500 text-sm max-w-xs">No active anomalies or suspicious activities detected in the current distribution cycle.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
