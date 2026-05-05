/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  X, 
  Save, 
  User, 
  Calendar, 
  Flag, 
  Paperclip, 
  Plus, 
  Trash2,
  Clock,
  Layout,
  MessageSquare,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';

interface TaskEditorProps {
  onBack: () => void;
  onSave?: (task: any) => void;
  taskId?: string | null;
  initialDate?: string;
}

export default function TaskEditor({ onBack, onSave, taskId, initialDate }: TaskEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    project: '',
    assignee: '',
    dueDate: initialDate || '',
    priority: 'medium',
    description: '',
    subtasks: [] as string[]
  });

  const priorities = [
    { value: 'low', label: '低优先级', color: 'bg-emerald-500' },
    { value: 'medium', label: '中优先级', color: 'bg-amber-500' },
    { value: 'high', label: '高优先级', color: 'bg-red-500' }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Saving task:', formData);
    onSave?.(formData);
    onBack();
  };

  const addSubtask = () => {
    setFormData({ ...formData, subtasks: [...formData.subtasks, ''] });
  };

  const updateSubtask = (index: number, value: string) => {
    const newSubtasks = [...formData.subtasks];
    newSubtasks[index] = value;
    setFormData({ ...formData, subtasks: newSubtasks });
  };

  const removeSubtask = (index: number) => {
    setFormData({ ...formData, subtasks: formData.subtasks.filter((_, i) => i !== index) });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100"
          >
            <X size={20} className="text-text-secondary" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">
              {taskId ? '编辑协作任务' : '发布新的协作任务'}
            </h2>
            <p className="text-xs text-text-light mt-0.5">高效分工，让每一个办案节点都清晰可控</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="h-11 px-6 rounded-xl text-xs font-bold text-text-secondary hover:bg-slate-50 border border-slate-200 transition-all font-mono"
          >
            DISCARD
          </button>
          <button 
            onClick={handleSubmit}
            className="h-11 px-8 rounded-xl bg-brand-primary hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-brand-primary/20 flex items-center gap-2 transition-all"
          >
            <Save size={18} />
            立即委派
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <form className="card p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase">任务标题</label>
              <input 
                type="text" 
                placeholder="例如：准备民事起诉状副本、联系证人..."
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium text-lg"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">关联案件/项目</label>
                <div className="relative">
                  <Layout size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="搜索案件编号或标题"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium text-sm"
                    value={formData.project}
                    onChange={e => setFormData({ ...formData, project: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">委派执行人</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="律师姓名或助理姓名"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium text-sm"
                    value={formData.assignee}
                    onChange={e => setFormData({ ...formData, assignee: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">截止时间</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="date" 
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium text-sm"
                    value={formData.dueDate}
                    onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">优先级</label>
                <div className="relative">
                  <Flag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select 
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium text-sm appearance-none"
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value })}
                  >
                    {priorities.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase">任务描述</label>
              <textarea 
                rows={5}
                placeholder="详细说明任务要求、注意事项、交付标准等..."
                className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium text-sm leading-relaxed"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Subtasks Section */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-brand-deep">细分检查项</h3>
                  <button 
                    type="button"
                    onClick={addSubtask}
                    className="text-[11px] font-bold text-brand-primary flex items-center gap-1 hover:underline"
                  >
                    <Plus size={14} /> 添加子任务
                  </button>
               </div>
               <div className="space-y-3">
                  {formData.subtasks.map((st, i) => (
                    <div key={i} className="flex gap-3">
                       <input 
                          type="text"
                          placeholder={`子任务 ${i + 1}`}
                          className="flex-1 h-10 px-4 rounded-lg bg-white border border-slate-200 text-sm focus:border-brand-primary outline-none"
                          value={st}
                          onChange={e => updateSubtask(i, e.target.value)}
                       />
                       <button 
                         onClick={() => removeSubtask(i)}
                         className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-colors"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  ))}
                  {formData.subtasks.length === 0 && (
                    <p className="text-[11px] text-text-light text-center py-4 italic border border-dashed rounded-xl border-slate-200">
                      暂无检查项，点击上方按钮添加
                    </p>
                  )}
               </div>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="card p-6 bg-slate-900 text-white border-none shadow-xl">
              <AlertCircle size={24} className="text-amber-400 mb-4" />
              <h4 className="text-sm font-bold mb-2">执行建议</h4>
              <p className="text-[10px] text-white/50 leading-relaxed mb-6">
                “根据本案 (张三借贷案) 的历史记录，该法官对【证人陈述】格式要求较为严苛，建议在任务描述中加入格式规范链接。”
              </p>
              <button className="w-full h-10 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                 <MessageSquare size={16} />
                 AI 优化任务描述
              </button>
           </div>

           <div className="card p-6 space-y-4">
              <div className="flex items-center gap-2">
                 <Clock size={16} className="text-brand-primary" />
                 <h4 className="text-xs font-bold text-brand-deep">时效提醒</h4>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                 <p className="text-[11px] font-bold text-red-800">重要时效提醒</p>
                 <p className="text-[10px] text-red-700 mt-1">您选择的截止日期已接近该案件的【举证期限】截止日 (2026-05-08)，请确保任务能按时交付。</p>
              </div>
           </div>

           <div className="card p-6 flex flex-col items-center text-center gap-4 border-dashed border-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                 <Paperclip size={24} />
              </div>
              <div>
                 <h5 className="text-[11px] font-bold text-brand-deep">任务附件</h5>
                 <p className="text-[9px] text-text-light mt-1">允许上传参考资料、模版、指示文档等</p>
              </div>
              <button className="text-[10px] text-brand-primary font-bold hover:underline">浏览文件</button>
           </div>
        </div>
      </div>
    </div>
  );
}
