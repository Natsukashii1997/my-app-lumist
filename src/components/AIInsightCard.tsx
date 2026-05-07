import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface AIInsightCardProps {
  title: string;
  insights: string[];
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ title, insights, action }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-[32px] bg-gradient-to-br from-[#14161A] to-[#2D3036] text-white relative overflow-hidden group shadow-xl"
    >
      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#F26A4B]/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#F26A4B]/20 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F26A4B] shadow-[0_0_10px_#F26A4B]"></div>
          </div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">{title}</h4>
        </div>
        
        <div className="space-y-4 mb-8">
          {insights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-3">
               <div className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-brand)] shrink-0" />
               <p className="text-sm text-slate-300 leading-relaxed italic">"{insight}"</p>
            </div>
          ))}
        </div>

        {action && (
          <div className="mt-auto space-y-3">
            <button 
              onClick={action.onClick}
              className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-left"
            >
              <span className="text-xs font-medium text-slate-400">{action.label}</span>
              <ArrowRight className="w-4 h-4 text-[var(--color-brand)]" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
