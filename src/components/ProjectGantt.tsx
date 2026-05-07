import React from 'react';
import { ProjectStage } from '../types';
import { cn } from '../lib/utils';

interface ProjectGanttProps {
  currentStage: ProjectStage;
}

export const ProjectGantt: React.FC<ProjectGanttProps> = ({ currentStage }) => {
  const stages: { id: ProjectStage; label: string; duration: string; start: number; width: number }[] = [
    { id: 'P1', label: '立项准备', duration: '5d', start: 0, width: 15 },
    { id: 'P2', label: '研发设计', duration: '12d', start: 15, width: 25 },
    { id: 'P3', label: '核心验收', duration: '8d', start: 40, width: 20 },
    { id: 'P4', label: '发布测试', duration: '5d', start: 60, width: 15 },
    { id: 'P5', label: '上线跟踪', duration: '7d', start: 75, width: 25 },
  ];

  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 card-shadow overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">项目全景甘特图</h3>
        <div className="flex gap-4">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-slate-900" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">已完成</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-orange-500" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">执行中</span>
           </div>
        </div>
      </div>

      <div className="relative pt-10 pb-4">
        {/* Time Grid Indicators */}
        <div className="absolute inset-0 flex justify-between pointer-events-none px-2 opacity-5">
           {[...Array(11)].map((_, i) => (
             <div key={i} className="w-[1px] h-full bg-slate-900" />
           ))}
        </div>

        <div className="space-y-6 relative z-10">
          {stages.map((s, idx) => {
            const isCurrent = s.id === currentStage;
            const isPast = stages.findIndex(st => st.id === currentStage) > idx;
            
            return (
              <div key={s.id} className="group flex items-center">
                <div className="w-24 shrink-0 pr-4">
                   <p className={cn(
                     "text-[10px] font-black uppercase tracking-widest leading-none",
                     isCurrent ? "text-orange-500" : isPast ? "text-slate-900" : "text-slate-300"
                   )}>{s.id}</p>
                   <p className="text-[10px] font-bold text-slate-400 mt-1">{s.label}</p>
                </div>
                <div className="flex-1 relative h-6 bg-slate-50/50 rounded-full">
                   <div 
                    className={cn(
                      "absolute top-1 bottom-1 rounded-full transition-all duration-1000 flex items-center px-3",
                      isCurrent ? "bg-orange-500 shadow-lg shadow-orange-200" : 
                      isPast ? "bg-slate-900" : "bg-slate-200"
                    )}
                    style={{ left: `${s.start}%`, width: `${s.width}%` }}
                   >
                     {isCurrent && (
                       <span className="text-[9px] font-black text-white uppercase tracking-tighter whitespace-nowrap animate-pulse">
                         Live: {s.duration}
                       </span>
                     )}
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
         <p className="text-[10px] font-bold text-slate-400">数据最后同步：12 分钟前 (来自飞书多维表格)</p>
         <button className="text-[10px] font-black text-slate-900 uppercase tracking-widest hover:text-orange-500 transition-colors">配置依赖关系</button>
      </div>
    </div>
  );
};
