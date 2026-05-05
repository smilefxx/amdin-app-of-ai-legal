/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  FileSearch, 
  Upload, 
  Plus, 
  ChevronRight, 
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BarChart3,
  Search,
  ArrowUpRight,
  Download,
  History,
  TrendingUp,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface ComplianceReport {
  id: string;
  docName: string;
  type: string;
  score: number;
  status: 'passed' | 'warning' | 'failed';
  checkTime: string;
  issuesCount: number;
  criticalIssues: number;
}

const MOCK_REPORTS: ComplianceReport[] = [
  { id: '1', docName: '民事起诉状_张三借贷纠纷.docx', type: '民事起诉', score: 92, status: 'passed', checkTime: '2026-05-02 14:20', issuesCount: 2, criticalIssues: 0 },
  { id: '2', docName: '房屋租赁合同模板_2026版.pdf', type: '合同范本', score: 78, status: 'warning', checkTime: '2026-05-01 10:15', issuesCount: 5, criticalIssues: 1 },
  { id: '3', docName: '某科技公司劳动仲裁答辩状.docx', type: '仲裁文书', score: 65, status: 'failed', checkTime: '2026-04-28 16:40', issuesCount: 8, criticalIssues: 3 },
  { id: '4', docName: '股权转让框架协议.docx', type: '投资协议', score: 85, status: 'warning', checkTime: '2026-05-03 09:30', issuesCount: 4, criticalIssues: 0 },
];

interface CompliancePrecheckProps {
  onNavigate?: (tab: string) => void;
  onSelectReport?: (id: string) => void;
}

export default function CompliancePrecheck({ onNavigate, onSelectReport }: CompliancePrecheckProps) {
  const [activeTab, setActiveTab] = useState<'recent' | 'stats'>('recent');

  const handleViewDetails = (id: string) => {
    if (onSelectReport) {
      onSelectReport(id);
    } else {
      onNavigate?.('compliance_details');
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'passed': return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', text: '合规通过' };
      case 'warning': return { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', text: '存在风险' };
      case 'failed': return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', text: '不符合标准' };
      default: return { icon: Info, color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-100', text: '未检测' };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-brand-deep">AI 合规性预检</h2>
          <p className="text-sm text-text-light">基于法律图谱与规则引擎，全量识别文书瑕疵、法条引用与逻辑风险</p>
        </div>
        <div className="flex items-center gap-2">
           <button 
            onClick={() => onNavigate?.('compliance_history')}
            className="btn-secondary h-11 px-6 border-slate-200"
           >
             <History size={18} />
             <span>检测历史</span>
           </button>
           <button 
            onClick={() => onNavigate?.('compliance_uploader')}
            className="btn-primary h-11 px-8 shadow-blue-500/20 shadow-lg"
           >
             <Plus size={18} />
             <span>上传新文书检测</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Scanning Center */}
        <div className="lg:col-span-8 space-y-8">
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0F2A44] to-[#1E3A8A] p-10 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
              <div className="md:col-span-3 space-y-6">
                <h3 className="text-2xl font-bold text-white tracking-tight">开始智能合规扫描</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  支持上传 Word, PDF 或 图片格式。AI 将自动提取关键事实，校验引用条文的现行有效性，并对比律所历史高分范本，输出多维度合规分析报告。
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div 
                    onClick={() => onNavigate?.('compliance_uploader')}
                    className="flex-1 min-w-[200px] bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center border-dashed group hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all"
                  >
                    <Upload size={32} className="text-brand-primary mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-bold text-white">点击或拖拽文件上传</p>
                    <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-tight">上传上限 50MB</p>
                  </div>
                  <div className="flex-1 min-w-[200px] bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center group hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all">
                    <FileSearch size={32} className="text-brand-primary mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-bold text-white">从案件/文书库选择</p>
                    <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-tight">快速校验回传</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 hidden md:block">
                <div className="w-full h-full flex items-center justify-center opacity-20">
                  <ShieldCheck size={180} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tasks List */}
          <div className="space-y-4">
            <div className="flex items-center gap-8 border-b border-border">
               <button 
                 onClick={() => setActiveTab('recent')}
                 className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'recent' ? 'text-brand-primary' : 'text-text-light hover:text-text-secondary'}`}
               >
                 近期检测任务
                 {activeTab === 'recent' && <motion.div layoutId="compTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
               </button>
               <button 
                 onClick={() => setActiveTab('stats')}
                 className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'stats' ? 'text-brand-primary' : 'text-text-light hover:text-text-secondary'}`}
               >
                 风险洞察分析
                 {activeTab === 'stats' && <motion.div layoutId="compTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
               </button>
            </div>

             <div className="card-base overflow-hidden border-slate-200">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest w-1/3">文书名称 / 分类</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">综合得分</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">风险状况</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">问题分布</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_REPORTS.map((report, i) => {
                      const config = getStatusConfig(report.status);
                      const StatusIcon = config.icon;
                      return (
                        <motion.tr 
                          key={report.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => handleViewDetails(report.id)}
                          className="h-16 hover:bg-blue-50/30 transition-colors cursor-pointer group"
                        >
                          <td className="px-6 py-4">
                             <div className="flex flex-col">
                                <span className="text-sm font-bold text-brand-deep group-hover:text-brand-primary transition-colors">{report.docName}</span>
                                <span className="text-[10px] text-text-light">{report.type}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className={`text-sm font-mono font-bold ${report.score >= 90 ? 'text-emerald-500' : report.score >= 70 ? 'text-blue-500' : 'text-red-500'}`}>
                                  {report.score}
                                </div>
                                <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                                   <div className={`h-full ${report.score >= 90 ? 'bg-emerald-500' : report.score >= 70 ? 'bg-blue-500' : 'bg-red-500'}`} style={{ width: `${report.score}%` }} />
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold transition-colors ${config.color} ${config.bg} ${config.border}`}>
                                <StatusIcon size={12} />
                                {config.text}
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-text-secondary flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                  {report.issuesCount} 处建议
                                </span>
                                {report.criticalIssues > 0 && (
                                  <span className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                                    {report.criticalIssues} 处致命
                                  </span>
                                )}
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button className="p-2 hover:text-brand-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100">
                                 <Download size={16} />
                               </button>
                               <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetails(report.id);
                                }}
                                className="flex items-center gap-1 text-xs font-bold text-brand-primary hover:bg-brand-primary/5 px-3 py-1.5 rounded-lg transition-all"
                               >
                                  <span>详情</span>
                                  <ChevronRight size={14} />
                               </button>
                             </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="lg:col-span-4 space-y-6">
           <div className="card-base p-8 space-y-8">
              <div className="flex items-center justify-between">
                 <h4 className="text-sm font-bold text-brand-deep">检测维度分布</h4>
                 <TrendingUp size={16} className="text-brand-primary" />
              </div>
              
              <div className="space-y-6">
                 {[
                   { label: '法律条文匹配度', value: 95, color: 'bg-emerald-500' },
                   { label: '事实表述一致性', value: 82, color: 'bg-brand-primary' },
                   { label: '时效性/现行有效性', value: 99, color: 'bg-blue-500' },
                   { label: '逻辑漏洞扫描', value: 74, color: 'bg-orange-500' },
                 ].map((item, i) => (
                   <div key={i}>
                     <div className="flex justify-between text-[11px] mb-1.5">
                       <span className="text-slate-600 font-bold">{item.label}</span>
                       <span className="text-brand-primary font-bold">{item.value}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${item.value}%` }}
                         transition={{ duration: 1, delay: i * 0.1 }}
                         className={`h-full ${item.color}`}
                       />
                     </div>
                   </div>
                 ))}
              </div>

              <div className="pt-4 border-t border-slate-50">
                 <p className="text-[10px] text-text-light leading-relaxed">
                    * 数据基于律所近 30 日内检测的 1,200+ 份文书生成的综合分析结果。
                 </p>
              </div>
           </div>

           <div className="ai-tip-card p-6 border-none shadow-light">
              <div className="flex items-center gap-2 text-danger mb-3">
                 <ShieldAlert size={16} />
                 <h4 className="text-xs font-bold uppercase tracking-widest">高频风险预警</h4>
              </div>
              <p className="text-[11px] font-bold text-brand-deep/80 leading-relaxed italic mb-4">
                 注意：检测到历史文书中存在高频引用的废止法条《最高人民法院关于适用〈中华人民共和国婚姻法〉若干问题的解释（二）》，建议全所范围内同步清理。
              </p>
              <button className="text-[10px] font-bold text-brand-primary hover:underline flex items-center gap-1">
                立即前往知识库调优 <ArrowUpRight size={12} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
