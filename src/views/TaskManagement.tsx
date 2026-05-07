/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  CalendarDays,
  MoreHorizontal,
  ChevronRight,
  User,
  ListTodo,
  Flag,
  Calendar as CalendarIcon,
  MessageSquare,
  X,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Task {
  id: string;
  title: string;
  project: string;
  assignee: { name: string; avatar?: string };
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  dueDate: string;
  commentCount: number;
}


interface TaskManagementProps {
  onNavigate?: (tab: string) => void;
  tasks?: Task[];
  onToggleTask?: (id: string, completed: boolean) => void;
}

export default function TaskManagement({ onNavigate, tasks = [], onToggleTask }: TaskManagementProps) {
  const [activeBoard, setActiveBoard] = useState<'all' | 'my' | 'delegated' | 'completed' | 'todo' | 'in_progress' | 'blocked'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.project.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTab = true;
    if (activeBoard === 'completed') {
      matchesTab = task.status === 'completed';
    } else if (activeBoard === 'todo') {
      matchesTab = task.status === 'todo';
    } else if (activeBoard === 'in_progress') {
      matchesTab = task.status === 'in_progress';
    } else if (activeBoard === 'blocked') {
      matchesTab = task.status === 'blocked';
    } else if (activeBoard === 'all') {
      matchesTab = task.status !== 'completed';
    }

    return matchesSearch && matchesTab;
  });

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-emerald-600 bg-emerald-50';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  const getStatusIcon = (s: string) => {
    switch (s) {
      case 'completed': return <CheckCircle2 size={18} className="text-emerald-500" />;
      case 'in_progress': return <Clock size={16} className="text-blue-500" />;
      case 'blocked': return <AlertCircle size={16} className="text-red-500" />;
      default: return <Circle size={16} className="border-slate-300 group-hover:border-emerald-400 group-active:bg-emerald-50 transition-colors" />;
    }
  };

  const Circle = ({ size, className }: { size: number, className: string }) => (
    <div className={`rounded-full border-[1.5px] ${className}`} style={{ width: size, height: size }} />
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-brand-deep">团队协作任务</h2>
          <p className="text-xs text-text-light">高效协同，实时同步律所内部任务流与案件进度</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate?.('task_calendar')}
            className="btn-secondary h-10 px-4 active:scale-95 transition-all"
          >
            <CalendarIcon size={18} />
            <span>日历视图</span>
          </button>
          <button 
            onClick={() => onNavigate?.('task_editor')}
            className="btn-primary h-10 px-4 active:scale-95 transition-all"
          >
            <Plus size={18} />
            <span>发布任务</span>
          </button>
        </div>
      </div>

      {/* Task Summary Metrics */}
      <div className="flex flex-wrap gap-4">
        {[
          { label: '待处理', count: tasks.filter(t => t.status === 'todo').length, color: 'bg-slate-500', id: 'todo' },
          { label: '进行中', count: tasks.filter(t => t.status === 'in_progress').length, color: 'bg-blue-500', id: 'in_progress' },
          { label: '已超期', count: tasks.filter(t => t.status === 'blocked').length, color: 'bg-red-500', id: 'blocked' },
          { label: '本周完成', count: tasks.filter(t => t.status === 'completed').length, color: 'bg-emerald-500', id: 'completed' },
        ].map((m, i) => (
          <div 
            key={i} 
            onClick={() => setActiveBoard(m.id as any)}
            className={`card py-2 px-4 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${activeBoard === m.id ? 'ring-1 ring-border' : ''}`}
          >
            <div className={`w-2 h-2 rounded-full ${m.color}`} />
            <span className="text-xs text-text-light">{m.label}</span>
            <span className="text-sm font-bold text-brand-deep">{m.count}</span>
          </div>
        ))}
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6 border-b border-border w-full md:w-auto">
          {[
            { id: 'all', label: '全部任务' },
            { id: 'my', label: '指派给我' },
            { id: 'delegated', label: '我发出的' },
            { id: 'completed', label: '本周完成' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveBoard(tab.id as any)}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeBoard === tab.id ? 'text-brand-primary' : 'text-text-light hover:text-brand-deep'
              }`}
            >
              {tab.label}
              {activeBoard === tab.id && (
                <motion.div 
                  layoutId="taskTab" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" 
                />
              )}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input 
              type="text" 
              placeholder="搜索任务、项目或执行人..."
              className="h-10 w-full md:w-64 pl-10 pr-4 bg-white border border-border rounded-xl text-sm outline-none focus:ring-2 ring-brand-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary h-10 w-10 p-0 border-none bg-slate-100">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Kanban Board Mockup or List View */}
      <div className="grid grid-cols-1 gap-3">
        {filteredTasks.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <CheckCircle2 size={48} className="text-slate-200 mb-4" />
            <p className="text-sm">没有相关任务</p>
          </div>
        ) : filteredTasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onNavigate?.('task_details')}
            className="card p-4 group hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
          >
            <div className="flex items-start gap-4 flex-1">
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleTask?.(task.id, task.status !== 'completed'); }}
                className="mt-1 shrink-0 hover:scale-110 active:scale-90 transition-transform"
              >
                {getStatusIcon(task.status)}
              </button>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className={`font-bold text-sm ${task.status === 'completed' ? 'text-text-light line-through' : 'text-brand-deep'}`}>
                    {task.title}
                  </h4>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-text-light">
                  <span className="flex items-center gap-1">
                    <ListTodo size={12} />
                    {task.project}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    截止: {task.dueDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-3 md:pt-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center border border-white shadow-sm ring-1 ring-slate-200">
                    <User size={14} className="text-slate-400" />
                  </div>
                  <span className="text-xs font-bold text-text-secondary">{task.assignee.name}</span>
                </div>
                {task.commentCount > 0 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNavigate?.('task_details'); }}
                    className="flex items-center gap-1 text-text-light hover:text-brand-primary hover:bg-brand-primary/5 p-1 rounded transition-colors"
                  >
                    <MessageSquare size={14} />
                    <span className="text-xs font-bold">{task.commentCount}</span>
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-slate-50 rounded-lg text-text-light hover:text-brand-primary transition-all">
                  <Flag size={16} />
                </button>
                <button className="p-2 hover:bg-slate-50 rounded-lg text-text-light transition-all">
                  <MoreHorizontal size={16} />
                </button>
                <button 
                  onClick={() => onNavigate?.('task_details')}
                  className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-text-light hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card bg-brand-deep/5 border-brand-primary/20 p-6 flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
          <CalendarIcon size={32} className="text-brand-primary" />
        </div>
        <div>
          <h4 className="font-bold text-brand-deep mb-1">本周重要日程</h4>
          <p className="text-sm text-text-secondary mb-3">您有 3 个案件开庭及 2 次客户约谈即将到期</p>
          <button 
            onClick={() => onNavigate?.('task_calendar')}
            className="text-xs font-bold text-brand-primary flex items-center gap-1 hover:underline active:scale-95 transition-all"
          >
            <span>点击查看完整日历排期</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
