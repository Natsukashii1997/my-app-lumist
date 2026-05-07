import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
  isAlert?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon: Icon, trend, isAlert }) => {
  return (
    <div className={cn(
      "p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm transition-all duration-500 group",
      isAlert ? "bg-rose-50/20 border-rose-100" : "hover:border-blue-200"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm",
          isAlert ? "bg-rose-100 text-rose-600" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={cn(
            "px-2 py-1 rounded-lg text-[10px] font-black tracking-tight",
            trend.isUp ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
          )}>
            {trend.isUp ? "+" : ""} {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h3 className={cn("text-3xl font-black tracking-tighter leading-none", isAlert ? "text-rose-600" : "text-slate-900")}>{value}</h3>
      </div>
    </div>
  );
};
