import React from 'react';
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Search,
  Star,
  Link as LinkIcon,
  ExternalLink,
  Plus,
  X,
  Trash2,
  ChevronDown
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { Project, Task } from '../types';
import { cn } from '../lib/utils';
import { useState } from 'react';

interface TasksPageProps {
  projects: Project[];
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onAddTask: (projectId: string) => void;
  onDeleteTasks: (ids: string[]) => void;
  onProjectClick: (id: string) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({ 
  projects, 
  tasks, 
  onUpdateTask, 
  onAddTask,
  onDeleteTasks,
  onProjectClick 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('All');
  const [ownerFilter, setOwnerFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const projectOwners = Array.from(new Set(projects.map(p => p.owner)));

  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [tempLink, setTempLink] = useState({ name: '', url: '' });

  const handleSaveLink = (task: Task) => {
    if (tempLink.url) {
      // Use the provided name or a smart default
      let finalName = tempLink.name;
      if (!finalName) {
        if (tempLink.url.includes('feishu')) finalName = '飞书项目云文档';
        else if (tempLink.url.includes('docs.google')) finalName = 'Google Docs 文档';
        else if (tempLink.url.includes('github')) finalName = '代码仓库项目源码';
        else {
          try {
            finalName = new URL(tempLink.url).hostname;
          } catch {
            finalName = '项目交付物文档';
          }
        }
      }
      
      // Store as "Name|URL" so we can parse it back
      onUpdateTask({
        ...task,
        deliverableName: `${finalName}|${tempLink.url}`
      });
    }
    setEditingLinkId(null);
    setTempLink({ name: '', url: '' });
  };

  const filteredTasks = tasks.filter(task => {
    const parentProject = projects.find(p => p.id === task.projectId);
    
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (parentProject?.owner.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesProject = projectFilter === 'All' || task.projectId === projectFilter;
    const matchesOwner = ownerFilter === 'All' || parentProject?.owner === ownerFilter;
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;

    return matchesSearch && matchesProject && matchesOwner && matchesStatus;
  });

  const completedCount = filteredTasks.filter(t => t.status === 'completed').length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Collaboration</span>
            <div className="px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded text-[8px] font-black uppercase tracking-widest">Efficiency</div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">项目任务 <span className="text-slate-300 ml-2 font-light">TASKS</span></h1>
          <p className="mt-2 text-slate-500 font-medium">集中处理你负责或参与的项目任务，快速识别优先级与交付状态</p>
        </div>
        <div className="flex items-center gap-4">
           {selectedIds.length > 0 && (
             <button 
               onClick={() => {
                 onDeleteTasks(selectedIds);
                 setSelectedIds([]);
               }}
               className="flex items-center gap-2 px-5 py-3 bg-rose-50 text-rose-600 rounded-2xl text-sm font-bold hover:bg-rose-100 transition-all animate-in fade-in zoom-in-95"
             >
               <Trash2 className="w-4 h-4" />
               删除选中 ({selectedIds.length})
             </button>
           )}
           <button 
             onClick={() => onAddTask(projectFilter === 'All' ? projects[0].id : projectFilter)}
             className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg active:scale-95"
           >
             <Plus className="w-5 h-5" />
             新增任务
           </button>
           <div className="px-5 py-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900">{filteredTasks.length}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">当前列表</span>
              </div>
              <div className="w-px h-6 bg-slate-100" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-emerald-500">{completedCount}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">已完成</span>
              </div>
           </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white rounded-[24px] border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="flex-[2] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索任务名称、负责人、项目负责人..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium" 
            />
          </div>
          
          <select 
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option value="All">所属项目 (全部)</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          <select 
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option value="All">项目负责人 (全部)</option>
            {projectOwners.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option value="All">状态 (全部)</option>
            <option value="pending">待处理</option>
            <option value="in_progress">进行中</option>
            <option value="completed">已完成</option>
            <option value="blocked">已阻塞</option>
          </select>

          <div className="w-px h-8 bg-slate-100 mx-2" />
          
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-95">
            <Filter className="w-4 h-4" />
            筛选
          </button>
      </div>

      {/* Task Grid */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center w-16">序号</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest w-[220px]">任务事项</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">所属阶段</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">里程碑</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">负责人</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">状态</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Deadline</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">交付物</th>
                <th className="px-6 py-5 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTasks.map((task, index) => (
                  <tr 
                    key={task.id} 
                    onClick={() => {
                      if (selectedIds.includes(task.id)) setSelectedIds(selectedIds.filter(id => id !== task.id));
                      else setSelectedIds([...selectedIds, task.id]);
                    }}
                    className={cn(
                      "hover:bg-slate-50/50 transition-colors group cursor-pointer",
                      selectedIds.includes(task.id) && "bg-blue-50/30 hover:bg-blue-50/40"
                    )}
                  >
                    <td className="px-4 py-6 text-center text-xs font-bold text-slate-300">
                      {index + 1}
                    </td>
                    <td className="px-8 py-6">
                      <input 
                        type="text" 
                        value={task.name}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onUpdateTask({ ...task, name: e.target.value })}
                        className="w-full bg-transparent border-none p-0 text-[15px] font-bold text-slate-900 outline-none focus:text-blue-600 truncate"
                      />
                    </td>
                    <td className="px-8 py-6 text-center">
                      <select 
                        value={task.stage}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onUpdateTask({ ...task, stage: e.target.value })}
                        className="bg-transparent border-none text-[12px] font-black text-slate-400 hover:text-blue-500 transition-colors outline-none cursor-pointer appearance-none text-center"
                      >
                        <option value="P1:需求阶段">P1:需求阶段</option>
                        <option value="P2:开发阶段">P2:开发阶段</option>
                        <option value="P3:验收阶段">P3:验收阶段</option>
                        <option value="P4:版本发布">P4:版本发布</option>
                        <option value="P5:反馈跟踪">P5:反馈跟踪</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateTask({ ...task, isMilestone: !task.isMilestone });
                        }}
                        className={cn(
                          "p-2 rounded-xl border transition-all",
                          task.isMilestone ? "bg-amber-50 border-amber-200 text-amber-500" : "bg-white border-slate-100 text-slate-200 hover:border-slate-200"
                        )}
                      >
                        <Star className={cn("w-4 h-4", task.isMilestone && "fill-current")} />
                      </button>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="relative group/sel inline-flex items-center">
                        <select 
                          value={task.assignee}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => onUpdateTask({ ...task, assignee: e.target.value })}
                          className="bg-transparent border-none text-[14px] font-semibold text-slate-600 focus:ring-0 cursor-pointer hover:text-blue-600 transition-colors appearance-none text-center outline-none pr-4"
                        >
                          <option value="待分配">待分配</option>
                          {projectOwners.map(owner => <option key={owner} value={owner}>{owner}</option>)}
                        </select>
                        <ChevronDown className="w-3 h-3 text-slate-300 absolute right-0 pointer-events-none group-hover/sel:text-blue-400" />
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <select 
                        value={task.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onUpdateTask({ ...task, status: e.target.value as any })}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black border-none outline-none cursor-pointer appearance-none text-center min-w-[90px]",
                          task.status === 'completed' ? "bg-emerald-100 text-emerald-700" :
                          task.status === 'in_progress' ? "bg-blue-100 text-blue-700" :
                          task.status === 'blocked' ? "bg-rose-100 text-rose-700" :
                          "bg-slate-100 text-slate-500"
                        )}
                      >
                        <option value="pending">待处理</option>
                        <option value="in_progress">进行中</option>
                        <option value="completed">已完成</option>
                        <option value="blocked">已阻塞</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <input 
                        type="date" 
                        value={task.planEndTime}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onUpdateTask({ ...task, planEndTime: e.target.value })}
                        className="text-xs font-bold text-slate-500 bg-slate-50 border-none px-3 py-1.5 rounded-lg outline-none focus:ring-1 focus:ring-blue-100 cursor-pointer"
                      />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                         {task.deliverableName && task.deliverableName.includes('|') ? (
                          (() => {
                            const [title, url] = task.deliverableName.split('|');
                            return (
                              <div className="flex items-center gap-1 group/tab">
                                <a 
                                  href={url.startsWith('http') ? url : `https://${url}`}
                                  onClick={(e) => e.stopPropagation()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-50 border border-sky-100 rounded-lg text-xs font-bold text-sky-700 hover:bg-sky-100 transition-all max-w-[200px] truncate"
                                >
                                  <div className="w-4 h-4 bg-white rounded-md flex items-center justify-center shadow-sm shrink-0">
                                     <img 
                                       src={`https://www.google.com/s2/favicons?domain=${new URL(url.startsWith('http') ? url : `https://${url}`).hostname}&sz=32`} 
                                       alt="" 
                                       className="w-2.5 h-2.5"
                                       referrerPolicy="no-referrer"
                                     />
                                  </div>
                                  <span className="truncate">{title}</span>
                                  <ExternalLink className="w-3 h-3 opacity-40" />
                                </a>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onUpdateTask({ ...task, deliverableName: '' });
                                  }}
                                  className="p-1 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all opacity-0 group-hover/tab:opacity-100"
                                >
                                   <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })()
                        ) : editingLinkId === task.id ? (
                          <div 
                            className="flex flex-col gap-2 bg-white border border-blue-200 p-2 rounded-2xl shadow-xl animate-in fade-in slide-in-from-right-2 z-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                             <div className="space-y-1.5">
                               <input 
                                 type="text" 
                                 placeholder="文档标题 (如: 需求规格说明书)"
                                 className="text-[10px] px-3 py-1.5 w-56 bg-slate-50 border-none rounded-lg outline-none focus:ring-1 focus:ring-blue-100 font-bold text-slate-600"
                                 value={tempLink.name}
                                 onChange={(e) => setTempLink({ ...tempLink, name: e.target.value })}
                               />
                               <input 
                                 autoFocus
                                 type="text" 
                                 placeholder="粘贴链接 (HTTP/HTTPS)..."
                                 className="text-[10px] px-3 py-1.5 w-56 bg-slate-50 border-none rounded-lg outline-none focus:ring-1 focus:ring-blue-100 font-medium text-slate-500"
                                 value={tempLink.url}
                                 onChange={(e) => setTempLink({ ...tempLink, url: e.target.value })}
                                 onKeyDown={(e) => e.key === 'Enter' && handleSaveLink(task)}
                               />
                             </div>
                             <div className="flex items-center justify-end gap-2 mt-1">
                               <button 
                                 onClick={() => setEditingLinkId(null)}
                                 className="px-3 py-1 text-[10px] font-bold text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
                               >
                                 取消
                               </button>
                               <button 
                                 onClick={() => handleSaveLink(task)}
                                 className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-[10px] font-black flex items-center gap-1.5"
                               >
                                 <LinkIcon className="w-3 h-3" />
                                 确定保存
                               </button>
                             </div>
                          </div>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingLinkId(task.id);
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-xl border border-dashed border-slate-200 text-slate-300 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all group/plus"
                          >
                            <Plus className="w-4 h-4 group-hover/plus:scale-110 transition-transform" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           onDeleteTasks([task.id]);
                         }}
                         className="p-2 text-slate-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
