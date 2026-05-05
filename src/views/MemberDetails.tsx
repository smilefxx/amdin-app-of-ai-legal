/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  X, 
  Edit3, 
  Shield, 
  Mail, 
  Phone, 
  Award, 
  MapPin, 
  Calendar, 
  Briefcase,
  ChevronRight,
  Star,
  FileText,
  Activity,
  ArrowLeft,
  User,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface MemberDetailsProps {
  onBack: () => void;
  onEdit: () => void;
  onPermissions: () => void;
  member?: any;
}

export default function MemberDetails({ onBack, onEdit, onPermissions, member }: MemberDetailsProps) {
  if (!member) return null;

  // Enhance provided member with some extra fields for the detailed view
  const detailedMember = {
    ...member,
    rating: 4.8 + Math.random() * 0.2,
    caseCount: member.caseLoad * 5 + 10,
    specialization: member.role === 'partner' ? ['并购重组', '风险投资', '股权纠纷'] : ['民商事审判', '劳动争议'],
    bio: `在该成员长期从事${member.department}相关业务，拥有扎实的法学理论功底和丰富的实践经验。在律所内部被广泛认可为核心力量，擅长处理复杂的法律诉讼与非诉业务，多次为客户赢得核心利益。`,
    joinDate: member.joinDate || '2020-03-15'
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-2">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors font-semibold text-sm group"
        >
          <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-brand-primary/10 transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          返回成员目录
        </button>
        <div className="flex items-center gap-2">
          <button 
            onClick={onPermissions}
            className="flex items-center gap-2 px-4 h-9 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:text-amber-600 transition-all shadow-sm"
          >
            <Shield size={14} />
            权限安全
          </button>
          <button 
            onClick={onEdit}
            className="flex items-center gap-2 px-4 h-9 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
          >
            <Edit3 size={14} />
            资料编辑
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        
        {/* Main Content Column */}
        <div className="space-y-6">
          
          {/* Profile Hero Section */}
          <div className="rounded-[24px] bg-white border border-slate-100 shadow-sm overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-100/50">
              <div className="absolute inset-0 opacity-[0.03] animate-pulse" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            </div>
            
            <div className="px-8 pb-8 pt-20 relative">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-end gap-6">
                  <div className="w-28 h-28 rounded-2xl bg-white p-1 shadow-md border border-slate-100 relative z-10">
                    <div className="w-full h-full rounded-xl bg-gradient-to-tr from-brand-primary/10 to-blue-50 flex items-center justify-center text-brand-primary">
                      <User size={40} />
                    </div>
                  </div>
                  <div className="mb-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{detailedMember.name}</h1>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                        {detailedMember.role}
                      </span>
                      {detailedMember.status === 'active' && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] text-emerald-600 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          在线
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-slate-500 text-xs font-medium pt-1">
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> {detailedMember.department}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-400" /> 入职于 {detailedMember.joinDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">执业评分</span>
                    <div className="flex items-center gap-1 text-slate-900">
                      <Star size={16} fill="currentColor" className="text-amber-400" />
                      <span className="text-xl font-bold font-mono">{detailedMember.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">办结案例</span>
                    <span className="text-xl font-bold font-mono text-slate-900">{detailedMember.caseCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Bio Section */}
             <div className="rounded-[24px] bg-white border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      <FileText size={18} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">执业简介</h3>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {detailedMember.bio}
                </p>
                
                <div className="mt-8">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">擅长业务领域</h4>
                  <div className="flex flex-wrap gap-2">
                    {detailedMember.specialization.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
             </div>

             {/* Recent Activity Mini-Timeline */}
             <div className="rounded-[24px] bg-white border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                      <Activity size={18} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">近期办案动态</h3>
                  </div>
                  <button className="text-xs font-bold text-brand-primary hover:text-brand-deep transition-colors">查看全部</button>
                </div>
                
                <div className="space-y-6">
                  {[
                    { label: '提交了新的合同范本审批', time: '2小时前', icon: FileText, color: 'bg-blue-50 text-blue-600 border-blue-100' },
                    { label: '标记了 3 个待办事项为已完成', time: '昨天', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                    { label: '被分配到“某互联网公司股权架构”案件', time: '3天前', icon: Briefcase, color: 'bg-amber-50 text-amber-600 border-amber-100' }
                  ].map((act, i) => (
                    <div key={i} className="flex gap-4 group cursor-default">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${act.color} text-xs border shadow-sm`}>
                           <act.icon size={16} />
                        </div>
                        {i < 2 && <div className="absolute top-10 left-1/2 -ml-[1px] w-[2px] h-6 bg-slate-100"></div>}
                      </div>
                      <div className="pt-2">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-brand-primary transition-colors">{act.label}</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-mono">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="rounded-[24px] bg-white border border-slate-100 p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">联系信息</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm group-hover:text-brand-primary transition-all">
                  <Mail size={16} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-[10px] text-slate-400 font-bold mb-0.5">工作邮箱</p>
                  <p className="text-xs font-medium text-slate-900 truncate">{detailedMember.email}</p>
                </div>
                <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100" />
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm group-hover:text-brand-primary transition-all">
                  <Phone size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-bold mb-0.5">联系电话</p>
                  <p className="text-xs font-medium text-slate-900">{detailedMember.phone}</p>
                </div>
                <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          </div>

          {/* Security & Access */}
          <div className="rounded-[24px] bg-slate-50 border border-slate-200 p-6">
            <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center text-emerald-500 shrink-0">
                  <Shield size={18} />
               </div>
               <div>
                 <h4 className="text-sm font-bold text-slate-900 mb-1">合规与安全状态</h4>
                 <p className="text-xs text-slate-500 leading-relaxed mb-3">
                   该成员近期未触发任何敏感数据导出警告，符合律所合规安全标准。
                 </p>
                 <button className="text-xs text-brand-primary font-bold hover:underline py-1">查看详细审计日志 →</button>
               </div>
            </div>
          </div>

          {/* Management Actions */}
          <div className="rounded-[24px] bg-white border border-slate-100 p-2 shadow-sm flex flex-col gap-1">
             <button className="w-full text-left px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors flex items-center justify-between">
               转移名下案件
               <ArrowLeft size={14} className="rotate-180 text-slate-400" />
             </button>
             <button className="w-full text-left px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors flex items-center justify-between">
               修改系统角色
               <ArrowLeft size={14} className="rotate-180 text-slate-400" />
             </button>
             <div className="h-px bg-slate-100 my-1 mx-2"></div>
             <button className="w-full text-left px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors flex items-center justify-between">
               停用此账号
               <AlertCircle size={14} />
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}

