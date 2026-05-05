/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Braces, 
  Plus, 
  Settings, 
  Variable, 
  Info, 
  Bot,
  Type,
  Calendar as CalendarIcon,
  DollarSign,
  ChevronRight,
  Bold,
  Italic,
  Underline,
  List as ListIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  History,
  FileText,
  Copy,
  Trash2,
  Workflow,
  Sparkles,
  Search,
  CheckCircle2,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TemplateEditorProps {
  onBack: () => void;
}

interface VariableType {
  name: string;
  key: string;
  type: 'text' | 'currency' | 'date' | 'ai' | 'list';
  required: boolean;
  description?: string;
}

export default function TemplateEditor({ onBack }: TemplateEditorProps) {
  const [activeTab, setActiveTab] = useState('variables');
  const [isPreview, setIsPreview] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('section-1');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  
  const [metadata, setMetadata] = useState({
    title: '民间借贷起诉状标准版',
    version: 'V2.1',
    category: '民事诉讼',
    autoSave: true,
    aiEnhance: true
  });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const sections = useMemo(() => [
    { id: 'section-1', title: '文书标题', type: 'h1' },
    { id: 'section-2', title: '当事人基本信息', type: 'section' },
    { id: 'section-3', title: '诉讼请求事项', type: 'section' },
    { id: 'section-4', title: '事实与理由陈述', type: 'section' },
    { id: 'section-5', title: '证据目录与清单', type: 'section' },
    { id: 'section-6', title: '法律依据引用', type: 'section' },
    { id: 'section-7', title: '尾部签署区域', type: 'footer' }
  ], []);

  // Handle intersection observer to highlight active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach((section: HTMLDivElement | null) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };
  
  const variables: VariableType[] = useMemo(() => [
    { name: '原告姓名', key: '{{原告姓名}}', type: 'text', required: true, description: '自然人姓名或法人名称' },
    { name: '被告姓名', key: '{{被告姓名}}', type: 'text', required: true, description: '自然人姓名或法人名称' },
    { name: '借款金额', key: '{{借款金额}}', type: 'currency', required: true, description: '合同约定的借款本金' },
    { name: '借款日期', key: '{{借款日期}}', type: 'date', required: true, description: '实际放款日期' },
    { name: '还款日期', key: '{{还款日期}}', type: 'date', required: false, description: '约定的最后还款限期' },
    { name: 'AI 生成详情', key: '{{AI生成详情}}', type: 'ai', required: false, description: '根据案情自动生成的复杂法律论述' },
  ], []);

  const mockData: Record<string, string> = {
    '{{原告姓名}}': '张三',
    '{{被告姓名}}': '李四',
    '{{借款金额}}': '500,000.00',
    '{{借款日期}}': '2025年06月12日',
    '{{还款日期}}': '2026年06月12日',
    '{{AI生成详情}}': '被告多次无视原告的合理催告，其行为已严重违反《民法典》关于借款合同的相关规定，极大损害了原告的合法财产权。鉴于双方多次沟通无果，原告为维护自身权益，特提起诉讼。',
  };

  const [sectionContents, setSectionContents] = useState<Record<string, string>>({
    'section-1': '民 事 起 诉 状',
    'section-2': '原告：{{原告姓名}} \n\n被告：{{被告姓名}}',
    'section-3': '1. 判令被告立即偿还原告借款金本金：{{借款金额}} 元；\n2. 判令被告支付逾期罚息，暂计至 {{还款日期}} 止；\n3. 本案全部诉讼费用及保全费用由被告承担。',
    'section-4': '{{借款日期}}，被告因经营周转需要向原告提出借款意向，原告感念旧情，在核实相关情况后，通过银行线上转账形式将约定款项汇入被告名下的指定收款账户，双方并就利息及违约责任达成了口头或书面协议。\n\n然而，借款期限届满后，被告多次采取消极回避及拖延态度，拒不履行还款义务。{{AI生成详情}}\n\n综上所述，被告的行为已构成严重违约。原告为维护自身的民事权益及法律尊严，现依据《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》等相关法律法规，特向贵院提起诉讼。',
    'section-5': '证据1：借款合同复印件一份；\n证据2：银行转账流水截图。',
    'section-6': '《中华人民共和国民法典》第六百六十七条：借款合同是借款人向贷款人借款，到期返还借款并支付利息的合同。',
    'section-7': '此致\n某某市人民法院\n\n具状人：________________\n2026年___月___日'
  });

  const handleContentChange = (sectionId: string, newContent: string) => {
    setSectionContents(prev => ({
      ...prev,
      [sectionId]: newContent
    }));
  };

  const renderContent = (sectionId: string) => {
    const content = sectionContents[sectionId];
    if (!isPreview) {
      // In edit mode, we use a simple text representation but we can still highlight variables
      return content.split(/(\{\{[^}]+\}\})/).map((part, i) => {
        if (part.startsWith('{{') && part.endsWith('}}')) {
          return (
            <span 
              key={i} 
              contentEditable={false}
              className={`inline-block mx-0.5 px-1.5 py-0.5 rounded font-mono text-[11px] cursor-pointer transition-all select-none ${
                selectedElement === part 
                ? 'bg-brand-primary text-white scale-105 shadow-md' 
                : 'bg-blue-50 text-brand-primary hover:bg-blue-100 ring-1 ring-blue-200 ring-inset'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedElement(part);
                setActiveTab('variables');
              }}
            >
              {part}
            </span>
          );
        }
        return part;
      });
    }

    // Preview mode substitutes values
    return content.split(/(\{\{[^}]+\}\})/).map((part, i) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        return (
          <span key={i} className="text-brand-deep font-bold underline decoration-brand-primary/30 underline-offset-4">
            {mockData[part] || part}
          </span>
        );
      }
      return part;
    });
  };

  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    
    // Simulate API call/save logic
    setTimeout(() => {
      setIsPublishing(false);
      setShowSuccess(true);
      
      // Delay navigation to show success message
      setTimeout(() => {
        onBack();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-bg-gray">
      {/* Editor Header */}
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
              <h2 className="text-lg font-bold text-brand-deep">{metadata.title}</h2>
              <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded">稳定版 {metadata.version}</span>
            </div>
            <p className="text-[10px] text-text-light flex items-center gap-1">
              <History size={10} /> 正在编辑中 · {metadata.autoSave ? '已开启自动保存' : '手动保存模式'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-slate-100 rounded-xl mr-4">
            <button 
              onClick={() => setIsPreview(false)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${!isPreview ? 'bg-white text-brand-primary shadow-sm' : 'text-text-secondary hover:text-brand-primary'}`}
            >
              编辑模式
            </button>
            <button 
              onClick={() => setIsPreview(true)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${isPreview ? 'bg-white text-brand-primary shadow-sm' : 'text-text-secondary hover:text-brand-primary'}`}
            >
              效果预览
            </button>
          </div>
          <button 
            onClick={() => setIsConfigOpen(true)}
            className="flex items-center gap-2 h-10 px-4 text-xs font-bold text-text-secondary hover:bg-slate-50 rounded-xl transition-colors border border-border"
          >
            <Settings size={16} />
            <span>配置</span>
          </button>
          <button 
            onClick={handlePublish}
            disabled={isPublishing || showSuccess}
            className={`btn-primary h-10 px-6 shadow-lg shadow-brand-primary/20 transition-all ${isPublishing || showSuccess ? 'opacity-80 cursor-default' : ''}`}
          >
            {isPublishing ? (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
              />
            ) : showSuccess ? (
              <CheckCircle2 size={16} className="mr-2 text-white" />
            ) : (
              <Save size={16} className="mr-2" />
            )}
            <span>{isPublishing ? '正在发布...' : showSuccess ? '已发布' : '发布新版本'}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Outline & Structure */}
        <AnimatePresence>
          {!isPreview && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-white border-r border-border flex flex-col shrink-0 overflow-y-auto hidden lg:flex"
            >
              <div className="p-4 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white z-10">
                <span className="font-bold text-[11px] text-text-light uppercase tracking-widest">文档大纲</span>
                <button className="p-1 hover:bg-slate-50 rounded text-brand-primary transition-colors cursor-pointer"><Plus size={14} /></button>
              </div>
              <div className="p-2 space-y-0.5">
                {sections.map((item, idx) => (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full group flex items-start gap-3 px-3 py-2.5 text-xs rounded-xl transition-all text-left relative ${activeSection === item.id ? 'bg-brand-primary/5 text-brand-primary' : 'text-text-secondary hover:bg-slate-50'}`}
                  >
                    {activeSection === item.id && (
                      <motion.div 
                        layoutId="activeOutline"
                        className="absolute left-0 top-2 bottom-2 w-1 bg-brand-primary rounded-r-full"
                      />
                    )}
                    <span className={`w-5 h-5 flex items-center justify-center rounded-md font-mono text-[10px] shrink-0 ${activeSection === item.id ? 'bg-brand-primary text-white shadow-sm' : 'bg-slate-100 text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'}`}>
                      {idx + 1}
                    </span>
                    <span className={`line-clamp-2 ${activeSection === item.id ? 'font-bold' : ''}`}>{item.title}</span>
                  </button>
                ))}
              </div>

              <div className="mt-auto p-4 border-t border-slate-50 bg-slate-50/50">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                       <Workflow size={20} />
                    </div>
                    <div>
                       <h4 className="text-[11px] font-bold text-brand-deep">流程映射</h4>
                       <p className="text-[9px] text-text-light">已关联 12 个业务字段</p>
                    </div>
                 </div>
                 <button className="w-full h-8 flex items-center justify-center gap-2 rounded-lg border border-indigo-200 text-indigo-600 bg-white text-[10px] font-bold hover:bg-indigo-50 transition-colors">
                    查看逻辑工作流 <ChevronRight size={12} />
                 </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Center: Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-100 p-6 relative">
           {/* Toolbar */}
           <AnimatePresence>
             {!isPreview && (
               <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="max-w-[840px] mx-auto w-full flex items-center justify-between mb-4 px-4 py-2 bg-white rounded-2xl border border-border shadow-sm shrink-0 z-10 transition-transform active:scale-[0.99] duration-150"
               >
                  <div className="flex items-center gap-1">
                     <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-text-secondary transition-colors"><Bold size={16} /></button>
                     <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-text-secondary transition-colors"><Italic size={16} /></button>
                     <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-text-secondary transition-colors"><Underline size={16} /></button>
                     <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                     <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-text-secondary transition-colors"><AlignLeft size={16} /></button>
                     <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-text-secondary transition-colors"><AlignCenter size={16} /></button>
                     <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-text-secondary transition-colors"><AlignRight size={16} /></button>
                     <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                     <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-text-secondary transition-colors"><ListIcon size={16} /></button>
                  </div>
                  <div className="flex items-center gap-2">
                     <button className="px-3 py-1.5 rounded-lg bg-blue-50 text-brand-primary text-[11px] font-bold flex items-center gap-2 hover:bg-blue-100 transition-colors active:scale-95 duration-75">
                        <Braces size={14} /> 插入变量
                     </button>
                     <button className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[11px] font-bold flex items-center gap-2 hover:bg-emerald-100 transition-colors active:scale-95 duration-75">
                        <Bot size={14} /> 智能润色
                     </button>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>

           <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto scrollbar-hide scroll-pt-24"
          >
              <motion.div 
                layout
                className="max-w-[840px] mx-auto bg-white shadow-2xl min-h-[1200px] p-20 font-serif text-base leading-[1.8] text-slate-900 border border-border relative mb-20 origin-top transition-all duration-300"
              >
                {/* Visual Rulers */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100/50" />
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-slate-100/50" />

                <div id="section-1" ref={el => sectionRefs.current['section-1'] = el} className="mb-16">
                  <div 
                    contentEditable={!isPreview}
                    onBlur={(e) => handleContentChange('section-1', e.currentTarget.innerText)}
                    suppressContentEditableWarning
                    className={`text-center font-bold text-[28px] tracking-widest py-4 outline-none transition-all rounded-lg ${!isPreview ? 'hover:bg-slate-50 focus:bg-slate-50' : ''}`}
                  >
                    {isPreview ? renderContent('section-1') : sectionContents['section-1']}
                  </div>
                </div>
                
                <div id="section-2" ref={el => sectionRefs.current['section-2'] = el} className="mb-12">
                  <div 
                    contentEditable={!isPreview}
                    onBlur={(e) => handleContentChange('section-2', e.currentTarget.innerText)}
                    suppressContentEditableWarning
                    className={`outline-none p-2 rounded-lg transition-all ${!isPreview ? 'hover:bg-slate-50 focus:bg-slate-50 ring-1 ring-transparent focus:ring-brand-primary/20' : ''}`}
                  >
                    {renderContent('section-2')}
                  </div>
                  {!isPreview && (
                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-6 mt-4 text-sm italic text-text-light text-center leading-relaxed">
                      <p>此处保留供用户动态扩展多原告信息</p>
                      <button className="text-[10px] uppercase font-bold text-brand-primary mt-2 flex items-center gap-1 mx-auto hover:underline cursor-pointer">
                        <Plus size={12} /> 添加复合模组
                      </button>
                    </div>
                  )}
                </div>
                
                <div id="section-3" ref={el => sectionRefs.current['section-3'] = el} className="mb-12 pt-4">
                  <p className="font-bold mb-6 underline decoration-slate-200 underline-offset-8 decoration-2">诉讼请求：</p>
                  <div 
                    contentEditable={!isPreview}
                    onBlur={(e) => handleContentChange('section-3', e.currentTarget.innerText)}
                    suppressContentEditableWarning
                    className={`outline-none p-4 rounded-xl transition-all whitespace-pre-wrap ${!isPreview ? 'hover:bg-slate-50 focus:bg-slate-50 ring-1 ring-transparent focus:ring-brand-primary/20' : ''}`}
                  >
                    {renderContent('section-3')}
                  </div>
                </div>

                <div id="section-4" ref={el => sectionRefs.current['section-4'] = el} className="mb-12 pt-4">
                  <p className="font-bold mb-6 tracking-wide underline decoration-slate-200 underline-offset-8 decoration-2">事实与理由：</p>
                  <div 
                    contentEditable={!isPreview}
                    onBlur={(e) => handleContentChange('section-4', e.currentTarget.innerText)}
                    suppressContentEditableWarning
                    className={`outline-none p-4 rounded-xl transition-all indent-10 whitespace-pre-wrap leading-relaxed ${!isPreview ? 'hover:bg-slate-50 focus:bg-slate-50 ring-1 ring-transparent focus:ring-brand-primary/20' : ''}`}
                  >
                    {renderContent('section-4')}
                  </div>
                </div>

                <div id="section-5" ref={el => sectionRefs.current['section-5'] = el} className="mb-12 pt-4">
                  <p className="font-bold mb-6 underline decoration-slate-200 underline-offset-8 decoration-2">证据目录与清单：</p>
                  <div 
                    contentEditable={!isPreview}
                    onBlur={(e) => handleContentChange('section-5', e.currentTarget.innerText)}
                    suppressContentEditableWarning
                    className={`p-6 rounded-2xl border transition-all ${!isPreview ? 'bg-white border-slate-100 hover:bg-slate-50 focus:bg-slate-50 outline-none ring-1 ring-transparent focus:ring-brand-primary/20' : 'bg-slate-50/50 border-slate-100'}`}
                  >
                    {renderContent('section-5')}
                  </div>
                </div>

                <div id="section-6" ref={el => sectionRefs.current['section-6'] = el} className="mb-12 pt-4">
                   <p className="font-bold mb-4">法律依据引用：</p>
                   <div 
                    contentEditable={!isPreview}
                    onBlur={(e) => handleContentChange('section-6', e.currentTarget.innerText)}
                    suppressContentEditableWarning
                    className={`flex items-center gap-3 p-4 rounded-xl border outline-none transition-all ${!isPreview ? 'bg-white border-slate-200 hover:bg-slate-50 focus:bg-slate-50' : 'bg-emerald-50/50 border-emerald-100'}`}
                   >
                      <div className="w-1.5 h-10 bg-emerald-400 rounded-full shrink-0" />
                      <div className="text-xs text-emerald-800 leading-relaxed font-serif italic flex-1">
                        {renderContent('section-6')}
                      </div>
                   </div>
                </div>

                <div id="section-7" ref={el => sectionRefs.current['section-7'] = el} className="mt-28 pb-20">
                   <div 
                    contentEditable={!isPreview}
                    onBlur={(e) => handleContentChange('section-7', e.currentTarget.innerText)}
                    suppressContentEditableWarning
                    className={`flex flex-col items-end space-y-6 pr-10 outline-none p-4 rounded-xl transition-all whitespace-pre-wrap ${!isPreview ? 'hover:bg-slate-50 focus:bg-slate-50' : ''}`}
                   >
                      {renderContent('section-7')}
                   </div>
                </div>

                {/* Page Number Mockup */}
                <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                   <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">Page 1 of 1</span>
                </div>
              </motion.div>
           </div>
        </div>

        {/* Right: Variable Inspector */}
        <aside className="w-80 bg-white border-l border-border flex flex-col shrink-0 overflow-hidden">
          <div className="flex border-b border-slate-50 shrink-0 p-1">
             <button 
                onClick={() => setActiveTab('variables')} 
                className={`flex-1 py-2.5 text-[11px] font-bold rounded-lg transition-all ${activeTab === 'variables' ? 'text-brand-primary bg-brand-primary/5' : 'text-text-light hover:bg-slate-50'}`}
             >
                变量资产 ({variables.length})
             </button>
             <button 
                onClick={() => setActiveTab('ai_mapping')} 
                className={`flex-1 py-2.5 text-[11px] font-bold rounded-lg transition-all ${activeTab === 'ai_mapping' ? 'text-brand-primary bg-brand-primary/5' : 'text-text-light hover:bg-slate-50'}`}
             >
                智能映射
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
             <AnimatePresence mode="wait">
                {activeTab === 'variables' ? (
                   <motion.div
                     key="vars"
                     initial={{ opacity: 0, x: 10 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -10 }}
                     className="space-y-6"
                   >
                     <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">全局变量库</span>
                       <div className="flex items-center gap-1">
                         <button className="p-1 hover:bg-slate-100 rounded text-brand-primary"><Plus size={14} /></button>
                         <button className="p-1 hover:bg-slate-100 rounded text-text-light"><Search size={14} /></button>
                       </div>
                     </div>

                     <div className="space-y-3">
                        {variables.map((v, i) => (
                           <motion.div 
                              key={v.key}
                              layout
                              id={`var-${v.key.replace(/[{}]/g, '')}`}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                                selectedElement === v.key 
                                ? 'bg-brand-primary border-brand-primary text-white shadow-xl scale-[1.02]' 
                                : 'bg-white border-slate-100 hover:border-brand-primary/20 hover:shadow-xs text-slate-800'
                              }`}
                              onClick={() => selectedElement === v.key ? setSelectedElement(null) : setSelectedElement(v.key)}
                           >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                   <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                                      selectedElement === v.key
                                      ? 'bg-white/20 text-white' :
                                      v.type === 'currency' ? 'bg-amber-50 text-amber-500' :
                                      v.type === 'date' ? 'bg-blue-50 text-blue-500' :
                                      v.type === 'ai' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-500'
                                   }`}>
                                      {v.type === 'currency' ? <DollarSign size={12} /> : 
                                       v.type === 'date' ? <CalendarIcon size={12} /> : 
                                       v.type === 'ai' ? <Sparkles size={12} /> : <Type size={12} />}
                                   </div>
                                   <span className={`text-xs font-bold ${selectedElement === v.key ? 'text-white' : 'text-brand-deep'}`}>{v.name}</span>
                                </div>
                                <button className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity ${selectedElement === v.key ? 'hover:bg-white/20' : 'hover:bg-slate-50'}`}>
                                  <Copy size={12} className={selectedElement === v.key ? 'text-white' : 'text-text-light'} />
                                </button>
                              </div>
                              <p className={`text-[10px] line-clamp-1 mb-3 ${selectedElement === v.key ? 'text-white/80' : 'text-text-light'}`}>{v.description}</p>
                              <div className="flex items-center justify-between">
                                 <code className={`text-[10px] font-mono px-1 rounded ${selectedElement === v.key ? 'bg-white/20 text-white' : 'bg-blue-50/50 text-brand-primary'}`}>{v.key}</code>
                                 {v.required && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${selectedElement === v.key ? 'bg-white/20 text-white' : 'bg-red-50 text-red-500'}`}>REQUIRED</span>}
                              </div>
                           </motion.div>
                        ))}
                     </div>

                     <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-slate-200 rounded-2xl text-[11px] text-text-light hover:text-brand-primary hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all">
                        <Plus size={14} /> 新增自定义变量
                     </button>
                   </motion.div>
                ) : (
                   <motion.div
                     key="mapping"
                     initial={{ opacity: 0, x: 10 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -10 }}
                     className="space-y-6"
                   >
                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                            <Bot size={20} className="text-emerald-500" />
                         </div>
                         <h4 className="text-xs font-bold text-emerald-900 mb-1">AI 映射引擎已就绪</h4>
                         <p className="text-[10px] text-emerald-700 leading-relaxed">系统将自动从起诉状初稿、证据照片中提取对应事实并映射至变量。</p>
                      </div>

                      <div className="space-y-4">
                         <div className="space-y-2">
                           <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">映射逻辑校验</p>
                           <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                              <span className="text-[11px] text-brand-deep">字段冲突检测：无冲突</span>
                           </div>
                         </div>
                         <div className="space-y-2 pt-2">
                           <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">关联风险库</p>
                           <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 space-y-3">
                              <div className="flex items-center gap-2 text-amber-700">
                                 <Info size={14} />
                                 <span className="text-[11px] font-bold">建议优化项</span>
                              </div>
                              <p className="text-[10px] text-amber-800 leading-relaxed font-medium">当前模板中的「借款利息」计算逻辑暂未引用的最新民间借贷罚息司法解释，建议检查逻辑。</p>
                              <button className="w-full h-7 bg-white text-amber-600 rounded-lg text-[10px] font-bold shadow-sm shadow-amber-200">去更新规则</button>
                           </div>
                         </div>
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>
          </div>
          
          <div className="p-4 bg-slate-50 border-t border-border mt-auto shrink-0 z-10">
             <div className="flex items-center gap-2 text-[10px] text-text-light mb-4 px-2">
                <Info size={12} className="shrink-0" />
                <p>小贴士：在正文中选中变量可快速在右侧查看详情。</p>
             </div>
             <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 bg-white h-10 rounded-xl border border-border text-text-secondary text-xs font-bold hover:bg-red-50 hover:text-red-500 transition-colors active:scale-95">
                   <Trash2 size={14} /> 废弃
                </button>
                <button className="flex items-center justify-center gap-2 bg-white h-10 rounded-xl border border-border text-text-secondary text-xs font-bold hover:bg-slate-50 transition-colors active:scale-95">
                   <Eye size={14} /> 预览数据
                </button>
             </div>
          </div>
        </aside>
      </div>

      {/* Floating AI Button (Only in edit mode) */}
      {!isPreview && (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-10 right-[350px] w-14 h-14 bg-brand-deep text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-slate-900 transition-colors group z-30"
        >
          <Bot size={28} />
          <div className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-2 rounded-xl text-[11px] font-bold shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
             需要 AI 提供优化方案吗？
          </div>
        </motion.button>
      )}

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-2xl shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-sm font-bold">版本发布成功</p>
              <p className="text-[10px] text-white/80">模板库已更新，正在为您跳转...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Configuration Modal */}
      <AnimatePresence>
        {isConfigOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfigOpen(false)}
              className="absolute inset-0 bg-brand-deep/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Settings size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-deep">模板全局配置</h3>
                    <p className="text-xs text-text-light">定义文书模板的基本属性与生成行为</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsConfigOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 text-text-light transition-colors"
                >
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-[11px] font-bold text-text-light uppercase tracking-wider mb-2 block">模板名称</span>
                    <input 
                      type="text" 
                      value={metadata.title}
                      onChange={(e) => setMetadata({...metadata, title: e.target.value})}
                      className="w-full h-11 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all text-sm font-medium"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-[11px] font-bold text-text-light uppercase tracking-wider mb-2 block">当前版本</span>
                      <input 
                        type="text" 
                        value={metadata.version}
                        onChange={(e) => setMetadata({...metadata, version: e.target.value})}
                        className="w-full h-11 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-brand-primary outline-none transition-all text-sm font-medium"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-bold text-text-light uppercase tracking-wider mb-2 block">业务分类</span>
                      <select 
                        value={metadata.category}
                        onChange={(e) => setMetadata({...metadata, category: e.target.value})}
                        className="w-full h-11 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-brand-primary outline-none transition-all text-sm font-medium appearance-none"
                      >
                        <option>民事诉讼</option>
                        <option>刑事辩护</option>
                        <option>行政审批</option>
                        <option>内部合同</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-text-light uppercase tracking-wider mb-2 block">交互与行为</span>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group hover:bg-white hover:border-brand-primary/20 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                          <History size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-deep">实时自动保存</p>
                          <p className="text-[10px] text-text-light">每 10 秒将草稿同步至云端</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setMetadata({...metadata, autoSave: !metadata.autoSave})}
                        className={`w-10 h-5 rounded-full transition-colors relative ${metadata.autoSave ? 'bg-brand-primary' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${metadata.autoSave ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group hover:bg-white hover:border-brand-primary/20 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                          <Workflow size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-deep">AI 智能辅助润色</p>
                          <p className="text-[10px] text-text-light">开启后可对选中段落进行逻辑优化</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setMetadata({...metadata, aiEnhance: !metadata.aiEnhance})}
                        className={`w-10 h-5 rounded-full transition-colors relative ${metadata.aiEnhance ? 'bg-brand-primary' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${metadata.aiEnhance ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                  <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
                    修改模板配置将会在保存后同步给所有正在使用此模板的律师，建议在点击「发布新版本」前仔细确认变更点。
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setIsConfigOpen(false)}
                  className="px-6 h-11 rounded-xl text-xs font-bold text-text-secondary hover:bg-white transition-all border border-transparent hover:border-slate-200"
                >
                  放弃更改
                </button>
                <button 
                  onClick={() => setIsConfigOpen(false)}
                  className="px-8 h-11 rounded-xl bg-brand-deep text-white text-xs font-bold shadow-lg shadow-brand-deep/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  应用当前配置
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
