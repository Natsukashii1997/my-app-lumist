import React from 'react';
import { cn } from '../lib/utils';
import { Check } from 'lucide-react';

interface StageStepperProps {
  currentStage: string;
}

export const StageStepper: React.FC<StageStepperProps> = ({ currentStage }) => {
  const stages = [
    { key: 'P1', label: '立项', desc: 'Project Setup' },
    { key: 'P2', label: '需求', desc: 'Requirement' },
    { key: 'P3', label: '开发', desc: 'Development' },
    { key: 'P4', label: '测试', desc: 'Testing' },
    { key: 'P5', label: '上线', desc: 'Online' },
    { key: 'Closed', label: '结项', desc: 'Archived' },
  ];

  const currentIndex = stages.findIndex(s => s.key === currentStage);

  return (
    <div className="flex items-center w-full max-w-4xl mx-auto py-8">
      {stages.map((stage, idx) => {
        const isCompleted = idx < currentIndex;
        const isActive = idx === currentIndex;
        const isLast = idx === stages.length - 1;

        return (
          <React.Fragment key={stage.key}>
            <div className="flex flex-col items-center relative z-10 group">
              <div className={cn(
                "w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300",
                isCompleted ? "bg-[var(--color-brand)] border-[var(--color-brand)] text-white" : 
                isActive ? "border-[var(--color-brand)] bg-white text-[var(--color-brand)] shadow-lg shadow-orange-100 scale-110" : 
                "bg-slate-50 border-slate-200 text-slate-300"
              )}>
                {isCompleted ? <Check className="w-6 h-6" /> : <span className="font-bold">{stage.key}</span>}
              </div>
              <div className="absolute top-14 text-center whitespace-nowrap">
                <p className={cn("text-sm font-bold", isActive ? "text-slate-900" : "text-slate-400")}>{stage.label}</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-300 font-medium">{stage.desc}</p>
              </div>
            </div>
            {!isLast && (
              <div className="flex-1 h-[2px] mx-2 -translate-y-3 bg-slate-100 relative overflow-hidden">
                <div 
                  className={cn(
                    "absolute inset-0 bg-[var(--color-brand)] transition-all duration-700",
                    isCompleted ? "translate-x-0" : "-translate-x-full"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
