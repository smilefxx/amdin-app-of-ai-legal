import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle2
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
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleDownload = () => {
    showToast(`正在下载文件: ${title}...`);
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob([`Simulated Document Form\n\nName: ${title}\nType: ${type}\nStatus: ${status || 'Unknown'}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${title}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  const handlePrint = () => {
    showToast('正在准备打印...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const mockContent = content || `
    <h1 style="text-align: center; font-size: 24px; margin-bottom: 24px;">${title || '未命名文档'}</h1>
    
    <p style="text-indent: 2em; line-height: 1.8;">
      本文件内容为系统自动生成的预览视图。在实际业务中，此处将渲染高保真的 PDF 格式文件或富文本内容。当前显示为基于模板「${title || '当前模板'}」的占位文本，以呈现版式结构。
    </p>
    
    <h2 style="font-size: 18px; margin-top: 24px; margin-bottom: 16px;">一、核心事实与主张</h2>
    <p style="text-indent: 2em; line-height: 1.8;">
      基于上传的业务要素与案件特征，AI 将在此处自动生成对应的陈述与要件。涉及核心事实的部分会自动采取必要的排版高亮或编号列举，确保证据链与逻辑的清晰。
    </p>

    <h2 style="font-size: 18px; margin-top: 24px; margin-bottom: 16px;">二、法律依据说明</h2>
    <p style="text-indent: 2em; line-height: 1.8;">
      1. 根据适用的民商事法律法规，系统已关联相关法条。<br/>
      2. 涉及重大疑难案件的特殊文书，在满足基本规范的前提下，可由主办律师根据实际情况对自动引用的判例进行合理调整。
    </p>

    <h2 style="font-size: 18px; margin-top: 24px; margin-bottom: 16px;">三、送达与生效</h2>
    <p style="text-indent: 2em; line-height: 1.8;">
      本文书一经送达相关当事人或司法机关，即具备法定的效力预设条件。如采用电子签章，其与实体签章具有同等法律效力。
    </p>

    <p style="text-align: right; margin-top: 60px;">
      具状人/起草人：____________________<br/>
      日  期：______年____月____日
    </p>
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
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
                <button onClick={handleDownload} className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-brand-deep transition-all" title="下载">
                  <Download size={18} />
                </button>
                <button onClick={handlePrint} className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-brand-deep transition-all" title="打印">
                  <Printer size={18} />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-brand-deep transition-all" title="分享">
                  <Share2 size={18} />
                </button>
                <div className="w-px h-6 bg-slate-200 mx-1" />
                <button 
                  onClick={onClose}
                  className="p-2 bg-slate-100 hover:bg-rose-100 rounded-xl text-slate-500 hover:text-rose-600 transition-all cursor-pointer"
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
      )}

      {/* Toast Notification */}
      {isOpen && toastMsg && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={18} />
          </div>
          <p className="font-medium text-sm">{toastMsg}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
