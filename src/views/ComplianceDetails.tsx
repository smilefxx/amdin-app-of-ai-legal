/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  CheckCircle2,
  FileText,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Search,
  Download,
  Share2,
  Printer,
  ChevronRight,
  Target,
  Gavel,
  BookOpen,
  Edit3
} from 'lucide-react';
import { motion } from 'motion/react';

interface ComplianceDetailsProps {
  onBack: () => void;
  reportId?: string | null;
}

export default function ComplianceDetails({ onBack, reportId }: ComplianceDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'clauses' | 'suggests'>('overview');

  const report = {
    id: reportId || 'SCAN_9921',
    fileName: '某科技公司经济纠纷起诉状.docx',
    scanDate: '2026-05-04 14:30',
    score: 78,
    summary: '文书整体逻辑清晰，但在证据关联性描述及部分赔偿金额计算依据上存在合规瑕疵。建议针对司法解释中的最新限额进行微调。',
    risks: [
      { id: 1, type: 'procedural', level: 'medium', title: '管辖权依据不充分', desc: '文书未明确约定协议管辖，建议补充原告所在地或被告住所地的管辖依据说明。' },
      { id: 2, type: 'substantive', level: 'high', title: '违约金计算标准过高', desc: '根据《民法典》及司法解释，违约金超过造成损失的 30% 可能被判定为过高。' },
      { id: 3, type: 'evidence', level: 'low', title: '证人证言格式不规范', desc: '附件中证人身份证复印件未注明“与原件核对无异”。' },
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Top Navbar */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors font-bold text-sm"
        >
          <ArrowLeft size={18} />
          返回检测详情
        </button>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-brand-primary transition-all flex items-center justify-center">
            <Share2 size={18} />
          </button>
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-brand-primary transition-all flex items-center justify-center">
            <Printer size={18} />
          </button>
          <button className="flex items-center gap-2 px-6 h-11 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-brand-primary/20">
            <Download size={16} />
            下载分析报告
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Stats Card */}
        <div className="space-y-6">
           <div className="card p-8 bg-brand-deep text-white border-none shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/20 via-transparent to-transparent opacity-50"></div>
              <div className="relative text-center space-y-6">
                 <div className="inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-white/10 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-brand-primary border-t-transparent -rotate-45"></div>
                    <span className="text-4xl font-mono font-bold leading-none">{report.score}</span>
                    <span className="text-[10px] font-bold text-white/40 mt-1 uppercase">合规分值</span>
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-lg font-bold">一般风险等级</h3>
                    <p className="text-[10px] text-white/50 tracking-widest uppercase">Risk Rating: Yellow</p>
                 </div>
                 <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-bold">
                    <span className="text-white/40">报告编号</span>
                    <span className="font-mono">{report.id}</span>
                 </div>
              </div>
           </div>

           <div className="card p-6 space-y-4">
              <h4 className="text-xs font-bold text-brand-deep uppercase tracking-widest">检索依据库</h4>
              <div className="space-y-3">
                 {[
                   { label: '最高院司法解释 2026', icon: Gavel, color: 'text-blue-500' },
                   { label: '执业道德负面清单', icon: Target, color: 'text-red-500' },
                   { label: '本所合规模版库', icon: BookOpen, color: 'text-emerald-500' }
                 ].map(source => (
                   <div key={source.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <source.icon size={14} className={source.color} />
                      <span className="text-[10px] font-bold text-text-secondary">{source.label}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="card p-6 bg-slate-50 border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                 <MessageSquare size={16} className="text-brand-primary" />
                 <h4 className="text-[11px] font-bold text-brand-deep">专家复核服务</h4>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed mb-4">
                 对 AI 扫描结果存疑？可一键指派给律所【风控合伙人】进行人工二次复核。
              </p>
              <button className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-[10px] font-bold text-brand-deep hover:bg-slate-50 transition-all">
                 提交人工复核申请
              </button>
           </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
           {/* Summary Section */}
           <div className="card p-8 bg-white space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Zap size={20} />
                 </div>
                 <h3 className="text-lg font-bold text-brand-deep">AI 核心综述</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed bg-brand-ice/50 p-5 rounded-2xl border border-brand-primary/5">
                 {report.summary}
              </p>
           </div>

           {/* Tabs */}
           <div className="flex items-center bg-slate-100 p-1 rounded-2xl w-fit">
              {[
                { id: 'overview', label: '风险排查点', icon: ShieldCheck },
                { id: 'clauses', label: '法源参考', icon: Gavel },
                { id: 'suggests', label: '纠正性建议', icon: Edit3 },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id ? 'bg-white text-brand-primary shadow-sm' : 'text-text-secondary hover:text-brand-primary'
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
           </div>

           {/* Risk Cards */}
           <div className="space-y-4">
              {report.risks.map((risk, i) => (
                <motion.div 
                  key={risk.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-8 bg-white group hover:border-brand-primary/30 transition-all cursor-default"
                >
                   <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${risk.level === 'high' ? 'bg-red-50 text-red-500' : risk.level === 'medium' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'} border border-current/10`}>
                            <AlertTriangle size={24} />
                         </div>
                         <div>
                            <h4 className="text-base font-bold text-brand-deep">{risk.title}</h4>
                            <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">{risk.type === 'procedural' ? '程序性合规项' : '实体性法律风险'}</span>
                         </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${risk.level === 'high' ? 'bg-red-500 text-white' : risk.level === 'medium' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
                         {risk.level === 'high' ? 'Critical' : risk.level === 'medium' ? 'Warning' : 'Info'}
                      </span>
                   </div>
                   <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {risk.desc}
                   </p>
                   <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-6">
                         <button className="text-[11px] font-bold text-brand-primary hover:underline flex items-center gap-1">
                            查阅相关法条 <ChevronRight size={14} />
                         </button>
                         <button className="text-[11px] font-bold text-brand-primary hover:underline flex items-center gap-1">
                            查看修改示例 <ChevronRight size={14} />
                         </button>
                      </div>
                      <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-slate-50 text-brand-deep text-[11px] font-bold hover:bg-slate-100 transition-all border border-slate-100">
                         <CheckCircle2 size={14} className="text-emerald-500" />
                         标记为已优化
                      </button>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
