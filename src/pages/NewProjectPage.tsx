import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  Box, 
  Target, 
  Users, 
  FileText, 
  Trash2, 
  Plus, 
  Link as LinkIcon,
  AlertTriangle,
  Star,
  CheckSquare
} from 'lucide-react';
import { cn } from '../lib/utils';

import { Project, Task, ProjectStage } from '../types';

interface NewProjectPageProps {
  onSuccess: (project: Project, tasks: Task[]) => void;
  onCancel: () => void;
}

interface FormData {
  projectName: string;
  category: string;
  sku: string;
  owner: string;
  mvpCriteria: string;
  launchDate: string;
}

interface StandardTask {
  id: string;
  name: string;
  phase: string;
  dept: string;
  deliverable: string;
  isMilestone: boolean;
}

export const NewProjectPage: React.FC<NewProjectPageProps> = ({ onSuccess, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    category: '',
    sku: '',
    owner: '',
    mvpCriteria: '',
    launchDate: '',
  });

  const [tasks, setTasks] = useState<StandardTask[]>([
    // P1: 需求阶段 (9 tasks)
    { id: '1', name: '用户调研（学生端语料分析）', phase: 'P1:需求阶段', dept: '产品部', deliverable: '', isMilestone: false },
    { id: '2', name: '市场调研&竞品分析', phase: 'P1:需求阶段', dept: '产品部', deliverable: '', isMilestone: false },
    { id: '3', name: '内部调研（销售端问卷调研）', phase: 'P1:需求阶段', dept: '产品部', deliverable: '', isMilestone: true },
    { id: '4', name: '需求调研文档总结分析', phase: 'P1:需求阶段', dept: '产品部', deliverable: '《需求调研文档》', isMilestone: false },
    { id: '5', name: 'M1需求初审会议（产品内部）', phase: 'P1:需求阶段', dept: '产品部', deliverable: '《M1 会议纪要》', isMilestone: true },
    { id: '6', name: 'MVP验收指标定义', phase: 'P1:需求阶段', dept: '产品部', deliverable: '', isMilestone: false },
    { id: '7', name: 'M2需求二审会议（跨部门项目启动会）', phase: 'P1:需求阶段', dept: '产品部', deliverable: '《M2 会议纪要》', isMilestone: true },
    { id: '8', name: '项目排期表确认', phase: 'P1:需求阶段', dept: '产品部', deliverable: '《项目排期表》', isMilestone: false },
    { id: '9', name: '产品定义与设计', phase: 'P1:需求阶段', dept: '产品部', deliverable: '《产品初始草案》', isMilestone: false },
    // ... (rest initialized below)
  ]);

  // Initializing the remaining tasks to ensure 32 are present
  useState(() => {
    const remainingTasks: StandardTask[] = [
      // P2: 开发阶段 (6 tasks)
      { id: '10', name: '产品PRD文档交付', phase: 'P2:开发阶段', dept: '产品部', deliverable: '《产品需求文档》', isMilestone: true },
      { id: '11', name: '功能开发与自测', phase: 'P2:开发阶段', dept: '技术部', deliverable: '', isMilestone: false },
      { id: '12', name: '师资方案设计', phase: 'P2:开发阶段', dept: '师资部', deliverable: '《师资 SOP 文档》', isMilestone: false },
      { id: '13', name: '导师储备盘点与招募调整', phase: 'P2:开发阶段', dept: '师资部', deliverable: '', isMilestone: false },
      { id: '14', name: '运营SOP编写', phase: 'P2:开发阶段', dept: '运营部', deliverable: '《运营 SOP 文档》', isMilestone: false },
      { id: '15', name: '设计物料制作', phase: 'P2:开发阶段', dept: '设计部', deliverable: '', isMilestone: false },
      // P3: 验收阶段 (5 tasks)
      { id: '16', name: '开发功能验收', phase: 'P3:验收阶段', dept: '技术部', deliverable: '', isMilestone: false },
      { id: '17', name: '师资方案验收', phase: 'P3:验收阶段', dept: '师资部', deliverable: '', isMilestone: false },
      { id: '18', name: '运营方案验收', phase: 'P3:验收阶段', dept: '运营部', deliverable: '', isMilestone: false },
      { id: '19', name: '设计物料验收', phase: 'P3:验收阶段', dept: '设计部', deliverable: '', isMilestone: false },
      { id: '20', name: 'M3中期验收会议（跨部门评审）', phase: 'P3:验收阶段', dept: '产品部', deliverable: '《M3 中期会议纪要》', isMilestone: true },
      // P4: 版本发布 (7 tasks)
      { id: '21', name: '《产品使用指南》定稿', phase: 'P4:版本发布', dept: '产品部', deliverable: '《产品使用指南》', isMilestone: false },
      { id: '22', name: 'M4同步会议（全部门产品同步会）', phase: 'P4:版本发布', dept: '产品部', deliverable: '《M4 会议纪要》', isMilestone: true },
      { id: '23', name: '销转SOP编写', phase: 'P4:版本发布', dept: '销售部', deliverable: '《销转 SOP 文档》', isMilestone: false },
      { id: '24', name: '销售产品培训+考核', phase: 'P4:版本发布', dept: '产品部', deliverable: '', isMilestone: false },
      { id: '25', name: '营销方案与投放排期', phase: 'P4:版本发布', dept: '市场部', deliverable: '', isMilestone: false },
      { id: '26', name: '上线就绪检查（Checklist逐项确认）', phase: 'P4:版本发布', dept: '产品部', deliverable: '', isMilestone: false },
      { id: '27', name: '产品正式上线', phase: 'P4:版本发布', dept: '产品部', deliverable: '', isMilestone: true },
      // P5: 反馈跟踪 (5 tasks)
      { id: '28', name: '数据检测看板搭建', phase: 'P5:反馈跟踪', dept: '产品部', deliverable: '', isMilestone: true },
      { id: '29', name: '数据监控与分析（持续1个月）', phase: 'P5:反馈跟踪', dept: '产品部', deliverable: '', isMilestone: false },
      { id: '30', name: '用户语料分析（已购决策因素/未购流失原因）', phase: 'P5:反馈跟踪', dept: '产品部', deliverable: '', isMilestone: false },
      { id: '31', name: '内部问卷调研（面向一线端口，系统收集反馈）', phase: 'P5:反馈跟踪', dept: '产品部', deliverable: '', isMilestone: false },
      { id: '32', name: '迭代期复盘报告（MVP指标达成/核心卖点认可...）', phase: 'P5:反馈跟踪', dept: '产品部', deliverable: '《上线指标日报》', isMilestone: true },
    ];
    setTasks(prev => [...prev.slice(0, 9), ...remainingTasks]);
  });

  const handleFinish = () => {
    const projectId = 'PRJ-' + Date.now();
    const newProject: Project = {
      id: projectId,
      projectCode: projectId,
      name: formData.projectName,
      category: formData.category,
      productSku: formData.sku,
      owner: formData.owner,
      currentStage: 'P1',
      status: 'normal',
      mvpTarget: formData.mvpCriteria,
      planOnlineDate: formData.launchDate,
      progress: 0,
      riskCount: 0,
      overdueTaskCount: 0,
      tPeriod: 'T1'
    };

    const projectTasks: Task[] = tasks.map(t => ({
      id: 'TASK-' + Math.random().toString(36).substr(2, 9),
      projectId: projectId,
      projectName: formData.projectName,
      name: t.name,
      stage: t.phase,
      department: t.dept,
      assignee: t.dept === '产品部' ? formData.owner : '待分配',
      priority: t.isMilestone ? 'high' : 'medium',
      planEndTime: formData.launchDate,
      status: 'pending',
      isMilestone: t.isMilestone,
      deliverableName: t.deliverable
    }));

    onSuccess(newProject, projectTasks);
  };

  const addTask = () => {
    const newTask: StandardTask = {
      id: Date.now().toString(),
      name: '新任务事项',
      phase: 'P1:需求阶段',
      dept: '产品部',
      deliverable: '',
      isMilestone: false
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTask = (id: string, field: keyof StandardTask, value: any) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const skus = ['常规辅导', '论文辅导', '稳分辅导', '稳PASS辅导', '考前辅导', '选课指导', '先修班课'];
  const categories = ['大学辅导', '国际课程'];
  const owners = ['张三', '李四', '王五', '赵六', '陈七'];
  const departments = [
    '产品部', '运营部', 
    '销售部', '师资部', 
    '市场部', '技术部', 
    '设计部', '数据部'
  ];

  const isStep1Valid = 
    formData.projectName.trim() !== '' &&
    formData.category !== '' &&
    formData.sku !== '' &&
    formData.owner !== '' &&
    formData.mvpCriteria.trim() !== '' &&
    formData.launchDate !== '';

  const renderStep1 = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-8">
          {/* Project Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
              项目名称 <span className="text-rose-500">*</span>
            </label>
            <input 
              type="text" 
              value={formData.projectName}
              onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
              placeholder="例如：2024夏季产品迭代 - AI助手上线" 
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500/20 transition-all text-slate-900" 
            />
          </div>

          {/* Product Category */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
              产品类别 <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                  className={cn(
                    "px-4 py-4 rounded-2xl border-2 font-bold transition-all text-sm",
                    formData.category === cat 
                      ? "bg-blue-50 border-blue-500 text-blue-600 shadow-sm" 
                      : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* SKU & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                产品 SKU <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select 
                  value={formData.sku}
                  onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="" disabled>选择产品 SKU</option>
                  {skus.map(s => <option key={s}>{s}</option>)}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                计划上线日期 <span className="text-rose-500">*</span>
              </label>
              <input 
                type="date" 
                value={formData.launchDate}
                onChange={(e) => setFormData(prev => ({ ...prev, launchDate: e.target.value }))}
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all text-slate-900 cursor-pointer" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Project Owner */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
              项目负责人 <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select 
                value={formData.owner}
                onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all text-slate-900 appearance-none cursor-pointer"
              >
                <option value="">选择负责人 (同步飞书人员)</option>
                {owners.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {formData.owner && (
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none bg-slate-50 pr-4">
                  <div className="w-6 h-6 rounded-full bg-slate-400 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.owner}`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">{formData.owner}</span>
                </div>
              )}
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
            </div>
          </div>

          {/* MVP Criteria */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
              MVP 验收指标 <span className="text-rose-500">*</span>
            </label>
            <textarea 
              rows={6} 
              value={formData.mvpCriteria}
              onChange={(e) => setFormData(prev => ({ ...prev, mvpCriteria: e.target.value }))}
              placeholder="例如：能够支持在线预约，后台自动同步课表..." 
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all text-slate-900 resize-none font-medium h-[155px]" 
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 bg-slate-50 rounded-[32px]">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--color-brand)]" />
          协同部门负责人
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {departments.map((dept) => (
            <div key={dept} className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between group">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{dept}</span>
                <span className="text-sm font-bold text-slate-900 mt-1">未指派</span>
              </div>
              <button className="p-2 text-slate-300 group-hover:text-[var(--color-brand)] transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] bg-slate-50/50">
         <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-[var(--color-brand)]" />
          飞书多维表格 Base 配置
        </h3>
        <p className="text-sm text-slate-400 mb-6 font-medium">粘贴飞书多维表格链接，系统将自动解析项目 ID 与同步规则</p>
        <div className="flex gap-4">
          <input type="text" placeholder="https://lumist.feishu.cn/base/..." className="flex-1 px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-[var(--color-brand)] transition-all" />
          <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">解析配置</button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Section 1: Standard Task Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">标准化任务预览</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Template: 产品迭代上新 (32 Tasks)</p>
            </div>
          </div>
          <button 
            onClick={addTask}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            新增任务
          </button>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-50/95 backdrop-blur z-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-4 py-4 text-center w-12">序号</th>
                  <th className="px-6 py-4">任务事项</th>
                  <th className="px-4 py-4 text-center">所属阶段</th>
                  <th className="px-4 py-4">交付物</th>
                  <th className="px-4 py-4 text-center">里程碑</th>
                  <th className="px-4 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {tasks.map((task, index) => (
                  <tr key={task.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-4 py-3 text-center text-xs font-bold text-slate-300">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3">
                      <input 
                        type="text" 
                        value={task.name}
                        onChange={(e) => updateTask(task.id, 'name', e.target.value)}
                        className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm font-bold text-slate-800 p-0"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select 
                        value={task.phase}
                        onChange={(e) => updateTask(task.id, 'phase', e.target.value)}
                        className={cn(
                          "mx-auto block rounded-full text-[10px] font-black border-none outline-none focus:ring-0 px-3 py-1 cursor-pointer appearance-none text-center",
                          task.phase.startsWith('P1') ? "bg-amber-100 text-amber-700" :
                          task.phase.startsWith('P2') ? "bg-blue-100 text-blue-700" :
                          task.phase.startsWith('P3') ? "bg-emerald-100 text-emerald-700" :
                          task.phase.startsWith('P4') ? "bg-purple-100 text-purple-700" :
                          "bg-indigo-100 text-indigo-700"
                        )}
                      >
                        <option value="P1:需求阶段">P1:需求阶段</option>
                        <option value="P2:开发阶段">P2:开发阶段</option>
                        <option value="P3:验收阶段">P3:验收阶段</option>
                        <option value="P4:版本发布">P4:版本发布</option>
                        <option value="P5:反馈跟踪">P5:反馈跟踪</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="text" 
                        value={task.deliverable}
                        onChange={(e) => updateTask(task.id, 'deliverable', e.target.value)}
                        placeholder="--"
                        className="w-full bg-transparent border-none outline-none focus:ring-0 text-xs font-medium text-slate-400 p-0 italic"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={() => updateTask(task.id, 'isMilestone', !task.isMilestone)}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center transition-all mx-auto",
                          task.isMilestone ? "text-amber-500 bg-amber-50" : "text-slate-200 hover:text-slate-400"
                        )}
                      >
                        <Star className={cn("w-4 h-4", task.isMilestone && "fill-amber-500")} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => removeTask(task.id)}
                        className="p-1.5 text-slate-100 hover:text-rose-500 transition-colors opacity-40 group-hover:opacity-100"
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

      {/* Section 2 & 3 */}
      <div className="grid grid-cols-2 gap-8">
        {/* Section 2: Channel Sync */}
        <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">协同空间同步</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Feishu Integration</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-700">自动创建飞书群聊</span>
              <div className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" /></div>
            </div>
            <div className="px-4 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <CheckSquare className="w-3 h-3" /> 成员自动拉入
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <CheckSquare className="w-3 h-3" /> 看板自动挂载
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Summary Confirmation */}
        <div className="p-8 bg-slate-900 rounded-[32px] text-white shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">最终确认</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Confirm & Initialize</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm py-2 border-b border-white/5">
              <span className="text-slate-500">项目周期</span>
              <span className="font-bold">{formData.launchDate || '--'} 上线</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-white/5">
              <span className="text-slate-500">任务总量</span>
              <span className="font-bold">{tasks.length} 项标准任务</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-white/5">
              <span className="text-slate-500">关键里程碑</span>
              <span className="font-bold text-amber-400">{tasks.filter(t => t.isMilestone).length} 个节点</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-medium italic">"标准化模版后续可在侧边栏-标准化设置中进行全站范围的调整。"</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Project Creation</span>
          <div className="px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded text-[8px] font-black uppercase tracking-widest">Wizard</div>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">新建项目 <span className="text-slate-300 ml-2 font-light">NEW PROJECT</span></h1>
        <p className="mt-2 text-slate-500 font-medium">通过标准化模板创建项目，自动生成任务、文档、风险和协同配置</p>
      </div>

      {/* Stepper Progress */}
      <div className="flex items-center justify-center relative w-full mb-20">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2" />
        <div className="relative flex justify-between w-full max-w-2xl">
          {[1, 2, 3].map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500",
                step === s ? "bg-blue-600 text-white shadow-xl shadow-blue-100 scale-125" :
                step > s ? "bg-slate-900 text-white" : "bg-white border-2 border-slate-100 text-slate-300"
              )}>
                {step > s ? <ChevronRight className="w-5 h-5 translate-x-px" /> : s}
              </div>
              <span className={cn(
                "text-[11px] font-black uppercase tracking-widest absolute top-14 whitespace-nowrap",
                step === s ? "text-slate-900" : "text-slate-300"
              )}>
                {s === 1 ? '基本信息' : s === 2 ? '协同配置' : '完成确认'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white p-12 rounded-[40px] card-shadow border border-slate-50">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="mt-16 flex items-center justify-between pt-10 border-t border-slate-50">
          <button 
            onClick={onCancel}
            className="px-8 py-4 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors"
          >
            取消创建
          </button>
          <div className="flex gap-4">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" /> 上一步
              </button>
            )}
            <button 
              onClick={() => {
                if (step === 3) handleFinish();
                else setStep(step + 1);
              }}
              disabled={step === 1 && !isStep1Valid}
              className={cn(
                "px-10 py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center gap-2",
                (step === 1 && !isStep1Valid)
                  ? "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
                  : "bg-blue-600 text-white hover:opacity-90 shadow-blue-100"
              )}
            >
              {step === 3 ? '创建并开启项目' : '下一步'} 
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
