"use client";

import React, { useState } from "react";
import { Mic, Play, Settings, RefreshCw, CheckCircle2, AlertCircle, Volume2, BookOpen } from "lucide-react";
import { academyApi } from "@/lib/api";

const BLOCK_TYPES = {
    EVENT: { color: "bg-blue-500", icon: Play, label: "Event" },
    CONDITION: { color: "bg-amber-500", icon: AlertCircle, label: "Condition" },
    ACTION: { color: "bg-emerald-500", icon: Settings, label: "Action" },
    LOOP: { color: "bg-purple-500", icon: RefreshCw, label: "Loop" },
};

const TOOLBOX_BLOCKS = [
    { id: "e1", type: "EVENT", text: "When season starts", concept: "Farkon Damina" },
    { id: "c1", type: "CONDITION", text: "If soil is dry", concept: "Idan Kasa ta bushe" },
    { id: "a1", type: "ACTION", text: "Cover soil with dead leaves (Mulch)", concept: "Rufe Kasa don kiyaye ruwa" },
    { id: "a2", type: "ACTION", text: "Plant beans near maize (Nitrogen Fixation)", concept: "Shuka waken soya kusa da masara" },
    { id: "l1", type: "LOOP", text: "Repeat every 3 days", concept: "Kowane kwana uku" },
];

export default function AcademyView({ farmerId = "FARMER-123456" }: { farmerId?: string }) {
    const [logicChain, setLogicChain] = useState<any[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

    const handleAddBlock = (block: any) => {
        setLogicChain([...logicChain, { ...block, instanceId: Date.now() }]);
    };

    const handleRemoveBlock = (instanceId: number) => {
        setLogicChain(logicChain.filter((b) => b.instanceId !== instanceId));
    };

    const handleMockVoiceCommand = () => {
        setIsRecording(true);
        setTimeout(() => {
            setIsRecording(false);
            // Mock code-switching logic: Hausa + English mixing
            handleAddBlock(TOOLBOX_BLOCKS[2]); // Adds Mulch action automatically
        }, 2000);
    };

    const submitLogic = async () => {
        try {
            if (logicChain.length < 2) {
                alert("Please add at least an Event and an Action.");
                return;
            }
            setSubmissionStatus("Submitting...");

            const payload = {
                farmer_id: farmerId,
                module_name: "Basic Soil Health",
                blocks_completed: logicChain.length,
                total_blocks: 4,
                score_achieved: 10 * logicChain.length
            };

            await academyApi.completeBlock(payload);
            setSubmissionStatus("Success! AgriScore Updated.");
            setTimeout(() => setSubmissionStatus(null), 3000);
        } catch (error) {
            console.error(error);
            setSubmissionStatus("Failed to submit.");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Academy (Visual Agronomy Logic)</h2>
                    <p className="text-slate-500 text-sm">Design your farm logic visually to earn certification and vouchers.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Toolbox / Block Selection */}
                <div className="col-span-1 premium-card border-emerald-100 dark:border-emerald-500/10 h-fit xl:sticky xl:top-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-xl">
                                <BookOpen size={22} />
                            </div>
                            <div>
                                <h3 className="font-black text-lg dark:text-white tracking-tight leading-none uppercase">Toolbox</h3>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Logic Constructs</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                        {TOOLBOX_BLOCKS.map((block) => {
                            const TypeInfo = BLOCK_TYPES[block.type as keyof typeof BLOCK_TYPES];
                            const Icon = TypeInfo.icon;
                            return (
                                <div
                                    key={block.id}
                                    onClick={() => handleAddBlock(block)}
                                    className={`p-4 rounded-2xl border-l-[6px] ${TypeInfo.color.replace('bg-', 'border-')} bg-slate-50/50 dark:bg-slate-900/40 cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group shadow-sm hover:shadow-md active:scale-95`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`p-1 rounded-lg ${TypeInfo.color} text-white`}>
                                            <Icon size={14} />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{TypeInfo.label}</span>
                                    </div>
                                    <p className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-snug">{block.text}</p>

                                    {/* Conceptual Translation Engine Preview */}
                                    <div className="mt-3 text-[10px] text-slate-400 flex items-start gap-2 p-2 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <Volume2 size={12} className="mt-0.5 text-emerald-500" />
                                        <i className="font-medium">Hausa: {block.concept}</i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Workspace Area */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="premium-card min-h-[500px] flex flex-col bg-white/40 dark:bg-slate-950/40 border-dashed border-2">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
                            <div>
                                <h3 className="font-black text-xl dark:text-white tracking-tight uppercase">Logic Sequence</h3>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Execution Pipeline Designer</p>
                            </div>
                            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                                <button
                                    onClick={handleMockVoiceCommand}
                                    className={`flex-1 sm:flex-none btn-primary !px-5 transition-all duration-500 ${isRecording ? 'gradient-rose !shadow-rose-500/40 animate-pulse' : '!bg-slate-900 !text-white dark:!bg-slate-800'}`}
                                >
                                    <Mic size={18} className={isRecording ? 'animate-bounce' : ''} />
                                    <span className="text-xs uppercase tracking-widest">{isRecording ? 'Listening...' : 'Voice Command'}</span>
                                </button>
                                <button onClick={submitLogic} className="flex-1 sm:flex-none btn-primary !bg-emerald-600 hover:!bg-emerald-700 !shadow-emerald-500/30">
                                    <Play size={18} />
                                    <span className="text-xs uppercase tracking-widest">Execute Sync</span>
                                </button>
                            </div>
                        </div>

                        {/* Canvas */}
                        <div className="flex-1 rounded-2xl p-4 md:p-8 flex flex-col items-center gap-3 overflow-y-auto no-scrollbar relative min-h-[300px]">
                            {logicChain.length === 0 ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-40">
                                    <div className="w-20 h-20 rounded-full border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4">
                                        <Play size={32} className="text-slate-300 ml-1" />
                                    </div>
                                    <p className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Pipeline Empty</p>
                                    <p className="text-xs text-slate-500 mt-2 max-w-[200px]">Ingest logic blocks from the toolbox to begin sequence construction</p>
                                </div>
                            ) : (
                                logicChain.map((block, index) => {
                                    const TypeInfo = BLOCK_TYPES[block.type as keyof typeof BLOCK_TYPES];
                                    const Icon = TypeInfo.icon;
                                    return (
                                        <div key={block.instanceId} className="flex flex-col items-center w-full max-w-md animate-in zoom-in-95 slide-in-from-top-4 duration-500">
                                            {/* Block */}
                                            <div className={`w-full p-5 rounded-2xl shadow-xl border ${TypeInfo.color.replace('bg-', 'border-')} relative bg-white dark:bg-slate-900 flex items-center justify-between group`}>
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-xl ${TypeInfo.color} text-white shadow-lg ${TypeInfo.color.replace('bg-', 'shadow-')}/20`}>
                                                        <Icon size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{TypeInfo.label}</p>
                                                        <p className="font-black text-slate-800 dark:text-slate-100 text-base tracking-tight leading-tight">{block.text}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveBlock(block.instanceId)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all font-light text-2xl"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            {/* Connector Arrow */}
                                            {index < logicChain.length - 1 && (
                                                <div className="flex flex-col items-center py-2">
                                                    <div className="w-1 h-3 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                                                    <div className="w-2 h-2 border-r-2 border-b-2 border-slate-300 dark:border-slate-700 rotate-45 mt-[-4px]"></div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {submissionStatus && (
                            <div className={`mt-6 p-4 rounded-2xl flex items-center gap-3 text-xs font-black uppercase tracking-widest ${submissionStatus.includes('Error') || submissionStatus.includes('Failed') ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'} animate-in slide-in-from-bottom-2`}>
                                {submissionStatus.includes('Success') ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                                {submissionStatus}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
