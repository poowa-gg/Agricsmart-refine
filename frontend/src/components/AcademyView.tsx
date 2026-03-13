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

            <div className="grid grid-cols-3 gap-6">
                {/* Toolbox / Block Selection */}
                <div className="col-span-1 premium-card">
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen size={20} className="text-emerald-500" />
                        <h3 className="font-bold text-lg dark:text-white">Logic Blocks</h3>
                    </div>
                    <div className="space-y-3">
                        {TOOLBOX_BLOCKS.map((block) => {
                            const TypeInfo = BLOCK_TYPES[block.type as keyof typeof BLOCK_TYPES];
                            const Icon = TypeInfo.icon;
                            return (
                                <div
                                    key={block.id}
                                    onClick={() => handleAddBlock(block)}
                                    className={`p-3 rounded-lg border-l-4 ${TypeInfo.color.replace('bg-', 'border-')} bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <Icon size={16} className={TypeInfo.color.replace('bg-', 'text-')} />
                                        <span className="text-xs font-bold text-slate-500 uppercase">{TypeInfo.label}</span>
                                    </div>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{block.text}</p>

                                    {/* Conceptual Translation Engine Preview */}
                                    <div className="mt-2 text-[10px] text-slate-400 flex items-start gap-1 p-1.5 bg-white dark:bg-slate-900 rounded">
                                        <Volume2 size={12} className="mt-0.5" />
                                        <i>Hausa: {block.concept}</i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Workspace Area */}
                <div className="col-span-2 space-y-6">
                    <div className="premium-card min-h-[400px] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg dark:text-white">Your Farm Logic</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleMockVoiceCommand}
                                    className={`btn-primary flex items-center gap-2 transition-all ${isRecording ? 'bg-rose-500 animate-pulse' : 'bg-slate-800 dark:bg-slate-700'}`}
                                >
                                    <Mic size={18} />
                                    {isRecording ? 'Listening (Sahara-v2)...' : 'Hold to Speak (Hausa/English)'}
                                </button>
                                <button onClick={submitLogic} className="btn-primary bg-emerald-600 hover:bg-emerald-700">
                                    Run Logic & Sync
                                </button>
                            </div>
                        </div>

                        {/* Canvas */}
                        <div className="flex-1 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center gap-2 overflow-y-auto">
                            {logicChain.length === 0 ? (
                                <div className="text-center text-slate-400 mt-20">
                                    <Play size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>Click blocks from the toolbox to build your logic.</p>
                                    <p className="text-xs mt-2">Example: [Event] {"->"} [Condition] {"->"} [Action]</p>
                                </div>
                            ) : (
                                logicChain.map((block, index) => {
                                    const TypeInfo = BLOCK_TYPES[block.type as keyof typeof BLOCK_TYPES];
                                    const Icon = TypeInfo.icon;
                                    return (
                                        <div key={block.instanceId} className="flex flex-col items-center w-full">
                                            {/* Block */}
                                            <div className={`w-3/4 p-4 rounded-xl shadow-sm border ${TypeInfo.color.replace('bg-', 'border-')} relative bg-white dark:bg-slate-800 flex items-center justify-between`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${TypeInfo.color} text-white`}>
                                                        <Icon size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-500 mb-0.5">{TypeInfo.label}</p>
                                                        <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{block.text}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveBlock(block.instanceId)}
                                                    className="text-slate-400 hover:text-rose-500 text-xl font-bold px-2"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            {/* Connector Arrow */}
                                            {index < logicChain.length - 1 && (
                                                <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700 my-1"></div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {submissionStatus && (
                            <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm font-bold ${submissionStatus.includes('Error') ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                <CheckCircle2 size={18} />
                                {submissionStatus}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
