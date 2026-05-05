/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  X, 
  Save, 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Shield, 
  Info,
  ChevronDown,
  Plus,
  Trash2,
  Lock,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

interface ClientEditorProps {
  onBack: () => void;
  clientId?: string | null;
}

export default function ClientEditor({ onBack, clientId }: ClientEditorProps) {
  const [clientType, setClientType] = useState<'individual' | 'corporate'>('corporate');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: '',
    industry: '',
    website: '',
    taxId: '',
    legalRep: '',
    scale: '小型',
    source: '转介绍',
    notes: '',
    isVip: false
  });

  const industries = ['互联网/信息技术', '金融/法律服务', '房地产/建筑', '制造业', '医疗健康', '教育/文化', '其他'];
  const sources = ['搜索引擎', '转介绍', '社交媒体', '线下活动', '律所官网', '其他'];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate save
    console.log('Saving client:', formData);
    onBack();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
              {clientId ? '编辑客户资料' : '录入新客户资产'}
            </h2>
            <p className="text-xs text-text-light mt-0.5 font-medium">建立数字化档案，沉淀全生命周期服务轨迹</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onBack}
            className="h-11 px-6 rounded-xl text-xs font-bold text-text-secondary hover:bg-slate-50 border border-slate-200 transition-all"
          >
            取消修改
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
        {/* Left Column - Core Info */}
        <div className="lg:col-span-2 space-y-6">
          <form className="card p-8 space-y-8 shadow-sm">
            {/* Type Selector */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-text-light uppercase tracking-wider block">客户属性</label>
              <div className="flex gap-4 p-1.5 bg-slate-100 rounded-2xl w-fit">
                <button
                  type="button"
                  onClick={() => setClientType('corporate')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    clientType === 'corporate' 
                    ? 'bg-white text-brand-primary shadow-sm' 
                    : 'text-text-secondary hover:text-brand-primary'
                  }`}
                >
                  <Building size={18} /> 企业法人客户
                </button>
                <button
                  type="button"
                  onClick={() => setClientType('individual')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    clientType === 'individual' 
                    ? 'bg-white text-brand-primary shadow-sm' 
                    : 'text-text-secondary hover:text-brand-primary'
                  }`}
                >
                  <User size={18} /> 自然人个人客户
                </button>
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-text-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                  {clientType === 'corporate' ? '企业全称 (按执照)' : '自然人姓名'}
                </label>
                <input 
                  type="text" 
                  placeholder={clientType === 'corporate' ? '请输入完整的企事业单位名称' : '请输入客户真实姓名'}
                  className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium placeholder:font-normal placeholder:text-slate-300"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary">主要联系人</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="经办人或对接人姓名"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                    value={formData.contact}
                    onChange={e => setFormData({ ...formData, contact: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary">移动电话</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="tel" 
                    placeholder="11位手机号码"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary">电子邮箱</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    placeholder="用于接收通知公告与文书"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary">所属行业</label>
                <div className="relative">
                  <select 
                    className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium appearance-none"
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option value="">请选择所属行业</option>
                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-text-secondary">注册/居住地址</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="省、市、区、街道门牌号"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Corporate Extra Info */}
            {clientType === 'corporate' && (
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-brand-deep flex items-center gap-2">
                  <Building size={18} className="text-brand-primary" />
                  工商登记额外信息
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">统一社会信用代码</label>
                    <input 
                      type="text" 
                      placeholder="18位信用代码"
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                      value={formData.taxId}
                      onChange={e => setFormData({ ...formData, taxId: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">官方网址</label>
                    <div className="relative">
                      <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="url" 
                        placeholder="https://..."
                        className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                        value={formData.website}
                        onChange={e => setFormData({ ...formData, website: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Source */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
               <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider underline decoration-brand-primary decoration-2 underline-offset-4">业务来源与标签</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                     <span className="text-[11px] font-bold text-amber-600">标记为核心 VIP</span>
                     <div className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={formData.isVip}
                          onChange={e => setFormData({ ...formData, isVip: e.target.checked })}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                     </div>
                  </label>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">来源渠道</label>
                    <select 
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium appearance-none"
                      value={formData.source}
                      onChange={e => setFormData({ ...formData, source: e.target.value })}
                    >
                      {sources.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">备注说明</label>
                    <input 
                      type="text" 
                      placeholder="内部备注，仅律所内可见"
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
               </div>
            </div>
          </form>
        </div>

        {/* Right Column - Sidebars */}
        <div className="space-y-6">
          {/* Quick Actions / Helpers */}
          <div className="card shadow-sm p-6 bg-brand-ice border-brand-primary/10">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-primary/5">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-deep">合规性预检索</h4>
                <p className="text-[10px] text-brand-primary/60 italic">AI 自动核查工商冲突</p>
              </div>
            </div>
            
            <div className="p-4 bg-white/60 rounded-xl border border-white/40 space-y-3">
              <p className="text-[11px] text-text-secondary leading-relaxed">
                输入企业名称后，我们将自动为您拉取最新的工商信息，并识别当前律所是否与其存在直接或间接的利益冲突。
              </p>
              <button 
                type="button"
                className="w-full h-9 rounded-lg bg-brand-primary/10 text-brand-primary text-[10px] font-bold hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Search size={14} /> 立即发起核查
              </button>
            </div>
          </div>

          {/* Guidelines */}
          <div className="card p-6 space-y-4">
             <div className="flex items-center gap-2 mb-2">
                <Info size={16} className="text-text-light" />
                <h4 className="text-xs font-bold text-brand-deep uppercase tracking-wider">录入规范</h4>
             </div>
             <div className="space-y-4">
                {[
                  { label: '实名认证', desc: '请务必使用营业执照或二代身份证作为名称来源' },
                  { label: '隐私加密', desc: '客户敏感字段均已在本地环境进行端到端加密存储' },
                  { label: '归属确认', desc: '新录入客户默认归属于您的办案团队，可手动调整' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                     <div className="shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                        {idx + 1}
                     </div>
                     <div>
                        <p className="text-[11px] font-bold text-brand-deep">{item.label}</p>
                        <p className="text-[10px] text-text-light mt-0.5">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="card p-6 bg-slate-50 border-slate-200">
             <div className="flex items-center gap-2 mb-4">
                <Lock size={16} className="text-amber-500" />
                <h4 className="text-[11px] font-bold text-brand-deep">高等级权限保护</h4>
             </div>
             <p className="text-[10px] text-text-secondary leading-relaxed">
                作为律所管理员，您可以设定哪些成员有权查看该客户下属的「合同金额」与「全案卷宗」。
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
