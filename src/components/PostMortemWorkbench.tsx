import React, { useState } from 'react';
import { Project, PostMortemReport } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { 
  FileText, 
  Sparkles, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Download,
  Zap,
  Quote
} from 'lucide-react';

interface PostMortemWorkbenchProps {
  project: Project;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const PostMortemWorkbench: React.FC<PostMortemWorkbenchProps> = ({ project, onClose, showToast }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<PostMortemReport | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setReport({
        id: 'pm-001',
        projectId: project.id,
        generatedAt: new Date().toLocaleDateString(),
        stageMetrics: [
          { stage: 'P1', durationDays: 14, tasksCount: 8, delayCount: 0 },
          { stage: 'P2', durationDays: 35, tasksCount: 22, delayCount: 3 },
          { stage: 'P3', durationDays: 20, tasksCount: 15, delayCount: 1 },
          { stage: 'P4', durationDays: 10, tasksCount: 8, delayCount: 0 },
          { stage: 'P5', durationDays: 7, tasksCount: 5, delayCount: 0 },
        ],
        riskSummary: {
          total: 5,
          high: 2,
          unresolved: 0
        },
        lessonLearned: "P2 研发设计阶段耗时最长，主要由于师资需求在方案确认后发生了二次变更。建议后续在 P1 阶段增加『关键利益相关者评审』环节。",
        successHighlights: [
          "核心代码定稿率提前 3 天达成目标",
          "飞书自动化同步大幅降低了跨部门沟通成本",
          "MVP 验收标准 100% 符合预期"
        ]
      });
      setIsGenerating(false);
      showToast('结项复盘报告已生成');
    }, 2500);
  };

  return (
    <div className="relative z-10 w-full">
      <div className="flex items-start justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg mb-4 text-[10px] font-black uppercase tracking-widest">
            <BarChart3 className="w-3.5 h-3.5" />
            Project Archive Workbench
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">结项复盘工作台</h2>
          <p className="text-slate-400 font-medium mt-2">基于 P1-P5 全流程数字化踪迹，通过 AI 提炼项目价值与教训</p>
        </div>
        <button 
          onClick={onClose}
          className="p-4 bg-slate-50 text-slate-400 rounded-3xl hover:bg-slate-100 transition-all font-black text-xs uppercase"
        >
          Close
        </button>
      </div>

      {!report && !isGenerating && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
          <div className="relative mb-8">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-32 h-32 rounded-full border border-slate-200 p-2"
            >
              <div className="w-full h-full rounded-full border-t-2 border-orange-500" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
               <FileText className="w-8 h-8 text-slate-400" />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">准备好生成复盘报告了吗？</h3>
          <p className="text-sm text-slate-400 max-w-md text-center mb-10 leading-relaxed font-medium">
            系统将自动分析 45 个任务状态、12 份标准产出件及 156 条飞书决策消息。
          </p>
          <button 
            onClick={handleGenerate}
            className="px-10 py-5 bg-slate-900 text-white rounded-3xl font-black text-sm shadow-2xl shadow-slate-300 hover:scale-105 transition-all flex items-center gap-3 group"
          >
            <Sparkles className="w-5 h-5 text-orange-400 group-hover:animate-pulse" />
            一键 AI 复盘分析
          </button>
        </div>
      )}

      {isGenerating && (
        <div className="flex flex-col items-center justify-center py-20">
           <div className="w-full max-w-lg space-y-8">
              <div className="flex items-center justify-between font-black text-xs text-slate-400 uppercase tracking-widest px-1">
                 <span>正在构建效能矩阵...</span>
                 <span className="text-slate-900">85%</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                 <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  className="h-full bg-orange-500"
                 />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: '抓取 P1-P5 耗时', status: 'done' },
                   { label: '分析卡点原因', status: 'doing' },
                   { label: '提取决策链', status: 'done' },
                   { label: '生成 PDF 模版', status: 'doing' },
                 ].map((s, i) => (
                   <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                      {s.status === 'done' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 border-2 border-slate-200 border-t-orange-500 rounded-full animate-spin" />}
                      <span className="text-xs font-bold text-slate-500">{s.label}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {report && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 pb-10"
        >
          <div className="grid grid-cols-3 gap-8">
             <div className="col-span-2 space-y-8">
               {/* Efficiency Chart */}
                <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-100/50">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                       <TrendingUp className="w-5 h-5 text-orange-500" />
                       研发交付效能散点图
                    </h3>
                    <div className="flex gap-4">
                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-900" /> 时常
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <div className="w-2.5 h-2.5 rounded-full bg-orange-500" /> 卡点延时
                       </div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between h-48 gap-8">
                     {report.stageMetrics.map((sm, i) => (
                       <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                          <div className="w-full relative px-2">
                             <motion.div 
                               initial={{ height: 0 }}
                               animate={{ height: `${sm.durationDays * 4}px` }}
                               className="w-full bg-slate-100 rounded-2xl group-hover:bg-slate-200 transition-colors"
                             />
                             {sm.delayCount > 0 && (
                               <motion.div 
                                 initial={{ height: 0 }}
                                 animate={{ height: `${sm.delayCount * 12}px` }}
                                 className="absolute bottom-0 w-8 left-1/2 -translate-x-1/2 bg-orange-500 rounded-t-lg z-10"
                               />
                             )}
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sm.stage}</span>
                       </div>
                     ))}
                  </div>
                </div>

                {/* Lessons */}
                <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden">
                   <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <Quote className="w-6 h-6 text-orange-400" />
                        <h3 className="text-xl font-black text-white">核心经验教训</h3>
                      </div>
                      <p className="text-lg font-medium text-slate-300 leading-relaxed mb-8">
                        {report.lessonLearned}
                      </p>
                      <div className="h-px bg-white/10 mb-8" />
                      <div className="space-y-4">
                         {report.successHighlights.map((h, i) => (
                           <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-200">
                              <Zap className="w-4 h-4 text-emerald-400" />
                              {h}
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 p-10">
                      <div className="w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
                   </div>
                </div>
             </div>

             <div className="space-y-8">
                {/* Risk Stats */}
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50">
                   <h3 className="text-lg font-black text-slate-900 mb-8">风险控制总结</h3>
                   <div className="space-y-8">
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">总风险量</span>
                         <span className="text-2xl font-black text-slate-900">{report.riskSummary.total}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">高危风险</span>
                         <span className="text-2xl font-black text-rose-500">{report.riskSummary.high}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">未关闭风险</span>
                         <span className="text-2xl font-black text-emerald-500">{report.riskSummary.unresolved}</span>
                      </div>
                   </div>
                </div>

                {/* Score Card */}
                <div className="bg-orange-50/50 p-8 rounded-[40px] border border-orange-100/50">
                   <h3 className="text-lg font-black text-orange-900 mb-4">项目综合评分</h3>
                   <div className="text-6xl font-black text-orange-500 mb-4 tracking-tighter">92<span className="text-2xl">A+</span></div>
                   <p className="text-xs font-bold text-orange-800/60 leading-relaxed uppercase tracking-widest">
                      此项目在交付标准化上表现优异，优于同品类 95% 的项目。
                   </p>
                </div>

                <div className="p-4">
                   <button className="w-full py-5 bg-slate-900 text-white rounded-[32px] font-black text-sm shadow-xl shadow-slate-200 hover:scale-105 transition-all flex items-center justify-center gap-3">
                      <Download className="w-5 h-5" />
                      导出复盘 PDF
                   </button>
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
