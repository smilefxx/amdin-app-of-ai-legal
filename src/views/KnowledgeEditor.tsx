/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  FileText, 
  Globe, 
  Lock, 
  Tag as TagIcon, 
  Plus, 
  X,
  Sparkles,
  Link as LinkIcon,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface KnowledgeEditorProps {
  onBack: () => void;
  initialData?: any;
}

export default function KnowledgeEditor({ onBack, initialData }: KnowledgeEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || '法律法规');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [visibility, setVisibility] = useState('team'); // public, team, private
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ['法律法规', '司法解释', '监管规则', '办案指引', '法院口径', '内部经验'];

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSave = () => {
    // Simulate saving
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 2500);
  };

  const handleAiOptimize = () => {
    if (!content) return;
    setIsAiProcessing(true);
    setTimeout(() => {
      setIsAiProcessing(false);
      
      // Mock AI optimization
      if (!title.includes('AI 增强')) {
        setTitle(title + ' (AI 深度解析版)');
      }
      
      const aiResponse = `【AI 核心摘要提炼】\n当前知识条目提取核心要点如下：\n- 适用场景：高频诉讼、风险防范审核\n- 关键争议点：条款的精确解释、适用范围界定\n\n【实践导向建议】\n1. 建议在关联协议版本中设置专门的除外条款。\n2. 建议引用本法条作为争议解决核心依据，并补充补充协议。\n\n------------------------------\n【原始知识沉淀】\n${content}\n\n------------------------------\n【关联知识推荐】\n- 《最高人民法院最新会议纪要》\n- 律所内部类似指导案例库（关联12件）`;

      setContent(aiResponse);
      
      setTags(prev => {
        const newTags = ['AI优化', '核心提炼'];
        return Array.from(new Set([...prev, ...newTags]));
      });

    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 z-30 py-4 bg-slate-50/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-brand-deep">
              {initialData ? '编辑专业知识' : '录入专业资产'}
            </h2>
            <p className="text-xs text-text-light underline decoration-brand-primary/20">
              知识沉淀是律所最宝贵的财富
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleAiOptimize}
            disabled={isAiProcessing}
            className="btn-secondary h-10 px-4 group hover:border-brand-primary"
          >
            <Sparkles size={16} className={`text-brand-primary ${isAiProcessing ? 'animate-pulse' : 'group-hover:rotate-12'}`} />
            <span>AI 结构化提炼</span>
          </button>
          <button 
            onClick={handleSave}
            className="btn-primary h-10 px-6 shadow-lg shadow-brand-primary/20"
          >
            <Save size={16} />
            <span>保存并发布</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 space-y-6 bg-white">
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-deep flex items-center gap-2">
                <FileText size={16} className="text-brand-primary" />
                知识标题
              </label>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="请输入明确的法律法规名称或经验主题..."
                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-lg font-bold focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-deep flex items-center gap-2">
                <BookOpen size={16} className="text-brand-primary" />
                正文内容
              </label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="在此粘贴法律条文、司法解释原文，或撰写具体的办案经验、裁判口径总结..."
                className="w-full min-h-[400px] p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm leading-relaxed focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none resize-none"
              />
            </div>
          </div>

          <div className="card p-6 bg-blue-50/50 border-blue-100/50">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center">
                  <Sparkles size={20} />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-brand-deep">AI 语义关联预览</h4>
                  <p className="text-[11px] text-text-light italic">构建该知识后，AI 将自动在以下场景中为您进行关联推荐</p>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
               {[
                 { label: '文书生成辅助', desc: '在起草相关文书时自动引用', color: 'bg-indigo-100 text-indigo-700' },
                 { label: '风险自动预警', desc: '比对案情，识别潜在风险点', color: 'bg-amber-100 text-amber-700' },
                 { label: '类案智能检索', desc: '法律库检索时的语义增强', color: 'bg-emerald-100 text-emerald-700' },
                 { label: '团队成员协同', desc: '在协作任务中推送相关规则', color: 'bg-blue-100 text-blue-700' }
               ].map((item, idx) => (
                 <div key={idx} className="p-3 bg-white rounded-xl border border-blue-200/50 shadow-sm">
                    <p className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1 ${item.color}`}>{item.label}</p>
                    <p className="text-[10px] text-text-light">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="card p-6 space-y-6 bg-white sticky top-24">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">
                  知识分类
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                        category === cat 
                        ? 'bg-brand-primary border-brand-primary text-white shadow-md' 
                        : 'border-slate-200 text-text-secondary hover:border-brand-primary hover:text-brand-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">
                  访问权限
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  {[
                    { id: 'private', label: '私有', icon: Lock },
                    { id: 'team', label: '律所', icon: Globe },
                    { id: 'public', label: '公开', icon: Globe }
                  ].map(v => (
                    <button
                      key={v.id}
                      onClick={() => setVisibility(v.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                        visibility === v.id 
                        ? 'bg-white text-brand-primary shadow-sm' 
                        : 'text-text-light hover:text-text-secondary'
                      }`}
                    >
                      <v.icon size={14} />
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
                  主题标签
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <TagIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
                    <input 
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                      placeholder="新增标签..."
                      className="w-full h-9 pl-9 pr-3 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:bg-white focus:border-brand-primary outline-none"
                    />
                  </div>
                  <button 
                    onClick={handleAddTag}
                    className="w-9 h-9 flex items-center justify-center bg-slate-100 text-text-secondary rounded-lg hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-brand-primary text-[10px] font-bold rounded-full group">
                      #{tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  {tags.length === 0 && (
                    <p className="text-[10px] text-text-light italic">暂无标签</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                 <button className="w-full flex items-center justify-center gap-2 text-xs font-bold text-text-secondary hover:text-brand-primary py-2 transition-colors">
                    <LinkIcon size={14} />
                    关联现有案件/合同
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Success Notification */}
       <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-4 px-6 py-4 bg-slate-900 border border-slate-700 text-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-md"
          >
            <div className="relative flex">
               <div className="absolute inset-0 bg-emerald-500 rounded-full blur animate-pulse" />
               <div className="relative w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={24} />
               </div>
            </div>
            <div>
              <p className="text-sm font-bold tracking-wide">知识资产已安全存入库</p>
              <p className="text-[11px] text-slate-400 mt-0.5">AI 服务正在后台构建向量索引，即将自动返回...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
