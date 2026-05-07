import React, { useState } from 'react';
import { 
  RefreshCw, 
  Sparkles, 
  MessageSquare, 
  MoreHorizontal, 
  Calendar,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Share2,
  Plus
} from 'lucide-react';
import { SYNC_MESSAGES } from '../mockData';
import { StatusBadge } from '../components/StatusBadge';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SyncPageProps {
  onMessageToTask: () => void;
}

export const SyncPage: React.FC<SyncPageProps> = ({ onMessageToTask }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [typeFilter, setTypeFilter] = useState<'all' | 'notification' | 'decision' | 'todo' | 'risk' | 'delivery'>('all');
  const [projectFilter, setProjectFilter] = useState('all');

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const projectNames = Array.from(new Set(SYNC_MESSAGES.map(m => m.projectName)));

  const filteredMessages = SYNC_MESSAGES.filter(msg => {
    const matchesType = typeFilter === 'all' || msg.classifiedType === typeFilter;
    const matchesProject = projectFilter === 'all' || msg.projectName === projectFilter;
    return matchesType && matchesProject;
  });

  const getCategoryTheme = (type: string) => {
    switch (type) {
      case 'notification': return { label: '通知', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: MessageSquare };
      case 'decision': return { label: '决策', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle2 };
      case 'todo': return { label: '待办', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: Calendar };
      case 'risk': return { label: '风险', color: 'bg-rose-50 text-rose-600 border-rose-100', icon: AlertTriangle };
      case 'delivery': return { label: '交付', color: 'bg-purple-50 text-purple-600 border-purple-100', icon: Share2 };
      default: return { label: '系统', color: 'bg-slate-50 text-slate-600 border-slate-100', icon: Sparkles };
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100">
               <RefreshCw className={cn("w-3 h-3", isSyncing && "animate-spin")} />
               Lark Robot Tracking
            </div>
            <div className="px-1.5 py-0.5 bg-emerald-100 text-emerald-600 rounded text-[8px] font-black uppercase tracking-widest">Active Sync</div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">信息流转看板 <span className="text-slate-300 ml-2 font-light">SYNC ENGINE</span></h1>
          <p className="mt-2 text-slate-500 font-medium">智能识别飞书消息并分类：<span className="text-slate-900 font-bold">通知、决策、待办、风险、交付</span></p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-3 shadow-xl shadow-slate-200 disabled:opacity-50 active:scale-95"
        >
          <RefreshCw className={cn("w-5 h-5", isSyncing && "animate-spin")} />
          {isSyncing ? '正在定时拉取...' : '立即同步飞书群'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 bg-white rounded-[32px] border border-slate-100 card-shadow overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-slate-400" />
                消息实时流
              </h2>
              <div className="flex items-center gap-3">
                {/* 消息类型筛选 */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 transition-all hover:border-slate-200 focus-within:border-blue-200">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest shrink-0">类型</span>
                  <select 
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="bg-transparent border-none text-[11px] font-bold text-slate-700 outline-none cursor-pointer focus:ring-0 min-w-[80px] p-0"
                  >
                    <option value="all">全部</option>
                    <option value="notification">通知</option>
                    <option value="decision">决策</option>
                    <option value="todo">待办</option>
                    <option value="risk">风险</option>
                    <option value="delivery">交付</option>
                  </select>
                </div>

                {/* 项目筛选 */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 transition-all hover:border-slate-200 focus-within:border-blue-200">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest shrink-0">项目</span>
                  <select 
                    value={projectFilter}
                    onChange={(e) => setProjectFilter(e.target.value)}
                    className="bg-transparent border-none text-[11px] font-bold text-slate-700 outline-none cursor-pointer focus:ring-0 min-w-[120px] p-0"
                  >
                    <option value="all">全部项目</option>
                    {projectNames.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-px overflow-y-auto max-h-[600px] bg-slate-50/30">
            {filteredMessages.length > 0 ? filteredMessages.map((msg) => {
              const theme = getCategoryTheme(msg.classifiedType);
              const Icon = theme.icon;
              return (
                <div key={msg.id} className="p-8 hover:bg-white transition-all group relative border-b border-slate-50 last:border-0 bg-white/60">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm font-black text-slate-400 overflow-hidden text-lg">
                      {msg.senderName[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-black text-slate-900">{msg.senderName}</span>
                          <span className="px-2.5 py-1 bg-slate-900/5 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-tight">
                            {msg.projectName}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-bold ml-2">
                            <Calendar className="w-3.5 h-3.5" />
                            {msg.sentAt}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className={cn(
                             "px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest flex items-center gap-1.5",
                             theme.color
                           )}>
                             <Icon className="w-3 h-3" />
                             {theme.label}
                           </span>
                           {msg.isImportant && (
                             <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" title="重要消息" />
                           )}
                        </div>
                      </div>
                      <p className="text-slate-800 text-[15px] leading-relaxed mb-5 font-medium">{msg.content}</p>
                      
                      <div className="p-5 bg-slate-50/80 border border-slate-100 rounded-2xl flex items-center justify-between group/insight hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Robot Extract Summary</span>
                            <span className="text-sm font-bold text-slate-700">{msg.summary}</span>
                          </div>
                        </div>
                        {msg.classifiedType === 'todo' && (
                          <button 
                            onClick={onMessageToTask}
                            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black shadow-lg shadow-slate-200 opacity-0 group-hover/insight:opacity-100 transition-all hover:bg-slate-800 active:scale-95 flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            转为项目任务
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="p-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 mb-4">
                   <MessageSquare className="w-8 h-8" />
                </div>
                <p className="text-slate-400 font-bold">在该项目/分类下暂无抓取到同步消息</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="p-8 rounded-[32px] bg-slate-900 text-white relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 opacity-20 blur-3xl" />
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              AI Insight 信息汇总
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 border-b border-slate-800 pb-1 mb-1">关键风险</span>
                  <span className="text-[13px] leading-relaxed">检测到多个群聊提及「师资储备不足」，影响 PRD 交付进度。</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 border-b border-slate-800 pb-1 mb-1">关键决策</span>
                  <span className="text-[13px] leading-relaxed">「稳PASS春季迭代」项目 M2 评审已由张经理确认通过。</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 border-b border-slate-800 pb-1 mb-1">待办提取</span>
                  <span className="text-[13px] leading-relaxed">系统预测需要为「选课指导」升级项目建立 M1 会议档。</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black tracking-widest uppercase hover:bg-white/10 transition-all">生成飞书消息周报</button>
          </motion.div>

          <div className="p-8 bg-white rounded-[32px] border border-slate-100 card-shadow">
             <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-600" />
              抓取节点状态
            </h3>
            <div className="space-y-6">
              {[
                { label: '飞书群活跃连接', val: '12', status: 'success' },
                { label: '平均识别延迟', val: '0.8s', status: 'success' },
                { label: '今日抓取消息', val: '428', status: 'success' },
                { label: '分类准确率', val: '98.2%', status: 'success' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                  <span className={cn(
                    "font-black text-sm",
                    item.status === 'success' ? "text-emerald-500" : "text-amber-500"
                  )}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
