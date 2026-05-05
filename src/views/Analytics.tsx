import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  BrainCircuit,
  Zap,
  Briefcase,
  ChevronRight,
  Download,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'motion/react';

const TREND_DATA = [
  { name: 'Jan', cases: 45, docs: 120, income: 15.2 },
  { name: 'Feb', cases: 52, docs: 145, income: 18.5 },
  { name: 'Mar', cases: 48, docs: 130, income: 16.8 },
  { name: 'Apr', cases: 61, docs: 180, income: 22.4 },
  { name: 'May', cases: 55, docs: 165, income: 20.1 },
  { name: 'Jun', cases: 67, docs: 210, income: 25.6 },
  { name: 'Jul', cases: 72, docs: 240, income: 28.9 },
];

const CATEGORY_DATA = [
  { name: '民事案件', value: 45, color: '#64748B' },
  { name: '商事合同', value: 30, color: '#94A3B8' },
  { name: '知识产权', value: 15, color: '#CBD5E1' },
  { name: '刑事辩护', value: 10, color: '#E2E8F0' },
];

interface MetricCardProps {
  label: string;
  value: string;
  trend: { val: string; isUp: boolean };
  icon: any;
  color: string;
}

function MetricCard({ label, value, trend, icon: Icon, color }: MetricCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card-base p-6 bg-white shadow-light"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 shrink-0`}>
          <Icon className={color.replace('bg-', 'text-')} size={24} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${trend.isUp ? 'bg-stone-50 text-stone-500' : 'bg-zinc-50 text-zinc-500'}`}>
          {trend.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend.val}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[11px] font-bold text-text-light uppercase tracking-wider">{label}</p>
        <h3 className="text-2xl font-bold text-text-main">{value}</h3>
      </div>
    </motion.div>
  );
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<'income' | 'cases' | 'docs'>('income');

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-text-main">数据洞察看板</h2>
          <p className="text-sm text-text-light">实时监测律所运行核心指标，基于 AI 进行趋势预测与风险分析</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary h-11 px-6">
            <Download size={18} />
            <span>导出周报</span>
          </button>
          <button className="btn-primary h-11 px-8 bg-slate-800 hover:bg-slate-700 text-white shadow-xl shadow-slate-800/20 border-none">
            <Zap size={18} />
            <span>AI 即时生成洞察</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="本月新增案件" 
          value="156 件" 
          trend={{ val: '12%', isUp: true }}
          icon={Briefcase}
          color="bg-slate-500"
        />
        <MetricCard 
          label="累计生成文书" 
          value="4,821 份" 
          trend={{ val: '24%', isUp: true }}
          icon={FileText}
          color="bg-stone-500"
        />
        <MetricCard 
          label="执业律师数" 
          value="42 名" 
          trend={{ val: '2 名', isUp: true }}
          icon={Users}
          color="bg-zinc-500"
        />
        <MetricCard 
          label="年度营收概算" 
          value="¥ 8.42M" 
          trend={{ val: '4.2%', isUp: false }}
          icon={DollarSign}
          color="bg-neutral-500"
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Main Trend Chart */}
          <div className="card-base p-8 bg-white shadow-light">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-text-main tracking-tight">业务指标趋势</h3>
                <p className="text-xs text-text-light italic">基于过去 7 个月的复合增长数据分析</p>
              </div>
              <div className="flex bg-slate-50 p-1 rounded-xl">
                 <button 
                   onClick={() => setActiveTab('income')}
                   className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'income' ? 'bg-white shadow-sm text-brand-primary' : 'text-text-light hover:text-text-secondary'}`}
                 >营收</button>
                 <button 
                   onClick={() => setActiveTab('cases')}
                   className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'cases' ? 'bg-white shadow-sm text-brand-primary' : 'text-text-light hover:text-text-secondary'}`}
                 >案件</button>
                 <button 
                   onClick={() => setActiveTab('docs')}
                   className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'docs' ? 'bg-white shadow-sm text-brand-primary' : 'text-text-light hover:text-text-secondary'}`}
                 >文书</button>
              </div>
            </div>
            
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', padding: '16px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={activeTab} 
                    name={activeTab === 'income' ? '营收 (百万)' : activeTab === 'cases' ? '案件 (件)' : '文书 (份)'} 
                    stroke="#94a3b8" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorIncome)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Grid: Quick Entrances + Growth Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="card-base p-6 bg-white shadow-light">
                <h4 className="text-sm font-bold text-text-main mb-6">快捷管理入口</h4>
                <div className="grid grid-cols-2 gap-4">
                   {[
                     { label: '案件审批', icon: Zap, color: 'text-slate-500', bg: 'bg-slate-50' },
                     { label: '薪酬结算', icon: DollarSign, color: 'text-stone-500', bg: 'bg-stone-50' },
                     { label: '执业统计', icon: TrendingUp, color: 'text-zinc-500', bg: 'bg-zinc-50' },
                     { label: '年度审计', icon: Calendar, color: 'text-neutral-500', bg: 'bg-neutral-50' }
                   ].map((item, i) => (
                     <button key={i} className="flex flex-col items-center justify-center p-6 rounded-[20px] bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group border border-transparent hover:border-slate-100">
                        <div className={`p-4 rounded-2xl ${item.bg} ${item.color} mb-3 group-hover:scale-110 transition-transform`}>
                           <item.icon size={24} />
                        </div>
                        <span className="text-xs font-bold text-text-secondary">{item.label}</span>
                     </button>
                   ))}
                </div>
             </div>

             <div className="card-base p-6 bg-white shadow-light">
                <h4 className="text-sm font-bold text-text-main mb-6">案件分类分布</h4>
                <div className="h-[200px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CATEGORY_DATA} layout="vertical" margin={{ left: 10, right: 30 }}>
                        <XAxis type="number" hide />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                          width={70}
                        />
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ borderRadius: '12px', border: 'none' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                           {CATEGORY_DATA.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                   <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-text-light uppercase tracking-wider">最高增长率领域</span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <ArrowUpRight size={12} /> 民事业务 (+18%)
                      </span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Sidebar: AI Analysis */}
        <div className="lg:col-span-4 space-y-8">
           <div className="ai-tip-card p-8 border-none shadow-light">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 rounded-2xl bg-slate-50 shadow-sm text-slate-500">
                    <BrainCircuit size={28} />
                 </div>
                 <div>
                    <h4 className="text-base font-bold text-text-main tracking-tight">AI 运行效能诊断</h4>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-0.5">本周诊断结果：高效稳健</p>
                 </div>
              </div>
              
              <div className="space-y-6">
                 <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.5)]"></div>
                      <h5 className="text-xs font-bold text-text-main">营收潜力释放</h5>
                   </div>
                   <p className="text-[11px] leading-relaxed text-text-secondary pl-4">
                     商事合同文书库复用率已达到 88%，边际办案成本下降 12.4%。建议关注“知识产权”领域的咨询转换率，该板块增长动能显著。
                   </p>
                 </div>

                 <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 shadow-[0_0_8px_rgba(161,161,170,0.5)]"></div>
                      <h5 className="text-xs font-bold text-text-main">人力资源饱和度警告</h5>
                   </div>
                   <p className="text-[11px] leading-relaxed text-text-secondary pl-4">
                     刑事业务部人均负荷已超过 20 件，处于“过载”状态。AI 建议在本月度进行内部活水或增加 2 名助理级别支持。
                   </p>
                 </div>

                 <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-400 shadow-[0_0_8px_rgba(168,162,158,0.5)]"></div>
                      <h5 className="text-xs font-bold text-text-main">合规趋势洞察</h5>
                   </div>
                   <p className="text-[11px] leading-relaxed text-text-secondary pl-4">
                     本周触发“无效条款”预警次数为 0，说明近期全所文书合规性已达到历史最佳水平（99.2%）。
                   </p>
                 </div>
              </div>

              <button className="w-full mt-8 h-12 rounded-2xl bg-slate-800 text-white text-[11px] font-bold shadow-xl shadow-slate-800/20 hover:bg-slate-700 transition-all flex items-center justify-center gap-2 group">
                 <span>获取深度咨询报告</span>
                 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>

           <div className="card-base p-6 bg-white shadow-light">
              <h4 className="text-sm font-bold text-text-main mb-6">关键效率指标 (KPI)</h4>
              <div className="space-y-6">
                 {[
                   { label: '文书平均起草耗时', val: '2.4 小时', score: 92, color: 'bg-stone-400' },
                   { label: '案件结案周期', val: '58 天', score: 78, color: 'bg-slate-400' },
                   { label: '客户满意度反馈', val: '4.8 / 5.0', score: 96, color: 'bg-zinc-400' },
                   { label: 'AI 辅助审核覆盖率', val: '100%', score: 100, color: 'bg-neutral-400' },
                 ].map((kpi, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-baseline">
                         <span className="text-[11px] font-bold text-text-light">{kpi.label}</span>
                         <span className="text-xs font-mono font-bold text-text-main">{kpi.val}</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${kpi.score}%` }}
                           className={`h-full ${kpi.color}`}
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
