/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  Plus, 
  BookOpen, 
  Zap, 
  MoreVertical,
  Filter,
  CheckCircle2,
  Clock,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { motion } from 'motion/react';
import { KnowledgeItem } from '@/src/types';

const MOCK_KNOWLEDGE: KnowledgeItem[] & { content?: string }[] = [
  { id: '1', title: '民间借贷利息裁判规则 2026', category: '司法解释', tags: ['利息', '民间借贷'], aiEnabled: true, refCount: 156, updatedAt: '2026-04-30', content: '最高人民法院关于审理民间借贷案件适用法律若干问题的规定...\n\n1. 约定的利率未超过合同成立时一年期贷款市场报价利率四倍的，人民法院应予支持。\n2. 借贷双方对前期借款本息结算后将利息计入后期借款本金并重新出具债权凭证的，前期利率没有超过年利率24%...' },
  { id: '2', title: '《民法典》婚姻家庭编最新司法解释', category: '司法解释', tags: ['民法典', '婚姻'], aiEnabled: true, refCount: 2240, updatedAt: '2026-04-28', content: '关于适用《中华人民共和国民法典》婚姻家庭编的解释（一）\n\n一、一般规定\n条文：...\n二、结婚条款解析...\n对于涉及夫妻共同重大家庭财产分配的诉讼...' },
  { id: '3', title: '金融借款纠纷证据指引(本院口径)', category: '法院口径', tags: ['证据', '金融'], aiEnabled: false, refCount: 89, updatedAt: '2026-04-25', content: '本市法院对于金融借款合同纠纷案件的举证要求指引：\n\n1. 必须提交原件核实，特别是针对手写签署的担保合同。\n2. 电子合同需附带电子签名的认证报告材料（例如CA机构证明）。...' },
  { id: '4', title: '高院关于限制消费人员执行指引', category: '办案指引', tags: ['执行', '限高'], aiEnabled: true, refCount: 412, updatedAt: '2026-04-20', content: '限制高消费执行流程梳理（内部版）\n\n第一步：查询财产线索，申请执行。\n第二步：被执行人未按执行通知书指定的期间履行生效法律文书确定的给付义务的...\n第三步：向法院提交限高申请书及相关依据...' },
  { id: '5', title: '常见律师函催收话术(内部沉淀)', category: '内部经验', tags: ['律师函', '话术'], aiEnabled: true, refCount: 56, updatedAt: '2026-04-15', content: '高转化律师催收函模板与发函策略：\n\n1. 表述须客观，严禁使用威胁性语言以免造成违规。\n2. 催收企业款项需要重点点明其涉及上下游信用的利害关系。\n3. ...' },
  { id: '6', title: '保险纠纷监管规则汇编', category: '监管规则', tags: ['保险', '监管'], aiEnabled: true, refCount: 120, updatedAt: '2026-04-12', content: '银保监会最新下发的保险理赔纠纷调解指导方案汇编：\n\n包含：\n- 拒赔争议的重新审核机制\n- 免责条款的明确告知义务认定标准\n- ...' },
];

interface KnowledgeBaseProps {
  onAdd: () => void;
  onEdit?: (item: KnowledgeItem) => void;
  onNavigate?: (tab: string) => void;
}

export default function KnowledgeBase({ onAdd, onEdit, onNavigate }: KnowledgeBaseProps) {
  const [activeTab, setActiveTab] = useState('全部');
  const categories = ['全部', '法律法规', '司法解释', '监管规则', '办案指引', '法院口径', '内部经验'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-brand-deep">律所知识中枢</h2>
          <p className="text-xs text-text-light underline decoration-brand-primary/30">沉淀法律资产，赋能 AI 解析与文书生成</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate?.('knowledge_discovery')}
            className="btn-secondary h-10 active:scale-95 transition-all"
          >
            <TrendingUp size={18} />
             知识发现
          </button>
          <button 
            onClick={onAdd}
            className="btn-primary h-10 px-6 shadow-lg shadow-brand-primary/20 active:scale-95 transition-all"
          >
            <Plus size={18} />
            <span>新增专业知识</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 space-y-4 shrink-0">
          <div className="card p-4 space-y-4">
             <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
                <input placeholder="快速检索..." className="w-full h-9 pl-9 pr-3 bg-slate-50 border-none rounded-md text-xs focus:ring-1 focus:ring-brand-primary outline-none" />
             </div>
             <div className="space-y-1">
                {categories.map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-3 py-2.5 rounded text-xs font-semibold transition-all ${
                      activeTab === tab ? 'bg-brand-primary text-white shadow-md shadow-blue-200' : 'text-text-secondary hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
             </div>
          </div>

          <div className="card p-4">
            <h4 className="text-[11px] font-bold text-text-secondary uppercase mb-3 px-1">本周团队活跃贡献</h4>
            <div 
              onClick={() => onNavigate?.('firm_members')}
              className="flex items-center gap-3 mb-4 cursor-pointer group"
            >
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-blue-100 flex items-center justify-center text-[10px] text-brand-primary font-bold border border-blue-200 transition-transform group-hover:-translate-y-1">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
               </div>
               <span className="text-[10px] text-brand-primary font-bold bg-blue-50 px-2 py-0.5 rounded-full group-hover:bg-blue-100 transition-colors">+12 条新经验</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-md border border-slate-100 italic text-[10px] text-text-light">
               "张律师上传了最新的《金融借款口径》，AI 审核准确率提升了 15%"
            </div>
          </div>

          <div className="card p-4">
            <h4 className="text-[11px] font-bold text-text-secondary uppercase mb-3 px-1">核心主题标签</h4>
            <div className="flex flex-wrap gap-1.5">
              {['民间借贷', '利息', '婚姻', '金融', '刑事', '证据', '诉讼', '执行', '监管'].map(tag => (
                <span key={tag} className="px-2 py-1 bg-white border border-border text-[10px] text-text-secondary rounded-sm cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-all">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {MOCK_KNOWLEDGE.filter(k => activeTab === '全部' || k.category === activeTab).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onEdit?.(item)}
                className="card p-5 group hover:border-brand-primary/50 transition-all cursor-pointer bg-white relative overflow-hidden"
              >
                {item.aiEnabled && (
                  <div className="absolute top-0 right-0 w-12 h-12">
                    <div className="absolute top-[-10px] right-[-30px] w-16 h-8 bg-emerald-500/10 rotate-45 flex items-center justify-center pt-2">
                       <Zap size={10} className="text-emerald-600 ml-4 mb-2" fill="currentColor" />
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-brand-primary transition-colors flex items-center justify-center`}>
                    <BookOpen size={20} />
                  </div>
                  <div className="flex items-center gap-2">
                    {item.aiEnabled && (
                      <div title="AI 增强推理源" className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-100">
                        <BrainCircuit size={10} />
                        AI 深度联想
                      </div>
                    )}
                    <button className="p-1 hover:bg-slate-100 rounded">
                      <MoreVertical size={16} className="text-text-light" />
                    </button>
                  </div>
                </div>

                <h4 className="font-bold text-brand-deep group-hover:text-brand-primary transition-colors mb-2 text-sm leading-snug">{item.title}</h4>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1 text-[10px] text-text-light font-medium bg-slate-100 px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-text-light">
                    <CheckCircle2 size={12} className="text-emerald-500" /> 被引用 {item.refCount} 次
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-text-light">
                    <Clock size={12} /> {item.updatedAt}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold text-brand-primary bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {MOCK_KNOWLEDGE.filter(k => activeTab === '全部' || k.category === activeTab).length === 0 && (
              <div className="col-span-full py-24 flex flex-col items-center justify-center text-text-light space-y-4">
                 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                    <BookOpen size={40} className="opacity-20" />
                 </div>
                 <div className="text-center">
                    <p className="font-bold text-brand-deep">暂无该分类知识条目</p>
                    <p className="text-xs mt-1">上传律所内训资料、法院宣判口径，构建律所数字护城河</p>
                 </div>
                 <button 
                   onClick={onAdd}
                   className="btn-primary h-9 text-xs px-6 shadow-md"
                 >
                   即刻录入专业资产
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
