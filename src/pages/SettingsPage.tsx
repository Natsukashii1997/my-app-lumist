import React from 'react';
import { 
  FileCode, 
  Bell, 
  FolderLock, 
  Archive, 
  History, 
  Layers, 
  Plus, 
  ChevronRight,
  ChevronDown,
  Star,
  ExternalLink,
  Link as LinkIcon,
  X,
  Trash2,
  MessageSquare
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Reminder {
  id: string;
  name: string;
  code: string;
  desc: string;
  trigger: string;
  rule: string;
  isActive: boolean;
  type: 'individual' | 'group';
}

interface Announcement {
  id: string;
  name: string;
  tag: string;
  content: string;
  isActive: boolean;
}

interface ChangeLog {
  id: string;
  type: 'update' | 'delete' | 'create';
  module: string;
  description: string;
  time: string;
}

interface ClassificationRule {
  id: string;
  name: string;
  desc: string;
  keywords: string[];
  priority: number;
  isActive: boolean;
}

export const SettingsPage: React.FC = () => {
  const tabs = [
    { id: 'templates', label: '项目模板', en: 'TEMPLATES', icon: Layers },
    { id: 'reminders', label: '提醒配置', en: 'REMINDERS', icon: Bell },
    { id: 'announcements', label: '群公告', en: 'NOTICE', icon: MessageSquare },
    { id: 'categories', label: '信息分类', en: 'CLASSIFY', icon: FolderLock },
    { id: 'archive', label: '归档规则', en: 'ARCHIVE', icon: Archive },
    { id: 'logs', label: '变更日志', en: 'LOGS', icon: History },
  ];

  const [decisionRules, setDecisionRules] = React.useState([
    { id: 'dr1', stage: 'P1', node: '立项审议', rules: ['BP 角色必须在群', '必须关联飞书 Wiki'], isActive: true },
    { id: 'dr2', stage: 'P3', node: '中期验收', rules: ['QA 冒烟测试需通过', 'MVP 指标需确认'], isActive: true },
  ]);

  const [activeTab, setActiveTab] = React.useState('templates');
  const [editingTemplate, setEditingTemplate] = React.useState<string | null>(null);
  
  const [reminders, setReminders] = React.useState<Reminder[]>([
    { 
      id: 'r1', 
      name: '到期前置提醒', 
      code: 'DUE_SOON', 
      desc: '任务计划结束前 1 天，自动通知负责人核对进度',
      trigger: 'T-1 天, 10:00',
      rule: '仅工作日',
      isActive: true,
      type: 'individual'
    },
    { 
      id: 'r2', 
      name: '逾期首次提醒', 
      code: 'OVERDUE_FIRST', 
      desc: '任务进入逾期状态当天，上午 10:00 触发告警',
      trigger: '逾期当天, 10:00',
      rule: '仅工作日',
      isActive: true,
      type: 'individual'
    },
    { 
      id: 'r3', 
      name: '逾期持续追收', 
      code: 'OVERDUE_RECURRING', 
      desc: '逾期后每天 10:00 连续提醒，连续提醒 5 天',
      trigger: '每日 10:00, 持续 5 次',
      rule: '仅工作日',
      isActive: true,
      type: 'individual'
    },
    { 
      id: 'r4', 
      name: '群组每周进度同步', 
      code: 'WEEKLY_SYNC', 
      desc: '每周一将项目全景进度发送至飞书群',
      trigger: '每周一, 10:00',
      rule: '群通知',
      isActive: true,
      type: 'group'
    },
  ]);

  const [isReminderModalOpen, setIsReminderModalOpen] = React.useState(false);
  const [currentReminder, setCurrentReminder] = React.useState<Partial<Reminder> | null>(null);

  const [announcements, setAnnouncements] = React.useState<Announcement[]>([
    {
      id: 'a1',
      name: '标准项目群公告',
      tag: '群名称',
      content: `大家好，欢迎加入【{{groupName}}】项目群 🎉🎉\n\n迭代项目正式启动，本群是此次项目的核心协作阵地。\n\n后续产品迭代的各阶段事项将在群内同步推进，需要各端口协同配合的内容也会在这里对齐。\n\n有任何问题或不确定的地方，随时群里反馈~\n\n辛苦大家后续的支持与配合，我们一起把事情推好 💪❤️`,
      isActive: true
    }
  ]);

  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = React.useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = React.useState<Partial<Announcement> | null>(null);

  const [classifications, setClassifications] = React.useState<ClassificationRule[]>([
    {
      id: 'c1',
      name: '交付 - 交付类',
      desc: '成果物交付',
      keywords: ['交付', '文档', '报告', '产出', '完成', '已上传', '附件'],
      priority: 5,
      isActive: true
    },
    {
      id: 'c2',
      name: '风险 - 风险类',
      desc: '风险提示或问题反馈',
      keywords: ['风险', '问题', 'bug', '故障', '异常', '阻塞', '延期'],
      priority: 4,
      isActive: true
    },
    {
      id: 'c3',
      name: '待办 - 待办类',
      desc: '需要跟进的待办事项',
      keywords: ['待办', 'todo', '跟进', '处理', '完成', '提交', '确认'],
      priority: 3,
      isActive: true
    },
    {
      id: 'c4',
      name: '决策 - 决策类',
      desc: '重要决策结论',
      keywords: ['决策', '决定', '结论', '确定', '通过', '否决', '待定'],
      priority: 2,
      isActive: true
    },
    {
      id: 'c5',
      name: '通知 - 通知类',
      desc: '项目相关通知公告',
      keywords: ['通知', '公告', '说明', '安排'],
      priority: 1,
      isActive: true
    }
  ]);

  const [isClassModalOpen, setIsClassModalOpen] = React.useState(false);
  const [currentClass, setCurrentClass] = React.useState<Partial<ClassificationRule> | null>(null);

  const [archiveConfig, setArchiveConfig] = React.useState({
    isActive: true,
    folders: ['01_项目文档', '02_会议记录', '03_交付物', '04_复盘报告'],
    namingRule: '{projectCode}_{projectName}_{stage}_{docName}'
  });

  const [isArchiveModalOpen, setIsArchiveModalOpen] = React.useState(false);
  const [tempArchiveConfig, setTempArchiveConfig] = React.useState({...archiveConfig});

  const [logs] = React.useState<ChangeLog[]>([
    {
      id: 'l1',
      type: 'update',
      module: 'message_category_rule',
      description: '更新分类规则：交付类',
      time: '2026/5/7 17:54:05'
    },
    {
      id: 'l2',
      type: 'update',
      module: 'message_category_rule',
      description: '更新分类规则：风险类',
      time: '2026/5/7 17:54:04'
    },
    {
      id: 'l3',
      type: 'update',
      module: 'message_category_rule',
      description: '更新分类规则：待办类',
      time: '2026/5/7 17:54:03'
    },
    {
      id: 'l4',
      type: 'delete',
      module: 'reminder_config',
      description: '删除提醒配置：每日待办汇总',
      time: '2026/5/7 17:37:41'
    },
    {
      id: 'l5',
      type: 'delete',
      module: 'reminder_config',
      description: '删除提醒配置：验证更新功能',
      time: '2026/5/7 17:37:38'
    },
    {
      id: 'l6',
      type: 'create',
      module: 'project_template',
      description: '创建项目模板：测试模板',
      time: '2026/4/22 13:37:13'
    }
  ]);

  const handleSaveReminder = () => {
    if (!currentReminder) return;
    
    if (currentReminder.id) {
      setReminders(prev => prev.map(r => r.id === currentReminder.id ? currentReminder as Reminder : r));
    } else {
      const newReminder = {
        ...currentReminder,
        id: `r${Date.now()}`,
        isActive: true
      } as Reminder;
      setReminders(prev => [...prev, newReminder]);
    }
    setIsReminderModalOpen(false);
    setCurrentReminder(null);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleSaveAnnouncement = () => {
    if (!currentAnnouncement) return;
    
    if (currentAnnouncement.id) {
      setAnnouncements(prev => prev.map(a => a.id === currentAnnouncement.id ? currentAnnouncement as Announcement : a));
    } else {
      const newAnn = {
        ...currentAnnouncement,
        id: `a${Date.now()}`,
        isActive: true
      } as Announcement;
      setAnnouncements(prev => [...prev, newAnn]);
    }
    setIsAnnouncementModalOpen(false);
    setCurrentAnnouncement(null);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const handleSaveClassification = () => {
    if (!currentClass) return;
    
    if (currentClass.id) {
      setClassifications(prev => prev.map(c => c.id === currentClass.id ? currentClass as ClassificationRule : c));
    } else {
      const newClass = {
        ...currentClass,
        id: `c${Date.now()}`,
        isActive: true,
        keywords: currentClass.keywords || [],
        priority: currentClass.priority || 1
      } as ClassificationRule;
      setClassifications(prev => [...prev, newClass]);
    }
    setIsClassModalOpen(false);
    setCurrentClass(null);
  };

  const handleDeleteClassification = (id: string) => {
    setClassifications(prev => prev.filter(c => c.id !== id));
  };

  const owners = ['张三', '李四', '王五', '赵六', '陈七'];

  const [templates, setTemplates] = React.useState([
    { 
      id: '1',
      name: '产品迭代上新模板', 
      sku: '通用', 
      tasks: 32, 
      status: 'Active', 
      primaryOwner: '张三',
      taskList: [
        { name: '用户调研（学生端语料分析）', phase: 'P1:需求阶段', dept: '产品部', deliverable: '', isMilestone: false },
        { name: '市场调研&竞品分析', phase: 'P1:需求阶段', dept: '产品部', deliverable: '', isMilestone: false },
        { name: '内部调研（销售端问卷调研）', phase: 'P1:需求阶段', dept: '产品部', deliverable: '', isMilestone: true },
        { name: '需求调研文档总结分析', phase: 'P1:需求阶段', dept: '产品部', deliverable: '《需求调研文档》', isMilestone: false },
        { name: 'M1需求初审会议（产品内部）', phase: 'P1:需求阶段', dept: '产品部', deliverable: '《M1 会议纪要》', isMilestone: true },
        { name: 'MVP验收指标定义', phase: 'P1:需求阶段', dept: '产品部', deliverable: '', isMilestone: false },
        { name: 'M2需求二审会议（跨部门项目启动会）', phase: 'P1:需求阶段', dept: '产品部', deliverable: '《M2 会议纪要》', isMilestone: true },
        { name: '项目排期表确认', phase: 'P1:需求阶段', dept: '产品部', deliverable: '《项目排期表》', isMilestone: false },
        { name: '产品定义与设计', phase: 'P1:需求阶段', dept: '产品部', deliverable: '《产品初始草案》', isMilestone: false },
        { name: '产品PRD文档交付', phase: 'P2:开发阶段', dept: '产品部', deliverable: '《产品需求文档》', isMilestone: true },
        { name: '功能开发与自测', phase: 'P2:开发阶段', dept: '技术部', deliverable: '', isMilestone: false },
        { name: '师资方案设计', phase: 'P2:开发阶段', dept: '师资部', deliverable: '《师资 SOP 文档》', isMilestone: false },
        { name: '导师储备盘点与招募调整', phase: 'P2:开发阶段', dept: '师资部', deliverable: '', isMilestone: false },
        { name: '运营SOP编写', phase: 'P2:开发阶段', dept: '运营部', deliverable: '《运营 SOP 文档》', isMilestone: false },
        { name: '设计物料制作', phase: 'P2:开发阶段', dept: '设计部', deliverable: '', isMilestone: false },
        { name: '开发功能验收', phase: 'P3:验收阶段', dept: '技术部', deliverable: '', isMilestone: false },
        { name: '师资方案验收', phase: 'P3:验收阶段', dept: '师资部', deliverable: '', isMilestone: false },
        { name: '运营方案验收', phase: 'P3:验收阶段', dept: '运营部', deliverable: '', isMilestone: false },
        { name: '设计物料验收', phase: 'P3:验收阶段', dept: '设计部', deliverable: '', isMilestone: false },
        { name: 'M3中期验收会议（跨部门评审）', phase: 'P3:验收阶段', dept: '产品部', deliverable: '《M3 中期会议纪要》', isMilestone: true },
        { name: '《产品使用指南》定稿', phase: 'P4:版本发布', dept: '产品部', deliverable: '《产品使用指南》', isMilestone: false },
        { name: 'M4同步会议（全部门产品同步会）', phase: 'P4:版本发布', dept: '产品部', deliverable: '《M4 会议纪要》', isMilestone: true },
        { name: '销转SOP编写', phase: 'P4:版本发布', dept: '销售部', deliverable: '《销转 SOP 文档》', isMilestone: false },
        { name: '销售产品培训+考核', phase: 'P4:版本发布', dept: '产品部', deliverable: '', isMilestone: false },
        { name: '营销方案与投放排期', phase: 'P4:版本发布', dept: '市场部', deliverable: '', isMilestone: false },
        { name: '上线就绪检查（Checklist逐项确认）', phase: 'P4:版本发布', dept: '产品部', deliverable: '', isMilestone: false },
        { name: '产品正式上线', phase: 'P4:版本发布', dept: '产品部', deliverable: '', isMilestone: true },
        { name: '数据检测看板搭建', phase: 'P5:反馈跟踪', dept: '产品部', deliverable: '', isMilestone: true },
        { name: '数据监控与分析（持续1个月）', phase: 'P5:反馈跟踪', dept: '产品部', deliverable: '', isMilestone: false },
        { name: '用户语料分析（已购决策因素/未购流失原因）', phase: 'P5:反馈跟踪', dept: '产品部', deliverable: '', isMilestone: false },
        { name: '内部问卷调研（面向一线端口，系统收集反馈）', phase: 'P5:反馈跟踪', dept: '产品部', deliverable: '', isMilestone: false },
        { name: '迭代期复盘报告（MVP指标达成/核心卖点认可...）', phase: 'P5:反馈跟踪', dept: '产品部', deliverable: '《上线指标日报》', isMilestone: true },
      ]
    },
    { id: '2', name: '紧急修复流程', sku: '通用', tasks: 8, status: 'Active', primaryOwner: '李四', taskList: [] },
    { id: '3', name: '选课指导 2026 专项', sku: '选课指导', tasks: 18, status: 'Active', primaryOwner: '王五', taskList: [] },
    { id: '4', name: '论文辅导 1对1 流程', sku: '论文辅导', tasks: 32, status: 'Draft', primaryOwner: '赵六', taskList: [] },
  ]);

  const currentTpl = templates.find(t => t.id === editingTemplate);

  const updateTemplateOwner = (id: string, owner: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, primaryOwner: owner } : t));
  };

  const updateTaskName = (tplId: string, taskIndex: number, newName: string) => {
    setTemplates(prev => prev.map(tpl => {
      if (tpl.id === tplId) {
        const newTaskList = [...tpl.taskList];
        newTaskList[taskIndex] = { ...newTaskList[taskIndex], name: newName };
        return { ...tpl, taskList: newTaskList };
      }
      return tpl;
    }));
  };

  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Governance</span>
            <div className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[8px] font-black uppercase tracking-widest">v2.4.0</div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">标准化设置 <span className="text-slate-300 ml-2 font-light">SETTINGS</span></h1>
          <p className="mt-2 text-slate-500 font-medium">管理系统预设规则，实现规则可见、可调、可追溯</p>
        </div>
      </div>

      <div className="flex bg-white p-2 rounded-[24px] border border-slate-100 card-shadow overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.id !== 'templates') setEditingTemplate(null);
            }}
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-2xl transition-all whitespace-nowrap group",
              activeTab === tab.id ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "text-slate-400 hover:text-slate-900"
            )}
          >
            <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-orange-400" : "group-hover:scale-110 transition-transform")} />
            <div className="flex flex-col items-start pr-2">
              <span className="text-sm font-bold">{tab.label}</span>
              <span className={cn("text-[9px] font-black tracking-widest", activeTab === tab.id ? "text-slate-500" : "text-slate-300")}>{tab.en}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[40px] card-shadow border border-slate-50 overflow-hidden min-h-[600px]">
        {activeTab === 'templates' && (
          <div className="p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">执行模板管理</h2>
                <p className="text-sm text-slate-400 font-medium mt-1">设置不同业务场景下的任务基准与流程规则</p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
                  <FileCode className="w-4 h-4" /> 从飞书 Wiki 导入
                </button>
                <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-100 hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95">
                  <Plus className="w-5 h-5" /> 新建模板
                </button>
              </div>
            </div>

            {editingTemplate ? (
              <div className="space-y-6 animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setEditingTemplate(null)}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-all"
                    >
                      <Plus className="w-5 h-5 rotate-45" />
                    </button>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">正在编辑: {currentTpl?.name}</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Rule Editor / Standardize Mode</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setEditingTemplate(null)} className="px-6 py-2.5 bg-slate-200 text-slate-600 font-bold rounded-xl text-sm">取消</button>
                    <button onClick={() => setEditingTemplate(null)} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-100">保存变更</button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                     <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <tr>
                         <th className="px-6 py-4 w-12 text-center">#</th>
                         <th className="px-6 py-4">任务名称</th>
                         <th className="px-6 py-4">所属阶段</th>
                         <th className="px-6 py-4">负责部门</th>
                         <th className="px-6 py-4">关键交付物</th>
                         <th className="px-6 py-4 text-center">里程碑</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                       {currentTpl?.taskList && currentTpl.taskList.length > 0 ? currentTpl.taskList.map((task, i) => (
                         <tr key={i} className="hover:bg-slate-50/50">
                           <td className="px-6 py-4 text-xs font-bold text-slate-300 text-center">{i+1}</td>
                           <td className="px-6 py-4">
                             <input 
                               type="text" 
                               value={task.name} 
                               onChange={(e) => updateTaskName(editingTemplate!, i, e.target.value)}
                               className="bg-transparent border-none p-0 text-sm font-bold text-slate-800 outline-none w-full focus:text-blue-600 transition-colors" 
                             />
                           </td>
                           <td className="px-6 py-4">
                             <span className={cn(
                                "px-2 py-0.5 rounded text-[9px] font-black uppercase whitespace-nowrap",
                                task.phase.includes('P1') ? "bg-amber-100 text-amber-600" :
                                task.phase.includes('P2') ? "bg-blue-100 text-blue-600" :
                                task.phase.includes('P3') ? "bg-emerald-100 text-emerald-600" :
                                task.phase.includes('P4') ? "bg-purple-100 text-purple-600" : "bg-slate-100 text-slate-600"
                             )}>
                               {task.phase}
                             </span>
                           </td>
                           <td className="px-6 py-4 text-xs font-bold text-slate-500">{task.dept}</td>
                           <td className="px-6 py-4 text-xs font-medium text-slate-400 italic font-mono">{task.deliverable || '--'}</td>
                           <td className="px-6 py-4 text-center">
                             {task.isMilestone && <span className="w-2 h-2 bg-orange-500 rounded-full inline-block" />}
                           </td>
                         </tr>
                       )) : (
                         <tr>
                           <td colSpan={6} className="p-20 text-center text-slate-300 font-bold italic">该项目暂未定义标准规则明细</td>
                         </tr>
                       )}
                     </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {templates.map((tpl) => (
                  <div key={tpl.id} className="p-8 bg-slate-50/50 border border-slate-100 rounded-[32px] group hover:bg-white hover:border-blue-200 transition-all card-shadow-sm">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Standard Logic Template</span>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{tpl.name}</h3>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        tpl.status === 'Active' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-400"
                      )}>{tpl.status}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="p-4 bg-white rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">适用 SKU</p>
                        <p className="text-xs font-bold text-slate-600">{tpl.sku}</p>
                      </div>
                      <div className="p-4 bg-white rounded-2xl border border-slate-100 flex flex-col justify-center">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">任务基准数</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tight leading-none">{tpl.tasks}</p>
                      </div>
                      <div className="p-4 bg-white rounded-2xl border border-slate-200 border-dashed hover:border-blue-300 transition-colors">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">主负责人</p>
                        <select 
                          value={tpl.primaryOwner}
                          onChange={(e) => updateTemplateOwner(tpl.id, e.target.value)}
                          className="w-full bg-transparent border-none p-0 text-xs font-bold text-blue-600 outline-none cursor-pointer appearance-none"
                        >
                          {owners.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-400">
                           <Layers className="w-3 h-3" />
                         </div>
                         <span className="text-[10px] items-center font-black text-slate-300 uppercase tracking-widest">Permanent Mode</span>
                      </div>
                      <button 
                        onClick={() => setEditingTemplate(tpl.id)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-all shadow-lg shadow-slate-100 active:scale-95"
                      >
                        编辑规则 <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">自动化提醒配置</h2>
                <p className="text-sm text-slate-400 font-medium mt-1">智能追踪项目进度，实现全自动催收与同步</p>
              </div>
              <button 
                onClick={() => {
                  setCurrentReminder({ type: 'individual', isActive: true });
                  setIsReminderModalOpen(true);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95"
              >
                <Plus className="w-5 h-5" /> 新建提醒规则
              </button>
            </div>

            <div className="grid grid-cols-1 divide-y divide-slate-100 border border-slate-100 rounded-3xl overflow-hidden bg-slate-50/30">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="p-8 flex items-center justify-between hover:bg-white transition-all group">
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110",
                      reminder.type === 'group' ? "bg-indigo-50 text-indigo-600" : "bg-blue-50 text-blue-600"
                    )}>
                      <Bell className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-slate-900">{reminder.name}</h3>
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-black text-slate-400 tracking-widest">{reminder.code}</span>
                      </div>
                      <p className="text-sm text-slate-400 font-medium">{reminder.desc}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <History className="w-3 h-3" />
                          设定时间: {reminder.trigger}
                        </div>
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-500 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                          规则: {reminder.rule}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Automatic Switch</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setReminders(prev => prev.map(r => r.id === reminder.id ? { ...r, isActive: !r.isActive } : r));
                        }}
                        className={cn(
                          "w-12 h-6 rounded-full relative transition-all duration-300",
                          reminder.isActive ? "bg-emerald-500" : "bg-slate-200"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                          reminder.isActive ? "left-7" : "left-1"
                        )} />
                      </button>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          setCurrentReminder(reminder);
                          setIsReminderModalOpen(true);
                        }}
                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <FileCode className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg text-blue-500 shadow-sm shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-900">自动化智能追踪说明</h4>
                <p className="text-xs text-blue-700/70 mt-1 leading-relaxed">
                  1. <b>到期提醒</b>：在任务计划结束前 1 天上午 10:00 自动通知任务负责人。<br />
                  2. <b>逾期催收</b>：逾期当天上午 10:00 首次提醒；后续每日 10:00 连续提醒 5 天。<br />
                  3. <b>规则限制</b>：以上所有自动化动作<b>仅在工作日</b>执行。<br />
                  4. <b>群同步</b>：每周一 10:00 自动全量同步当前项目群进度报告至飞书群。
                </p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'announcements' && (
          <div className="p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">群公告模板配置</h2>
                <p className="text-sm text-slate-400 font-medium mt-1">管理建群时自动填充的群公告内容模板</p>
              </div>
              <button 
                onClick={() => {
                  setCurrentAnnouncement({ isActive: true });
                  setIsAnnouncementModalOpen(true);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95"
              >
                <Plus className="w-5 h-5" /> 新建模板
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-8 bg-white border border-slate-100 rounded-[32px] group hover:border-blue-200 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-black text-slate-900">{ann.name}</h3>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-black text-slate-400 tracking-widest">{ann.tag || '通用'}</span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          setCurrentAnnouncement(ann);
                          setIsAnnouncementModalOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                         <FileCode className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteAnnouncement(ann.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      >
                         <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <pre className="text-sm text-slate-600 font-medium whitespace-pre-line leading-relaxed overflow-hidden">
                      {ann.content}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'categories' && (
          <div className="p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">信息分类规则配置</h2>
                <p className="text-sm text-slate-400 font-medium mt-1">管理群消息自动归类的识别规则</p>
              </div>
              <button 
                onClick={() => {
                  setCurrentClass({ isActive: true, keywords: [], priority: 1 });
                  setIsClassModalOpen(true);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95"
              >
                <Plus className="w-5 h-5" /> 新建分类规则
              </button>
            </div>

            <div className="grid grid-cols-1 divide-y divide-slate-100 border border-slate-100 rounded-3xl overflow-hidden bg-slate-50/30">
              {classifications.sort((a,b) => b.priority - a.priority).map((c) => (
                <div key={c.id} className="p-8 flex items-center justify-between hover:bg-white transition-all group">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-slate-900">{c.name}</h3>
                        <button 
                          onClick={() => setClassifications(prev => prev.map(item => item.id === c.id ? { ...item, isActive: !item.isActive } : item))}
                          className={cn(
                            "w-10 h-5 rounded-full relative transition-all duration-300",
                            c.isActive ? "bg-emerald-500" : "bg-slate-200"
                          )}
                        >
                          <div className={cn(
                            "absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300",
                            c.isActive ? "left-5.5" : "left-0.5"
                          )} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">{c.desc}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {c.keywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">优先级</p>
                      <p className="text-sm font-black text-slate-600">优先级 {c.priority}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setCurrentClass(c);
                          setIsClassModalOpen(true);
                        }}
                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <FileCode className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClassification(c.id)}
                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'archive' && (
          <div className="p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">文档归档规则配置</h2>
                <p className="text-sm text-slate-400 font-medium mt-1">管理项目结束后文档归档逻辑</p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[32px] p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900">项目归档</h3>
                  <p className="text-sm text-slate-400 font-medium mt-1">项目结束后自动归档文档</p>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setArchiveConfig(prev => ({ ...prev, isActive: !prev.isActive }))}
                    className={cn(
                      "w-12 h-6 rounded-full relative transition-all duration-300",
                      archiveConfig.isActive ? "bg-emerald-500" : "bg-slate-200"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                      archiveConfig.isActive ? "left-7" : "left-1"
                    )} />
                  </button>
                  <button 
                    onClick={() => {
                      setTempArchiveConfig({...archiveConfig});
                      setIsArchiveModalOpen(true);
                    }}
                    className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 group"
                  >
                    <FileCode className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    <span className="text-xs font-bold text-slate-600">编辑</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">文件夹结构</p>
                  <div className="space-y-2">
                    {archiveConfig.folders.map((folder, i) => (
                      <div key={i} className="text-sm font-bold text-slate-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {folder}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">命名规则</p>
                  <code className="text-sm font-black text-blue-600 font-mono">
                    {archiveConfig.namingRule}
                  </code>
                </div>
              </div>
            </div>

            <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg text-blue-500 shadow-sm shrink-0">
                <Archive className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-900">归档机制说明</h4>
                <p className="text-xs text-blue-700/70 mt-1 leading-relaxed">
                  系统在检测到项目生命周期进入「已结束」状态后，将自动提取该项目在执行过程中的所有关联文档（包括交付物、会议纪要等），
                  按照上述规则同步至企业云端知识库或指定 Wiki 节点，建立完整的项目档案库。
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">配置变更日志</h2>
                <p className="text-sm text-slate-400 font-medium mt-1">查看配置变更历史记录</p>
              </div>
            </div>

            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-200 transition-all card-shadow-sm flex items-center justify-between group">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest",
                        log.type === 'create' ? "bg-emerald-100 text-emerald-600" :
                        log.type === 'update' ? "bg-blue-100 text-blue-600" :
                        "bg-rose-100 text-rose-600"
                      )}>
                        {log.type === 'create' ? '创建' : log.type === 'update' ? '更新' : '删除'}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-400">{log.module}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 leading-tight">
                      {log.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-slate-300 font-mono">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center py-10">
              <p className="text-xs text-slate-300 font-bold italic">-- 已加载全部历史记录 --</p>
            </div>
          </div>
        )}
      </div>

      {/* Reminder Edit Modal */}
      {isReminderModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-xl overflow-hidden card-shadow animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {currentReminder?.id ? '编辑提醒规则' : '新建提醒规则'}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Automation / Rule Matrix</p>
                </div>
              </div>
              <button 
                onClick={() => setIsReminderModalOpen(false)}
                className="w-10 h-10 rounded-xl hover:bg-white hover:shadow-sm flex items-center justify-center transition-all text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">提醒名称</label>
                    <input 
                      type="text" 
                      placeholder="例如: 逾期催收提醒"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-700"
                      value={currentReminder?.name || ''}
                      onChange={(e) => setCurrentReminder(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">唯一标识 (CODE)</label>
                    <input 
                      type="text" 
                      placeholder="OVERDUE_N"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all font-mono font-bold text-slate-500 uppercase"
                      value={currentReminder?.code || ''}
                      onChange={(e) => setCurrentReminder(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">规则描述</label>
                  <textarea 
                    placeholder="简述规则触发逻辑与影响范围..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-600 h-24 resize-none"
                    value={currentReminder?.desc || ''}
                    onChange={(e) => setCurrentReminder(prev => ({ ...prev, desc: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">触发频率</label>
                    <input 
                      type="text" 
                      placeholder="例如: 10:00, 持续 5 次"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-700"
                      value={currentReminder?.trigger || ''}
                      onChange={(e) => setCurrentReminder(prev => ({ ...prev, trigger: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">约束条件</label>
                    <select 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-700 appearance-none"
                      value={currentReminder?.rule || ''}
                      onChange={(e) => setCurrentReminder(prev => ({ ...prev, rule: e.target.value }))}
                    >
                      <option value="">请选择约束条件</option>
                      <option value="仅工作日">仅工作日</option>
                      <option value="全周触发">全周触发</option>
                      <option value="群通知">群通知</option>
                      <option value="多级管控">多级管控</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">提醒对象类型</label>
                  <div className="grid grid-cols-2 gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                    <button 
                      onClick={() => setCurrentReminder(prev => ({ ...prev, type: 'individual' }))}
                      className={cn(
                        "py-3 rounded-xl text-sm font-bold transition-all",
                        currentReminder?.type === 'individual' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      个人通知 (飞书)
                    </button>
                    <button 
                      onClick={() => setCurrentReminder(prev => ({ ...prev, type: 'group' }))}
                      className={cn(
                        "py-3 rounded-xl text-sm font-bold transition-all",
                        currentReminder?.type === 'group' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      群组通知 (Bot)
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  onClick={() => setIsReminderModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  取消设置
                </button>
                <button 
                  onClick={handleSaveReminder}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
                >
                  保存提醒规则
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Announcement Edit Modal */}
      {isAnnouncementModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden card-shadow animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {currentAnnouncement?.id ? '编辑公告模板' : '新建公告模板'}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Messaging / Template Engine</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAnnouncementModalOpen(false)}
                className="w-10 h-10 rounded-xl hover:bg-white hover:shadow-sm flex items-center justify-center transition-all text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">模板名称</label>
                    <input 
                      type="text" 
                      placeholder="例如: 标准项目群公告"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-slate-700"
                      value={currentAnnouncement?.name || ''}
                      onChange={(e) => setCurrentAnnouncement(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">标签</label>
                    <input 
                      type="text" 
                      placeholder="SKU 或 场景标识"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-slate-700"
                      value={currentAnnouncement?.tag || ''}
                      onChange={(e) => setCurrentAnnouncement(prev => ({ ...prev, tag: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">公告正文内容</label>
                    <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">支持 {'{{variable}}'} 变量</span>
                  </div>
                  <textarea 
                    placeholder="输入群公告正文，支持换行..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 transition-all font-medium text-slate-600 h-64 resize-none leading-relaxed"
                    value={currentAnnouncement?.content || ''}
                    onChange={(e) => setCurrentAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  onClick={() => setIsAnnouncementModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  取消设置
                </button>
                <button 
                  onClick={handleSaveAnnouncement}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
                >
                  保存公告模板
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Classification Edit Modal */}
      {isClassModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-xl overflow-hidden card-shadow animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white">
                  <FolderLock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {currentClass?.id ? '编辑分类规则' : '新建分类规则'}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Logic / Classification Matrix</p>
                </div>
              </div>
              <button 
                onClick={() => setIsClassModalOpen(false)}
                className="w-10 h-10 rounded-xl hover:bg-white hover:shadow-sm flex items-center justify-center transition-all text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10 space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">分类名称</label>
                  <input 
                    type="text" 
                    placeholder="例如: 风险 - 风险类"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50 transition-all font-bold text-slate-700"
                    value={currentClass?.name || ''}
                    onChange={(e) => setCurrentClass(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">描述</label>
                  <input 
                    type="text" 
                    placeholder="简述识别逻辑，如：风险提示或问题反馈"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50 transition-all font-medium text-slate-600"
                    value={currentClass?.desc || ''}
                    onChange={(e) => setCurrentClass(prev => ({ ...prev, desc: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">识别优先级</label>
                    <input 
                      type="number" 
                      min="1"
                      max="10"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50 transition-all font-bold text-slate-700"
                      value={currentClass?.priority || 1}
                      onChange={(e) => setCurrentClass(prev => ({ ...prev, priority: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">状态</label>
                    <div className="flex items-center h-[58px] px-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-sm font-bold text-slate-500 mr-4">启用此规则</span>
                      <button 
                        onClick={() => setCurrentClass(prev => ({ ...prev, isActive: !prev?.isActive }))}
                        className={cn(
                          "w-10 h-5 rounded-full relative transition-all duration-300",
                          currentClass?.isActive ? "bg-emerald-500" : "bg-slate-200"
                        )}
                      >
                        <div className={cn(
                          "absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300",
                          currentClass?.isActive ? "left-5.5" : "left-0.5"
                        )} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">关键词库 (用逗号分隔)</label>
                  <textarea 
                    placeholder="输入AI识别的关键词，例如：风险,问题,bug,异常"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50 transition-all font-medium text-slate-600 h-32 resize-none"
                    value={currentClass?.keywords?.join(', ') || ''}
                    onChange={(e) => setCurrentClass(prev => ({ ...prev, keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k !== '') }))}
                  />
                  <p className="text-[10px] text-slate-400 font-medium italic mt-1">✨ AI 助手将根据这些关键词及其语义进行智能归类</p>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  onClick={() => setIsClassModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  取消
                </button>
                <button 
                  onClick={handleSaveClassification}
                  className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
                >
                  保存分类规则
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Archive Configuration Modal */}
      {isArchiveModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-xl overflow-hidden card-shadow animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                  <Archive className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">配置归档规则</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Data Retention / Archive Policy</p>
                </div>
              </div>
              <button 
                onClick={() => setIsArchiveModalOpen(false)}
                className="w-10 h-10 rounded-xl hover:bg-white hover:shadow-sm flex items-center justify-center transition-all text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10 space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">文件夹结构 (每行一个)</label>
                  <textarea 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-700 h-32 resize-none"
                    value={tempArchiveConfig.folders.join('\n')}
                    onChange={(e) => setTempArchiveConfig(prev => ({ ...prev, folders: e.target.value.split('\n').filter(f => f.trim() !== '') }))}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">命名规则格式</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all font-mono font-bold text-blue-600"
                    value={tempArchiveConfig.namingRule}
                    onChange={(e) => setTempArchiveConfig(prev => ({ ...prev, namingRule: e.target.value }))}
                  />
                  <div className="mt-2 p-3 bg-slate-50 rounded-xl flex flex-wrap gap-2">
                    {['{projectCode}', '{projectName}', '{stage}', '{docName}', '{date}'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setTempArchiveConfig(prev => ({ ...prev, namingRule: prev.namingRule + tag }))}
                        className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  onClick={() => setIsArchiveModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  取消
                </button>
                <button 
                  onClick={() => {
                    setArchiveConfig(tempArchiveConfig);
                    setIsArchiveModalOpen(false);
                  }}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
                >
                  更新归档规则
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
