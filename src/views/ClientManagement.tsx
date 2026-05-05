/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  Building, 
  UserPlus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Tag, 
  ExternalLink,
  ChevronRight,
  Star,
  CheckCircle2,
  Clock,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';

interface Client {
  id: string;
  name: string;
  type: 'individual' | 'corporate';
  status: 'potential' | 'active' | 'vip' | 'inactive';
  contact: string;
  phone: string;
  email: string;
  caseCount: number;
  lastFollowUp: string;
}

const MOCK_CLIENTS: Client[] = [
  { id: '1', name: '上海某实业有限公司', type: 'corporate', status: 'vip', contact: '张总', phone: '138****0011', email: 'zhang@industry.com', caseCount: 8, lastFollowUp: '2026-05-01' },
  { id: '2', name: '李晓明', type: 'individual', status: 'active', contact: '本人', phone: '139****2233', email: 'xiaoming@foxmail.com', caseCount: 2, lastFollowUp: '2026-05-02' },
  { id: '3', name: '北京某教育科技集团', type: 'corporate', status: 'active', contact: '王经理', phone: '010-88**9900', email: 'wang@edu-tech.cn', caseCount: 15, lastFollowUp: '2026-04-30' },
  { id: '4', name: '赵大宝', type: 'individual', status: 'potential', contact: '本人', phone: '150****5566', email: 'dabaozhao@outlook.com', caseCount: 0, lastFollowUp: '2026-05-02' },
  { id: '5', name: '深圳某贸易商行', type: 'corporate', status: 'inactive', contact: '陈先生', phone: '0755-22**1111', email: 'chen@trade-sz.com', caseCount: 4, lastFollowUp: '2025-12-20' },
];

interface ClientManagementProps {
  onNavigate?: (tab: string) => void;
}

export default function ClientManagement({ onNavigate }: ClientManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'individual' | 'corporate'>('all');

  const filteredClients = MOCK_CLIENTS.filter(c => {
    const matchesSearch = c.name.includes(searchTerm) || c.contact.includes(searchTerm) || c.phone.includes(searchTerm);
    const matchesTab = activeTab === 'all' || c.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'active': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'potential': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'inactive': return 'bg-slate-50 text-slate-400 border-slate-200';
      default: return 'bg-slate-50 text-slate-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'vip': return '核心 VIP';
      case 'active': return '活跃客户';
      case 'potential': return '潜在意向';
      case 'inactive': return '流失/沉默';
      default: return '未知';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-brand-deep">客案管理中心</h2>
          <p className="text-xs text-text-light">客户资产数字化管理，建立深度业务连接与存量价值挖掘</p>
        </div>
        <button 
          onClick={() => onNavigate?.('client_editor')}
          className="btn-primary h-10 px-4 active:scale-95 transition-all"
        >
          <UserPlus size={18} />
          <span>录入新客户</span>
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 border-l-4 border-l-brand-primary">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-primary flex items-center justify-center">
              <Users size={24} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-brand-deep">1,284</h3>
          <p className="text-xs text-text-light">全库注册客户总数</p>
        </div>
        
        <div className="card p-6 border-l-4 border-l-amber-400">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star size={24} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">稳定</span>
          </div>
          <h3 className="text-2xl font-bold text-brand-deep">56</h3>
          <p className="text-xs text-text-light">核心 VIP 及长期顾问客户</p>
        </div>

        <div className="card p-6 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">活跃</span>
          </div>
          <h3 className="text-2xl font-bold text-brand-deep">89.4%</h3>
          <p className="text-xs text-text-light">意向转化效率 (近30日)</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="card p-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('all')}
            className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'all' ? 'bg-white text-brand-primary shadow-sm' : 'text-text-secondary hover:text-brand-primary'}`}
          >
            全部客户
          </button>
          <button 
            onClick={() => setActiveTab('corporate')}
            className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'corporate' ? 'bg-white text-brand-primary shadow-sm' : 'text-text-secondary hover:text-brand-primary'}`}
          >
            企业客户
          </button>
          <button 
            onClick={() => setActiveTab('individual')}
            className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'individual' ? 'bg-white text-brand-primary shadow-sm' : 'text-text-secondary hover:text-brand-primary'}`}
          >
            个人客户
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input 
              type="text" 
              placeholder="搜索名称、联系人、电话..."
              className="h-10 w-full md:w-64 pl-10 pr-4 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 ring-brand-primary/20 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary h-10 w-10 p-0 shrink-0">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredClients.map((client, idx) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="card p-5 group hover:border-brand-primary/40 flex items-start gap-4 transition-all relative overflow-hidden"
          >
            <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${client.type === 'corporate' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {client.type === 'corporate' ? <Building size={24} /> : <Users size={24} />}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-brand-deep truncate max-w-[200px]">{client.name}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${getStatusStyle(client.status)}`}>
                    {getStatusText(client.status)}
                  </span>
                </div>
                <button className="text-text-light hover:text-brand-primary opacity-0 group-hover:opacity-100 transition-all">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Mail size={14} className="text-slate-400" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Phone size={14} className="text-slate-400" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Briefcase size={14} className="text-slate-400" />
                  <span>关联案件 <b className="text-brand-primary">{client.caseCount}</b> 件</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Clock size={14} className="text-slate-400" />
                  <span>最后跟进 {client.lastFollowUp}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                     <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold">JD</div>
                     <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-600">LS</div>
                   </div>
                   <span className="text-[10px] text-text-light">负责律师: 刘德华 等</span>
                </div>
                <button 
                  onClick={() => onNavigate?.('firm_cases')}
                  className="flex items-center gap-1 text-[10px] font-bold text-brand-primary hover:bg-brand-primary/5 px-2 py-1 rounded transition-colors"
                >
                  <span>查看全案卷宗</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
            
            {client.status === 'vip' && (
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-amber-400 rotate-45 flex items-end justify-center pb-1">
                <Star size={10} className="text-white" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredClients.length === 0 && (
         <div className="py-20 flex flex-col items-center justify-center text-text-light card">
            <Users size={48} className="text-slate-200 mb-4" />
            <p className="text-sm">未找到符合搜索条件的客户</p>
         </div>
      )}
    </div>
  );
}
