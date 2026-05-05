/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  User,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Ticket } from '@/src/types';

const MOCK_TICKETS: Ticket[] = [
  { id: 'TK-10023', title: '文书预览显示 HTML 源码', type: '系统异常', priority: 'high', status: 'pending', user: '张三律师', createdAt: '2026-05-01 10:20' },
  { id: 'TK-10024', title: '会员费用余额无法同步', type: '支付问题', priority: 'medium', status: 'processing', user: '某某律师事务所', createdAt: '2026-05-01 09:15' },
  { id: 'TK-10025', title: '建议增加离婚协议模板', type: '模板需求', priority: 'low', status: 'resolved', user: '李四', createdAt: '2026-04-30 15:40' },
  { id: 'TK-10026', title: 'AI 合同审核逻辑偏差', type: '文书生成问题', priority: 'high', status: 'processing', user: '王五律师', createdAt: '2026-04-30 14:00' },
  { id: 'TK-10027', title: '无法登录，提示账号冻结', type: '账号问题', priority: 'high', status: 'pending', user: '赵六', createdAt: '2026-04-30 11:20' },
];

interface IssueCenterProps {
  tickets?: any[];
  onSelectTicket?: (id: string) => void;
}

export default function IssueCenter({ tickets = [], onSelectTicket }: IssueCenterProps) {
  const [filterStatus, setFilterStatus] = useState<string>('全部');

  const filteredTickets = tickets.filter(t => {
    if (filterStatus === '全部') return true;
    if (filterStatus === '待处理') return t.status === 'pending';
    if (filterStatus === '处理中') return t.status === 'processing';
    if (filterStatus === '已解决') return t.status === 'resolved';
    return true;
  });

  const getStatsText = (status: string) => {
    return tickets.filter(t => {
      if (status === '待处理') return t.status === 'pending';
      if (status === '处理中') return t.status === 'processing';
      if (status === '已解决') return t.status === 'resolved';
      return false;
    }).length;
  };

  const stats = [
    { label: '待处理', count: getStatsText('待处理'), color: 'text-brand-primary' },
    { label: '处理中', count: getStatsText('处理中'), color: 'text-amber-500' },
    { label: '已解决', count: getStatsText('已解决'), color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Ticket Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map(s => (
          <div key={s.label} className="card p-6 flex flex-col items-center justify-center text-center">
             <span className="text-sm font-medium text-text-light">{s.label}</span>
             <span className={`text-3xl font-bold mt-1 ${s.color}`}>{s.count}</span>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border">
          <div className="flex items-center gap-2">
            {['全部', '待处理', '处理中', '已解决'].map(s => (
              <button 
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterStatus === s ? 'bg-brand-primary text-white' : 'hover:bg-slate-200 text-text-secondary'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input placeholder="搜索工单单号、标题..." className="h-9 w-60 pl-9 pr-3 bg-white border border-border rounded-md text-xs focus:ring-1 focus:ring-brand-primary outline-none" />
          </div>
        </div>

        <div className="divide-y divide-border">
          {filteredTickets.map((ticket, idx) => (
            <motion.div 
              key={ticket.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelectTicket?.(ticket.id)}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="flex gap-4 items-start min-w-0">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  ticket.status === 'pending' ? 'bg-red-50 text-red-500' :
                  ticket.status === 'processing' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'
                }`}>
                  {ticket.status === 'pending' && <AlertCircle size={20} />}
                  {ticket.status === 'processing' && <Clock size={20} />}
                  {ticket.status === 'resolved' && <CheckCircle2 size={20} />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono font-bold text-text-light px-1.5 py-0.5 bg-slate-100 rounded">{ticket.id}</span>
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full ${
                      ticket.priority === 'high' ? 'bg-red-500 text-white' : 
                      ticket.priority === 'medium' ? 'bg-amber-400 text-white' : 'bg-slate-400 text-white'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <h4 className="font-bold text-brand-deep group-hover:text-brand-primary transition-colors truncate">{ticket.title}</h4>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-[11px] text-text-light">
                      <User size={12} /> {ticket.user}
                    </span>
                    <span className="text-[11px] text-text-light">•</span>
                    <span className="flex items-center gap-1 text-[11px] text-text-light">
                       <MessageSquare size={12} /> {ticket.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 justify-between sm:justify-end">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] text-text-light">提交时间</p>
                  <p className="text-xs font-semibold text-text-secondary">{ticket.createdAt}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTicket?.(ticket.id);
                    }}
                    className="btn-secondary px-3 py-1.5 text-xs"
                  >
                    处理详情
                  </button>
                  <button className="p-2 text-text-light hover:text-brand-primary hover:bg-white rounded-md transition-all">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-border text-center">
          <button className="text-xs text-brand-primary font-bold hover:underline">加载更多已完成工单</button>
        </div>
      </div>
    </div>
  );
}
