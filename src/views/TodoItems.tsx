/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  FileEdit,
  UserPlus,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';

interface TodoItem {
  id: string;
  title: string;
  description: string;
  type: 'template' | 'issue' | 'user' | 'risk';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'processing' | 'completed';
  createdAt: string;
}

const MOCK_TODOS: TodoItem[] = [
  { id: '1', title: '模板更新：民间借贷起诉状', description: '系统检测到最新司法解释发布，建议更新对应的变量映射逻辑。', type: 'template', priority: 'high', status: 'pending', createdAt: '2026-05-02 09:10' },
  { id: '2', title: '新工单：支付系统无法查询', description: '用户反馈在律所管理后台无法查询近三天的充值流水。', type: 'issue', priority: 'high', status: 'processing', createdAt: '2026-05-02 08:30' },
  { id: '3', title: '成员入驻审核：张三律师', description: '提交了执业证扫描件，需核实律所关联信息。', type: 'user', priority: 'medium', status: 'pending', createdAt: '2026-05-02 06:15' },
  { id: '4', title: '高风险识别：案件#9283文书', description: 'AI 检测到该文书可能存在逻辑漏洞，需人工介入复核。', type: 'risk', priority: 'high', status: 'pending', createdAt: '2026-05-01 23:45' },
  { id: '5', title: '知识库失效提醒', description: '有 3 条法律法规已废止，请及时更新或标记。', type: 'template', priority: 'low', status: 'completed', createdAt: '2026-05-01 18:20' },
  { id: '6', title: '反馈建议：增加批量导出功能', description: '多位律所管理员建议增加模板数据的批量导出。', type: 'issue', priority: 'low', status: 'pending', createdAt: '2026-05-01 15:10' },
];

interface TodoItemsProps {
  onBack: () => void;
}

export default function TodoItems({ onBack }: TodoItemsProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [todos, setTodos] = useState<TodoItem[]>(MOCK_TODOS);

  const handleStatusChange = (id: string, newStatus: TodoItem['status']) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const filteredTodos = todos.filter(todo => {
    if (activeFilter === 'all') return true;
    return todo.status === activeFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-100';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'risk': return <ShieldAlert size={18} />;
      case 'template': return <FileEdit size={18} />;
      case 'user': return <UserPlus size={18} />;
      default: return <MessageSquare size={18} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-lg transition-all text-text-light hover:text-brand-deep shadow-sm border border-transparent hover:border-border">
            <ArrowLeft size={20} />
          </button>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-brand-deep">待处理事项管理</h2>
            <p className="text-xs text-text-light">监控全系统任务流，支持优先级调度与快速处理</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input 
              placeholder="搜索任务名称或描述..." 
              className="h-10 w-64 pl-10 pr-4 bg-white border border-border rounded-lg text-sm focus:border-brand-primary outline-none"
            />
          </div>
          <button className="btn-secondary h-10">
            <Filter size={18} />
            <span>高级筛选</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 w-fit rounded-lg">
        {['all', 'pending', 'processing', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeFilter === tab 
                ? 'bg-white text-brand-primary shadow-sm' 
                : 'text-text-secondary hover:text-brand-primary'
            }`}
          >
            {tab === 'all' && '全部任务'}
            {tab === 'pending' && '待处理'}
            {tab === 'processing' && '处理中'}
            {tab === 'completed' && '已完成'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredTodos.map((todo, idx) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`card p-5 group flex items-start gap-5 transition-all border-l-4 ${todo.status === 'completed' ? 'opacity-70 grayscale-[0.3]' : 'hover:border-brand-primary/30'}`}
            style={{ borderLeftColor: todo.status === 'completed' ? '#94a3b8' : (todo.priority === 'high' ? '#ef4444' : todo.priority === 'medium' ? '#f59e0b' : '#3b82f6') }}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              todo.status === 'completed' ? 'bg-slate-50 text-slate-400' : (
                todo.type === 'risk' ? 'bg-red-50 text-red-600' :
                todo.type === 'template' ? 'bg-blue-50 text-blue-600' :
                todo.type === 'user' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              )
            }`}>
              {getTypeIcon(todo.type)}
            </div>

            <div className="flex-1 min-w-0 py-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className={`font-bold transition-colors truncate ${todo.status === 'completed' ? 'text-text-light line-through' : 'text-brand-deep group-hover:text-brand-primary'}`}>{todo.title}</h4>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${todo.status === 'completed' ? 'text-slate-400 bg-slate-50 border-slate-200' : getPriorityColor(todo.priority)}`}>
                  {todo.priority === 'high' ? '紧急' : todo.priority === 'medium' ? '中等' : '普通'}
                </span>
                {todo.status === 'processing' && (
                  <span className="flex items-center gap-1 text-[10px] text-brand-primary font-bold animate-pulse">
                    <Clock size={12} /> 处理中
                  </span>
                )}
                {todo.status === 'completed' && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                    <CheckCircle2 size={12} /> 已核销
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary mb-3 leading-relaxed">{todo.description}</p>
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5 text-xs text-text-light">
                   <Clock size={14} /> 创建于 {todo.createdAt}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-text-light">
                   <CheckCircle2 size={14} className={todo.status === 'completed' ? 'text-emerald-500' : 'text-slate-300'} />
                   {todo.status === 'completed' ? '已完成处理' : '流转正常'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
               {todo.status !== 'completed' && (
                 <>
                   <button 
                     onClick={() => handleStatusChange(todo.id, 'processing')}
                     className={`h-9 px-4 text-xs rounded-md font-bold transition-all ${todo.status === 'processing' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'btn-primary'}`}
                     disabled={todo.status === 'processing'}
                   >
                     {todo.status === 'processing' ? '正在处理' : '立即处理'}
                   </button>
                   <button 
                     onClick={() => handleStatusChange(todo.id, 'completed')}
                     className="btn-secondary h-9 px-4 text-xs font-bold"
                   >
                     标记完成
                   </button>
                 </>
               )}
               {todo.status === 'completed' && (
                 <button 
                   onClick={() => handleStatusChange(todo.id, 'pending')}
                   className="h-9 px-4 text-xs text-brand-primary bg-blue-50 hover:bg-blue-100 rounded-md font-bold transition-all"
                 >
                   恢复任务
                 </button>
               )}
            </div>
            
            <div className="relative group/menu">
              <button className="p-2 text-text-light hover:text-brand-primary rounded-lg transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
