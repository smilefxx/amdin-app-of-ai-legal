/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  FolderOpen, 
  User, 
  Scale, 
  Calendar, 
  Eye, 
  ShieldCheck,
  FileText,
  Clock,
  Info,
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { DocumentPreviewModal } from '@/src/components/common/DocumentPreviewModal';
import Dropdown from '@/src/components/common/Dropdown';

interface CaseEditorProps {
  onBack: () => void;
  caseId?: string | null;
}

export default function CaseEditor({ onBack, caseId }: CaseEditorProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [previewDoc, setPreviewDoc] = useState<{name: string, status: string} | null>(null);
  const [formData, setFormData] = useState({
    title: caseId ? '某科技公司专利侵权诉讼案' : '',
    caseNo: caseId ? '2026-MS-0042' : '',
    type: caseId ? '民事诉讼' : '民事诉讼',
    client: caseId ? '智创新能科技有限公司' : '',
    opponent: caseId ? '某科技有限公司' : '',
    tribunal: caseId ? '深圳市中级人民法院' : '',
    judge: caseId ? '张明理' : '',
    registerDate: caseId ? '2026-03-15' : '',
    closingDate: '',
    amount: caseId ? '50000000' : '',
    status: 'active',
    summary: caseId ? '原告（某科技公司）指控我方客户（被告）在最新发布的旗舰智能手机中侵犯了其一项关于屏幕显示技术的发明专利。原告要求停止侵权并索赔人民币5000万元。我方初步判断涉案专利可能存在无效理由，且被告的技术方案与涉案专利相比存在显著差异，属于现有技术抗辩或不侵权。目前准备向国家知识产权局提起专利无效宣告请求，并积极准备一审答辩。' : '',
    tags: caseId ? ['重大疑难', '知识产权'] : ([] as string[])
  });

  const caseTypes = ['民事诉讼', '刑事辩护', '行政诉讼', '非诉业务', '法律顾问', '仲裁案件'];
  const steps = [
    { id: 1, label: '基础信息' },
    { id: 2, label: '当事人与管辖' },
    { id: 3, label: '案情摘要' }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Saving case:', formData);
    onBack();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100 shrink-0"
          >
            <X size={20} className="text-text-secondary" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">
              {caseId ? '完善案件卷宗' : '正式立案录入'}
            </h2>
            <p className="text-xs text-text-light mt-0.5 font-medium">建立标准化案件索引，激活全律所协同办案引擎</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onBack}
            className="h-11 px-6 rounded-xl text-xs font-bold text-text-secondary hover:bg-slate-50 border border-slate-200 transition-all font-mono"
          >
            CANCEL_DRAFT
          </button>
          <button 
            onClick={handleSubmit}
            className="h-11 px-8 rounded-xl bg-brand-primary hover:bg-blue-600 text-white text-xs font-bold shadow-xl shadow-brand-primary/20 flex items-center gap-2 transition-all"
          >
            <Save size={18} />
            保存并开启协同
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${
                  activeStep === step.id 
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20' 
                  : 'text-text-secondary hover:bg-slate-50'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center border font-mono ${
                  activeStep === step.id ? 'border-white/40' : 'border-slate-200'
                }`}>
                  {step.id}
                </span>
                {step.label}
              </button>
              {idx < steps.length - 1 && (
                <div className="w-10 h-[1px] bg-slate-100 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Form Area */}
        <div className="lg:col-span-3">
          <form className="card p-8 space-y-8 bg-white shadow-sm border-slate-100 ring-1 ring-slate-50">
            {activeStep === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-brand-deep flex items-center gap-2">
                    <FolderOpen size={18} className="text-brand-primary" />
                    立案基础信息
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-text-secondary">案件标题 (案由概要)</label>
                      <input 
                        type="text" 
                        placeholder="例如：王xx与李xx房屋租赁合同纠纷案"
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary">法院案号</label>
                      <input 
                        type="text" 
                        placeholder="(2026)京01民初xxx号"
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium text-brand-primary font-mono"
                        value={formData.caseNo}
                        onChange={e => setFormData({ ...formData, caseNo: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary">案件类型</label>
                      <div className="relative">
                        <Dropdown 
                          buttonClassName="h-12 bg-slate-50 border-none hover:bg-slate-100 px-4"
                          value={formData.type}
                          onChange={val => setFormData({ ...formData, type: val })}
                          options={caseTypes.map(t => ({ label: t, value: t }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary">涉案标的额 (元)</label>
                      <input 
                        type="number" 
                        placeholder="0.00"
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-bold"
                        value={formData.amount}
                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary">立案日期</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="date" 
                          className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/10 outline-none font-medium"
                          value={formData.registerDate}
                          onChange={e => setFormData({ ...formData, registerDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-brand-deep flex items-center gap-2">
                    <User size={18} className="text-brand-primary" />
                    主体与关联方
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary">客户 (委托人/原告/代理人)</label>
                      <input 
                        type="text" 
                        placeholder="输入客户名称，支持联想最近客户"
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                        value={formData.client}
                        onChange={e => setFormData({ ...formData, client: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary">对方当事人 (被告/被执行人)</label>
                      <input 
                        type="text" 
                        placeholder="输入对方当事人名称"
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                        value={formData.opponent}
                        onChange={e => setFormData({ ...formData, opponent: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-slate-50">
                  <h3 className="text-sm font-bold text-brand-deep flex items-center gap-2">
                    <Scale size={18} className="text-brand-primary" />
                    司法管辖
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary">受案机构 (法院/仲裁委)</label>
                      <input 
                        type="text" 
                        placeholder="完整机构全称"
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                        value={formData.tribunal}
                        onChange={e => setFormData({ ...formData, tribunal: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary">承办人/主审法官</label>
                      <input 
                        type="text" 
                        placeholder="姓氏+称呼"
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                        value={formData.judge}
                        onChange={e => setFormData({ ...formData, judge: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-brand-deep flex items-center gap-2">
                    <FileText size={18} className="text-brand-primary" />
                    案情摘要与标签
                  </h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">核心案情简述 (同步至看板)</label>
                    <textarea 
                      rows={5}
                      placeholder="简要概括已知事实、核心诉求及当前风险点..."
                      className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium text-sm leading-relaxed"
                      value={formData.summary}
                      onChange={e => setFormData({ ...formData, summary: e.target.value })}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-text-secondary block">业务标签 (辅助 AI 模型分类)</label>
                    <div className="flex flex-wrap gap-2">
                      {['重大疑难', '保全已完成', '涉及刑事', '群体性案件', '外商投资', '需要鉴定'].map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            const newTags = formData.tags.includes(tag) 
                              ? formData.tags.filter(t => t !== tag)
                              : [...formData.tags, tag];
                            setFormData({ ...formData, tags: newTags });
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                            formData.tags.includes(tag)
                            ? 'bg-brand-primary text-white border-brand-primary'
                            : 'bg-white text-text-light border-slate-200 hover:border-brand-primary/40'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                      <button type="button" className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 text-text-light hover:bg-slate-50 flex items-center gap-1">
                        <Plus size={14} /> 自定义
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <button 
                type="button"
                onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                disabled={activeStep === 1}
                className="h-11 px-6 rounded-xl text-xs font-bold text-text-secondary hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                上一步骤
              </button>
              {activeStep < 3 ? (
                <button 
                  type="button"
                  onClick={() => setActiveStep(prev => prev + 1)}
                  className="h-11 px-10 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  继续录入详情
                  <ChevronDown size={16} className="-rotate-90" />
                </button>
              ) : (
                <button 
                  type="submit"
                  onClick={handleSubmit}
                  className="h-11 px-10 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-brand-primary/20"
                >
                  确认并创建案件
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="card p-6 bg-brand-deep text-white border-none relative overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
             <ShieldCheck size={24} className="text-emerald-400 mb-4" />
             <h4 className="text-sm font-bold mb-2">全自动合规校验</h4>
             <p className="text-[10px] text-white/60 leading-relaxed mb-6 italic">
                “系统已为您自动在后台检索：1.利益冲突冲突 2.对方主体活跃度 3.承办法官近期判例偏好。”
             </p>
             <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] text-white/50">利益冲突排查</span>
                   <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">PASSED</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] text-white/50">历史类似判例</span>
                   <span className="text-[9px] font-bold text-brand-primary bg-brand-primary/20 px-1.5 py-0.5 rounded">124 FOUND</span>
                </div>
             </div>
          </div>

          <div className="card p-6 space-y-4">
             <div className="flex items-center gap-2">
                <Clock size={16} className="text-text-light" />
                <h4 className="text-xs font-bold text-brand-deep uppercase tracking-wider">录入协助建议</h4>
             </div>
             <div className="space-y-3">
                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100">
                   <p className="text-[11px] font-bold text-brand-deep">案号录入准则</p>
                   <p className="text-[10px] text-text-light mt-1">若法院尚未下达案号，请暂时填写委托合同编号以做索引，后期审核时可随时补正。</p>
                </div>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                   <p className="text-[11px] font-bold text-amber-800">当事人敏感信息</p>
                   <p className="text-[10px] text-amber-700 mt-1">请务必核实身份证号/信用代码的准确性，这关系到财产权查控文书的生成精准度。</p>
                </div>
             </div>
          </div>

          <div className="card shadow-sm p-6 space-y-4">
             <div className="flex items-center justify-between">
                <h5 className="text-[11px] font-bold text-brand-deep">案件关联文书与附件</h5>
                <span className="text-[10px] text-text-light">2 份文件</span>
             </div>
             
             <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-brand-primary/30 transition-colors group">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center">
                         <FileText size={14} />
                      </div>
                      <div>
                         <p className="text-[11px] font-bold text-brand-deep">民事起诉状_李华_发版.pdf</p>
                         <p className="text-[9px] text-text-light uppercase">424 KB • 12分钟前上传</p>
                      </div>
                   </div>
                   <button onClick={() => setPreviewDoc({ name: '民事起诉状_李华_发版.pdf', status: 'draft' })} className="p-1.5 opacity-0 group-hover:opacity-100 text-brand-primary hover:bg-brand-primary/10 rounded-md transition-all">
                      <Eye size={14} />
                   </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-brand-primary/30 transition-colors group">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center">
                         <FileText size={14} />
                      </div>
                      <div>
                         <p className="text-[11px] font-bold text-brand-deep">原告身份证扫描件.jpg</p>
                         <p className="text-[9px] text-text-light uppercase">1.2 MB • 2026-05-01上传</p>
                      </div>
                   </div>
                   <button onClick={() => setPreviewDoc({ name: '原告身份证扫描件.jpg', status: 'published' })} className="p-1.5 opacity-0 group-hover:opacity-100 text-brand-primary hover:bg-brand-primary/10 rounded-md transition-all">
                      <Eye size={14} />
                   </button>
                </div>
             </div>

             <div className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 hover:border-brand-primary/30 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-primary mb-3">
                   <Plus size={20} />
                </div>
                <p className="text-[10px] font-bold text-brand-deep">点击或拖拽上传新文件</p>
                <p className="text-[9px] text-text-light mt-1">支持 docx, pdf, jpg，单文件不超过 50MB</p>
             </div>
          </div>
        </div>
      </div>

      <DocumentPreviewModal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc?.name || ''}
        type="case"
        status={previewDoc?.status === 'published' ? '审核通过' : '草稿'}
      />
    </div>
  );
}
