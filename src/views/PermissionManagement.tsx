/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  X, 
  Shield, 
  Lock, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  AlertCircle,
  ChevronDown,
  Info,
  Users,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

interface PermissionManagementProps {
  onBack: () => void;
}

export default function PermissionManagement({ onBack }: PermissionManagementProps) {
  const [activeRole, setActiveRole] = useState('高级合伙人');

  const roles = ['高级合伙人', '合伙人', '执行律师', '法务助理', '行政风控', '平台管理员'];

  const permissionCategories = [
    {
      id: 'cases',
      title: '案件资产权限',
      permissions: [
        { id: 'case_view', label: '查看全所案卷', desc: '允许查看律所名下所有已结/未结案件' },
        { id: 'case_edit', label: '修改案件关键信息', desc: '允许调整案件状态、标的额等核心字段' },
        { id: 'case_delete', label: '归档/删除权限', desc: '最高等级权限，涉及数据生命周期管理' }
      ]
    },
    {
      id: 'finance',
      title: '财务与合同金额',
      permissions: [
        { id: 'billing_view', label: '查看合同金额', desc: '是否在列表中展示具体的合同标的与回款金额' },
        { id: 'billing_edit', label: '开票与收款管理', desc: '进入财务结算模块并操作流水' }
      ]
    },
    {
      id: 'team',
      title: '团队与行政管理',
      permissions: [
        { id: 'member_manage', label: '成员入职/离职管理', desc: '管理律所账号体系与个人档案' },
        { id: 'permission_edit', label: '细分权限调整', desc: '对其他角色进行权限再分配' }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100"
          >
            <X size={20} className="text-text-secondary" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">权限中心 & 角色配置</h2>
            <p className="text-xs text-text-light mt-0.5">基于 RBAC 的精细化法务数据访问控制体系</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="h-11 px-5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all font-mono"
          >
            POLICY_AUDIT
          </button>
          <button 
            onClick={onBack}
            className="h-11 px-6 rounded-xl bg-slate-50 border border-slate-200 text-brand-primary text-xs font-bold hover:bg-brand-ice transition-all flex items-center gap-2"
          >
            <Shield size={16} />
            全局策略预设
          </button>
          <button 
            onClick={onBack}
            className="h-11 px-8 rounded-xl bg-brand-primary hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-brand-primary/20 transition-all font-mono"
          >
            UPDATE_POLICY_CONFIG
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Roles Sidebar */}
        <div className="space-y-6">
           <div className="card p-4 bg-white space-y-2">
              <h3 className="text-[10px] font-bold text-text-light uppercase tracking-widest px-4 mb-2">角色体系</h3>
              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeRole === role 
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                    : 'text-text-secondary hover:bg-slate-50'
                  }`}
                >
                  {role}
                  <ChevronDown size={14} className={activeRole === role ? '-rotate-90' : ''} />
                </button>
              ))}
           </div>

           <div className="card p-6 bg-slate-900 text-white border-none shadow-xl">
              <Shield size={24} className="text-amber-400 mb-4" />
              <h4 className="text-sm font-bold mb-2">安全合规审计</h4>
              <p className="text-[10px] text-white/50 leading-relaxed mb-6">
                所有权限变更都将被记录在【系统审计日志】中。违反“最小权限原则”的配置将触发 AI 自动安全预警。
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-amber-400">
                 <AlertCircle size={14} />
                 <span>建议：开启敏感字段脱敏</span>
              </div>
           </div>
        </div>

        {/* Permissions Body */}
        <div className="lg:col-span-3 space-y-6">
           {/* Summary Info */}
           <div className="card p-8 bg-brand-ice border-brand-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-primary shadow-sm border border-brand-primary/5">
                    <Users size={28} />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-brand-deep">正在配置：{activeRole}</h3>
                    <p className="text-xs text-brand-primary/60 font-medium">当前该角色下共有 12 位成员受到本策略约束</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-text-light uppercase">策略颗粒度</p>
                    <p className="text-sm font-bold text-brand-deep">高 (字段级控制)</p>
                 </div>
                 <div className="w-[1px] h-10 bg-brand-primary/10 mx-2" />
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-text-light uppercase">最近更新日期</p>
                    <p className="text-sm font-bold text-brand-deep">2026-05-01</p>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              {permissionCategories.map(cat => (
                <div key={cat.id} className="card p-8 bg-white space-y-6">
                   <h4 className="text-sm font-bold text-brand-deep underline decoration-brand-primary decoration-4 underline-offset-8">
                     {cat.title}
                   </h4>
                   <div className="grid grid-cols-1 gap-4 mt-6">
                      {cat.permissions.map(perm => (
                        <div key={perm.id} className="flex items-start justify-between p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                           <div className="flex-1 pr-6">
                              <h5 className="text-sm font-bold text-brand-deep mb-1">{perm.label}</h5>
                              <p className="text-[11px] text-text-light leading-relaxed">{perm.desc}</p>
                           </div>
                           <label className="relative inline-flex items-center cursor-pointer mt-1">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                           </label>
                        </div>
                      ))}
                   </div>
                </div>
              ))}
           </div>

           <div className="card shadow-sm p-6 flex flex-col items-center text-center gap-4 border-dashed border-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                 <Lock size={24} />
              </div>
              <div>
                 <h5 className="text-[11px] font-bold text-brand-deep">定义新的自定义权限项</h5>
                 <p className="text-[9px] text-text-light mt-1">您可以根据业务需求，为特定的子系统或模块定义细分访问标志位。</p>
              </div>
              <button className="text-[10px] text-brand-primary font-bold hover:underline">点击开启扩展配置</button>
           </div>
        </div>
      </div>
    </div>
  );
}
