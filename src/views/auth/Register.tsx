/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  UserRound, 
  ShieldCheck, 
  ArrowLeft, 
  Check, 
  ArrowRight,
  ShieldAlert,
  Gavel
} from 'lucide-react';
import { UserRole } from '../../types';

interface RegisterProps {
  onBackToLogin: () => void;
  onRegisterComplete: (role: UserRole) => void;
}

export default function Register({ onBackToLogin, onRegisterComplete }: RegisterProps) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<'FIRM' | 'PLATFORM' | null>(null);

  const roles = [
    {
      id: 'FIRM',
      title: '律所管理员',
      desc: '适用于综合律所、专业精品所。管理律所独立资产，赋能团队。',
      icon: Building,
      color: 'bg-blue-50 text-brand-primary',
      features: ['管理律所模板库', '团队成员与权限', '律所私有知识库', '案件与文书审计']
    },
    {
      id: 'PLATFORM',
      title: '平台运营管理员',
      desc: '适用于平台共建者或特约顾问。负责公共模板维护与知识库贡献。',
      icon: Gavel,
      color: 'bg-purple-50 text-purple-600',
      features: ['公共模板库维护', '全平台知识贡献', '问题处理中心权限', '行业风控规则设定']
    }
  ];

  return (
    <div className="min-h-screen bg-bg-gray flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-8 px-4">
          <button onClick={onBackToLogin} className="flex items-center gap-2 text-text-light hover:text-brand-deep transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">返回登录</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 1 ? 'bg-brand-primary text-white' : 'bg-white text-text-light shadow-sm'}`}>1</div>
            <div className={`w-12 h-0.5 transition-all ${step >= 2 ? 'bg-brand-primary' : 'bg-slate-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 2 ? 'bg-brand-primary text-white' : 'bg-white text-text-light shadow-sm'}`}>2</div>
          </div>
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-brand-primary" size={16} />
            <span className="text-xs font-bold text-brand-deep tracking-wider uppercase">安全入驻通道</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold text-brand-deep">选择您的管理员身份</h1>
                <p className="text-text-light mt-2">身份决定了您在金律文典中的资产管理权限范围</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((r) => (
                  <button 
                    key={r.id}
                    onClick={() => setSelectedRole(r.id as any)}
                    className={`card p-8 text-left transition-all relative border-2 ${
                      selectedRole === r.id ? 'border-brand-primary ring-4 ring-blue-50' : 'border-transparent hover:border-blue-200'
                    }`}
                  >
                    {selectedRole === r.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                        <Check className="text-white" size={14} />
                      </div>
                    )}
                    
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform ${selectedRole === r.id ? 'scale-110' : ''} ${r.color}`}>
                      <r.icon size={28} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-brand-deep mb-2">{r.title}</h3>
                    <p className="text-sm text-text-light mb-6 leading-relaxed">{r.desc}</p>
                    
                    <ul className="space-y-3">
                      {r.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <button 
                  disabled={!selectedRole}
                  onClick={() => setStep(2)}
                  className="btn-primary h-12 px-12 text-lg shadow-lg disabled:opacity-50 disabled:shadow-none"
                >
                  <span>下一步</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card max-w-lg mx-auto p-8 space-y-8"
            >
               <div className="text-center">
                <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${selectedRole === 'FIRM' ? 'bg-blue-50 text-brand-primary' : 'bg-purple-50 text-purple-600'}`}>
                   {selectedRole === 'FIRM' ? <Building size={32} /> : <Gavel size={32} />}
                </div>
                <h2 className="text-2xl font-bold text-brand-deep">完善机构信息</h2>
                <p className="text-xs text-text-light mt-1">您正在以 [{selectedRole === 'FIRM' ? '律所管理员' : '平台运营'} ] 身份进行注册</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-secondary uppercase">律所/单位全称</label>
                  <input placeholder="请输入完整资质证书上的名称" className="w-full h-11 px-4 bg-slate-50 border border-border rounded-sm focus:border-brand-primary outline-none transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-secondary uppercase">管理员姓名</label>
                    <input placeholder="真实姓名" className="w-full h-11 px-4 bg-slate-50 border border-border rounded-sm focus:border-brand-primary outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-secondary uppercase">手机号</label>
                    <input placeholder="用于身份校验" className="w-full h-11 px-4 bg-slate-50 border border-border rounded-sm focus:border-brand-primary outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-secondary uppercase">设置管理密码</label>
                  <input type="password" placeholder="建议包含字母与数字" className="w-full h-11 px-4 bg-slate-50 border border-border rounded-sm focus:border-brand-primary outline-none transition-all" />
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 flex gap-3">
                <ShieldAlert className="text-amber-600 shrink-0" size={18} />
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  律所管理员账号具有最高资产处分权。提交后，平台将在 1-3 个工作日内完成机构资质审核。
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(1)} className="flex-1 btn-secondary h-12 justify-center">上一步</button>
                <button 
                  onClick={() => onRegisterComplete(selectedRole === 'FIRM' ? UserRole.FIRM_ADMIN : UserRole.PLATFORM_ADMIN)}
                  className="flex-[2] btn-primary h-12 justify-center"
                >
                  <span>确认申请入驻</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
