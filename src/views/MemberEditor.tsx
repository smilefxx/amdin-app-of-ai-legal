/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useEffect } from 'react';
import { 
  X, 
  Save, 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Award, 
  Briefcase, 
  Calendar,
  Lock,
  ChevronDown,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface MemberEditorProps {
  onBack: () => void;
  memberId?: string | null;
  member?: any;
  onSave?: (id: string | null, data: any) => void;
}

export default function MemberEditor({ onBack, memberId, member, onSave }: MemberEditorProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '授薪律师',
    department: '民商事部',
    email: '',
    phone: '',
    entryDate: '',
    licenseNo: '14401201811' + Math.floor(Math.random() * 100000),
    specialization: [] as string[],
    bio: '',
    status: 'active'
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        role: member.role || '授薪律师',
        department: member.department || '民商事部',
        email: member.email || '',
        phone: member.phone || '',
        entryDate: member.joinDate || '',
        licenseNo: member.licenseNo || '14401201811' + Math.floor(Math.random() * 100000),
        specialization: member.specialization || [],
        bio: member.bio || '',
        status: member.status || 'active'
      });
    }
  }, [member]);

  const roles = ['高级合伙人', '合伙人', '授薪律师', '实习律师', '行政人员', '财务人员'];
  const departments = ['民商事部', '刑事辩护部', '知识产权部', '金融证券部', '行政合规部'];
  const specializations = ['公司法', '合同法', '知识产权', '劳动争议', '刑事合规', '婚姻家事'];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(member ? member.id : null, formData);
    } else {
      console.log('Saving member:', formData);
    }
    onBack();
  };

  const toggleSpecialization = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...prev.specialization, spec]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
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
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">
              {memberId ? '编辑成员资料' : '添加团队成员'}
            </h2>
            <p className="text-xs text-text-light mt-0.5">完善专业档案，构建律所数字化人才矩阵</p>
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
            onClick={handleSubmit}
            className="h-11 px-8 rounded-xl bg-brand-primary hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-brand-primary/20 flex items-center gap-2 transition-all"
          >
            <Save size={18} />
            保存资料
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-2 space-y-6">
          <form className="card p-8 space-y-8">
            <div className="flex items-center gap-8">
               <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 group-hover:border-brand-primary transition-colors">
                     <Camera size={32} />
                  </div>
                  <button type="button" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center shadow-lg">
                     <Plus size={16} />
                  </button>
               </div>
               <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">真实姓名</label>
                    <input 
                      type="text" 
                      placeholder="请输入成员姓名"
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary">角色身份</label>
                      <div className="relative">
                        <select 
                          className="w-full h-11 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium appearance-none"
                          value={formData.role}
                          onChange={e => setFormData({ ...formData, role: e.target.value })}
                        >
                          {roles.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary">所属部门</label>
                      <div className="relative">
                        <select 
                          className="w-full h-11 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium appearance-none"
                          value={formData.department}
                          onChange={e => setFormData({ ...formData, department: e.target.value })}
                        >
                          {departments.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary flex items-center gap-2">
                    <Mail size={14} /> 电子邮箱
                  </label>
                  <input 
                    type="email" 
                    placeholder="name@firm.com"
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary flex items-center gap-2">
                    <Phone size={14} /> 联系电话
                  </label>
                  <input 
                    type="tel" 
                    placeholder="13x-xxxx-xxxx"
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary flex items-center gap-2">
                    <Calendar size={14} /> 入职日期
                  </label>
                  <input 
                    type="date" 
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                    value={formData.entryDate}
                    onChange={e => setFormData({ ...formData, entryDate: e.target.value })}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary flex items-center gap-2">
                    <Award size={14} /> 执业证号
                  </label>
                  <input 
                    type="text" 
                    placeholder="1xxxxxxxxxxxxxx"
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium font-mono"
                    value={formData.licenseNo}
                    onChange={e => setFormData({ ...formData, licenseNo: e.target.value })}
                  />
               </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-50">
               <label className="text-xs font-bold text-text-secondary block uppercase">专业擅长领域 (标签)</label>
               <div className="flex flex-wrap gap-2">
                  {specializations.map(spec => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => toggleSpecialization(spec)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        formData.specialization.includes(spec)
                        ? 'bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20'
                        : 'bg-white text-text-light border-slate-200 hover:border-brand-primary/40'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-2 pt-6 border-t border-slate-50">
               <label className="text-xs font-bold text-text-secondary uppercase">个人简介 (展示于律所官网)</label>
               <textarea 
                  rows={5}
                  placeholder="请输入教育背景、典型案例、个人专长等信息..."
                  className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium text-sm leading-relaxed"
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
               />
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="card p-6 bg-brand-deep text-white border-none shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <Shield size={24} className="text-brand-primary mb-4" />
              <h4 className="text-sm font-bold mb-2">权限概要</h4>
              <p className="text-[10px] text-white/50 leading-relaxed mb-6">
                 当前选择的【{formData.role}】角色默认拥有：办案系统查看权、文书生成权、个人任务管理权。
              </p>
              <button 
                type="button"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold transition-all border border-white/10"
              >
                 前往权限中心精细调整
              </button>
           </div>

           <div className="card p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <Briefcase size={16} className="text-text-light" />
                 <h4 className="text-xs font-bold text-brand-deep uppercase">执业合规检查</h4>
              </div>
              <div className="space-y-3">
                 <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-bold text-text-secondary">法律职业资格证</span>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                 </div>
                 <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-bold text-text-secondary">年度执业考核</span>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                 </div>
              </div>
           </div>

           <div className="card p-6 bg-slate-50 border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                 <Lock size={16} className="text-amber-500" />
                 <h4 className="text-[11px] font-bold text-brand-deep">账号安全状态</h4>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed mb-4">
                 该成员已开启全渠道 MFA 二次验证。律所关键数据（合同金额等）将根据其敏感级别进行脱敏展示。
              </p>
              <button className="text-[10px] text-brand-primary font-bold hover:underline">重置访问权令牌</button>
           </div>
        </div>
      </div>
    </div>
  );
}

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
