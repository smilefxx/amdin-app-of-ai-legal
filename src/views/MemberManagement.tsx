/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Shield, 
  ChevronRight,
  UserCheck,
  Briefcase,
  Star,
  Award,
  CircleDot,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';

interface Member {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'busy' | 'away';
  caseLoad: number;
  joinDate: string;
}

interface MemberManagementProps {
  onNavigate?: (tab: string) => void;
  members?: Member[];
  onSelectMember?: (id: string, tab?: string) => void;
}

export default function MemberManagement({ onNavigate, members = [], onSelectMember }: MemberManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'partner' | 'associate' | 'assistant' | 'admin'>('all');

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.includes(searchTerm) || m.department.includes(searchTerm);
    const matchesFilter = activeFilter === 'all' || m.role === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'partner': return { text: '权益合伙人', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: Star };
      case 'associate': return { text: '执业律师', color: 'text-blue-600 bg-blue-50 border-blue-100', icon: Award };
      case 'assistant': return { text: '律师助理', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: UserCheck };
      case 'admin': return { text: '系统管理员', color: 'text-slate-600 bg-slate-50 border-slate-100', icon: Shield };
      default: return { text: '成员', color: 'text-slate-400 bg-slate-50 border-slate-100', icon: CircleDot };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'busy': return 'bg-amber-500';
      case 'away': return 'bg-slate-300';
      default: return 'bg-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-brand-deep">团队成员管理</h2>
          <p className="text-xs text-text-light">数字化律所人才资产管理，合理分配资源与协同权限</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate?.('permission_management')}
            className="btn-secondary h-10 px-4 active:scale-95 transition-all"
          >
            <Shield size={18} />
            <span>权限策略</span>
          </button>
          <button 
            onClick={() => onNavigate?.('member_editor')}
            className="btn-primary h-10 px-4 active:scale-95 transition-all"
          >
            <UserPlus size={18} />
            <span>添加成员</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '总人数', value: '48', desc: '活跃账号: 45' },
          { label: '合伙人', value: '08', desc: '高级管理权' },
          { label: '执业律师', value: '26', desc: '业务核心力量' },
          { label: '待处理申请', value: '03', desc: '人事流程中' },
        ].map((stat, i) => (
          <div key={i} className="card p-4 bg-gradient-to-br from-white to-slate-50/50">
            <p className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-brand-deep">{stat.value}</p>
            <p className="text-[10px] text-brand-primary font-medium mt-1">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="card p-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl scrollbar-hide overflow-x-auto w-full md:w-auto">
          {['all', 'partner', 'associate', 'assistant'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f as any)}
              className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
                activeFilter === f ? 'bg-white text-brand-primary shadow-sm' : 'text-text-secondary hover:text-brand-primary'
              }`}
            >
              {f === 'all' ? '全部成员' : getRoleLabel(f).text}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
          <input 
            type="text" 
            placeholder="搜索成员姓名、部门..."
            className="h-10 w-full pl-10 pr-4 bg-white border border-border rounded-xl text-sm outline-none focus:ring-2 ring-brand-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMembers.map((member, i) => {
          const roleInfo = getRoleLabel(member.role);
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelectMember?.(member.id, 'member_details')}
              className="card overflow-hidden group hover:border-brand-primary/40 transition-all cursor-pointer active:scale-[0.98]"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-brand-deep font-bold text-xl relative z-10 border-2 border-white shadow-sm">
                      {member.name.substring(0, 1)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white z-20 ${getStatusColor(member.status)}`} />
                  </div>
                  <button className="text-text-light hover:text-brand-primary p-1">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-bold text-brand-deep flex items-center gap-2">
                    {member.name}
                    <roleInfo.icon size={14} className="text-brand-primary" />
                  </h4>
                  <p className="text-xs text-text-light">{member.department}</p>
                </div>

                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold mb-6 ${roleInfo.color}`}>
                   <roleInfo.icon size={12} />
                   {roleInfo.text}
                </div>

                <div className="space-y-2 mb-6">
                   <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Mail size={14} className="text-slate-400" />
                      <span>{member.email}</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Phone size={14} className="text-slate-400" />
                      <span>{member.phone}</span>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-brand-primary" />
                      <span className="text-xs font-bold text-brand-deep">办案中: {member.caseLoad}</span>
                   </div>
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       onSelectMember?.(member.id, 'member_permissions');
                     }}
                     className="flex items-center gap-1 text-[10px] font-bold text-brand-primary group/btn hover:underline"
                   >
                      <span>权限管理</span>
                      <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-text-light card bg-slate-50/20">
           <CircleDot size={48} className="text-slate-200 mb-4" />
           <p className="text-sm">未找到匹配的团队成员</p>
        </div>
      )}
    </div>
  );
}
