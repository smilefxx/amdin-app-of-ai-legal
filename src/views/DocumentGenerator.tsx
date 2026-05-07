import { useState, useEffect } from 'react';
import { 
  ArrowLeft, FileText, Download, Save, History, ChevronRight, 
  Wand2, Bot
} from 'lucide-react';
import { motion } from 'motion/react';

interface DocumentGeneratorProps {
  onBack: () => void;
  templateName?: string;
}

export default function DocumentGenerator({ onBack, templateName = '劳动合同 (通用标准版)' }: DocumentGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toastMsg, setToastMsg] = useState('文书生成成功！已自动保存至您的卷宗内。');
  
  const [formData, setFormData] = useState<Record<string, string>>({
    employer: '浙江正大联合律师事务所',
    employee: '',
    idCard: '',
    position: '专业律师',
    salary: '30000',
    startDate: '2026-06-01',
    endDate: '2029-05-31',
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setToastMsg('文书生成成功！已自动保存至您的卷宗内。');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-bg-gray">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-border shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl transition-all text-text-light hover:text-brand-deep border border-transparent hover:border-border"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-brand-deep">起草文书：{templateName}</h2>
              <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded">智能生成</span>
            </div>
            <p className="text-[10px] text-text-light">请在左侧补充相关变量，右侧将实时预览最终文书效果</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary h-10 px-6 active:scale-95 transition-all text-sm group min-w-[120px] justify-center"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                生成中...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Wand2 size={16} className="group-hover:rotate-12 transition-transform" />
                智能生成
              </span>
            )}
          </button>
          <button 
            onClick={() => {
              setShowSuccess(true);
              setToastMsg("草稿已保存");
              setTimeout(() => setShowSuccess(false), 3000);
            }} 
            className="btn-secondary h-10 px-4 active:scale-95 transition-all text-sm"
          >
            <Save size={16} /> 保存为草稿
          </button>
          <button 
            onClick={() => {
              setShowSuccess(true);
              setToastMsg("文档已开始下载");
              setTimeout(() => setShowSuccess(false), 3000);
            }} 
            className="btn-secondary h-10 px-4 active:scale-95 transition-all text-sm border-brand-primary/20 text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10"
          >
            <Download size={16} /> 导出文档
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Variables */}
        <div className="w-80 bg-white border-r border-border flex flex-col z-10 shrink-0">
          <div className="p-4 border-b border-border bg-slate-50/50">
            <h3 className="text-sm font-bold text-brand-deep">填写变量</h3>
            <p className="text-xs text-text-light mt-1">必填项将会被标红，补充完毕后可一键生成。</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary flex justify-between">
                甲方(用人单位) <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={formData.employer}
                onChange={e => setFormData({...formData, employer: e.target.value})}
                className="w-full h-10 px-3 rounded-lg border border-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary flex justify-between">
                乙方(劳动者) <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="请输入员工姓名"
                value={formData.employee}
                onChange={e => setFormData({...formData, employee: e.target.value})}
                className="w-full h-10 px-3 rounded-lg border border-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary flex justify-between">
                身份证号 <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="请输入身份证号"
                value={formData.idCard}
                onChange={e => setFormData({...formData, idCard: e.target.value})}
                className="w-full h-10 px-3 rounded-lg border border-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm"
              />
            </div>
            
            <div className="pt-4 border-t border-border space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary">职位/岗位</label>
                <input 
                  type="text" 
                  value={formData.position}
                  onChange={e => setFormData({...formData, position: e.target.value})}
                  className="w-full h-10 px-3 rounded-lg border border-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary">税前薪资 (元/月)</label>
                <input 
                  type="number" 
                  value={formData.salary}
                  onChange={e => setFormData({...formData, salary: e.target.value})}
                  className="w-full h-10 px-3 rounded-lg border border-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary">开始日期</label>
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={e => setFormData({...formData, startDate: e.target.value})}
                    className="w-full h-10 px-2 rounded-lg border border-border focus:border-brand-primary outline-none text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary">结束日期</label>
                  <input 
                    type="date" 
                    value={formData.endDate}
                    onChange={e => setFormData({...formData, endDate: e.target.value})}
                    className="w-full h-10 px-2 rounded-lg border border-border focus:border-brand-primary outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-border">
              <div className="bg-blue-50 text-blue-700 p-3 rounded-xl border border-blue-100 flex gap-3">
                <Bot size={16} className="shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  可利用 <strong>AI 智能审查</strong> 帮你检查双方权利义务条款是否存在遗漏。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="flex-1 bg-[#EEF2F6] overflow-y-auto p-4 md:p-8 flex justify-center pb-20 custom-scrollbar">
          <div className="w-[800px] bg-white shadow-xl min-h-[1056px] p-12 md:p-16">
             <h1 className="text-2xl font-bold text-center mb-12 tracking-widest">{templateName}</h1>
             
             <div className="space-y-6 text-sm leading-8 text-slate-800">
               <div className="space-y-2">
                 <p><strong>甲方（用人单位）：</strong><span className="underline decoration-slate-300 underline-offset-4 px-2">{formData.employer || '__________________'}</span></p>
                 <p><strong>乙方（劳动者）：</strong><span className="underline decoration-slate-300 underline-offset-4 px-2">{formData.employee || '__________________'}</span></p>
                 <p><strong>身份证号码：</strong><span className="underline decoration-slate-300 underline-offset-4 px-2">{formData.idCard || '__________________'}</span></p>
               </div>

               <p className="indent-8 mt-8">
                 甲乙双方根据《中华人民共和国劳动法》、《中华人民共和国劳动合同法》及有关法律法规，经平等自愿、协商一致，签订本合同。
               </p>

               <h3 className="font-bold text-base mt-6 mb-2">一、 劳动合同期限</h3>
               <p className="indent-8">
                 本合同为固定期限劳动合同。合同期自 <span className="underline decoration-slate-300 underline-offset-4 px-1">{formData.startDate ? formData.startDate.split('-')[0] : '____'}</span> 年 <span className="underline decoration-slate-300 underline-offset-4 px-1">{formData.startDate ? formData.startDate.split('-')[1] : '__'}</span> 月 <span className="underline decoration-slate-300 underline-offset-4 px-1">{formData.startDate ? formData.startDate.split('-')[2] : '__'}</span> 日起至 <span className="underline decoration-slate-300 underline-offset-4 px-1">{formData.endDate ? formData.endDate.split('-')[0] : '____'}</span> 年 <span className="underline decoration-slate-300 underline-offset-4 px-1">{formData.endDate ? formData.endDate.split('-')[1] : '__'}</span> 月 <span className="underline decoration-slate-300 underline-offset-4 px-1">{formData.endDate ? formData.endDate.split('-')[2] : '__'}</span> 日止，其中试用期为 3 个月。
               </p>

               <h3 className="font-bold text-base mt-6 mb-2">二、 工作内容和工作地点</h3>
               <p className="indent-8">
                 乙方同意根据甲方工作需要，担任 <span className="underline decoration-slate-300 underline-offset-4 px-2">{formData.position || '__________'}</span> 岗位工作。乙方工作地点为甲方所在地或根据业务需要安排的地方。
               </p>

               <h3 className="font-bold text-base mt-6 mb-2">三、 劳动报酬</h3>
               <p className="indent-8">
                 甲方按月以货币形式支付乙方工资，税前基薪为人民币 <span className="underline decoration-slate-300 underline-offset-4 px-2">{formData.salary || '_______'}</span> 元/月。
               </p>
               <p className="indent-8">
                 甲乙双方对工资的其他约定，按照甲方依法制定的规章制度执行。
               </p>

               <h3 className="font-bold text-base mt-6 mb-2">四、 其他</h3>
               <p className="indent-8">
                 本合同一式两份，甲乙双方各执一份，经双方签字批复后生效。
               </p>

               <div className="mt-20 flex justify-between items-end">
                 <div className="space-y-6">
                    <p><strong>甲方（盖章）：</strong></p>
                    <p>日期：______年____月____日</p>
                 </div>
                 <div className="space-y-6">
                    <p><strong>乙方（签字）：</strong></p>
                    <p>日期：______年____月____日</p>
                 </div>
               </div>

             </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold">{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
