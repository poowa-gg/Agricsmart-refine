"use client";

import React from "react";
import { Store, MapPin, Tag, ShieldCheck, Phone } from "lucide-react";

export default function VendorsView({ vendors, onOnboard }: { vendors: any[], onOnboard?: () => void }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Vendor Network</h2>
                    <p className="text-slate-500 text-sm">Manage and monitor authorized retail partners</p>
                </div>
                <button 
                    onClick={onOnboard}
                    className="btn-primary flex items-center gap-2"
                >
                    <Store size={18} />
                    Onboard New Vendor
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors && vendors.length > 0 ? (
                    vendors.map((vendor) => (
                        <div key={vendor.id} className="premium-card group hover:border-emerald-500/50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                    <Store size={24} />
                                </div>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                    vendor.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 
                                    vendor.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                                    'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400'
                                }`}>
                                    {vendor.status}
                                </span>
                            </div>

                            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">{vendor.business_name}</h3>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                                <Tag size={12} />
                                <span>{vendor.product_category}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <MapPin size={14} />
                                    <span>{vendor.shop_location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Phone size={14} />
                                    <span>{vendor.contact_info || 'No contact info'}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                                <div className="flex flex-col">
                                    <span className="text-slate-400">Bank</span>
                                    <span className="text-slate-700 dark:text-slate-300">{vendor.bank_name || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-slate-400">Account</span>
                                    <span className="text-slate-700 dark:text-slate-300">{vendor.account_number || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <Store size={48} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-slate-400">No vendors found in the directory</p>
                    </div>
                )}
            </div>
        </div>
    );
}
