/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  Users, 
  AlertTriangle,
  CreditCard,
  Plus,
  Zap,
  ArrowUpRight,
  TrendingUp,
  FileCheck,
  BookOpen,
  Send,
  Library,
  Briefcase,
  Users2,
  ListTodo,
  ShieldCheck,
  MessageCircleWarning,
  BarChart3,
  FileSearch,
  ShieldAlert,
  ChevronRight,
  Target,
  Sparkles,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie, 
  Cell
} from 'recharts';
import { UserRole, DashboardStat } from '../types';

interface DashboardProps {
  role: UserRole;
  onNavigate: (id: string) => void;
}

const STATS_FIRM: any[] = [
  { id: '1', label: '模板总数', value: 128, trend: { value: '+12%', isUp: true }, icon: Library, color: 'blue' },
  { id: '2', label: '知识条目', value: 342, trend: { value: '+24', isUp: true }, icon: BookOpen, color: 'emerald' },
  { id: '3', label: '本月生成文书', value: '1,286', trend: { value: '+8%', isUp: true }, icon: FileCheck, color: 'indigo' },
  { id: '4', label: '待审核文书', value: 24, trend: { value: '-2', isUp: false }, icon: Send, color: 'amber' },
];

const STATS_PLATFORM: any[] = [
  { id: '1', label: '新增活跃用户', value: '450', trend: { value: '+18%', isUp: true }, icon: Users, color: 'blue' },
  { id: '2', label: '全量入驻律所', value: 156, trend: { value: '+12', isUp: true }, icon: Building, color: 'emerald' },
  { id: '3', label: '系统预警记录', value: 18, trend: { value: '紧急', isUp: false }, icon: AlertTriangle, color: 'rose' },
  { id: '4', label: '今日收益预估', value: '¥42.8k', trend: { value: '+24%', isUp: true }, icon: CreditCard, color: 'violet' },
];

const TREND_DATA = [
  { name: 'Mon', active: 400, total: 850 },
  { name: 'Tue', active: 300, total: 820 },
  { name: 'Wed', active: 600, total: 950 },
  { name: 'Thu', active: 478, total: 1100 },
  { name: 'Fri', active: 189, total: 1050 },
  { name: 'Sat', active: 239, total: 900 },
  { name: 'Sun', active: 349, total: 1150 },
];

const CATEGORY_DATA = [
  { name: '商事合同', value: 400, color: '#3A68F8' }, // bg-blue-600 ish
  { name: '民事诉讼', value: 300, color: '#7C3AED' }, // bg-violet-600 ish
  { name: '知产纠纷', value: 300, color: '#10B981' }, // bg-emerald-500 ish
  { name: '其他业务', value: 200, color: '#CBD5E1' }, // bg-slate-300 ish
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard({ role, onNavigate }: DashboardProps) {
  const [trendView, setTrendView] = useState<'weekly' | 'monthly'>('weekly');
  const stats = role === UserRole.FIRM_ADMIN ? STATS_FIRM : STATS_PLATFORM;
  const isFirm = role === UserRole.FIRM_ADMIN;

  const activeTrendData = trendView === 'weekly' ? TREND_DATA : [
    { name: 'Jan', active: 1200, total: 3400 },
    { name: 'Feb', active: 1800, total: 3800 },
    { name: 'Mar', active: 1600, total: 4200 },
    { name: 'Apr', active: 2200, total: 5100 },
    { name: 'May', active: 2500, total: 5600 },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12 relative"
    >
      {/* Mesh Gradient Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-slate-300/40 blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[40%] rounded-full bg-zinc-300/30 blur-[100px]" />
        <div className="absolute bottom-0 left-[20%] w-[50%] h-[30%] rounded-full bg-stone-300/30 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-black text-brand-deep tracking-tight">
            早安，管委会{isFirm ? '伙伴' : '管理员'}
          </h1>
          <p className="text-sm font-medium text-text-light mt-1">
            系统运行状态：<span className="text-slate-500 font-bold">优秀 (Stable)</span>。今天有 {isFirm ? '8' : '15'} 个关键指标变动。
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" referrerPolicy="no-referrer" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-primary text-white flex items-center justify-center text-[10px] font-bold">+5</div>
          </div>
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          <button 
            onClick={() => onNavigate('task_calendar')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-brand-deep uppercase tracking-widest shadow-sm hover:shadow-md active:scale-95 transition-all"
          >
            <Calendar size={14} className="text-brand-primary" />
            2026.05.05
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.id} 
            variants={item}
            onClick={() => onNavigate('analytics')}
            className="card p-8 flex flex-col gap-6 group cursor-pointer transition-all border-slate-100 shadow-premium overflow-hidden relative hover:border-slate-200 hover:-translate-y-1"
          >
            {/* Background Glow */}
            <div className="absolute -right-6 -top-6 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 bg-slate-200" />

            <div className="flex items-center justify-between relative z-10">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${
                stat.trend.isUp 
                  ? 'bg-stone-50 text-stone-500' 
                  : 'bg-zinc-50 text-zinc-500'
              }`}>
                {stat.trend.value}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-text-light uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-mono font-black text-brand-deep leading-none tracking-tighter group-hover:translate-x-1 transition-transform duration-300">
                {stat.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <motion.div variants={item} className="xl:col-span-8 card p-10 border-slate-100 shadow-strong relative overflow-hidden">
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div>
              <h3 className="text-xl font-serif font-black text-brand-deep tracking-tight flex items-center gap-2">
                <TrendingUp size={24} className="text-brand-primary" />
                业务生产力趋势看板
              </h3>
              <p className="text-xs text-text-light font-medium mt-1">AI 辅助生成的文书与审核周分布数据</p>
            </div>
            <div className="flex gap-2 bg-slate-50 p-1 rounded-xl">
              <button 
                onClick={() => setTrendView('weekly')}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${trendView === 'weekly' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-400 hover:text-slate-600'}`}
              >按周</button>
              <button 
                onClick={() => setTrendView('monthly')}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${trendView === 'monthly' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-400 hover:text-slate-600'}`}
              >按月</button>
            </div>
          </div>
          
          <div className="h-[320px] w-full relative z-10">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={activeTrendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#64748B" stopOpacity={0.4}/>
                     <stop offset="95%" stopColor="#64748B" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#CBD5E1" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#CBD5E1" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                 <RechartsTooltip 
                   contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.05)', padding: '16px' }}
                   cursor={{ stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '4 4' }}
                 />
                 <Area type="monotone" dataKey="total" stroke="#CBD5E1" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorTotal)" />
                 <Area type="monotone" dataKey="active" stroke="#64748B" strokeWidth={4} fill="url(#colorWave)" animationDuration={2500} />
               </AreaChart>
             </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-10 pt-10 border-t border-slate-50 relative z-10">
            {[
              { label: '系统拦截频次', value: '14 次', color: 'text-stone-500' },
              { label: '平均审核时效', value: '0.8s', color: 'text-slate-600' },
              { label: '知识检索深度', value: '94%', color: 'text-zinc-500' },
              { label: '资源盈余', value: '18.2%', color: 'text-slate-400' },
            ].map((d, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] font-black text-text-light uppercase tracking-widest mb-1">{d.label}</span>
                <span className={`text-xl font-mono font-black ${d.color}`}>{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Launchpad & AI Insight */}
        <motion.div variants={item} className="xl:col-span-4 space-y-8">
           <div className="card p-10 bg-gradient-to-br from-slate-800 via-[#1e293b] to-slate-800 text-white shadow-premium relative overflow-hidden group border-none">
              <div className="absolute -right-10 -top-10 opacity-5 group-hover:rotate-12 group-hover:scale-150 transition-all duration-1000">
                <Zap size={220} />
              </div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-slate-400/10 blur-[100px] rounded-full" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center ring-1 ring-white/10 backdrop-blur-xl">
                    <Sparkles size={24} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-serif font-black tracking-tight">AI 智能审计报告</h3>
                </div>
                <p className="text-sm text-white/70 leading-relaxed font-medium mb-10">
                  本周律所整体效能提升了 <span className="text-slate-300 font-black text-lg">12.4%</span>。建议关注“知识产权”类模板，其复用率正在快速攀升。
                </p>
                <div className="space-y-4 mb-10">
                   {[
                     { label: '合规风险', val: 'Low', color: 'bg-stone-300 text-stone-800' },
                     { label: '产能负荷', val: '68%', color: 'bg-slate-300 text-slate-800' }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{item.label}</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.color}`}>{item.val}</span>
                     </div>
                   ))}
                </div>
                <button 
                  onClick={() => onNavigate('analytics')}
                  className="w-full py-5 bg-white text-brand-deep rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/20 active:scale-[0.98]"
                >
                  查看深度建议 <ChevronRight size={14} strokeWidth={3} />
                </button>
              </div>
           </div>

            <div className="card p-8 border-slate-100 shadow-strong bg-white/80 backdrop-blur-md">
              <h3 className="text-sm font-black text-brand-deep uppercase tracking-widest mb-6">快捷功能直达</h3>
              <div className="grid grid-cols-2 gap-4">
                {(isFirm ? [
                  { id: 'firm_compliance', label: '合规审计', icon: ShieldCheck, color: 'emerald' },
                  { id: 'firm_knowledge', label: '知识库', icon: BookOpen, color: 'blue' },
                  { id: 'firm_tasks', label: '协作任务', icon: ListTodo, color: 'amber' },
                  { id: 'analytics', label: '统计洞察', icon: BarChart3, color: 'violet' },
                ] : [
                  { id: 'billing_plans', label: '套餐管理', icon: CreditCard, color: 'violet' },
                  { id: 'system_logs', label: '审计日志', icon: FileSearch, color: 'blue' },
                  { id: 'risk', label: '风控中心', icon: AlertTriangle, color: 'rose' },
                  { id: 'firms', label: '机构管理', icon: Building, color: 'emerald' },
                ]).map(m => (
                  <button 
                    key={m.id}
                    onClick={() => onNavigate(m.id)}
                    className="flex flex-col items-center justify-center p-5 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-slate-300 group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600">
                      <m.icon size={20} />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 group-hover:text-slate-800 transition-colors uppercase tracking-widest">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
        </motion.div>
      </div>

      {/* Secondary Dashboard Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Case Categories Pie Chart */}
        <motion.div variants={item} className="card bg-white p-8 md:p-10 border-slate-100 shadow-sm relative overflow-hidden backdrop-blur-md rounded-[32px]">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-4">
            <div>
              <h3 className="text-[22px] font-black text-slate-800 tracking-tight flex items-center gap-2 mb-1">
                <Target size={26} className="text-slate-700" strokeWidth={2.5} />
                案件种类分析
              </h3>
              <p className="text-xs text-slate-400 font-bold">律所各业务板块案源与营收占比分布</p>
            </div>
            <button 
              onClick={() => onNavigate('analytics')}
              className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:shadow-xl hover:shadow-slate-800/20 hover:-translate-y-0.5 active:scale-95 transition-all mt-2 md:mt-0 flex items-center gap-2 group"
            >
              查看详细报表 
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-8 h-[240px]">
            <div className="w-[240px] h-[240px] relative shrink-0">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={CATEGORY_DATA}
                     cx="50%"
                     cy="50%"
                     innerRadius={78}
                     outerRadius={108}
                     paddingAngle={8}
                     dataKey="value"
                     cornerRadius={16}
                     stroke="none"
                   >
                     {CATEGORY_DATA.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <RechartsTooltip 
                     contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                     itemStyle={{ color: '#1e293b' }}
                   />
                 </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-[28px] font-black text-slate-800 tracking-tight">1.2K</span>
                 <span className="text-xs font-bold text-slate-400 mt-0.5">总案量</span>
               </div>
            </div>
            
            <div className="flex-1 w-full space-y-5 px-4 md:px-0">
              {CATEGORY_DATA.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[15px] font-bold text-slate-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[15px] font-bold text-slate-500 whitespace-nowrap">{item.value}件</span>
                    <span className="text-sm font-bold w-12 text-right" style={{ color: item.color }}>{((item.value / 1200) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent High-Priority Tasks / Cases */}
        <motion.div variants={item} className="card p-8 md:p-10 border-slate-100 shadow-strong relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-serif font-black text-brand-deep tracking-tight flex items-center gap-2">
                <AlertTriangle size={24} className="text-amber-500" />
                高优预警与待办
              </h3>
              <p className="text-xs text-text-light font-medium mt-1">系统智能识别的逾期风险及高优事项</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { title: '某互联网公司股权架构审查', time: '逾期 1 天', type: '风险提示', color: 'text-red-600', bg: 'bg-red-50 border-red-100', nav: 'firm_tasks' },
              { title: '李某与王某借贷纠纷二审答辩状', time: '今天 18:00', type: '紧急文书', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', nav: 'case_editor' },
              { title: 'A轮融资Term Sheet复核', time: '明天 10:00', type: '紧急待办', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100', nav: 'firm_contracts' },
              { title: '律所第三季度合规自查报告', time: '剩余 3 天', type: '内部管理', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', nav: 'firm_compliance' },
            ].map((task, i) => (
              <div 
                key={i} 
                onClick={() => onNavigate(task.nav)}
                className={`p-4 rounded-2xl border ${task.bg} flex items-center justify-between transition-all hover:scale-[1.01] cursor-pointer group hover:shadow-md`}
              >
                <div className="flex items-center gap-4">
                   <div className={`w-2 h-2 rounded-full ${task.color.replace('text-', 'bg-')}`}></div>
                   <div>
                     <p className="text-sm font-bold text-slate-800 mb-1">{task.title}</p>
                     <div className="flex items-center gap-2 text-[10px] font-bold">
                       <span className={task.color}>{task.type}</span>
                       <span className="text-slate-300 xl:inline-block hidden">•</span>
                       <span className="text-slate-500 xl:inline-block hidden">{task.time}</span>
                     </div>
                   </div>
                </div>
                <div className="flex flex-col items-end xl:hidden mb-1">
                   <span className="text-[10px] font-bold text-slate-500">{task.time}</span>
                </div>
                <button className="w-8 h-8 rounded-full bg-white/80 hidden xl:flex items-center justify-center text-slate-400 group-hover:text-brand-primary group-hover:bg-white transition-all shadow-sm group-hover:shadow group-hover:-translate-y-0.5">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


