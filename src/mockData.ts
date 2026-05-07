import { Project, Task, SyncMessage, ProjectDoc, ProjectRisk } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    projectCode: 'PJ2026-001',
    name: '稳PASS春季迭代',
    category: '产品升级',
    productSku: '稳PASS辅导',
    owner: '张经理',
    currentStage: 'P3',
    status: 'normal',
    mvpTarget: '完成核心功能优化',
    planOnlineDate: '2026-06-15',
    progress: 45,
    riskCount: 1,
    overdueTaskCount: 0,
    tPeriod: 'T1'
  },
  {
    id: '2',
    projectCode: 'PJ2026-002',
    name: '选课指导 2026 升级',
    category: '内容更新',
    productSku: '选课指导',
    owner: '李主管',
    currentStage: 'P2',
    status: 'risk',
    mvpTarget: '全量更新 2026 课程库',
    planOnlineDate: '2026-05-30',
    progress: 20,
    riskCount: 3,
    overdueTaskCount: 2,
    tPeriod: 'T1'
  },
  {
    id: '3',
    projectCode: 'PJ2026-003',
    name: '论文辅导交付流程优化',
    category: '流程优化',
    productSku: '论文辅导',
    owner: '王组长',
    currentStage: 'P4',
    status: 'normal',
    mvpTarget: '缩短交付周期 15%',
    planOnlineDate: '2026-05-20',
    progress: 85,
    riskCount: 0,
    overdueTaskCount: 0,
    tPeriod: 'T2'
  },
  {
    id: '4',
    projectCode: 'PJ2026-004',
    name: '先修班课产品验证',
    category: '新品研发',
    productSku: '先修班课',
    owner: '赵经理',
    currentStage: 'P1',
    status: 'paused',
    mvpTarget: '完成市场可行性报告',
    planOnlineDate: '2026-08-01',
    progress: 5,
    riskCount: 0,
    overdueTaskCount: 0,
    tPeriod: 'T1'
  },
  {
    id: '5',
    projectCode: 'PJ2026-005',
    name: '考前辅导标准化项目',
    category: '标准化',
    productSku: '考前辅导',
    owner: '陈组长',
    currentStage: 'P5',
    status: 'normal',
    mvpTarget: '建立全品类标准化件',
    planOnlineDate: '2026-05-10',
    progress: 98,
    riskCount: 0,
    overdueTaskCount: 0,
    tPeriod: 'T3'
  }
];

export const TASKS: Task[] = [
  {
    id: 't1',
    projectId: '1',
    projectName: '稳PASS春季迭代',
    name: '用户调研（学生端语料分析）',
    stage: 'P2',
    department: '产品部',
    assignee: '刘子涵',
    priority: 'high',
    planEndTime: '2026-05-10',
    status: 'completed',
    isMilestone: false,
    deliverableName: '用户语料分析报告'
  },
  {
    id: 't2',
    projectId: '1',
    projectName: '稳PASS春季迭代',
    name: 'M2 需求二审会议',
    stage: 'P2',
    department: '产品部',
    assignee: '张经理',
    priority: 'high',
    planEndTime: '2026-05-12',
    status: 'completed',
    isMilestone: true,
    deliverableName: 'M2 评审记录'
  },
  {
    id: 't3',
    projectId: '1',
    projectName: '稳PASS春季迭代',
    name: '功能开发与自测',
    stage: 'P3',
    department: '开发部',
    assignee: '陈工程师',
    priority: 'medium',
    planEndTime: '2026-05-25',
    status: 'in_progress',
    isMilestone: false,
    deliverableName: '代码版本库 v1.0.1'
  },
  {
    id: 't4',
    projectId: '2',
    projectName: '选课指导 2026 升级',
    name: '产品 PRD 文档交付',
    stage: 'P2',
    department: '产品部',
    assignee: '周设计',
    priority: 'high',
    planEndTime: '2026-05-08',
    status: 'blocked',
    isMilestone: true,
    deliverableName: '产品 PRD'
  }
];

export const SYNC_MESSAGES: SyncMessage[] = [
  {
    id: 'm1',
    projectId: '1',
    projectName: '稳PASS春季迭代',
    senderName: '刘子涵',
    content: '用户调研文档已上传至云盘，主要包含学生端语料分析。',
    summary: '交付用户调研文档',
    sentAt: '2026-05-07 10:20',
    isImportant: true,
    classifiedType: 'delivery'
  },
  {
    id: 'm2',
    projectId: '1',
    projectName: '稳PASS春季迭代',
    senderName: '张经理',
    content: '同意M2评审结果，可以进入开发阶段，请各位按计划推进。',
    summary: 'M2 评审决策通过',
    sentAt: '2026-05-07 11:45',
    isImportant: true,
    classifiedType: 'decision'
  },
  {
    id: 'm3',
    projectId: '2',
    projectName: '选课指导 2026 升级',
    senderName: '周设计',
    content: '@所有人 师资方案还未确认，目前对应的PRD文档处于停滞状态。',
    summary: '师资未定导致进度风险',
    sentAt: '2026-05-07 14:10',
    isImportant: true,
    classifiedType: 'risk'
  },
  {
    id: 'm4',
    projectId: '1',
    projectName: '稳PASS春季迭代',
    senderName: '系统',
    content: '明早10点在402会议室进行周例会，请大家准时参加。',
    summary: '周例会会议通知',
    sentAt: '2026-05-07 15:30',
    isImportant: false,
    classifiedType: 'notification'
  },
  {
    id: 'm5',
    projectId: '3',
    projectName: '论文辅导交付流程优化',
    senderName: '王组长',
    content: '需要确认新的交付表单模板是否已经下发到各小组。',
    summary: '确认交付模板下发待办',
    sentAt: '2026-05-07 16:00',
    isImportant: false,
    classifiedType: 'todo'
  },
  {
    id: 'm6',
    projectId: '1',
    projectName: '稳PASS春季迭代',
    senderName: '陈工程师',
    content: '核心API接口文档已完成并在飞书群内置顶，前端同事可以开始对接。',
    summary: 'API文档交付',
    sentAt: '2026-05-07 16:45',
    isImportant: false,
    classifiedType: 'delivery'
  }
];

export const DOCUMENTS: ProjectDoc[] = [
  { id: 'd1', projectId: '1', name: '立项说明文档', stage: 'P1', ownerDepartment: '产品部', status: 'finalized', finalizedDate: '2026-04-20' },
  { id: 'd2', projectId: '1', name: '用户调研总结', stage: 'P2', ownerDepartment: '产品部', status: 'finalized', finalizedDate: '2026-05-01' },
  { id: 'd3', projectId: '1', name: 'PRD 产品需求文档', stage: 'P2', ownerDepartment: '产品部', status: 'finalized', finalizedDate: '2026-05-05' },
  { id: 'd4', projectId: '1', name: 'MVP 验收标准', stage: 'P3', ownerDepartment: '产品部', status: 'writing' }
];

export const RISKS: ProjectRisk[] = [
  { id: 'r1', projectId: '2', name: '师资储备不足', stage: 'P2', level: 'high', impactDesc: '无法满足 2026 升级后的辅导需求', solution: '启动外部专项招募', assignee: '师资部刘经理', status: 'monitoring' }
];
