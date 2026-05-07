import React from 'react';
import { cn } from '../lib/utils';

interface StatusBadgeProps {
  status: string;
  type?: 'project' | 'task' | 'risk' | 'doc' | 'stage' | 'tPeriod' | 'message';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'project' }) => {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      case 'normal':
      case 'completed':
      case 'success':
      case 'finalized':
      case 'published' :
      case 'approved':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'risk':
      case 'high':
      case 'triggered':
      case 'failed':
      case 'rejected':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'paused':
      case 'blocked':
      case 'medium':
      case 'warning':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'pending':
      case 'in_progress':
      case 'writing':
      case 'reviewing':
      case 'monitoring':
      case 't1':
      case 't2':
      case 'pending_approval':
      case 'draft':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'low':
      case 'not_triggered':
      case 'closed':
      case 'cancelled':
      case 't3':
        return 'bg-slate-50 text-slate-600 border-slate-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getLabel = () => {
    const labels: Record<string, string> = {
      'normal': '正常',
      'risk': '有风险',
      'paused': '已暂停',
      'closed': '已结项',
      'pending': '待开始',
      'in_progress': '进行中',
      'completed': '已完成',
      'blocked': '已阻塞',
      'cancelled': '已取消',
      'high': '高风险',
      'medium': '中风险',
      'low': '低风险',
      'writing': '撰写中',
      'reviewing': '评审中',
      'finalized': '已定稿',
      'not_triggered': '未触发',
      'monitoring': '监控中',
      'triggered': '已触发',
      't1': 'T1 迭代期',
      't2': 'T2 观察期',
      't3': 'T3 稳定期',
      'draft': '草稿',
      'pending_approval': '待审批',
      'approved': '已通过',
      'rejected': '已拒绝',
      'published': '已发布',
      'passed': '已通过',
      'failed': '未通过'
    };
    return labels[status.toLowerCase()] || status;
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider",
      getStyles()
    )}>
      {getLabel()}
    </span>
  );
};
