import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'contract' | 'case' | 'template';
  content?: string;
  status?: string;
}

export function DocumentPreviewModal({
  isOpen,
  onClose,
  title,
  type,
  content,
  status
}: PreviewModalProps) {
  if (!isOpen) return null;

  const mockContent = content || `
    <h1 style="text-align: center; font-size: 24px; margin-bottom: 24px;">${title}</h1>
    
    <p style="text-indent: 2em; line-height: 1.8;">
      本文件内容为系统自动生成的预览视图。在实际业务中，此处将渲染高保真的 PDF 格式文件或富文本内容。当前显示为占位文本，以呈现版式结构。
    </p>
    
    <h2 style="font-size: 18px; margin-top: 24px; margin-bottom: 16px;">第一条 总则</h2>
    <p style="text-indent: 2em; line-height: 1.8;">
      为了规范本所文书起草标准，提高法律服务质量与效率，特制定本模板规范。各部门及相关人员应严格遵循本规范的要求进行文书的制作与审核。
    </p>

    <h2 style="font-size: 18px; margin-top: 24px; margin-bottom: 16px;">第二条 适用范围</h2>
    <p style="text-indent: 2em; line-height: 1.8;">
      1. 本规范适用于全平台律所入驻机构产生的所有正式民商事、刑事及非诉法律服务文书。<br/>
      2. 涉及重大疑难案件的特殊文书，在满足基本规范的前提下，可由主办律师根据实际情况进行合理调整。
    </p>

    <h2 style="font-size: 18px; margin-top: 24px; margin-bottom: 16px;">第三条 签署与生效</h2>
    <p style="text-indent: 2em; line-height: 1.8;">
      本文件自各方签署或盖章之日起生效。电子签章与实体签章具有同等法律效力。
    </p>

    <p style="text-align: right; margin-top: 60px;">
      签署人：____________________<br/>
      日  期：______年____月____日
    </p>
  `;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-deep tracking-tight flex items-center gap-2">
                  {title}
                  {status === '审核通过' && (
                    <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                      <ShieldCheck size={12} /> 已验证
                    </span>
                  )}
                  {status === '草稿' && (
                    <span className="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                      <AlertTriangle size={12} /> 草稿
                    </span>
                  )}
                </h3>
                <p className="text-xs text-text-light font-medium mt-0.5 uppercase tracking-widest">
                  文档预览 (网页渲染)
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-brand-deep transition-all" title="下载">
                <Download size={18} />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-brand-deep transition-all" title="打印">
                <Printer size={18} />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-brand-deep transition-all" title="分享">
                <Share2 size={18} />
              </button>
              <div className="w-px h-6 bg-slate-200 mx-1" />
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-rose-500 transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-auto bg-slate-100/50 p-6 md:p-12">
            <div className="max-w-3xl mx-auto bg-white min-h-[800px] shadow-sm ring-1 ring-slate-200 rounded-sm p-12 md:p-16">
              {/* Document Editor/Preview Mock Area */}
              <div 
                className="prose prose-slate max-w-none font-serif text-slate-800"
                dangerouslySetInnerHTML={{ __html: mockContent }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
