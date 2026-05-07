import React, { useState } from 'react';
import { 
  ChevronLeft, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Download, 
  ShieldCheck,
  Send,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';
import { PROJECTS, TASKS, DOCUMENTS } from '../mockData';
import { StatusBadge } from '../components/StatusBadge';
import { cn } from '../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface ReviewPageProps {
  id: string;
  onBack: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export const ReviewPage: React.FC<ReviewPageProps> = ({ id, onBack, showToast }) => {
  const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];
  const [reportStatus, setReportStatus] = useState<'draft' | 'pending_approval' | 'approved' | 'published'>('draft');

  const taskData = [
    { name: '按时完成', value: 18, color: '#10b981' },
    { name: '逾期完成', value: 4, color: '#f59e0b' },
    { name: '未完成', value: 2, color: '#f43f5e' },
  ];

  const stageData = [
    { name: 'P1', days: 5 },
    { name: 'P2', days: 12 },
    { name: 'P3', days: 20 },
    { name: 'P4', days: 8 },
    { name: 'P5', days: 3 },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="bg-white rounded-[40px] p-10 card-shadow border border-slate-50">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Project Review</span>
                <StatusBadge status={reportStatus} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{project.name} - 复盘报告</h1>
            </div>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-3 border border-slate-200 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> 导出 PDF
            </button>
             {reportStatus === 'draft' && (
               <button onClick={() => { setReportStatus('pending_approval'); showToast('报告已提交审核'); }} className="px-8 py-3 bg-[var(--color-brand)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-orange-100 hover:opacity-90 transition-all flex items-center gap-2">
                <Send className="w-4 h-4" /> 提交审核
              </button>
             )}
              {reportStatus === 'pending_approval' && (
               <button onClick={() => { setReportStatus('approved'); showToast('报告审核已通过'); }} className="px-8 py-3 bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-100 hover:opacity-90 transition-all flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> 审核通过
              </button>
             )}
          </div>
        </div>

        {/* report flow */}
        <div className="flex items-center justify-center pt-8 border-t border-slate-50">
           <div className="flex items-center gap-4">
              {['draft', 'pending_approval', 'approved', 'published'].map((s, idx) => (
                <React.Fragment key={s}>
                  <div className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all",
                    reportStatus === s ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-300 border-slate-100"
                  )}>{s.replace('_', ' ')}</div>
                  {idx < 3 && <div className="w-10 h-px bg-slate-100" />}
                </React.Fragment>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-3 space-y-8">
          <div className="grid grid-cols-3 gap-6">
             <div className="p-8 bg-white rounded-[32px] border border-slate-100 card-shadow flex flex-col items-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">任务达成率</p>
                <div className="w-full h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={taskData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                        {taskData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 justify-center">
                   {taskData.map(d => (
                     <div key={d.name} className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{d.name}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="col-span-2 p-8 bg-white rounded-[32px] border border-slate-100 card-shadow">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">各阶段时长分布 (天)</p>
                <div className="w-full h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stageData}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="days" fill="#F26A4B" radius={[8, 8, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </div>

          <div className="p-10 bg-white rounded-[32px] border border-slate-100 card-shadow space-y-10">
             <section>
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[var(--color-brand)]" />
                  AI 生成复盘摘要
                </h3>
                <div className="p-8 bg-slate-50 rounded-[28px] border border-slate-100">
                  <p className="text-slate-700 leading-relaxed text-[15px] font-medium">
                    本项目在 T1 迭代周期内完成了 85% 的需求覆盖。P3 开发阶段由于第三方 SDK 兼容性问题导致了 4 天的额外耗时。
                    整体交付质量通过了 M3 上线评审，但在 2026 升级专项中，师资储备的前置时间不足，建议在后续 [选课指导] 项目中增加 P1 阶段的人力盘点预警。
                  </p>
                </div>
             </section>

             <section className="grid grid-cols-2 gap-10">
                <div>
                   <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <ShieldCheck className="w-5 h-5 text-emerald-500" /> 成功经验
                   </h4>
                   <ul className="space-y-3">
                     {['M2 评审环节引入了销售端实时问卷，需求闭环度提升了 20%', '采用了标准化 P3 模板，文档交付质量 100% 达标'].map(item => (
                       <li key={item} className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl text-sm font-medium text-emerald-800">{item}</li>
                     ))}
                   </ul>
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <AlertTriangle className="w-5 h-5 text-rose-500" /> 改进建议
                   </h4>
                   <ul className="space-y-3">
                     {['飞书消息同步存在 1 天的清洗延迟，建议优化 AI 提取逻辑', '师资招募与产品研发的步调未对齐'].map(item => (
                       <li key={item} className="p-4 bg-rose-50/30 border border-rose-100 rounded-2xl text-sm font-medium text-rose-800">{item}</li>
                     ))}
                   </ul>
                </div>
             </section>
          </div>
        </div>

        <div className="space-y-8">
           <div className="p-8 bg-slate-900 text-white rounded-[32px] card-shadow">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--color-brand)]" />
                关键事件线
              </h3>
              <div className="space-y-8">
                {[
                  { date: '05-01', title: 'M3 评审通过' },
                  { date: '04-20', title: '全功能代码冻结' },
                  { date: '04-05', title: '识别师资红线风险' },
                  { date: '03-25', title: '立项会议 M1' },
                ].map((ev, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[var(--color-brand)] group-hover:scale-125 transition-transform" />
                      <div className="w-[1px] h-full bg-slate-800" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{ev.date}</span>
                       <span className="text-sm font-bold text-slate-300 mt-1">{ev.title}</span>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="p-8 bg-white rounded-[32px] border border-slate-100 card-shadow">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[var(--color-brand)]" />
                复盘归档确认
              </h3>
              <div className="space-y-4">
                 {['Wiki 归档', '飞书 Base 标记', '知识库更新', '人力成本核算'].map(item => (
                    <div key={item} className="flex items-center gap-3">
                       <div className="w-5 h-5 rounded-md border-2 border-slate-200 flex items-center justify-center text-emerald-500">
                         <CheckCircle2 className="w-3.5 h-3.5" />
                       </div>
                       <span className="text-sm font-medium text-slate-500">{item}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
