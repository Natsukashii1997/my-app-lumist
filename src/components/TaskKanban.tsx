import React from 'react';
import { Task, TaskStatus } from '../types';
import { cn } from '../lib/utils';
import { MoreVertical, Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface TaskKanbanProps {
  tasks: Task[];
}

export const TaskKanban: React.FC<TaskKanbanProps> = ({ tasks }) => {
  const columns: { status: TaskStatus; label: string; color: string }[] = [
    { status: 'pending', label: '待处理', color: 'bg-slate-100' },
    { status: 'in_progress', label: '执行中', color: 'bg-blue-100' },
    { status: 'completed', label: '已完成', color: 'bg-emerald-100' },
    { status: 'blocked', label: '卡点中', color: 'bg-rose-100' },
  ];

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'blocked': return <AlertCircle className="w-4 h-4 text-rose-500" />;
      default: return <Clock className="w-4 h-4 text-slate-300" />;
    }
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
      {columns.map(col => (
        <div key={col.status} className="flex-1 min-w-[280px] bg-slate-50/50 rounded-[32px] p-4 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", col.color.replace('100', '500'))} />
              <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{col.label}</span>
              <span className="ml-2 text-[10px] font-black text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-100">
                {tasks.filter(t => t.status === col.status).length}
              </span>
            </div>
          </div>
          
          <div className="space-y-4 flex-1">
            {tasks.filter(t => t.status === col.status).map(task => (
              <div 
                key={task.id} 
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest",
                    task.priority === 'high' ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"
                  )}>
                    {task.priority}
                  </span>
                  <button className="text-slate-300 hover:text-slate-900">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <h4 className="text-sm font-bold text-slate-900 leading-snug">{task.name}</h4>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-white flex items-center justify-center text-[10px] font-black text-slate-400">
                      {task.assignee[0]}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(task.status)}
                    <span className="text-[10px] font-black text-slate-400">{task.planEndTime.split('-').slice(1).join('/')}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {tasks.filter(t => t.status === col.status).length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 opacity-30">
                <div className="w-8 h-8 rounded-lg border-2 border-dashed border-slate-300" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
