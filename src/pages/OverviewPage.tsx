import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  BarChart3, 
  Search, 
  AlertTriangle, 
  Clock, 
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Star,
  ChevronDown
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { StatusBadge } from '../components/StatusBadge';
import { Project } from '../types';
import { cn } from '../lib/utils';

interface OverviewPageProps {
  projects: Project[];
  onProjectClick: (id: string) => void;
  onNewProject: () => void;
}

const ITEMS_PER_PAGE = 5;

export const OverviewPage: React.FC<OverviewPageProps> = ({ projects, onProjectClick, onNewProject }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [skuFilter, setSkuFilter] = useState('All');
  const [ownerFilter, setOwnerFilter] = useState('All');
  
  const [productPeriods, setProductPeriods] = useState<Record<string, string>>({
    '常规辅导': 'T2',
    '论文辅导': 'T2',
    '稳分辅导': 'T2',
    '稳PASS辅导': 'T1',
    '考前辅导': 'T1',
    '选课指导': 'T1',
    '先修班课': 'T1',
  });

  const skus = ['常规辅导', '论文辅导', '稳分辅导', '稳PASS辅导', '考前辅导', '选课指导', '先修班课'];
  const owners = Array.from(new Set(projects.map(p => p.owner)));

  const cyclePeriod = (sku: string) => {
    setProductPeriods(prev => {
      const current = prev[sku];
      const next = current === 'T1' ? 'T2' : current === 'T2' ? 'T3' : 'T1';
      return { ...prev, [sku]: next };
    });
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.productSku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSku = skuFilter === 'All' || p.productSku === skuFilter;
    const matchesOwner = ownerFilter === 'All' || p.owner === ownerFilter;
    return matchesSearch && matchesSku && matchesOwner;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedProjects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedProjects.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would be an API call
    console.log('Deleting project:', id);
  };

  const handleBatchDelete = () => {
    console.log('Batch deleting projects:', selectedIds);
    setSelectedIds([]);
  };

  return (
    <div className="space-y-10">
      {/* Header code stays the same... */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Architecture / Overview</span>
            <div className="px-1.5 py-0.5 bg-emerald-100 text-emerald-600 rounded text-[8px] font-black uppercase tracking-widest">Active</div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">所有项目 <span className="text-slate-300 ml-1 font-medium tracking-tight">Overview</span></h1>
          <p className="mt-3 text-slate-400 font-medium text-sm">Real-time tracking of product lifecycle and phase verification.</p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard label="活跃项目" value="12" icon={Layers} trend={{ value: "15%", isUp: true }} />
        <MetricCard label="风险提醒" value="02" icon={AlertTriangle} isAlert />
        <MetricCard label="逾期任务" value="05" icon={Clock} isAlert />
        <MetricCard label="本月上线" value="04" icon={Calendar} trend={{ value: "Target", isUp: true }} />
      </div>


      {/* Bento Grid Layer */}
      <div className="grid grid-cols-3 gap-8 items-stretch">
        {/* Main Table Area (2/3) */}
        <div className="col-span-2 flex flex-col">
          <div className="bg-white rounded-[32px] border border-[var(--color-border)] shadow-sm overflow-hidden flex flex-col h-full relative">
            
            {/* Batch Action Bar */}
            <AnimatePresence>
              {selectedIds.length > 0 && (
                <motion.div 
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  className="absolute top-0 inset-x-0 bg-slate-900 text-white px-8 py-4 z-20 flex items-center justify-between shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black tracking-tight">SELECTED {selectedIds.length} PROJECTS</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={handleBatchDelete} className="px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                       批量删除
                    </button>
                    <button onClick={() => setSelectedIds([])} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">取消选择</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between flex-wrap gap-4">
              <h2 className="font-black text-slate-900 tracking-tight text-xl mr-auto">项目列表</h2>
              
              <div className="flex items-center gap-4 flex-wrap">
                {/* SKU Filter */}
                <div className="relative group">
                  <select 
                    value={skuFilter}
                    onChange={(e) => {
                      setSkuFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 outline-none focus:border-blue-500 transition-all cursor-pointer min-w-[120px]"
                  >
                    <option value="All">全部产品</option>
                    {skus.map(sku => (
                      <option key={sku} value={sku}>{sku}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors" />
                </div>

                {/* Owner Filter */}
                <div className="relative group">
                  <select 
                    value={ownerFilter}
                    onChange={(e) => {
                      setOwnerFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 outline-none focus:border-blue-500 transition-all cursor-pointer min-w-[120px]"
                  >
                    <option value="All">全部负责人</option>
                    {owners.map(owner => (
                      <option key={owner} value={owner}>{owner}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors" />
                </div>

                {/* Search */}
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="搜索项目名称..." 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 outline-none focus:border-blue-500 transition-all w-64" 
                  />
                </div>

                {/* New Project Button */}
                <button 
                  onClick={onNewProject}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl font-black text-xs hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  新建项目
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 w-12">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 text-[var(--color-brand)] focus:ring-[var(--color-brand)]"
                        checked={selectedIds.length === paginatedProjects.length && paginatedProjects.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">年</th>
                    <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">月</th>
                    <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">项目名称</th>
                    <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">产品SKU</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">负责人</th>
                    <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">当前阶段</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">状态</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">计划上线日期</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginatedProjects.map((project, idx) => {
                    const onlineDate = new Date(project.planOnlineDate);
                    const year = onlineDate.getFullYear();
                    const month = onlineDate.getMonth() + 1;
                    
                    return (
                      <tr 
                        key={project.id} 
                        className={cn(
                          "transition-colors group cursor-pointer",
                          selectedIds.includes(project.id) ? "bg-orange-50/30" : "hover:bg-slate-50/30"
                        )}
                        onClick={() => onProjectClick(project.id)}
                      >
                        <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                            checked={selectedIds.includes(project.id)}
                            onChange={() => toggleSelect(project.id)}
                          />
                        </td>
                        <td className="px-4 py-5 text-sm font-medium text-slate-500">{year}</td>
                        <td className="px-4 py-5 text-sm font-medium text-slate-500">{month}</td>
                        <td className="px-4 py-5">
                          <span className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors tracking-tight">{project.name}</span>
                        </td>
                        <td className="px-4 py-5">
                          <span className="text-xs text-slate-500 font-medium">{project.productSku}</span>
                        </td>
                        <td className="px-6 py-5">
                           <div className="inline-flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-lg border border-slate-200">
                             <div className="w-5 h-5 rounded-full bg-slate-400 flex items-center justify-center overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.owner}`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                             </div>
                             <span className="text-xs font-bold text-slate-700">{project.owner}</span>
                           </div>
                        </td>
                        <td className="px-4 py-5 text-center">
                          <div className="mx-auto w-fit px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold">
                            {project.currentStage}: {project.currentStage === 'P1' ? '立项' : project.currentStage === 'P2' ? '需求' : project.currentStage === 'P3' ? '开发' : project.currentStage === 'P4' ? '测试' : '上线'}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={cn(
                            "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest",
                            project.status === 'risk' ? "text-rose-600" : 
                            project.status === 'closed' ? "text-slate-400" :
                            project.status === 'paused' ? "text-blue-500" :
                            "text-emerald-600"
                          )}>
                            <span className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              project.status === 'risk' ? "bg-rose-500 animate-pulse" : 
                              project.status === 'closed' ? "bg-slate-400" :
                              project.status === 'paused' ? "bg-blue-400" :
                              "bg-emerald-500"
                            )}></span>
                            {project.status === 'risk' ? 'Critical' : project.status === 'closed' ? 'Archived' : project.status === 'paused' ? 'Paused' : 'Healthy'}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-[12px] font-bold text-slate-400">{project.planOnlineDate}</span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button 
                            onClick={(e) => handleDelete(project.id, e)}
                            className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {paginatedProjects.length === 0 && (
                    <tr>
                      <td colSpan={11} className="px-8 py-12 text-center text-slate-400 text-xs font-medium">未找到匹配的项目</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination UI */}
            <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/20">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length}
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black transition-all",
                        currentPage === page 
                          ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                          : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Space (1/3) */}
        <div className="space-y-8 flex flex-col">
          {/* AI Insights (Dark Bento Card) */}
          <div className="p-8 bg-gradient-to-br from-[#14161A] to-[#2D3036] rounded-[32px] text-white flex-1 relative overflow-hidden group shadow-xl">
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#F26A4B]/20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F26A4B] shadow-[0_0_15px_#F26A4B]"></div>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">AI Today Insight</span>
              </div>
              
              <p className="text-sm text-slate-300 leading-relaxed italic mb-8 border-l-2 border-[#F26A4B]/30 pl-4 whitespace-pre-line">
                "当前「选课指导」项目由于师资分配卡点进度滞后 4 天，建议优先处理 M2 评审反馈。"
              </p>

              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-xs font-medium text-slate-400">识别到待办任务</span>
                  <span className="text-[var(--color-brand)] font-black text-sm transition-transform group-hover:translate-x-1">+3</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-xs font-medium text-slate-400">关键决策摘要</span>
                  <span className="text-white font-black text-sm">01</span>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#F26A4B]/10 rounded-full blur-[80px]" />
          </div>

          {/* Product Matrix / SKU Board */}
          <div className="p-8 bg-white rounded-[32px] border border-[var(--color-border)] shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">产品时期分布详情</h3>
            <div className="space-y-2">
              {skus.map((sku, idx) => {
                const period = productPeriods[sku];
                return (
                  <motion.div 
                    key={idx} 
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => cyclePeriod(sku)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-2xl border transition-all text-xs font-bold cursor-pointer group/item",
                      period === 'T1' ? "bg-blue-50/50 border-blue-100 text-blue-700" :
                      period === 'T2' ? "bg-amber-50/50 border-amber-100 text-amber-700" :
                      period === 'T3' ? "bg-emerald-50/50 border-emerald-100 text-emerald-700" :
                      "bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200"
                    )}
                  >
                    <span>{sku}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest transition-colors whitespace-nowrap",
                      period === 'T1' ? "bg-blue-600 text-white shadow-sm shadow-blue-100" :
                      period === 'T2' ? "bg-amber-500 text-white shadow-sm shadow-amber-100" :
                      period === 'T3' ? "bg-emerald-500 text-white shadow-sm shadow-emerald-100" :
                      "bg-slate-200 text-slate-600"
                    )}>
                      {period === 'T1' ? 'T1 :迭代期' : period === 'T2' ? 'T2 :观察期' : 'T3 :稳定期'}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
