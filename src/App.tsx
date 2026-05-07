import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  CheckSquare, 
  MessageSquare, 
  Settings, 
  Home, 
  Search,
  Bell,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Pages (to be implemented)
// For now we'll use placeholder content in App.tsx and then swap them out
import { LandingPage } from './pages/LandingPage';
import { OverviewPage } from './pages/OverviewPage';
import { NewProjectPage } from './pages/NewProjectPage';
import { TasksPage } from './pages/TasksPage';
import { SyncPage } from './pages/SyncPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ReviewPage } from './pages/ReviewPage';
import { PROJECTS, TASKS } from './mockData';
import { Project, Task } from './types';

type PageId = 'home' | 'overview' | 'new-project' | 'tasks' | 'sync' | 'settings' | 'project-detail' | 'review';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(TASKS);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const navItems = [
    { id: 'home', label: '首页', en: 'HOME', icon: Home },
    { id: 'overview', label: '项目总览', en: 'OVERVIEW', icon: LayoutDashboard },
    { id: 'new-project', label: '新建项目', en: 'NEW PROJECT', icon: PlusCircle },
    { id: 'tasks', label: '项目任务', en: 'TASKS', icon: CheckSquare },
    { id: 'sync', label: '信息同频', en: 'SYNC', icon: MessageSquare },
    { id: 'settings', label: '标准化设置', en: 'SETTINGS', icon: Settings },
  ];

  const navigateToProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentPage('project-detail');
  };

  const navigateToReview = (id: string) => {
    setSelectedProjectId(id);
    setCurrentPage('review');
  };

  const addProject = (project: Project, projectTasks: Task[]) => {
    setProjects(prev => [project, ...prev]);
    setTasks(prev => [...projectTasks, ...prev]);
    showToast('项目及任务同步成功');
    setCurrentPage('overview');
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleAddTask = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    const newTask: Task = {
      id: 'TASK-' + Math.random().toString(36).substr(2, 9),
      projectId,
      projectName: project?.name || '未知项目',
      name: '新任务',
      stage: 'P1:需求阶段',
      department: '产品部',
      assignee: '待分配',
      priority: 'medium',
      planEndTime: new Date().toISOString().split('T')[0],
      status: 'pending',
      isMilestone: false,
      deliverableName: ''
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleDeleteTasks = (ids: string[]) => {
    setTasks(prev => prev.filter(t => !ids.includes(t.id)));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <LandingPage onEnter={() => setCurrentPage('overview')} />;
      case 'overview': return <OverviewPage projects={projects} onProjectClick={navigateToProject} onNewProject={() => setCurrentPage('new-project')} />;
      case 'new-project': return <NewProjectPage onSuccess={addProject} onCancel={() => setCurrentPage('overview')} />;
      case 'tasks': return <TasksPage projects={projects} tasks={tasks} onUpdateTask={handleUpdateTask} onAddTask={handleAddTask} onDeleteTasks={handleDeleteTasks} onProjectClick={navigateToProject} />;
      case 'sync': return <SyncPage onMessageToTask={() => showToast('消息已转为任务')} />;
      case 'settings': return <SettingsPage />;
      case 'project-detail': return <ProjectDetailPage id={selectedProjectId!} onBack={() => setCurrentPage('overview')} onReview={() => navigateToReview(selectedProjectId!)} showToast={showToast} />;
      case 'review': return <ReviewPage id={selectedProjectId!} onBack={() => setCurrentPage('project-detail')} showToast={showToast} />;
      default: return <LandingPage onEnter={() => setCurrentPage('overview')} />;
    }
  };

  if (currentPage === 'home') {
    return <LandingPage onEnter={() => setCurrentPage('overview')} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-surface)]">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarCollapsed ? 90 : 280 }}
        className="relative bg-[var(--color-sidebar)] text-white flex flex-col z-50 border-r border-slate-800"
      >
        <div className="p-8 flex flex-col h-full">
          {/* Brand */}
          <div className="flex flex-col gap-1 mb-12">
            <div className="text-[var(--color-brand)] font-extrabold text-2xl tracking-tighter">LUMIST</div>
            {!isSidebarCollapsed && (
              <div className="text-[10px] text-gray-500 font-medium tracking-[0.2em] uppercase">Lumist Project Hub</div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as PageId)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative",
                  currentPage === item.id 
                    ? "bg-[var(--color-brand)] text-white shadow-lg shadow-orange-900/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", currentPage === item.id ? "text-white" : "group-hover:scale-110 transition-transform")} />
                {!isSidebarCollapsed && (
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className="text-sm font-bold whitespace-nowrap">{item.label}</span>
                    <span className={cn("text-[8px] tracking-widest font-black", currentPage === item.id ? "text-white/60" : "text-slate-600")}>{item.en}</span>
                  </div>
                )}
                {currentPage === item.id && !isSidebarCollapsed && (
                  <ChevronRight className="w-4 h-4 ml-auto text-white/50" />
                )}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-8 border-t border-slate-800">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 hover:text-white transition-colors"
            >
              {isSidebarCollapsed ? <PlusCircle className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
              {!isSidebarCollapsed && <span className="text-sm font-bold">退出系统</span>}
            </button>
          </div>
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-4 top-12 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-[var(--color-brand)] shadow-sm z-50 transition-transform hover:scale-110"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Header */}
        <header className="h-20 bg-white border-b border-[var(--color-border)] px-10 flex items-center justify-between z-40">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[var(--color-brand)] transition-colors" />
              <input 
                type="text" 
                placeholder="搜索项目、任务、规则..." 
                className="pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-100 w-80 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-[var(--color-brand)] hover:bg-slate-100 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-slate-100" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 leading-none">Admin User</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Product Director</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[var(--color-brand)] p-[2px]">
                <div className="w-full h-full rounded-[14px] bg-[var(--color-brand)] flex items-center justify-center border-2 border-white/20">
                  <span className="text-white font-black text-xs">AD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-10 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage + (selectedProjectId || '')}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="max-w-[1600px] mx-auto"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={cn(
                "fixed bottom-10 right-10 px-6 py-4 rounded-[20px] shadow-2xl border flex items-center gap-3 z-[100] glass",
                toast.type === 'success' ? "border-emerald-100" : "border-rose-100"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                toast.type === 'success' ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
              )}>
                {toast.type === 'success' ? <CheckSquare className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
              </div>
              <span className="font-bold text-slate-800">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
