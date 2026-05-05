/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  X, 
  Search, 
  Filter, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2,
  Calendar,
  ChevronRight,
  Download,
  Trash2,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';

interface ComplianceHistoryProps {
  onBack: () => void;
  onViewDetails: (id: string) => void;
}

export default function ComplianceHistory({ onBack, onViewDetails }: ComplianceHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const scanHistory = [
    { id: 'SCAN_9921', fileName: '商品房买卖预售合同_2026修订.pdf', date: '2026-05-01 14:20', score: 92, riskLevel: 'low', tags: ['合同审查', '民事'] },
    { id: 'SCAN_9920', fileName: '关于劳动报酬争议的起诉状.docx', date: '2026-04-28 09:15', score: 65, riskLevel: 'high', tags: ['诉讼文书', '劳动法'] },
    { id: 'SCAN_9919', fileName: '股权转让框架协议_英文版.pdf', date: '2026-04-25 16:40', score: 88, riskLevel: 'medium', tags: ['商事', '跨国合规'] },
    { id: 'SCAN_9918', fileName: '李某刑事辩护词(初稿).docx', date: '2026-04-22 11:30', score: 72, riskLevel: 'medium', tags: ['刑事诉讼', '证据排查'] },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'high': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100"
          >
            <X size={20} className="text-text-secondary" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">合规检测历史</h2>
            <p className="text-xs text-text-light mt-0.5">律所全量文书合规性自查记录，保障执业风险可追溯</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
             <input 
                type="text" 
                placeholder="搜索文件名或编号..."
                className="h-10 w-64 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 ring-brand-primary/20"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
             />
          </div>
          <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-text-light hover:bg-slate-50 transition-colors">
             <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
            { label: '累计检索次数', value: '428', icon: ShieldCheck, color: 'text-brand-primary' },
            { label: '高风险识别项', value: '24', icon: AlertTriangle, color: 'text-red-500' },
            { label: 'AI 优化建议数', value: '1,562', icon: Clock, color: 'text-amber-500' },
            { label: '合规通过率', value: '94.2%', icon: CheckCircle2, color: 'text-emerald-500' },
         ].map((stat, i) => (
           <div key={i} className="card p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                 <stat.icon size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-text-light uppercase tracking-wider">{stat.label}</p>
                 <p className="text-lg font-bold text-brand-deep">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      {/* History List */}
      <div className="card overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-slate-50 border-t border-slate-100/10">
          {scanHistory.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group p-5 hover:bg-slate-50 transition-all flex items-center gap-6 cursor-pointer"
              onClick={() => onViewDetails(item.id)}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.score > 80 ? 'bg-emerald-50 text-emerald-500' : item.score > 60 ? 'bg-amber-50 text-amber-500' : 'bg-red-50 text-red-500'} font-mono font-bold border border-current/10`}>
                {item.score}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-sm font-bold text-brand-deep truncate group-hover:text-brand-primary transition-colors">{item.fileName}</h4>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${getRiskColor(item.riskLevel)}`}>
                    {item.riskLevel === 'low' ? '低风险' : item.riskLevel === 'medium' ? '中等风险' : '重度风险'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-text-light">
                  <span className="flex items-center gap-1"><Clock size={12} /> {item.date}</span>
                  <span className="flex items-center gap-1 font-mono">{item.id}</span>
                  <div className="flex items-center gap-1">
                    {item.tags.map(tag => (
                      <span key={tag} className="bg-slate-100 px-1.5 rounded text-slate-500">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-2 h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm text-slate-400 hover:text-brand-primary transition-all">
                    <Download size={16} />
                 </button>
                 <button className="p-2 h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm text-slate-400 hover:text-red-500 transition-all">
                    <Trash2 size={16} />
                 </button>
                 <div className="w-px h-6 bg-slate-200 mx-1"></div>
                 <button className="flex items-center gap-1 px-3 h-9 rounded-lg bg-brand-primary text-white text-xs font-bold shadow-md shadow-brand-primary/10">
                    查看报告
                    <ChevronRight size={14} />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-text-light font-medium px-4">
         <p>显示最近 20 条检测记录</p>
         <div className="flex items-center gap-4">
            <button className="hover:text-brand-primary">上一页</button>
            <div className="px-2 py-1 rounded-md bg-white border border-slate-200 text-brand-deep">1 / 22</div>
            <button className="hover:text-brand-primary">下一页</button>
         </div>
      </div>
    </div>
  );
}
