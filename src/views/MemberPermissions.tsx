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
  Save,
  User,
  ArrowLeft,
  Info,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface MemberPermissionsProps {
  onBack: () => void;
  memberId?: string | null;
  member?: any;
}

export default function MemberPermissions({ onBack, memberId, member }: MemberPermissionsProps) {
  const [currentRole, setCurrentRole] = useState(member?.role || '高级合伙人');
  
  if (!member) return null;

  const roles = ['高级合伙人', '合伙人', '执行律师', '法务助理', '行政风控', '平台管理员'];

  const categories = [
    {
      id: 'cases',
      title: '案卷及文档权限',
      permissions: [
        { id: 'view_all', label: '全库查看', desc: '允许穿透查看律所全量历史案卷（含非本人案件）', enabled: true },
        { id: 'doc_export', label: '文档外发导出', desc: '允许将系统内法律文书、证据包导出至本地设备', enabled: false },
        { id: 'smart_edit', label: '智能文书编辑', desc: '允许使用 AI 工具进行批量文书修订及协同', enabled: true }
      ]
    },
    {
      id: 'billing',
      title: '财务透明度设置',
      permissions: [
        { id: 'price_view', label: '标的额查看', desc: '在列表视图中展示案件具体的合同标的/涉案金额', enabled: true },
        { id: 'settle_manage', label: '结算流程控制', desc: '参与合同回款标记与财务结项节点的审核', enabled: false }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100"
          >
            <ArrowLeft size={20} className="text-text-secondary" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">成员权限个性化配置</h2>
            <div className="flex items-center gap-2 mt-0.5">
               <span className="text-xs text-text-light">正在配置：</span>
               <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                  <User size={12} className="text-brand-primary" />
                  <span className="text-xs font-bold text-brand-deep">{member.name}</span>
               </div>
               <span className="text-[10px] text-text-light font-medium">({currentRole} 基础权限上覆盖)</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="h-11 px-6 rounded-xl text-xs font-bold text-text-secondary hover:bg-slate-50 border border-slate-200 transition-all"
          >
            取消
          </button>
          <button 
            onClick={onBack}
            className="h-11 px-8 rounded-xl bg-brand-primary hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-brand-primary/20 flex items-center gap-2 transition-all"
          >
            <Save size={18} />
            保存生效
          </button>
        </div>
      </div>

      {/* Role Selection Container */}
      <div className="card p-6 bg-slate-50/50 border-slate-100">
         <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
               <UserCheck size={18} />
            </div>
            <div>
               <h4 className="text-sm font-bold text-brand-deep">基础角色分配</h4>
               <p className="text-[10px] text-text-light mt-0.5">该角色将决定成员默认的可见范围与操作按钮组</p>
            </div>
         </div>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {roles.map(role => (
               <button
                  key={role}
                  onClick={() => setCurrentRole(role)}
                  className={`px-3 py-2.5 rounded-xl text-[11px] font-bold transition-all border ${
                     currentRole === role
                     ? 'bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20'
                     : 'bg-white text-text-secondary border-slate-200 hover:border-brand-primary/40'
                  }`}
               >
                  {role}
               </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
           {categories.map(cat => (
             <div key={cat.id} className="card p-8 space-y-6">
                <h3 className="text-sm font-bold text-brand-deep flex items-center gap-2">
                   <Shield size={18} className="text-brand-primary" />
                   {cat.title}
                </h3>
                <div className="space-y-4">
                   {cat.permissions.map(perm => (
                     <div key={perm.id} className="flex items-start justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-brand-primary/20 transition-all">
                        <div className="flex-1 pr-6 flex items-start gap-4">
                           <div className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center ${perm.enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                              <CheckCircle2 size={16} />
                           </div>
                           <div>
                              <h5 className="text-sm font-bold text-brand-deep mb-1">{perm.label}</h5>
                              <p className="text-[11px] text-text-light leading-relaxed">{perm.desc}</p>
                           </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer mt-1">
                           <input type="checkbox" className="sr-only peer" defaultChecked={perm.enabled} />
                           <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                     </div>
                   ))}
                </div>
             </div>
           ))}
        </div>

        <div className="space-y-6">
           <div className="card p-6 bg-slate-900 text-white border-none shadow-xl">
              <Lock size={24} className="text-amber-400 mb-4" />
              <h4 className="text-sm font-bold mb-2">安全策略覆盖说明</h4>
              <p className="text-[10px] text-white/50 leading-relaxed">
                 个别权限配置（如“文档外发导出”）受律所最高安全协议约束。如果全局开启了【安全沙箱模式】，即使用户被赋予该权限，也只能在受管控的设备环境内操作。
              </p>
           </div>

           <div className="card p-6 space-y-4 bg-orange-50/30 border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                 <AlertCircle size={16} className="text-orange-500" />
                 <h4 className="text-[11px] font-bold text-orange-900 uppercase">风险提示</h4>
              </div>
              <p className="text-[10px] text-orange-800 leading-relaxed">
                当前用户作为【{currentRole}】，已被授予【全库查看】权。这意味着该成员可以查阅包括财务案件在内的敏感信息，请确保已签署保密协议。
              </p>
           </div>

           <div className="card p-6 flex flex-col items-center text-center gap-4 border-dashed border-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                 <Info size={24} />
              </div>
              <div>
                 <h5 className="text-[11px] font-bold text-brand-deep">继承关系说明</h5>
                 <p className="text-[9px] text-text-light mt-1">成员将自动继承其所属【角色】（{currentRole}）的所有默认权限。此处所做修改属于独立“异常覆盖”。</p>
              </div>
              <button className="text-[10px] text-brand-primary font-bold hover:underline">点击重置为角色默认值</button>
           </div>
        </div>
      </div>
    </div>
  );
}
