import React from 'react';
import { SyncMessage } from '../types';
import { cn } from '../lib/utils';
import { MessageSquare, ShieldAlert, CheckCircle2, History, ExternalLink, Sparkles } from 'lucide-react';

interface DecisionTimelineProps {
  messages: SyncMessage[];
}

export const DecisionTimeline: React.FC<DecisionTimelineProps> = ({ messages }) => {
  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
         <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">项目决策链追溯</h3>
            <p className="text-sm text-slate-400 font-medium mt-1">深度还原飞书群内达成共识的关键节点</p>
         </div>
      </div>

      <div className="relative">
         {/* Timeline central line */}
         <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-slate-100" />
         
         <div className="space-y-10">
            {messages.map((msg, idx) => (
              <div key={msg.id} className="relative pl-16 group">
                {/* Marker */}
                <div className={cn(
                  "absolute left-[18px] top-1.5 w-3 h-3 rounded-full border-4 border-white shadow-md z-10 transition-transform group-hover:scale-125",
                  msg.classifiedType === 'decision' ? "bg-blue-600" :
                  msg.classifiedType === 'risk' ? "bg-rose-500" :
                  msg.classifiedType === 'delivery' ? "bg-emerald-500" : "bg-slate-300"
                )} />

                <div className="bg-white p-8 rounded-[40px] border border-slate-100 card-shadow-sm hover:card-shadow transition-all group-hover:-translate-y-1">
                   <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-xl shadow-slate-200">
                           {msg.senderName[0]}
                         </div>
                         <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-black text-slate-900">{msg.senderName}</h4>
                              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">• {msg.sentAt}</span>
                            </div>
                            <div className={cn(
                              "mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest",
                              msg.classifiedType === 'decision' ? "bg-blue-50 text-blue-600" :
                              msg.classifiedType === 'risk' ? "bg-rose-50 text-rose-600" :
                              msg.classifiedType === 'delivery' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                            )}>
                              {msg.classifiedType}
                            </div>
                         </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 hover:bg-slate-900 hover:text-white transition-all uppercase tracking-widest">
                         查看原文 <ExternalLink className="w-3 h-3" />
                      </button>
                   </div>

                   <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6 bg-slate-50/50 p-4 rounded-2xl italic">
                     "{msg.content}"
                   </p>

                   <div className="p-5 bg-blue-50/50 rounded-3xl border border-blue-100/50 flex items-start gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                         <Sparkles className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em] mb-1">AI 提炼决策点</p>
                         <p className="text-xs font-bold text-blue-700 leading-relaxed">{msg.summary}</p>
                      </div>
                   </div>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
