/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download, 
  Copy, 
  Trash2,
  ChevronRight,
  Eye,
  Edit3,
  Library,
  Star,
  Users,
  Zap,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import { Template } from '@/src/types';
import { DocumentPreviewModal } from '@/src/components/common/DocumentPreviewModal';

const MOCK_TEMPLATES: Template[] = [
  { id: '1', name: '民间借贷起诉状标准版', type: '民间借贷', version: 'V2.1', status: 'published', usageCount: 1242, successRate: '98%', rating: 4.8, updatedAt: '2026-04-28', author: '李华', variablesCount: 12 },
  { id: '2', name: '保险拒赔异议书通用型', type: '保险纠纷', version: 'V1.4', status: 'published', usageCount: 856, successRate: '92%', rating: 4.5, updatedAt: '2026-04-25', author: '王明', variablesCount: 8 },
  { id: '3', name: '行政处罚申辩书及听证申请', type: '行政处罚', version: 'V1.0', status: 'draft', usageCount: 0, successRate: '0%', rating: 0, updatedAt: '2026-04-20', author: '李华', variablesCount: 15 },
  { id: '4', name: '金融借款合同纠纷起诉状', type: '金融借款', version: 'V1.2', status: 'review', usageCount: 321, successRate: '95%', rating: 4.2, updatedAt: '2026-04-18', author: '陈红', variablesCount: 10 },
  { id: '5', name: '担保纠纷民事起诉状', type: '担保纠纷', version: 'V3.0', status: 'published', usageCount: 2100, successRate: '99%', rating: 4.9, updatedAt: '2026-04-15', author: '系统', variablesCount: 14 },
];

interface TemplateLibraryProps {
  onEdit: (template: Template) => void;
  onNavigate?: (tab: string) => void;
}

export default function TemplateLibrary({ onEdit, onNavigate }: TemplateLibraryProps) {
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部模板');
  const [activeStatus, setActiveStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [shareModalTmpl, setShareModalTmpl] = useState<Template | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDuplicate = (tmpl: Template) => {
    const newTmpl: Template = {
      ...tmpl,
      id: Date.now().toString(),
      name: `${tmpl.name} (副本)`,
      status: 'draft',
      usageCount: 0,
      version: 'V1.0',
    };
    setTemplates(prev => [newTmpl, ...prev]);
    showToast('模板复制成功');
  };

  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    showToast('模板已彻底删除');
  };

  const handleDownload = (tmpl: Template) => {
    showToast(`《${tmpl.name}》离线包已开始下载`);
  };

  const categories = [
    { name: '全部模板', count: 128 },
    { name: '民间借贷', count: 42 },
    { name: '保险纠纷', count: 15 },
    { name: '行政处罚', count: 8 },
    { name: '金融借款', count: 24 },
    { name: '担保纠纷', count: 12 },
    { name: '律师函', count: 27 }
  ];

  const statusTabs = [
    { label: '全部', value: 'all' },
    { label: '已发布', value: 'published' },
    { label: '草稿', value: 'draft' },
    { label: '待审核', value: 'review' }
  ];

  const filteredTemplates = templates.filter(tmpl => {
    const matchesSearch = tmpl.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tmpl.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === '全部模板' || tmpl.type === activeCategory;
    const matchesStatus = activeStatus === 'all' || tmpl.status === activeStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / itemsPerPage));
  const currentTemplates = filteredTemplates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to first page when filters change
  if (currentPage > totalPages) {
      setCurrentPage(1);
  }

  return (
    <div className="flex gap-6 h-full">
      {/* Category Sidebar */}
      <aside className="w-64 card overflow-hidden flex flex-col shrink-0">
        <div className="p-4 border-b border-border bg-slate-50/50">
          <h3 className="font-bold text-brand-deep text-sm">文书类型分类</h3>
          <p className="text-[10px] text-text-light mt-1">按业务领域标准化管理</p>
        </div>
        <nav className="p-2 space-y-1 overflow-y-auto">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                activeCategory === cat.name ? 'bg-blue-50 text-brand-primary shadow-sm shadow-blue-100' : 'text-text-secondary hover:bg-slate-50'
              }`}
            >
              <span>{cat.name}</span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === cat.name ? 'bg-brand-primary text-white' : 'bg-slate-100 text-text-light group-hover:bg-slate-200'}`}>
                  {cat.count}
                </span>
                <ChevronRight size={14} className={`transition-transform duration-300 ${activeCategory === cat.name ? 'translate-x-0' : 'opacity-0 -translate-x-2'}`} />
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveStatus(tab.value)}
                  className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeStatus === tab.value 
                    ? 'bg-white text-brand-primary shadow-sm' 
                    : 'text-text-light hover:text-text-secondary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary h-10 hover:bg-slate-100 transition-colors">
                <Download size={18} />
                <span>批量导出</span>
              </button>
              <button 
                onClick={() => onEdit({} as Template)}
                className="btn-primary h-10 cursor-pointer active:scale-95 transition-transform shadow-lg shadow-brand-primary/20"
              >
                <Plus size={18} />
                <span>新建模板</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
             <div className="relative flex-1 max-w-xl">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
                <input 
                  type="text" 
                  placeholder="搜索模板名称、业务关键词、或是特定的变量标签..." 
                  className="h-12 w-full pl-12 pr-4 bg-white border border-border rounded-xl text-sm focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none shadow-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="btn-secondary h-12 px-5 hover:bg-slate-50 transition-colors border-slate-200">
                <Filter size={18} />
                <span className="text-xs font-bold">高级筛选</span>
             </button>
          </div>
        </div>

        {/* Usage Stats Banner */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '平均生成成功率', value: '96.8%', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50', tab: 'analytics' },
            { label: '模板平均好评', value: '4.75', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50', tab: 'analytics' },
            { label: '变量匹配效率', value: '0.8s', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', tab: 'analytics' },
            { label: '本周新增沉淀', value: '+12', icon: Library, color: 'text-purple-600', bg: 'bg-purple-50', tab: 'firm_knowledge' },
          ].map((s, i) => (
            <div 
              key={i} 
              onClick={() => s.tab && onNavigate?.(s.tab)}
              className="card p-4 flex items-center gap-4 hover:shadow-md hover:border-brand-primary/20 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${s.bg} ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-[11px] text-text-light font-medium">{s.label}</p>
                <p className="text-lg font-bold text-brand-deep">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className="card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">模板名称/变量数</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">业务分类</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">版本/状态</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-center">使用频次</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-center">效果评分</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentTemplates.length > 0 ? (
                currentTemplates.map((tmpl) => (
                  <motion.tr 
                    key={tmpl.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-blue-50/30 transition-all group relative"
                  >
                    <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-brand-primary">
                        <Library size={16} />
                      </div>
                      <div>
                        <p 
                          onClick={() => onEdit(tmpl)}
                          className="text-sm font-semibold text-brand-deep group-hover:text-brand-primary transition-colors cursor-pointer"
                        >
                          {tmpl.name}
                        </p>
                        <p className="text-[11px] text-text-light">包含 {tmpl.variablesCount} 个变量字段 · 作者 {tmpl.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                      {tmpl.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono text-text-light">VER: {tmpl.version}</span>
                      {tmpl.status === 'published' && <span className="tag tag-success scale-90 origin-left">已发布</span>}
                      {tmpl.status === 'draft' && <span className="tag tag-gray scale-90 origin-left">草案</span>}
                      {tmpl.status === 'review' && <span className="tag tag-warning scale-90 origin-left">审核中</span>}
                      {tmpl.status === 'disabled' && <span className="tag tag-danger scale-90 origin-left">已停用</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-brand-deep">{tmpl.usageCount.toLocaleString()}</span>
                      <span className="text-[10px] text-emerald-600 font-medium">成功率 {tmpl.successRate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star size={12} className={tmpl.rating > 0 ? "text-amber-500 fill-amber-500" : "text-slate-300"} />
                      <span className="text-sm font-bold text-brand-deep">{tmpl.rating > 0 ? tmpl.rating.toFixed(1) : '-'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <button onClick={() => setPreviewTemplate(tmpl)} title="预览" className="p-2 hover:text-brand-primary hover:bg-blue-50 rounded-lg transition-all active:scale-90">
                          <Eye size={18} />
                       </button>
                       <button onClick={() => onEdit(tmpl)} title="编辑变量与生成规则" className="p-2 hover:text-brand-primary hover:bg-blue-100 rounded-lg transition-all active:scale-90">
                          <Edit3 size={18} />
                       </button>
                       <div className="relative group/menu">
                          <button className="p-2 hover:text-brand-deep hover:bg-slate-100 rounded-lg transition-all active:scale-90">
                            <MoreHorizontal size={18} />
                          </button>
                          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-border shadow-xl rounded-2xl opacity-0 group-hover/menu:opacity-100 pointer-events-none group-hover/menu:pointer-events-auto transition-all z-50 p-2 border border-slate-100 scale-95 origin-top-right group-hover/menu:scale-100">
                             <button 
                              onClick={() => setShareModalTmpl(tmpl)}
                              className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors"
                             >
                                <Users size={14} /> 共享与权限
                             </button>
                             <button
                               onClick={() => handleDuplicate(tmpl)}
                               className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors"
                             >
                                <Copy size={14} /> 复制为新版本
                             </button>
                             <button
                               onClick={() => handleDownload(tmpl)}
                               className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors"
                             >
                                <Download size={14} /> 下载离线版
                             </button>
                             <div className="h-[1px] bg-slate-50 my-1 mx-1" />
                             <button 
                               onClick={() => handleDelete(tmpl.id)}
                               className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-red-50 text-danger flex items-center gap-2 transition-colors"
                             >
                                <Trash2 size={14} /> 彻底删除
                             </button>
                          </div>
                       </div>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-24">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 mb-4 border-2 border-dashed border-slate-200">
                      <Search size={32} />
                    </div>
                    <h3 className="text-sm font-bold text-brand-deep">未找到匹配的模板</h3>
                    <p className="text-xs text-text-light mt-2 max-w-[240px]">
                      尝试调整搜索关键词，或者在侧边栏选择不同的业务分类
                    </p>
                    <button 
                      onClick={() => {setSearchTerm(''); setActiveCategory('全部模板'); setActiveStatus('all');}}
                      className="mt-6 text-xs text-brand-primary font-bold hover:underline"
                    >
                      清空筛选条件
                    </button>
                  </div>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <div className="px-6 py-4 bg-slate-50/50 border-t border-border flex items-center justify-between">
            <span className="text-xs text-text-light">累计沉淀模板 128 条，本月已辅助生成 5,820 份专业文书 (共 {filteredTemplates.length} 条)</span>
            <div className="flex items-center gap-2">
               <button 
                 disabled={currentPage === 1}
                 onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                 className="px-3 py-1 text-xs border border-border rounded bg-white text-text-light hover:bg-slate-50 disabled:opacity-50"
               >
                 上一页
               </button>
               <span className="px-3 py-1 text-xs bg-brand-primary text-white rounded">{currentPage} / {totalPages}</span>
               <button 
                 disabled={currentPage === totalPages}
                 onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                 className="px-3 py-1 text-xs border border-border rounded bg-white text-text-light hover:bg-slate-50 disabled:opacity-50"
               >
                 下一页
               </button>
            </div>
          </div>
        </div>
      </div>

      <DocumentPreviewModal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        title={previewTemplate?.name || ''}
        type="template"
        status={previewTemplate?.status === 'published' ? '审核通过' : previewTemplate?.status === 'draft' ? '草稿' : ''}
      />

      {/* Share Modal */}
      {shareModalTmpl && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="p-6">
              <h3 className="text-lg font-bold text-brand-deep">共享与权限</h3>
              <p className="text-xs text-text-light mt-1">设置模板《{shareModalTmpl.name}》的可见性</p>
              
              <div className="mt-6 space-y-4">
                 <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-brand-deep">律所内公开</p>
                        <p className="text-[10px] text-text-light">允许所有团队成员查看和使用</p>
                    </div>
                    <div className="w-10 h-6 bg-brand-primary rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                 </div>
                 <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-brand-deep">仅管理员可修改</p>
                        <p className="text-[10px] text-text-light">保护核心模板不被误编辑</p>
                    </div>
                    <div className="w-10 h-6 bg-brand-primary rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                 </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                 <button onClick={() => setShareModalTmpl(null)} className="px-5 py-2.5 text-xs text-text-secondary font-bold hover:bg-slate-50 rounded-xl transition-colors">取消</button>
                 <button onClick={() => { setShareModalTmpl(null); showToast('权限设置已保存'); }} className="px-5 py-2.5 text-xs text-white font-bold bg-brand-primary hover:bg-blue-700 rounded-xl transition-colors">保存设置</button>
              </div>
            </div>
            <button onClick={() => setShareModalTmpl(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"><X size={20}/></button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold">{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
