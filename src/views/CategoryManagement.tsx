/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  GripVertical, 
  Search, 
  Tag, 
  Settings2, 
  Info,
  ChevronRight,
  LayoutGrid
} from 'lucide-react';
import { motion, Reorder } from 'motion/react';

interface CategoryManagementProps {
  onBack: () => void;
}

interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}

export default function CategoryManagement({ onBack }: CategoryManagementProps) {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: '人力资源', count: 124, color: 'bg-blue-500' },
    { id: '2', name: '公司治理', count: 86, color: 'bg-purple-500' },
    { id: '3', name: '商事贸易', count: 215, color: 'bg-emerald-500' },
    { id: '4', name: '金融借贷', count: 98, color: 'bg-amber-500' },
    { id: '5', name: '房地产', count: 54, color: 'bg-indigo-500' },
    { id: '6', name: '知识产权', count: 72, color: 'bg-rose-500' },
    { id: '7', name: '合规风控', count: 43, color: 'bg-cyan-500' },
  ]);

  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-rose-500', 'bg-amber-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setCategories([
      ...categories,
      { id: Date.now().toString(), name: newCategory, count: 0, color: randomColor }
    ]);
    setNewCategory('');
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">分类目录管理</h2>
            <p className="text-xs text-text-light mt-0.5">定制律所专属的知识资产体系，科学划分业务边界</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="h-11 px-8 rounded-xl bg-brand-primary hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-brand-primary/20 transition-all"
          >
            确认更新排序
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="card p-8 bg-white border-slate-100 flex flex-col gap-8">
             <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  placeholder="输入新分类名称 (如：婚姻家事)"
                  className="flex-1 h-12 px-5 rounded-2xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
                />
                <button 
                  onClick={handleAddCategory}
                  className="h-12 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap"
                >
                  <Plus size={18} />
                  添加分类
                </button>
             </div>

             <div className="space-y-3">
                <div className="flex items-center justify-between px-2 mb-2">
                   <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">分类名称</span>
                   <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">关联资产数</span>
                </div>
                
                <Reorder.Group axis="y" values={categories} onReorder={setCategories} className="space-y-3">
                  {categories.map((category) => (
                    <Reorder.Item 
                      key={category.id} 
                      value={category}
                      className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-brand-primary/40 hover:shadow-xl hover:shadow-slate-200/40 transition-all group"
                    >
                      <button className="text-slate-300 hover:text-brand-primary cursor-grab active:cursor-grabbing shrink-0">
                         <GripVertical size={20} />
                      </button>
                      <div className={`w-3 h-3 rounded-full shrink-0 ${category.color}`} />
                      <span className="flex-1 text-sm font-bold text-brand-deep">{category.name}</span>
                      <span className="px-3 py-1 bg-slate-50 rounded-lg text-xs font-mono text-slate-500 border border-slate-100">
                        {category.count.toString().padStart(3, '0')}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 hover:bg-slate-100 text-text-light rounded-lg transition-colors">
                            <Settings2 size={16} />
                         </button>
                         <button 
                            onClick={() => removeCategory(category.id)}
                            className="p-2 hover:bg-red-50 text-text-light hover:text-red-500 rounded-lg transition-colors"
                         >
                            <Trash2 size={16} />
                         </button>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="card p-8 bg-brand-ice border-brand-primary/10">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                 <LayoutGrid size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-deep mb-3">资产架构建议</h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-6">
                 根据律所近一年的案件沉淀，建议可以考虑增加「数据合规」与「涉外家事」两个二级分类，以支撑业务版图的扩张。
              </p>
              <button className="w-full h-11 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-blue-600 transition-all">
                 生成完整架构报告
              </button>
           </div>

           <div className="card p-6 space-y-4">
              <div className="flex items-center gap-2">
                 <Info size={16} className="text-text-light" />
                 <h4 className="text-xs font-bold text-brand-deep uppercase">操作须知</h4>
              </div>
              <div className="space-y-4">
                 {[
                   '长按左侧图标可以自由拖拽排序',
                   '删除分类不会删除文件，关联文件将自动归入「未分类」',
                   '分类颜色将自动在统计图表中呈现'
                 ].map((tip, i) => (
                   <p key={i} className="text-[11px] text-text-secondary leading-relaxed flex gap-2">
                      <span className="text-brand-primary flex-shrink-0">•</span>
                      {tip}
                   </p>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
