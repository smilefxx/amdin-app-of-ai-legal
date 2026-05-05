/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';

interface Transaction {
  id: string;
  orderNo: string;
  client: string;
  caseTitle: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  category: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', orderNo: 'ORD-2026-001', client: '上海某实业公司', caseTitle: '民事借贷纠纷服务费', amount: 50000.00, type: 'income', status: 'paid', date: '2026-05-02', category: '律师服务费' },
  { id: '2', orderNo: 'ORD-2026-002', client: '李晓明', caseTitle: '劳动争议代理首笔款', amount: 8000.00, type: 'income', status: 'pending', date: '2026-05-03', category: '案件代理费' },
  { id: '3', orderNo: 'EXP-2026-105', client: '办公物管', caseTitle: '5月份办公室租赁费', amount: -12500.00, type: 'expense', status: 'paid', date: '2026-05-01', category: '行政支出' },
  { id: '4', orderNo: 'ORD-2026-003', client: '某教育科技集团', caseTitle: '年度法律顾问费 Q2', amount: 120000.00, type: 'income', status: 'overdue', date: '2026-04-15', category: '法律顾问' },
  { id: '5', orderNo: 'EXP-2026-106', client: '阿里云', caseTitle: '云服务器续费', amount: -2800.00, type: 'expense', status: 'paid', date: '2026-04-28', category: 'IT服务' },
  { id: '6', orderNo: 'ORD-2026-004', client: '张三', caseTitle: '文书起草代办费', amount: 3500.00, type: 'income', status: 'paid', date: '2026-05-01', category: '文书服务' },
];

interface FinanceBillingProps {
  onNavigate?: (tab: string) => void;
}

export default function FinanceBilling({ onNavigate }: FinanceBillingProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'income' | 'expense' | 'pending'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = MOCK_TRANSACTIONS.filter(t => {
    const matchesSearch = t.client.includes(searchTerm) || t.caseTitle.includes(searchTerm) || t.orderNo.includes(searchTerm);
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'income' && t.type === 'income') || 
      (activeFilter === 'expense' && t.type === 'expense') ||
      (activeFilter === 'pending' && t.status === 'pending');
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'pending': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-slate-400 bg-slate-50 border-slate-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return '已结算';
      case 'pending': return '待支付';
      case 'overdue': return '已逾期';
      default: return '未知';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-brand-deep">财务与结算中心</h2>
          <p className="text-xs text-text-light">律所营收管理、往来款项核算与自动化账单跟踪</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate?.('statement_export')}
            className="btn-secondary h-10 px-4"
          >
            <Download size={18} />
            <span>导出对账单</span>
          </button>
          <button 
            onClick={() => onNavigate?.('billing_creator')}
            className="btn-primary h-10 px-4"
          >
            <Plus size={18} />
            <span>创建账单</span>
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5 bg-gradient-to-br from-brand-deep to-slate-900 text-white border-none shadow-lg shadow-brand-deep/20">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
              <Wallet size={20} className="text-brand-primary" />
            </div>
            <ArrowUpRight size={18} className="text-emerald-400" />
          </div>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">本月总营收</p>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold opacity-70">¥</span>
            <h3 className="text-2xl font-bold">428,500.00</h3>
          </div>
          <p className="text-[10px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
            +14.5% <span className="opacity-60 font-medium">较上月同期</span>
          </p>
        </div>

        {[
          { label: '待回款金额', value: '184,200', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', footer: '共 12 笔待收' },
          { label: '已超期金额', value: '120,000', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', footer: '需要催收' },
          { label: '本月行政支出', value: '35, connection800', icon: TrendingDown, color: 'text-slate-600', bg: 'bg-slate-50', footer: '预算内' },
        ].map((stat, i) => (
          <div key={i} className="card p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <button className="text-text-light hover:text-brand-primary">
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-bold text-text-light">¥</span>
                <p className="text-xl font-bold text-brand-deep">{stat.value}</p>
              </div>
            </div>
            <p className="text-[10px] text-text-light mt-3">{stat.footer}</p>
          </div>
        ))}
      </div>

      {/* Filter & List Column */}
      <div className="card">
        <div className="p-4 border-b border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto scrollbar-hide">
             {[
               { id: 'all', label: '全部流水' },
               { id: 'income', label: '收入' },
               { id: 'expense', label: '支出' },
               { id: 'pending', label: '待回款' },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveFilter(tab.id as any)}
                 className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                   activeFilter === tab.id ? 'bg-white text-brand-primary shadow-sm' : 'text-text-secondary hover:text-brand-primary'
                 }`}
               >
                 {tab.label}
               </button>
             ))}
          </div>
          <div className="relative w-full md:w-64">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
             <input 
               type="text" 
               placeholder="搜客户、订单或案号..."
               className="h-10 w-full pl-10 pr-4 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 ring-brand-primary/20"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead>
                <tr className="bg-slate-50/50">
                   <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase">账单明细</th>
                   <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase text-right">金额</th>
                   <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase text-center">状态</th>
                   <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase">分类</th>
                   <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase">时间</th>
                   <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase text-right">操作</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-border">
                {filteredTransactions.map((tr, idx) => (
                  <motion.tr 
                    key={tr.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  >
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tr.type === 'income' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-500'}`}>
                              {tr.type === 'income' ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-sm font-bold text-brand-deep group-hover:text-brand-primary transition-colors">{tr.client}</span>
                              <span className="text-[10px] text-text-light truncate max-w-[150px]">{tr.caseTitle}</span>
                              <span className="text-[9px] text-slate-300 font-mono mt-0.5">{tr.orderNo}</span>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <span className={`text-sm font-bold font-mono ${tr.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                           {tr.type === 'income' ? '+' : ''}{tr.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-center">
                        <span className={`text-[10px] px-2 py-1 rounded-full border font-bold ${getStatusBadge(tr.status)}`}>
                           {getStatusText(tr.status)}
                        </span>
                     </td>
                     <td className="px-6 py-4">
                        <span className="text-[11px] text-text-secondary font-medium px-2 py-1 bg-slate-100 rounded">{tr.category}</span>
                     </td>
                     <td className="px-6 py-4">
                        <span className="text-xs text-text-light font-mono">{tr.date}</span>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                           <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-text-light hover:text-brand-primary transition-all border border-transparent hover:border-border">
                              <FileText size={16} />
                           </button>
                           <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-text-light hover:text-brand-primary transition-all border border-transparent hover:border-border">
                              <MoreHorizontal size={16} />
                           </button>
                        </div>
                     </td>
                  </motion.tr>
                ))}
             </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-text-light">
             <CreditCard size={48} className="text-slate-200 mb-4" />
             <p className="text-sm font-medium">未找到匹配的流水记录</p>
          </div>
        )}

        <div className="px-6 py-4 bg-slate-50 border-t border-border flex items-center justify-between">
          <p className="text-xs text-text-light text-medium">共 {filteredTransactions.length} 条记录</p>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 rounded text-xs font-bold border border-border bg-white text-text-secondary hover:text-brand-primary transition-colors disabled:opacity-50" disabled>上一页</button>
            <button className="h-8 w-8 rounded text-xs font-bold bg-brand-primary text-white shadow-sm shadow-brand-primary/20">1</button>
            <button className="h-8 px-3 rounded text-xs font-bold border border-border bg-white text-text-secondary hover:text-brand-primary transition-colors disabled:opacity-50" disabled>下一页</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        <div className="card p-6 bg-slate-50/50 border-dashed border-2">
          <h4 className="text-sm font-bold text-brand-deep mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-brand-primary" />
            快速核账提示
          </h4>
          <div className="space-y-3">
             {[
               { text: '您有 3 笔咨询费用已超期 15 天，建议发起催款通知。', color: 'text-red-600' },
               { text: '本季度「商事合同」收入占总营收 62%，高于平均水平。', color: 'text-text-secondary' },
               { text: '今日有 1 笔大额待确认收款（¥85,000.00），请核对。', color: 'text-brand-primary' },
             ].map((tip, i) => (
               <div key={i} className="flex gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                 <p className={`text-xs ${tip.color}`}>{tip.text}</p>
               </div>
             ))}
          </div>
        </div>
        <div className="card p-6 flex flex-col items-center justify-center text-center space-y-4">
           <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
             <DollarSign size={32} className="text-brand-primary" />
           </div>
           <div>
             <h4 className="font-bold text-brand-deep">连接支付通道</h4>
             <p className="text-xs text-text-light max-w-xs mx-auto mt-1 leading-relaxed">
               集成 支付宝/微信/银联 支付接入，支持客户扫描文书二维码直接结账，流水自动对账入库。
             </p>
           </div>
           <button className="btn-primary h-9 px-6 text-xs shadow-md">立即申请开通</button>
        </div>
      </div>
    </div>
  );
}
