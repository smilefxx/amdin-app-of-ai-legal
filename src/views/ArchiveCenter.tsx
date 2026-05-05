import { 
  FolderLock, 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Eye, 
  ChevronRight, 
  Calendar,
  Tag,
  Clock,
  LayoutGrid,
  List,
  MoreVertical,
  Archive,
  ArrowUpRight
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { DocumentPreviewModal } from '@/src/components/common/DocumentPreviewModal';

const ARCHIVE_STATS = [
  { label: '累计归档案卷', value: '1,256', trend: '+12' },
  { label: '电子存证量', value: '4.8 GB', trend: '+240MB' },
  { label: '平均归档率', value: '98.5%', trend: '稳定' }
];

interface ArchivedDoc {
  id: string;
  name: string;
  type: string;
  date: string;
  status: string;
  owner: string;
  size: string;
}

const ARCHIVED_DOCS: ArchivedDoc[] = [
  { id: 'ARC-2026-001', name: '某科技公司 2025 年度劳动合规审查专案', type: '民事案件', date: '2026-04-15', status: '已加密', owner: '王佳佳', size: '12.4 MB' },
  { id: 'ARC-2026-002', name: '李某某离婚协议及财产处分公证文档', type: '婚姻家庭', date: '2026-04-12', status: '公开', owner: '陈思远', size: '4.2 MB' },
  { id: 'ARC-2026-003', name: '创业板上市招股说明书法律意见书 (V4_Final)', type: '商事非诉', date: '2026-03-28', status: '已加密', owner: '张大伟', size: '45.1 MB' },
  { id: 'ARC-2026-004', name: '某知名游戏公司 2024 年度侵权投诉汇总', type: '知识产权', date: '2026-03-20', status: '公开', owner: '孙志平', size: '22.8 MB' },
  { id: 'ARC-2026-005', name: '关于「非法经营罪」的抗辩思路与检索报告', type: '刑事辩护', date: '2026-03-15', status: '已加密', owner: '赵小雅', size: '8.6 MB' },
  { id: 'ARC-2026-006', name: '恒创集团破产重整债权人会议纪要', type: '破产清算', date: '2026-03-05', status: '已加密', owner: '王佳佳', size: '15.9 MB' },
];

export default function ArchiveCenter() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [previewDoc, setPreviewDoc] = useState<ArchivedDoc | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-text-main">数字化归档中心</h2>
          <p className="text-sm text-text-light">实现案件卷宗、法律文书与关键证据的永久化、分类化数字存储</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary h-11 px-6">
            <Archive size={18} />
            <span>开始一键归档</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {ARCHIVE_STATS.map((stat, i) => (
           <div key={i} className="card-base p-6 bg-white shadow-light border-slate-100 flex flex-col gap-1">
              <span className="text-[11px] font-bold text-text-light uppercase tracking-wider">{stat.label}</span>
              <div className="flex items-baseline gap-2">
                 <span className="text-2xl font-bold text-text-main">{stat.value}</span>
                 <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
                   {stat.trend.startsWith('+') && <ArrowUpRight size={12} />}
                   {stat.trend}
                 </span>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Category Tree */}
        <div className="lg:col-span-3 space-y-6">
           <div className="card-base p-6 bg-white shadow-light space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-sm font-bold text-text-main">全量分类结构</h3>
                 <button className="text-brand-primary p-1 hover:bg-blue-50 rounded-lg transition-colors">
                    <Filter size={16} />
                 </button>
              </div>

              <div className="space-y-1">
                 {[
                   { label: '按案件类型', count: 850, active: true },
                   { label: '按结案时间', count: 320, active: false },
                   { label: '按主办律师', count: 86, active: false },
                   { label: '按客户性质', count: 42, active: false },
                 ].map((cat, i) => (
                   <button 
                    key={i} 
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${cat.active ? 'bg-blue-50 text-brand-primary' : 'text-text-secondary hover:bg-slate-50'}`}
                   >
                     <div className="flex items-center gap-3">
                        <FolderLock size={18} className={cat.active ? 'text-brand-primary' : 'text-text-light'} />
                        {cat.label}
                     </div>
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.active ? 'bg-brand-primary text-white' : 'bg-slate-100 text-text-light'}`}>
                        {cat.count}
                     </span>
                   </button>
                 ))}
              </div>

              <div className="pt-4 border-t border-slate-50">
                 <h4 className="text-[10px] font-bold text-text-light uppercase mb-4 tracking-widest">核心业务分布</h4>
                 <div className="space-y-4">
                    {[
                      { name: '民事纠纷', val: 45, color: '#2F6BFF' },
                      { name: '商事合同', val: 30, color: '#10B981' },
                      { name: '知识产权', val: 15, color: '#805AD5' },
                      { name: '刑事辩护', val: 10, color: '#F59E0B' }
                    ].map((item, i) => (
                      <div key={i} className="space-y-1.5">
                         <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-text-secondary">{item.name}</span>
                            <span className="text-text-main">{item.val}%</span>
                         </div>
                         <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full" style={{ width: `${item.val}%`, backgroundColor: item.color }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Document List */}
        <div className="lg:col-span-9 space-y-6">
           {/* Filters & Search */}
           <div className="card-base p-6 bg-white shadow-light border-slate-100">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                 <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light group-focus-within:text-brand-primary transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="搜索案卷号、文书名称、关键词..."
                      className="w-full h-12 pl-12 pr-4 bg-slate-50 border-transparent focus:border-brand-primary focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
                    />
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="flex bg-slate-50 p-1 rounded-xl">
                       <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-brand-primary' : 'text-text-light hover:text-text-secondary'}`}
                       >
                          <List size={20} />
                       </button>
                       <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-primary' : 'text-text-light hover:text-text-secondary'}`}
                       >
                          <LayoutGrid size={20} />
                       </button>
                    </div>
                    <select className="h-12 px-4 rounded-2xl bg-slate-50 text-sm font-bold text-brand-deep border-transparent focus:bg-white focus:border-brand-primary outline-none transition-all cursor-pointer">
                       <option>全部时间</option>
                       <option>2026年</option>
                       <option>2025年</option>
                       <option>2024年</option>
                    </select>
                 </div>
              </div>
           </div>

           {/* Results */}
           <div className="card-base overflow-hidden bg-white shadow-light border-slate-100">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                       <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">案卷 ID / 名称</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">所属分类</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">归档日期</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">主办律师</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest text-right">操作</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {ARCHIVED_DOCS.map((doc, i) => (
                      <motion.tr 
                        key={doc.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-4">
                              <div className={`p-2.5 rounded-xl ${doc.status === '已加密' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                                 <FileText size={20} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                 <span className="text-sm font-bold text-text-main group-hover:text-brand-primary transition-colors truncate">{doc.name}</span>
                                 <span className="text-[10px] text-text-light flex items-center gap-2">
                                    {doc.id} <span className="w-1 h-1 rounded-full bg-slate-300 pointer-events-none"></span> {doc.size}
                                 </span>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <span className="text-xs font-bold text-text-secondary">{doc.type}</span>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-2 text-[11px] text-text-light">
                              <Calendar size={14} />
                              {doc.date}
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-slate-100 border border-white flex items-center justify-center text-[10px] font-bold text-text-secondary uppercase">
                                 {doc.owner[0]}
                              </div>
                              <span className="text-xs font-bold text-text-main">{doc.owner}</span>
                           </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => setPreviewDoc(doc)} className="p-2 hover:text-brand-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100" title="预览">
                                 <Eye size={18} />
                              </button>
                              <button className="p-2 hover:text-brand-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100" title="下载">
                                 <Download size={18} />
                              </button>
                              <button className="p-2 hover:text-brand-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100">
                                 <MoreVertical size={18} />
                              </button>
                           </div>
                        </td>
                      </motion.tr>
                    ))}
                 </tbody>
              </table>

              <div className="p-6 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
                 <p className="text-xs text-text-light font-medium">显示 1-6 条，共 1,256 条案卷数据</p>
                 <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-text-light opacity-50 cursor-not-allowed transition-all">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-primary text-white font-bold transition-all">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-text-secondary hover:border-brand-primary transition-all">3</button>
                    <span className="text-text-light">...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-text-secondary hover:border-brand-primary transition-all">42</button>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <DocumentPreviewModal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc?.name || ''}
        type="case"
        status={previewDoc?.status === '已加密' ? '草稿' : '审核通过'}
      />
    </div>
  );
}
