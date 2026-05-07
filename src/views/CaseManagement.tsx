/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  FolderOpen, 
  FileText, 
  MoreHorizontal, 
  Plus, 
  ChevronRight,
  Clock,
  User,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  History,
  Download
} from 'lucide-react';
import { motion } from 'motion/react';

interface Case {
  id: string;
  caseNo: string;
  title: string;
  client: string;
  type: string;
  status: 'active' | 'closed' | 'archived';
  updateTime: string;
  docCount: number;
}

const MOCK_CASES: Case[] = [
  { id: '1', caseNo: '(2026)京01民初102号', title: '张三与李四民间借贷纠纷案', client: '张三', type: '民间借贷', status: 'active', updateTime: '2026-05-02 10:30', docCount: 5 },
  { id: '2', caseNo: '(2026)沪01民初882号', title: '某科技公司劳动争议补偿案', client: '上海某科技有限公司', type: '劳动争议', status: 'active', updateTime: '2026-05-02 09:15', docCount: 3 },
  { id: '3', caseNo: '(2025)粤03民初451号', title: '王五离婚财产分割纠纷案', client: '王五', type: '婚姻家庭', status: 'closed', updateTime: '2026-04-28 16:40', docCount: 12 },
  { id: '4', caseNo: '(2026)浙01民初293号', title: '某地产公司房屋拆迁补偿案', client: '某房地产有限公司', type: '房地产纠纷', status: 'active', updateTime: '2026-05-01 14:20', docCount: 8 },
  { id: '5', caseNo: '(2025)苏01民特92号', title: '陈某专利权侵权纠纷预警案', client: '陈某', type: '知识产权', status: 'archived', updateTime: '2025-12-15 11:00', docCount: 4 },
];

interface CaseManagementProps {
  onNavigate?: (tab: string) => void;
  initialSearchTerm?: string;
}

export default function CaseManagement({ onNavigate, initialSearchTerm = '' }: CaseManagementProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'closed' | 'archived'>('all');

  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
    setCurrentPage(1); // Reset to first page on search change from prop
  }, [initialSearchTerm]);

  const filteredCases = MOCK_CASES.filter(c => {
    const matchesSearch = c.title.includes(searchTerm) || c.caseNo.includes(searchTerm) || c.client.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCases.length / itemsPerPage));
  const currentCases = filteredCases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle filter changes to reset page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'closed': return 'bg-slate-50 text-slate-500 border-slate-200';
      case 'archived': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '进行中';
      case 'closed': return '已结案';
      case 'archived': return '已归档';
      default: return '未知';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">案件与文书中心</h2>
          <p className="text-xs text-text-light">全生命周期跟踪律所承办案件及关联法律文书</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary h-10 px-4">
            <Download size={18} />
            <span>导出报表</span>
          </button>
          <button 
            onClick={() => onNavigate?.('case_editor')}
            className="btn-primary h-10 px-4 active:scale-95 transition-all"
          >
            <Plus size={18} />
            <span>新建案件</span>
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '正在办理案件', value: '42', icon: FolderOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '今日新增文书', value: '18', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '风控预警提醒', value: '03', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: '已完成结案', value: '1,284', icon: ShieldCheck, color: 'text-brand-primary', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <div key={i} className="card p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-xs text-text-light mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-brand-deep">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input 
              type="text" 
              placeholder="搜索案号、案由或客户..."
              className="h-10 w-full md:w-72 pl-10 pr-4 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 ring-brand-primary/20 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0">
            {['all', 'active', 'closed', 'archived'].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  statusFilter === f 
                    ? 'bg-white text-brand-primary shadow-sm' 
                    : 'text-text-secondary hover:text-brand-primary'
                }`}
              >
                {f === 'all' ? '全部' : getStatusText(f)}
              </button>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand-primary font-medium transition-colors md:px-2">
          <Filter size={16} />
          <span>高级搜索</span>
        </button>
      </div>

      {/* Case List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">案件信息</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">案件类型</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">当前状态</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">文书数量</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">更新时间</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentCases.map((c, idx) => (
                <motion.tr 
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                  onClick={() => onNavigate?.('case_details')}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-brand-deep group-hover:text-brand-primary transition-colors">{c.title}</span>
                      <span className="text-[10px] text-text-light font-mono bg-slate-100 w-fit px-1.5 py-0.5 rounded">{c.caseNo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FolderOpen size={14} className="text-slate-400" />
                      <span className="text-sm text-text-secondary">{c.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-1 rounded-full border font-bold ${getStatusBadge(c.status)}`}>
                      {getStatusText(c.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <FileText size={14} className="text-brand-primary" />
                      <span className="text-sm font-bold text-brand-primary">{c.docCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-text-light">
                      <Clock size={12} />
                      {c.updateTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={(e) => { e.stopPropagation(); /* handle history click */ }}
                         className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-text-light hover:text-brand-primary transition-all border border-transparent hover:border-border"
                       >
                         <History size={16} />
                       </button>
                       <button 
                         onClick={(e) => { e.stopPropagation(); onNavigate?.('case_details'); }} 
                         className="flex items-center gap-1 text-xs font-bold text-brand-primary h-8 px-3 rounded-md hover:bg-brand-primary/5 transition-colors"
                       >
                         <span>详情</span>
                         <ChevronRight size={14} />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCases.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-text-light">
            <FolderOpen size={48} className="text-slate-200 mb-4" />
            <p className="text-sm">未找到相关案件</p>
          </div>
        )}

        <div className="px-6 py-4 bg-slate-50 border-t border-border flex items-center justify-between">
          <p className="text-xs text-text-light">
            显示第 {(currentPage - 1) * itemsPerPage + 1} 到 {Math.min(currentPage * itemsPerPage, filteredCases.length)} 条，共 {filteredCases.length} 条记录
          </p>
          {totalPages > 0 && (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 px-3 rounded text-xs font-medium border border-border bg-white text-text-secondary hover:text-brand-primary disabled:opacity-50 disabled:hover:text-text-secondary transition-all"
              >
                上一页
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                // Show first, last, current, and adjacent pages
                if (
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button 
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 rounded text-xs font-bold transition-all ${
                        currentPage === page 
                          ? 'bg-brand-primary text-white shadow-sm shadow-brand-primary/20' 
                          : 'border border-border bg-white text-text-secondary hover:text-brand-primary'
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
                
                // Show ellipsis
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={`ellipsis-${page}`} className="text-slate-400">...</span>;
                }
                
                return null;
              })}

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8 px-3 rounded text-xs font-medium border border-border bg-white text-text-secondary hover:text-brand-primary disabled:opacity-50 disabled:hover:text-text-secondary transition-all"
              >
                下一页
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
