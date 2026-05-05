/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  TrendingUp, 
  Flame, 
  BookOpen, 
  Newspaper, 
  Scale,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  Bookmark
} from 'lucide-react';
import { motion } from 'motion/react';

interface KnowledgeDiscoveryProps {
  onBack: () => void;
  onViewKnowledge: (id: string) => void;
}

export default function KnowledgeDiscovery({ onBack, onViewKnowledge }: KnowledgeDiscoveryProps) {
  const [activeFilter, setActiveFilter] = useState('全部动态');

  const filters = ['全部动态', '最高院发布', '地方高院', '地方法院', '监管快讯', '类案推送'];

  const trendingTopics = [
    '#数据二十条#', '#新公司法详解#', '#金融借款管辖#', '#民法典合同编解释#'
  ];

  const discoveryItems = [
    {
      id: 'd1',
      title: '最高法发布《关于适用中华人民共和国民法典合同编通则部分若干问题的解释》',
      type: '司法解释',
      source: '最高人民法院',
      time: '2小时前',
      summary: '对合同的订立、效力、履行、保全、变更和转让、权利义务终止、违约责任等进行了详细规定，特别强化了诚信原则的适用。',
      tags: ['民法典', '合同编', '司法解释'],
      aiAnalysis: '本解释对「预约合同」的认定标准进行了明确，建议更新全所商事合同模板中的定金条款。',
      engagement: 1240,
      isHot: true
    },
    {
      id: 'd2',
      title: '最新：某互联网平台数据不出境安全评估案例解析',
      type: '办案指引',
      source: '律所专业委员会',
      time: '昨天',
      summary: '结合网信办最新监管要求，总结了企业数据整理、申报、审计的完整合规闭环流程。',
      tags: ['数据安全', '合规', 'GDPR'],
      aiAnalysis: '包含 5 个关键风险核查点，已同步关联至《互联网合规常年法律服务》业务板块。',
      engagement: 856,
      isHot: false
    },
    {
      id: 'd3',
      title: '浙江省高院：关于审理涉小额贷款公司纠纷案件的几个疑难问题综述',
      type: '审判指引',
      source: '浙江高院',
      time: '3天前',
      summary: '针对「职业放贷人」特征认定、复利计算标准、中介费计入利息上限等核心争议点给出明确回复。',
      tags: ['金融借款', '小额贷款', '浙江规程'],
      aiAnalysis: '对比律所现有「民间借贷」模板，建议在风险告知书中增加「职业放贷」风险警示。',
      engagement: 2105,
      isHot: true
    }
  ];

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      {/* Header & Search */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight flex items-center gap-3">
              <Sparkles className="text-brand-primary" size={24} />
              知识发现：AI 法律情报
            </h2>
            <p className="text-sm text-text-light mt-1">
              AI 引擎为您实时监测全网法律动态，并自动与律所资产进行对标映射
            </p>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 h-10 px-4 text-xs font-bold text-text-secondary hover:bg-slate-100 rounded-xl transition-all border border-slate-200"
          >
            返回知识库
          </button>
        </div>

        <div className="relative">
          <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-primary" />
          <input 
            type="text" 
            placeholder="输入关键词，通过 AI 语义模型搜索全网判例、法规与解析..."
            className="w-full h-16 pl-14 pr-6 bg-white border-2 border-slate-100 rounded-2xl text-base focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none shadow-xl shadow-slate-200/40 transition-all font-medium"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-text-light">试试搜索:</span>
            {trendingTopics.slice(0, 2).map(topic => (
              <button key={topic} className="px-3 py-1.5 bg-slate-100 hover:bg-brand-primary/10 hover:text-brand-primary rounded-lg text-[10px] font-bold transition-all">
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filters */}
        <div className="space-y-6">
          <div className="card p-5 bg-white space-y-4">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider px-2">发现分类</h3>
            <div className="space-y-1">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === filter 
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                    : 'text-text-secondary hover:bg-slate-50'
                  }`}
                >
                  {filter}
                  <ChevronRight size={14} className={activeFilter === filter ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </div>
          </div>

          <div className="card p-6 bg-brand-deep text-white border-none shadow-2xl relative overflow-hidden">
             <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
             <TrendingUp size={24} className="text-brand-primary mb-4" />
             <h4 className="text-sm font-bold mb-2">定制情报订阅</h4>
             <p className="text-[10px] text-white/60 leading-relaxed mb-6">
               根据您常办的案件类型（民间借贷、融资租赁），AI 将为您每日生成专属情报简报。
             </p>
             <button className="w-full h-10 rounded-xl bg-white text-brand-deep text-[10px] font-bold hover:bg-brand-primary hover:text-white transition-all">
               立即设置订阅
             </button>
          </div>
        </div>

        {/* Discovery Feed */}
        <div className="lg:col-span-3 space-y-6">
          {discoveryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card p-8 bg-white hover:border-brand-primary/40 group transition-all cursor-pointer relative"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-brand-primary text-[10px] font-bold uppercase">
                    {item.type}
                  </span>
                  <span className="text-[10px] text-text-light font-medium flex items-center gap-1">
                    <Scale size={12} /> {item.source}
                  </span>
                  <span className="text-[10px] text-text-light flex items-center gap-1 ml-2">
                    <BookOpen size={12} /> {item.time}
                  </span>
                </div>
                {item.isHot && (
                  <div className="flex items-center gap-1 text-red-500 animate-pulse">
                    <Flame size={14} />
                    <span className="text-[10px] font-bold">热议中</span>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-brand-deep group-hover:text-brand-primary transition-colors mb-3 leading-tight">
                {item.title}
              </h3>
              
              <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-2">
                {item.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {item.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-slate-50 text-text-light text-[10px] font-medium rounded-md border border-slate-100">
                    {tag}
                  </span>
                ))}
              </div>

              {/* AI Insight Box */}
              <div className="p-5 rounded-2xl bg-brand-ice border border-brand-primary/10 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex flex-shrink-0 items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-deep mb-1">AI 专业价值评估 (律师视角)</h4>
                  <p className="text-[11px] text-brand-primary/80 leading-relaxed font-semibold">
                    {item.aiAnalysis}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-text-light hover:text-brand-primary text-xs font-medium transition-colors">
                    <ThumbsUp size={16} /> {item.engagement}
                  </button>
                  <button className="flex items-center gap-2 text-text-light hover:text-brand-primary text-xs font-medium transition-colors">
                    <MessageSquare size={16} /> 42 讨论
                  </button>
                  <button className="flex items-center gap-2 text-text-light hover:text-brand-primary text-xs font-medium transition-colors">
                    <Bookmark size={16} /> 收藏
                  </button>
                </div>
                <button 
                  onClick={() => onViewKnowledge(item.id)}
                  className="flex items-center gap-1 text-brand-primary text-xs font-bold hover:underline"
                >
                  阅读全文解析 <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}

          <button className="w-full py-6 rounded-2xl border-2 border-dashed border-slate-200 text-text-light text-sm font-medium hover:border-brand-primary/40 hover:text-brand-primary hover:bg-brand-primary/5 transition-all flex flex-col items-center gap-2">
            <Newspaper size={24} className="opacity-40" />
            点击加载更多情报
          </button>
        </div>
      </div>
    </div>
  );
}
