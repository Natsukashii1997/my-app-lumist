export type ProjectStage = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'Closed';
export type ProjectStatus = 'normal' | 'risk' | 'paused' | 'closed';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled';
export type RiskLevel = 'high' | 'medium' | 'low';
export type DocStatus = 'pending' | 'writing' | 'reviewing' | 'finalized';
export type ReviewStatus = 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'published';

export interface Project {
  id: string;
  projectCode: string;
  name: string;
  category: string;
  productSku: string;
  owner: string;
  currentStage: ProjectStage;
  status: ProjectStatus;
  mvpTarget: string;
  planOnlineDate: string;
  actualOnlineDate?: string;
  progress: number;
  riskCount: number;
  overdueTaskCount: number;
  tPeriod: 'T1' | 'T2' | 'T3';
}

export interface Task {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  stage: string;
  department: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  planEndTime: string;
  status: TaskStatus;
  isMilestone: boolean;
  deliverableName: string;
}

export interface SyncMessage {
  id: string;
  projectId: string;
  projectName: string;
  senderName: string;
  content: string;
  summary: string;
  sentAt: string;
  isImportant: boolean;
  classifiedType: 'notification' | 'decision' | 'todo' | 'risk' | 'delivery';
}

export interface ProjectDoc {
  id: string;
  projectId: string;
  name: string;
  stage: ProjectStage;
  ownerDepartment: string;
  status: DocStatus;
  finalizedDate?: string;
}

export interface ProjectRisk {
  id: string;
  projectId: string;
  name: string;
  stage: ProjectStage;
  level: RiskLevel;
  impactDesc: string;
  solution: string;
  assignee: string;
  status: 'not_triggered' | 'monitoring' | 'triggered' | 'closed';
}

export interface PostMortemReport {
  id: string;
  projectId: string;
  generatedAt: string;
  stageMetrics: {
    stage: ProjectStage;
    durationDays: number;
    tasksCount: number;
    delayCount: number;
  }[];
  riskSummary: {
    total: number;
    high: number;
    unresolved: number;
  };
  lessonLearned: string;
  successHighlights: string[];
}

export interface StageTemplate {
  stage: ProjectStage;
  requiredDocs: string[];
  defaultTasks: string[];
}

export interface LarkBotRule {
  id: string;
  triggerType: 'stage_change' | 'delay' | 'new_risk' | 'daily_report';
  channelId: string;
  isEnabled: boolean;
}
