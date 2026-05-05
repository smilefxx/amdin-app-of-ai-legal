import { 
  CreditCard, 
  Check, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Users,
  ShieldCheck,
  Zap,
  Globe,
  Coins
} from 'lucide-react';
import { motion } from 'motion/react';

const PLANS = [
  {
    id: 'base',
    name: '基础文书审查',
    price: '99',
    unit: '起',
    description: '适合金额较低、事实清楚的简单文书。',
    features: [
      '文书格式检查',
      '基础错漏检查',
      '信息完整性提示',
      '24小时内反馈'
    ],
    accent: 'blue',
    featured: false,
    stats: { users: 1240, growth: '+12%' }
  },
  {
    id: 'pro',
    name: '专业律师审查',
    price: '299',
    unit: '起',
    description: '适合借贷、保险、担保等常见金融经济法纠纷。',
    features: [
      '法律关系判断',
      '诉讼请求审查',
      '证据链审查',
      '律师书面意见'
    ],
    accent: 'brand',
    featured: true,
    stats: { users: 3820, growth: '+28%' }
  },
  {
    id: 'deep',
    name: '深度咨询方案',
    price: '599',
    unit: '起',
    description: '适合金额较大、证据复杂或需要诉讼策略的案件。',
    features: [
      '电话/视频咨询',
      '诉讼策略建议',
      '保全与执行建议',
      '可抵扣后续费用'
    ],
    accent: 'slate',
    featured: false,
    stats: { users: 850, growth: '+5%' }
  }
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function BillingPlans() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-20"
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-black text-brand-deep tracking-tight">资费套餐与权益管理</h1>
          <p className="text-sm font-medium text-text-light mt-1">控制全平台订阅方案、增值服务及其定价策略</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-text-main shadow-sm">
              <Globe size={14} className="text-brand-primary" />
              全球定价节点: 亚太 (Shanghai)
           </div>
           <button className="btn-primary bg-brand-deep shadow-strong rounded-xl text-[11px] font-black uppercase tracking-widest px-6 py-3">
              <Plus size={16} /> 创建新方案
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total_Subscribers', value: '5,910', trend: '+18.2%', icon: Users, color: 'blue' },
          { label: 'Monthly_Revenue', value: '¥142,800', trend: '+24.5%', icon: Coins, color: 'emerald' },
          { label: 'Conversion_Rate', value: '14.2%', trend: '+2.1%', icon: Zap, color: 'brand' },
        ].map((stat, idx) => (
          <motion.div key={idx} variants={item} className="card p-8 flex items-center gap-6 group cursor-pointer hover:border-brand-primary/40 transition-all border-slate-100 shadow-premium">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 ${
              stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
              stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
              'bg-brand-primary/10 text-brand-primary'
            }`}>
              <stat.icon size={28} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black text-text-light uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-mono font-black text-brand-deep leading-none">{stat.value}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {PLANS.map((plan, idx) => (
          <motion.div 
            key={plan.id}
            variants={item}
            className={`relative flex flex-col rounded-[2.5rem] p-10 transition-all duration-500 group border-2 ${
              plan.featured 
                ? 'border-brand-primary bg-white shadow-strong scale-105 z-10' 
                : 'border-slate-100 bg-white hover:border-slate-200'
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-xl flex items-center gap-2 ring-4 ring-white">
                <ShieldCheck size={14} />
                Most Popular
              </div>
            )}

            <div className="mb-10 text-center">
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] mb-4 block ${
                plan.accent === 'brand' ? 'text-brand-primary' : 'text-slate-400'
              }`}>
                Tier - {idx + 1}
              </span>
              <h3 className="text-2xl font-serif font-black text-brand-deep mb-3 tracking-tight">{plan.name}</h3>
              <p className="text-xs text-text-light leading-relaxed font-medium px-4">
                {plan.description}
              </p>
            </div>

            <div className="flex flex-col items-center mb-10 pb-10 border-b border-slate-50">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-slate-400">¥</span>
                <span className="text-7xl font-mono font-black text-brand-deep tracking-tight group-hover:scale-110 transition-transform duration-500">{plan.price}</span>
                <span className="text-slate-400 font-bold ml-1 text-sm">{plan.unit}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">{plan.stats.users} Firms Subscribed</p>
            </div>

            <div className="space-y-5 mb-12 flex-1">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-4 group/item">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    plan.featured ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400 group-hover/item:bg-blue-50 group-hover/item:text-blue-500'
                  }`}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 tracking-tight">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
               <button className={`w-full py-5 rounded-3xl text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                 plan.featured 
                   ? 'bg-brand-primary text-white hover:bg-brand-deep shadow-2xl shadow-brand-primary/30' 
                   : 'bg-brand-deep text-white hover:bg-slate-800'
               }`}>
                 编辑计划属性
               </button>
               <button className="w-full py-4 rounded-3xl bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                  <MoreHorizontal size={16} /> 更多配置项
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Change Log Section */}
      <motion.div variants={item} className="card p-10 border-slate-100 shadow-premium">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-xl font-serif font-black text-brand-deep tracking-tight flex items-center gap-3">
             <TrendingUp size={24} className="text-brand-primary" />
             近期资费与权益审计
           </h3>
           <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">查看全量审计历史</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { action: '价格上调', plan: '专业律师审查', reason: '由于律师资源成本上升，基础价格从 199 调整至 299', date: '2026-05-01', user: 'Admin_Root' },
             { action: '权益新增', plan: '深度咨询方案', reason: '新增 "可抵扣后续费用" 政策，以提升长协订单转化率', date: '2026-04-28', user: 'Admin_Billing' },
             { action: '方案发布', plan: '基础文书审查', reason: '针对低净值高频法律需求，推出全流程AI轻量化方案', date: '2026-04-15', user: 'System_Daemon' },
           ].map((log, idx) => (
             <div key={idx} className="flex flex-col gap-4 group">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-primary group-hover:scale-150 transition-transform" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">{log.date}</span>
               </div>
               <div className="pl-5 border-l border-slate-100 space-y-2 mt-1">
                  <h4 className="text-sm font-black text-brand-deep">{log.action}: {log.plan}</h4>
                  <p className="text-xs text-text-light leading-relaxed font-medium">{log.reason}</p>
                  <div className="flex items-center gap-2 pt-2">
                     <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500 uppercase">{log.user[0]}</div>
                     <span className="text-[10px] font-black text-slate-400 uppercase">{log.user}</span>
                  </div>
               </div>
             </div>
           ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
