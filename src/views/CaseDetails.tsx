import React, { useState } from 'react';
import { 
  X,
  FileText,
  Clock,
  User,
  MapPin,
  Scale,
  FolderOpen,
  Calendar,
  AlertCircle,
  Pencil,
  ChevronRight,
  Download,
  Share2,
  CheckCircle2
} from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';

interface CaseDetailsProps {
  onBack: () => void;
  onNavigate?: (tab: string) => void;
}

export default function CaseDetails({ onBack, onNavigate }: CaseDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'history'>('overview');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleDownload = (docName: string) => {
    showToast(`正在下载文书材料: ${docName}...`);
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob([`Simulated Document Form\n\nName: ${docName}\nCase: 某科技公司专利侵权诉讼案`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = docName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative">
        <button 
          onClick={onBack}
          className="absolute -left-12 top-1 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-400 xl:flex hidden"
        >
          <X size={18} />
        </button>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
             <Scale size={24} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-brand-deep tracking-tight">某科技公司专利侵权诉讼案</h2>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-600 rounded-full border border-blue-100">正在办理</span>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-text-light font-medium">
               <span className="font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-xs">2026-MS-0042</span>
               <div className="flex items-center gap-1"><FolderOpen size={14} /> 民事诉讼/知识产权</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="h-10 px-4 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2">
             <Download size={16} /> 导出
           </button>
           <button className="h-10 px-4 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2">
             <Share2 size={16} /> 分享
           </button>
           <button 
             onClick={() => onNavigate?.('case_editor_edit')}
             className="h-10 px-6 rounded-xl bg-brand-primary hover:bg-blue-600 text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all"
           >
             <Pencil size={16} />
             编辑案件
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200">
        {[
          { id: 'overview', label: '案件概况' },
          { id: 'documents', label: '关联网书 (12)' },
          { id: 'history', label: '办理历程' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-brand-primary text-brand-primary' 
                : 'border-transparent text-text-secondary hover:text-brand-deep'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 space-y-6">
              <div className="card-base p-6 border-slate-100 shadow-sm bg-white">
                <h3 className="text-sm font-bold text-brand-deep mb-4 flex items-center gap-2">
                   <AlertCircle size={16} className="text-brand-primary"/>
                   案情摘要
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  原告（某科技公司）指控我方客户（被告）在最新发布的旗舰智能手机中侵犯了其一项关于屏幕显示技术的发明专利。原告要求停止侵权并索赔人民币5000万元。我方初步判断涉案专利可能存在无效理由，且被告的技术方案与涉案专利相比存在显著差异，属于现有技术抗辩或不侵权。目前准备向国家知识产权局提起专利无效宣告请求，并积极准备一审答辩。
                </p>
              </div>

              <div className="card-base p-0 border-slate-100 shadow-sm bg-white overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-sm font-bold text-brand-deep">当事人及法院信息</h3>
                </div>
                <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-6">
                   <div>
                     <p className="text-xs text-text-light mb-1 font-bold">我方客户（被告）</p>
                     <p className="text-sm font-medium text-brand-deep">智创新能科技有限公司</p>
                   </div>
                   <div>
                     <p className="text-xs text-text-light mb-1 font-bold">对方当事人（原告）</p>
                     <p className="text-sm font-medium text-brand-deep">某科技有限公司</p>
                   </div>
                   <div>
                     <p className="text-xs text-text-light mb-1 font-bold">审理法院/仲裁委</p>
                     <p className="text-sm font-medium text-brand-deep flex items-center gap-1">
                       <MapPin size={14} className="text-slate-400" />
                       深圳市中级人民法院
                     </p>
                   </div>
                   <div>
                     <p className="text-xs text-text-light mb-1 font-bold">主审法官</p>
                     <p className="text-sm font-medium text-brand-deep">张明理 (知识产权审判庭)</p>
                   </div>
                </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="card-base p-6 border-slate-100 shadow-sm bg-white">
                 <h3 className="text-sm font-bold text-brand-deep mb-4">关键节点</h3>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                       <div className="flex items-center gap-3">
                          <Calendar size={16} className="text-brand-primary" />
                          <span className="text-sm text-text-secondary font-medium">立案日期</span>
                       </div>
                       <span className="text-sm font-bold text-brand-deep font-mono">2026-03-15</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                       <div className="flex items-center gap-3">
                          <Calendar size={16} className="text-orange-500" />
                          <span className="text-sm text-orange-700 font-bold">举证期限届满</span>
                       </div>
                       <span className="text-sm font-bold text-orange-700 font-mono">2026-05-20</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                       <div className="flex items-center gap-3">
                          <Calendar size={16} className="text-slate-500" />
                          <span className="text-sm text-text-secondary font-medium">预计开庭时间</span>
                       </div>
                       <span className="text-sm font-bold text-brand-deep font-mono">待定</span>
                    </div>
                 </div>
              </div>

              <div className="card-base p-6 border-slate-100 shadow-sm bg-white">
                <h3 className="text-sm font-bold text-brand-deep mb-4">承办团队</h3>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-brand-deep">
                        李
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-deep">李律师 (合伙人)</p>
                        <p className="text-xs text-text-light">主办律师</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-brand-deep">
                        王
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-deep">王助理</p>
                        <p className="text-xs text-text-light">案卷整理 / 协助答辩</p>
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="card-base p-0 border-slate-100 shadow-sm bg-white overflow-hidden">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50 border-b border-border">
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">文书名称</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">类型</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">上传人</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">更新时间</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">操作</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-border">
                 {[
                   { name: '民事起诉状_副本.pdf', type: '起诉材料', uploader: '王助理', time: '2026-03-20 10:00' },
                   { name: '证据目录及附卷.zip', type: '证据材料', uploader: '王助理', time: '2026-03-20 10:30' },
                   { name: '无效宣告请求书_草稿v2.docx', type: '办案文书', uploader: '李律师', time: '今天 09:15' },
                 ].map((doc, idx) => (
                   <tr key={idx} className="hover:bg-slate-50 transition-colors">
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <FileText size={16} className="text-blue-500" />
                           <span className="text-sm font-medium text-brand-deep">{doc.name}</span>
                        </div>
                     </td>
                     <td className="px-6 py-4"><span className="text-xs text-text-secondary">{doc.type}</span></td>
                     <td className="px-6 py-4"><span className="text-xs text-text-secondary">{doc.uploader}</span></td>
                     <td className="px-6 py-4 text-xs text-text-light font-mono">{doc.time}</td>
                     <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDownload(doc.name)} className="text-brand-primary text-xs font-bold hover:underline">下载</button>
                     </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card-base p-6 border-slate-100 shadow-sm bg-white">
           <div className="space-y-6">
              <div className="flex gap-4">
                 <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-brand-primary mt-1.5 shadow-sm shadow-brand-primary/40" />
                    <div className="w-px h-full bg-slate-200 my-2" />
                 </div>
                 <div className="pb-6">
                    <p className="text-sm font-bold text-brand-deep">上传新文书：无效宣告请求书_草稿v2.docx</p>
                    <p className="text-xs text-text-light mt-1 flex items-center gap-2">
                      <Clock size={12}/> 今天 09:15 · 李律师
                    </p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-slate-300 mt-1.5" />
                    <div className="w-px h-full bg-slate-200 my-2" />
                 </div>
                 <div className="pb-6">
                    <p className="text-sm font-bold text-brand-deep">更新案件节点：举证期限届满设定为 2026-05-20</p>
                    <p className="text-xs text-text-light mt-1 flex items-center gap-2">
                      <Clock size={12}/> 2026-04-10 14:20 · 王助理
                    </p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-slate-300 mt-1.5" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-brand-deep">正式立案 / 案件信息录入</p>
                    <p className="text-xs text-text-light mt-1 flex items-center gap-2">
                      <Clock size={12}/> 2026-03-15 09:00 · 李律师
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
            <p className="font-medium text-sm">{toastMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
