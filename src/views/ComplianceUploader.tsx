/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  CheckCircle2,
  Paperclip,
  ArrowRight,
  Info,
  Trash2,
  File
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ComplianceUploaderProps {
  onBack: () => void;
  onViewDetails: (id: string) => void;
}

export default function ComplianceUploader({ onBack, onViewDetails }: ComplianceUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: idle, 1: uploading, 2: scanning, 3: result
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const startScan = () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setScanStep(1);
    
    // Simulate upload
    setTimeout(() => {
      setScanStep(2);
      // Simulate AI Scanning
      setTimeout(() => {
        setScanStep(3);
      }, 3000);
    }, 1500);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">AI 合规性自动化扫描</h2>
            <p className="text-xs text-text-light mt-0.5">上传法律文书，利用 Gemini Pro 能力深度解析排查风险</p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {scanStep === 0 && (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`card p-12 border-dashed border-2 flex flex-col items-center text-center gap-6 transition-all ${
              isDragging ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-200'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              accept=".docx,.pdf"
            />
            
            {!selectedFile ? (
              <>
                <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                   <Upload size={40} />
                </div>
                <div className="space-y-2">
                   <h3 className="text-xl font-bold text-brand-deep">点击或拖拽文书至此处</h3>
                   <p className="text-sm text-text-light max-w-sm">支持 .docx, .pdf 格式。建议上传：起诉状、辩护词、代理词或复杂的民商事合同。</p>
                </div>
                <div className="flex items-center gap-4 mt-4">
                   <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-[10px] font-bold text-text-secondary border border-slate-100">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      端到端加密传输
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-[10px] font-bold text-text-secondary border border-slate-100">
                      <Zap size={14} className="text-amber-500" />
                      Gemini 1.5 强力分析
                   </div>
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 h-12 px-10 rounded-xl bg-brand-primary text-white font-bold text-sm shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                   选取本地文件
                </button>
              </>
            ) : (
              <div className="w-full max-w-md space-y-6">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-brand-primary/20 shadow-lg shadow-brand-primary/5">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-bold text-brand-deep truncate">{selectedFile.name}</p>
                    <p className="text-[10px] text-text-light font-mono">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.name.split('.').pop()?.toUpperCase()}</p>
                  </div>
                  <button 
                    onClick={removeFile}
                    className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 h-11 rounded-xl bg-slate-100 text-text-secondary font-bold text-xs hover:bg-slate-200 transition-all"
                  >
                    重新上传
                  </button>
                  <button 
                    onClick={startScan}
                    className="flex-[2] h-11 rounded-xl bg-brand-primary text-white font-bold text-xs shadow-lg shadow-brand-primary/20 hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap size={16} />
                    开始 AI 扫描分析
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {(scanStep === 1 || scanStep === 2) && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-12 text-center space-y-8"
          >
            <div className="relative w-24 h-24 mx-auto">
               <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
               <div className="absolute inset-0 rounded-full border-4 border-brand-primary border-t-transparent animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center text-brand-primary">
                  <FileText size={32} />
               </div>
            </div>
            <div className="space-y-3">
               <h3 className="text-xl font-bold text-brand-deep">
                  {scanStep === 1 ? '正在极速上传文书...' : 'AI 深度合规模型检索中...'}
               </h3>
               <p className="text-sm text-text-light max-w-xs mx-auto">
                  {scanStep === 1 
                    ? '文书正在进行端到端加密传输，请确保网络连接稳定。' 
                    : '正在匹配《2026 执业风险负面清单》及最高院最新司法解释...'}
               </p>
            </div>
            <div className="max-w-md mx-auto h-2 bg-slate-100 rounded-full overflow-hidden">
               <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: scanStep === 1 ? '40%' : '100%' }}
                  transition={{ duration: scanStep === 1 ? 1 : 3 }}
                  className="h-full bg-brand-primary shadow-sm"
               ></motion.div>
            </div>
          </motion.div>
        )}

        {scanStep === 3 && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card p-8 bg-emerald-50 border-emerald-100 flex items-center justify-between">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                     <CheckCircle2 size={32} />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-emerald-900">扫描完成：发现 2 处潜在风险</h3>
                     <p className="text-sm text-emerald-700/70">文书：{selectedFile?.name || '关于某科技公司经济纠纷的起诉状.docx'}</p>
                  </div>
               </div>
               <button 
                onClick={() => onViewDetails('SCAN_9921')}
                className="h-11 px-8 rounded-xl bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2"
               >
                  查看完整报告
                  <ArrowRight size={18} />
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="card p-6 space-y-4">
                  <div className="flex items-center gap-2 text-amber-500">
                     <AlertTriangle size={18} />
                     <h4 className="text-sm font-bold">程序性风险</h4>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                     文书中提到的管辖权依据较为薄弱，建议补充具体的协议管辖条款或实际履行地证明材料。
                  </p>
               </div>
               <div className="card p-6 space-y-4">
                  <div className="flex items-center gap-2 text-red-500">
                     <AlertTriangle size={18} />
                     <h4 className="text-sm font-bold">实体合规风险</h4>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                     关于“违约金计算方式”的描述可能超过最高院司法解释的最高限额，存在被法院部分调减的可能。
                  </p>
               </div>
            </div>

            <div className="card p-6 bg-slate-900 text-white border-none space-y-4 shadow-xl">
               <div className="flex items-center gap-2 text-brand-primary">
                  <ShieldCheck size={20} />
                  <h4 className="text-sm font-bold">律师意见初稿 (AI 生成)</h4>
               </div>
               <p className="text-xs text-white/60 leading-relaxed italic border-l-2 border-white/10 pl-4 py-1">
                  “建议将诉讼请求第二项调整为明确的金额，并附上损失计算明细清单，以降低庭审中合议庭对证据真实性的质疑风险...”
               </p>
               <button className="text-[10px] text-brand-primary font-bold hover:underline">一键采用并更新文书</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="card p-6 bg-slate-50 border-slate-200">
         <div className="flex items-center gap-3">
            <Info size={16} className="text-brand-primary" />
            <p className="text-[10px] text-text-secondary font-medium">
               注意：AI 扫描结果仅供参考，不构成正式的法律意见。请务必由执业律师根据具体案情进行最终审核签字。
            </p>
         </div>
      </div>
    </div>
  );
}
