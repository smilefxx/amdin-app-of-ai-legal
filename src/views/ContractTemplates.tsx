/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  ScrollText, 
  MoreHorizontal, 
  Plus, 
  FileEdit, 
  Eye, 
  Copy, 
  Download,
  AlertTriangle,
  History,
  Tag,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { DocumentPreviewModal } from '@/src/components/common/DocumentPreviewModal';

interface ContractTemplate {
  id: string;
  name: string;
  category: string;
  version: string;
  status: 'published' | 'draft' | 'archived';
  riskLevel: 'low' | 'medium' | 'high';
  usageCount: number;
  updateTime: string;
  author: string;
}

const MOCK_CONTRACTS: ContractTemplate[] = [
  { id: '1', name: '劳动合同 (通用标准版)', category: '人力资源', version: 'v3.2', status: 'published', riskLevel: 'low', usageCount: 1250, updateTime: '2026-04-20', author: '李律师' },
  { id: '2', name: '房屋租赁合同 (企业承租)', category: '房地产', version: 'v2.1', status: 'published', riskLevel: 'medium', usageCount: 432, updateTime: '2026-05-01', author: '王律师' },
  { id: '3', name: '股权转让协议书 (基础型)', category: '公司治理', version: 'v1.5', status: 'draft', riskLevel: 'high', usageCount: 0, updateTime: '2026-05-02', author: '赵律师' },
  { id: '4', name: '软件开发服务外包合同', category: '知识产权', version: 'v4.0', status: 'published', riskLevel: 'medium', usageCount: 189, updateTime: '2026-03-15', author: '陈律师' },
  { id: '5', name: '保密协议书 (NDA)', category: '合规风控', version: 'v2.0', status: 'published', riskLevel: 'low', usageCount: 2100, updateTime: '2026-04-10', author: '律所标准部' },
  { id: '6', name: '产品销售代理合同', category: '商事贸易', version: 'v1.2', status: 'archived', riskLevel: 'medium', usageCount: 88, updateTime: '2025-11-20', author: '张律师' },
];

interface ContractTemplatesProps {
  onNavigate?: (tab: string) => void;
}

export default function ContractTemplates({ onNavigate }: ContractTemplatesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [previewContract, setPreviewContract] = useState<ContractTemplate | null>(null);

  const categories = ['全部', '人力资源', '公司治理', '商事贸易', '金融借贷', '房地产', '知识产权', '合规风控'];

  const filteredContracts = MOCK_CONTRACTS.filter(c => {
    const matchesSearch = c.name.includes(searchTerm);
    const matchesCategory = activeCategory === '全部' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'high': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-slate-400 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-brand-deep">合同范本库</h2>
          <p className="text-xs text-text-light">高标准标准化合同库，保障业务输出一致性与风控严谨性</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate?.('category_management')}
            className="btn-secondary h-10 px-4 active:scale-95 transition-all"
          >
            <Tag size={18} />
            <span>分类管理</span>
          </button>
          <button 
            onClick={() => onNavigate?.('template_upload')}
            className="btn-primary h-10 px-4 active:scale-95 transition-all"
          >
            <Plus size={18} />
            <span>上传范本</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '库内范本总数', value: '1,280', extra: '较上周 +12', icon: ScrollText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '本月调用频次', value: '45.2k', extra: '超 85% 同行', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '待审核版本', value: '08', extra: '需要立即处理', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '风控校验通过', value: '99.8%', extra: '严控合规性', icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <div key={i} className="card p-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] uppercase font-bold text-text-light tracking-wider mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-brand-deep">{stat.value}</p>
              <p className="text-[10px] text-emerald-600 font-bold mb-1">{stat.extra}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-brand-primary border-brand-primary text-white shadow-sm shadow-brand-primary/20' 
                  : 'bg-white border-border text-text-secondary hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64 shrink-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
          <input 
            type="text" 
            placeholder="搜范本名称或关键词..."
            className="h-10 w-full pl-10 pr-4 bg-white border border-border rounded-xl text-sm focus:ring-2 ring-brand-primary/20 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredContracts.map((contract, i) => (
          <motion.div
            key={contract.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card group hover:border-brand-primary/40 transition-all flex flex-col h-full overflow-hidden"
          >
            <div className="p-5 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                   contract.status === 'published' ? 'bg-blue-50 text-brand-primary' : 
                   contract.status === 'draft' ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-400'
                }`}>
                  <ScrollText size={20} />
                </div>
                <div className="flex items-center gap-2">
                   <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${getRiskBadge(contract.riskLevel)}`}>
                     {contract.riskLevel === 'low' ? '低风险' : contract.riskLevel === 'medium' ? '中风险' : '高风险'}
                   </span>
                   <button className="text-text-light hover:text-brand-primary transition-colors">
                     <MoreHorizontal size={18} />
                   </button>
                </div>
              </div>
              
              <h4 className="text-base font-bold text-brand-deep mb-2 group-hover:text-brand-primary transition-colors line-clamp-1">{contract.name}</h4>
              <div className="flex items-center gap-3 text-xs text-text-light mb-4">
                 <span>{contract.category}</span>
                 <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                 <span>版本 {contract.version}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-50">
                <div>
                   <p className="text-[10px] text-text-light mb-1 uppercase font-bold">维护人</p>
                   <p className="text-xs font-bold text-text-secondary">{contract.author}</p>
                </div>
                <div>
                   <p className="text-[10px] text-text-light mb-1 uppercase font-bold">调用次数</p>
                   <p className="text-xs font-bold text-text-secondary">{contract.usageCount} 次</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 flex items-center justify-between">
              <span className="text-[10px] text-text-light">更新于: {contract.updateTime}</span>
              <div className="flex items-center gap-2">
                 <button onClick={() => setPreviewContract(contract)} className="p-2 hover:bg-white hover:shadow-xs rounded-lg text-text-light hover:text-brand-primary transition-all">
                   <Eye size={16} />
                 </button>
                 <button className="p-2 hover:bg-white hover:shadow-xs rounded-lg text-text-light hover:text-brand-primary transition-all">
                   <Copy size={16} />
                 </button>
                 <button className="flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:bg-brand-primary/5 px-2 py-1.5 rounded-md transition-colors">
                   <span>使用</span>
                   <ChevronRight size={14} />
                 </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredContracts.length === 0 && (
         <div className="py-20 flex flex-col items-center justify-center text-text-light card bg-slate-50/30">
            <AlertTriangle size={48} className="text-slate-200 mb-4" />
            <p className="text-sm">未搜索到匹配的合同范本</p>
         </div>
      )}

      <DocumentPreviewModal
        isOpen={!!previewContract}
        onClose={() => setPreviewContract(null)}
        title={previewContract?.name || ''}
        type="contract"
        status={previewContract?.status === 'published' ? '审核通过' : previewContract?.status === 'draft' ? '草稿' : ''}
      />
    </div>
  );
}
