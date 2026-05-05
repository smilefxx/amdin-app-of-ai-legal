/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, ChangeEvent, DragEvent, FormEvent } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  ShieldCheck, 
  Info, 
  Save, 
  Plus, 
  Trash2,
  AlertCircle,
  FileUp,
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';

interface TemplateUploadProps {
  onBack: () => void;
}

export default function TemplateUpload({ onBack }: TemplateUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '人力资源',
    description: '',
    riskLevel: 'low',
    isPublic: true
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['人力资源', '公司治理', '商事贸易', '金融借贷', '房地产', '知识产权', '合规风控'];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Uploading template:', formData, files);
    onBack();
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
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">上传新范本</h2>
            <p className="text-xs text-text-light mt-0.5">将优质合同沉淀为律所标准化资产，提升全所办案效能</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="h-11 px-6 rounded-xl text-xs font-bold text-text-secondary hover:bg-slate-50 border border-slate-200 transition-all font-mono"
          >
            DISCARD
          </button>
          <button 
            onClick={handleSubmit}
            className="h-11 px-8 rounded-xl bg-brand-primary hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-brand-primary/20 flex items-center gap-2 transition-all"
          >
            <Save size={18} />
            确认发布
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload Area */}
          <div 
            className="card p-10 border-2 border-dashed border-slate-200 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all text-center group"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              multiple
            />
            <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner">
              <FileUp size={32} />
            </div>
            <h3 className="text-lg font-bold text-brand-deep mb-2">点击或将文件拖拽至此处上传</h3>
            <p className="text-sm text-text-light mb-8 max-w-xs mx-auto">支持 .doc, .docx, .pdf 格式，单个文件不超过 50MB</p>
            
            {files.length > 0 && (
              <div className="space-y-3 mt-8">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-brand-deep truncate max-w-[200px]">{file.name}</p>
                        <p className="text-[10px] text-text-light">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setFiles(files.filter((_, idx) => idx !== i));
                      }}
                      className="p-2 hover:bg-red-50 text-text-light hover:text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Metadata Form */}
          <form className="card p-8 space-y-6">
            <h3 className="text-sm font-bold text-brand-deep flex items-center gap-2">
              <Plus size={18} className="text-brand-primary" />
              范本元数据配置
            </h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase">范本正式名称</label>
              <input 
                type="text" 
                placeholder="例如：劳动合同 (浙江律所标准版 V3.0)"
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">业务分类</label>
                <div className="relative">
                  <select 
                    className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium appearance-none"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">风控预评级</label>
                <div className="relative">
                  <select 
                    className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium appearance-none"
                    value={formData.riskLevel}
                    onChange={e => setFormData({ ...formData, riskLevel: e.target.value })}
                  >
                    <option value="low">低风险 (标准化程度高)</option>
                    <option value="medium">中风险 (需律师介入微调)</option>
                    <option value="high">高风险 (涉及重大合规点)</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase">范本应用指引</label>
              <textarea 
                rows={4}
                placeholder="说明该范本的使用场景、核心必填项及常见风险提示..."
                className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none font-medium text-sm leading-relaxed"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-primary shadow-sm">
                     <ShieldCheck size={20} />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-brand-deep">全所公开可见</p>
                     <p className="text-[10px] text-text-light">开启后，全所成员均可检索并调用该范本</p>
                  </div>
               </div>
               <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={formData.isPublic}
                    onChange={e => setFormData({ ...formData, isPublic: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
               </label>
            </div>
          </form>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
           <div className="card p-6 bg-brand-deep text-white border-none shadow-xl">
              <AlertCircle size={24} className="text-brand-primary mb-4" />
              <h4 className="text-sm font-bold mb-2">资产化建议</h4>
              <p className="text-[10px] text-white/50 leading-relaxed italic mb-8">
                “一份合格的范本资产，应当包含 80% 的通用条款与 20% 的可配置占位符。AI 助手将在上传后自动为您识别变量并建立动态填充表单。”
              </p>
              <div className="space-y-4">
                 {[
                   { label: '智能变量标记', desc: '自动识别 [甲方], [乙方] 等' },
                   { label: '风控自动扫描', desc: '检查是否存在违规性措辞' },
                   { label: '关联知识库', desc: '自动匹配相关裁判文书' }
                 ].map((u, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                         {i + 1}
                      </div>
                      <div className="flex-1">
                         <p className="text-[11px] font-bold">{u.label}</p>
                         <p className="text-[9px] text-white/40">{u.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="card p-6 space-y-4">
              <div className="flex items-center gap-2">
                 <Info size={16} className="text-brand-primary" />
                 <h4 className="text-xs font-bold text-brand-deep uppercase">发布说明</h4>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                 发布后的范本将进入「待核定」状态，由律所高级合伙人或标准合规部审核通过后正式「发布」并统计调用频次。
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
