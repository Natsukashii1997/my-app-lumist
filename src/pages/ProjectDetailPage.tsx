import React, { useState } from 'react';
import { 
  ChevronLeft, 
  MessageSquare, 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  MoreVertical,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Send,
  Zap,
  BarChart3,
  ShieldAlert,
  ClipboardCheck,
  History,
  LayoutGrid,
  CalendarDays,
} from 'lucide-react';
import { PROJECTS, DOCUMENTS, TASKS, RISKS, SYNC_MESSAGES } from '../mockData';
import { StatusBadge } from '../components/StatusBadge';
import { StageStepper } from '../components/StageStepper';
import { AIInsightCard } from '../components/AIInsightCard';
import { TaskKanban } from '../components/TaskKanban';
import { ProjectGantt } from '../components/ProjectGantt';
import { DecisionTimeline } from '../components/DecisionTimeline';
import { PostMortemWorkbench } from '../components/PostMortemWorkbench';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectDetailPageProps {
  id: string;
  onBack: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ id, onBack, showToast }) => {
  const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];
  const [activeTab, setActiveTab] = useState('overview');
  const [isLarkSyncing, setIsLarkSyncing] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const tabs = [
    { id: 'overview', label: '核心概览', icon: Zap },
    { id: 'gantt', label: '项目全景', icon: CalendarDays },
    { id: 'kanban', label: '任务看板', icon: LayoutGrid },
    { id: 'docs', label: '产出文档', icon: FileText },
    { id: 'risks', label: '风险控制', icon: ShieldAlert },
    { id: 'sync', label: '决策追溯', icon: History },
  ];

  const stageChecklist = {
    'P1': ['立项说明文档', 'BP 审核通过'],
    'P2': ['PRD 定案', 'M2 评审记录', 'UI 视觉终稿'],
    'P3': ['MVP 验收标准', '核心代码提测', 'QA 冒烟验收']
  };

  const handleNextStage = () => {
    const pendingDocs = DOCUMENTS.filter(d => d.projectId === project.id && d.stage === project.currentStage && d.status !== 'finalized');
    if (pendingDocs.length > 0) {
      showToast(`推进受阻：当前阶段处于卡点状态。请先完成：${pendingDocs[0].name}`, 'error');
    } else {
      showToast('阶段推进成功！系统已向 [飞书群] 推送自动化阶段公告与下一步看板任务');
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Detail Header */}
      <div className="bg-white rounded-[40px] p-10 card-shadow border border-slate-50">
        <div className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{project.projectCode}</span>
                <StatusBadge status={project.status} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{project.name}</h1>
              <p className="mt-1 text-slate-500 font-medium">负责人：{project.owner} • 产品 SKU：{project.productSku}</p>
            </div>
          </div>
          <div className="flex gap-4">
             <button 
              onClick={() => { setIsLarkSyncing(true); setTimeout(() => { setIsLarkSyncing(false); showToast('飞书群已创建：项目进度将双向同步至多维表格'); }, 2000); }} 
              className="px-6 py-3 border border-slate-200 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              {isLarkSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 text-blue-500" />}
              同步飞书
            </button>
            <button 
              onClick={() => setShowReviewModal(true)} 
              className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-orange-600 transition-all flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              自动化复盘
            </button>
             <button 
              onClick={handleNextStage}
              className="px-8 py-4 bg-[var(--color-brand)] text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl shadow-orange-100 flex items-center gap-2 group"
             >
              推进下一阶段 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
        <p className="mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Next: {project.currentStage === 'P3' ? 'P4 测试' : 'Unknown'}</p>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-3 space-y-8">
          {/* Tabs */}
          <div className="flex bg-white p-2 rounded-[24px] border border-slate-100 card-shadow">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-4 rounded-xl transition-all",
                  activeTab === tab.id ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-bold">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-[32px] border border-slate-100 card-shadow p-8 min-h-[400px]">
             {activeTab === 'overview' && (
               <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">近期关键任务</h3>
                      <span className="text-xs font-black text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">{project.currentStage} 执行中</span>
                    </div>
                    <div className="space-y-4">
                      {TASKS.filter(t => t.projectId === project.id).slice(0, 4).map(t => (
                        <div key={t.id} className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl border border-transparent hover:border-slate-100 transition-all">
                          <div className={cn("w-2.5 h-2.5 rounded-full", t.status === 'completed' ? "bg-emerald-500" : "bg-blue-500")} />
                          <span className="flex-1 text-sm font-bold text-slate-700">{t.name}</span>
                          <StatusBadge status={t.status} />
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setActiveTab('kanban')} className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-xs font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all">查看完整看板</button>
                  </div>
                  <div className="space-y-8">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">标准化卡点核查</h3>
                    <div className="p-8 bg-slate-50 rounded-[32px] space-y-6">
                      {(stageChecklist[project.currentStage as keyof typeof stageChecklist] || []).map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className={cn(
                            "w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all",
                            i < 2 ? "bg-emerald-100 border-emerald-500 text-emerald-600" : "border-slate-200 text-slate-200 bg-white"
                          )}>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className={cn("text-sm font-bold", i < 2 ? "text-slate-900" : "text-slate-400")}>{item}</span>
                        </div>
                      ))}
                      <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex gap-4">
                        <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-rose-900">核心文档未定稿</p>
                          <p className="text-xs text-rose-500 mt-1 leading-relaxed">检测到 <span className="font-black">[MVP 验收标准]</span> 及其附属的测试用例未定稿，无法通过 P3 节点核验。</p>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
             )}

             {activeTab === 'kanban' && (
               <TaskKanban tasks={TASKS.filter(t => t.projectId === project.id)} />
             )}

             {activeTab === 'gantt' && (
               <ProjectGantt currentStage={project.currentStage} />
             )}

             {activeTab === 'docs' && (
               <div className="space-y-4">
                 {DOCUMENTS.filter(d => d.projectId === project.id).map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{doc.name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{doc.ownerDepartment} • {doc.stage}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <StatusBadge status={doc.status} />
                        <button className="p-2 text-slate-300 group-hover:text-slate-900 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                   </div>
                  ))}
               </div>
             )}

             {activeTab === 'risks' && (
               <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">项目风险登记册</h3>
                    <button className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-200 transition-colors uppercase tracking-widest">新增风险</button>
                  </div>
                  {RISKS.filter(r => r.projectId === project.id).length > 0 ? (
                    RISKS.filter(r => r.projectId === project.id).map(risk => (
                      <div key={risk.id} className="p-8 bg-white rounded-3xl border border-slate-100 card-shadow-sm flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                             <div className={cn(
                               "px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest leading-none",
                               risk.level === 'high' ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"
                             )}>{risk.level} Critical</div>
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{risk.id}</span>
                          </div>
                          <h4 className="text-lg font-black text-slate-900 mb-2">{risk.name}</h4>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">{risk.impactDesc}</p>
                          <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
                             <Zap className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                             <div>
                               <p className="text-xs font-black text-orange-900 uppercase tracking-widest mb-1">应对方案</p>
                               <p className="text-xs text-orange-700 font-medium">{risk.solution}</p>
                             </div>
                          </div>
                        </div>
                        <div className="md:w-64 space-y-4 pt-4 md:pt-0">
                           <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">负责人</span>
                             <span className="text-sm font-bold text-slate-700">{risk.assignee}</span>
                           </div>
                           <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">当前状态</span>
                             <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                               <span className="text-sm font-bold text-orange-600">监控中</span>
                             </div>
                           </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <ShieldAlert className="w-12 h-12 text-slate-200 mb-4" />
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No Risks Detected</p>
                    </div>
                  )}
               </div>
             )}

             {activeTab === 'sync' && (
               <DecisionTimeline messages={SYNC_MESSAGES.filter(m => m.projectId === project.id)} />
             )}
          </div>
        </div>

        <div className="space-y-8">
           <AIInsightCard 
            title="AI 项目驾驶员" 
            insights={[
              "当前文档定稿率 75%，P3 阶段主要风险为开发排期。",
              "识别到 2 条来自飞书群的关键决策，建议同步至 Wiki。",
              "负责人刘子涵在今日消息中提到师资调配合规疑问。"
            ]}
            action={{ label: "生成周进度报表", onClick: () => showToast('报表已生成并发送至群公告') }}
           />

           <div className="p-8 bg-white rounded-[32px] border border-slate-100 card-shadow">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--color-brand)]" />
                跨部门协同
              </h3>
              <div className="space-y-6">
                {['产品部', '开发部', '师资部', '运营部'].map(dept => (
                  <div key={dept} className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{dept}</span>
                    <div className="flex -space-x-2">
                      {[1, 2].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          {i === 1 ? 'U' : 'Z'}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-6xl bg-white rounded-[48px] shadow-2xl p-16 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
               <PostMortemWorkbench 
                 project={project} 
                 onClose={() => setShowReviewModal(false)} 
                 showToast={showToast} 
               />
               
               <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-orange-100/30 rounded-full blur-[120px] pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
