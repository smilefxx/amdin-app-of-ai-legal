import { 
  ShieldAlert, 
  Eye, 
  Brain, 
  Zap, 
  Search, 
  Filter, 
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Lock,
  Radar,
  Activity,
  Sparkles,
  BarChart3,
  Cpu,
  Fingerprint
} from 'lucide-react';
import { motion } from 'motion/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';

const RISK_DATA = [
  { name: '00:00', value: 12 }, { name: '04:00', value: 8 }, { name: '08:00', value: 45 },
  { name: '12:00', value: 30 }, { name: '16:00', value: 85 }, { name: '20:00', value: 60 },
  { name: '23:59', value: 25 },
];

const RECENT_ALERTS = [
  { id: 'R-7721', type: 'compliance', severity: 'high', title: '检测到大规模敏感词库命中', target: '商事合同模板-V4', probability: '92%', status: 'BLOCKING' },
  { id: 'R-7720', type: 'privacy', severity: 'medium', title: '潜在个人隐私信息泄露风险', target: '张某离婚案卷宗', probability: '65%', status: 'FLAGGED' },
  { id: 'R-7719', type: 'relevance', severity: 'low', title: '法律条文引用失效提醒', target: '知识产权侵权分析报告', probability: '40%', status: 'INFO' },
  { id: 'R-7718', type: 'identity', severity: 'critical', title: '身份认证令牌异常调用', target: '律所管理 API', probability: '98%', status: 'BLOCKED' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function RiskEngine() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-20"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-black text-brand-deep tracking-tight">风控审计引擎</h1>
          <p className="text-xs font-mono font-bold text-text-light uppercase tracking-widest mt-1">AI-Driven Realtime Sentinel V4.2L — Active Node: SH-02</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold text-emerald-600">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             SYSTEM_STABLE
          </div>
          <button className="btn-primary bg-brand-deep shadow-none rounded-xl py-2 px-4 h-10 text-[10px] uppercase font-black tracking-widest">
            <Cpu size={14} /> 核心参数设置
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Realtime Scanner Chart */}
        <motion.div variants={item} className="lg:col-span-8 card p-0 overflow-hidden bg-slate-950 text-white shadow-strong border-slate-900 group">
          <div className="p-8 pb-4 flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
              <Radar size={160} />
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 flex items-center justify-center text-brand-primary ring-1 ring-brand-primary/30 backdrop-blur-sm">
                <Radar size={28} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">实时风险动能分布</h3>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5 tracking-widest">REALTIME_TRAFFIC_ANALYSIS_STREAM</p>
              </div>
            </div>
            <div className="relative z-10 flex gap-10">
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Health_Score</span>
                  <span className="text-3xl font-mono font-black text-emerald-400">99.8</span>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Detection_Rate</span>
                  <span className="text-3xl font-mono font-black text-blue-400">1.2ms</span>
               </div>
            </div>
          </div>
          
          <div className="p-8 h-[240px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RISK_DATA}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#475569', fontWeight: 600, fontFamily: 'JetBrains Mono' }} 
                  dy={10}
                />
                <YAxis hide />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '10px', color: '#fff', fontWeight: 'bold', fontFamily: 'JetBrains Mono' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorRisk)" 
                  animationDuration={3000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="px-8 py-4 bg-slate-900/50 border-t border-slate-900 flex justify-between items-center overflow-x-auto gap-8 no-scrollbar">
             {[
               { label: 'Data_Throughput', value: '42.8 GB/s' },
               { label: 'Active_Scanners', value: '1,204' },
               { label: 'Latency_Threshold', value: '< 5ms' },
               { label: 'Model_Confidence', value: '99.98%' }
             ].map((m, i) => (
               <div key={i} className="flex flex-col shrink-0">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
                  <span className="text-[11px] font-mono text-white font-bold">{m.value}</span>
               </div>
             ))}
          </div>
        </motion.div>

        {/* AI Decision Hub */}
        <motion.div variants={item} className="lg:col-span-4 card bg-brand-deep text-white p-8 flex flex-col justify-between border-slate-800 shadow-strong overflow-hidden relative">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <Brain size={180} />
           </div>
           <div>
             <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                  <Cpu size={28} className="text-blue-400" />
                </div>
                <div className="px-3 py-1 bg-blue-500 rounded-lg text-[9px] font-black uppercase tracking-widest animate-pulse">
                  Active Intelligence
                </div>
             </div>
             <h3 className="text-2xl font-bold mb-3 tracking-tight relative z-10">智能决策控制中心</h3>
             <p className="text-xs text-white/50 leading-relaxed font-medium relative z-10">
               基于千万级法律语料库与多模态审计模型，自动识别全平台语义风险与操作异常。
             </p>
           </div>
           
           <div className="pt-8 border-t border-white/5 space-y-6 relative z-10">
             <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1 block">Auto_Resolve</span>
                  <span className="text-2xl font-mono font-black text-emerald-400">94.2%</span>
                </div>
                <div>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1 block">Interception</span>
                  <span className="text-2xl font-mono font-black text-blue-400">28.5k</span>
                </div>
             </div>
             <div>
               <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '94.2%' }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  />
               </div>
               <p className="text-[9px] text-white/30 font-mono mt-2 tracking-widest uppercase text-right">System_Efficiency_Optimized</p>
             </div>
             <button className="btn-primary w-full bg-white text-brand-deep hover:bg-slate-50 border-none shadow-xl shadow-blue-900/40 text-[11px] font-black uppercase tracking-widest py-4">
               <Fingerprint size={16} /> 节点权限配置
             </button>
           </div>
        </motion.div>

        {/* Real-time Events Feed */}
        <motion.div variants={item} className="lg:col-span-12 card p-0 overflow-hidden border-slate-100 shadow-premium">
           <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                 <h3 className="text-lg font-serif font-black text-brand-deep tracking-tight">高危拦截明细</h3>
                 <span className="bg-red-50 text-red-500 text-[10px] font-black px-2 py-0.5 rounded border border-red-100">4 ACTIVE_THREATS</span>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5">
                   <Search size={14} className="text-slate-400 mr-2" />
                   <input type="text" placeholder="Search events..." className="bg-transparent border-none outline-none text-xs font-medium w-40" />
                </div>
                <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500"><Filter size={16} /></button>
              </div>
           </div>

           <div className="p-0 overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Event_ID</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Security_Threat_Title</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Impacted_Node</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-center">Severity</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Confidence</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ALERTS.map((alert, idx) => (
                    <motion.tr 
                      key={alert.id}
                      whileHover={{ backgroundColor: '#f8fafc' }}
                      className="group border-b border-slate-50 last:border-0"
                    >
                      <td className="px-8 py-5">
                         <span className="text-[11px] font-mono font-black text-text-light group-hover:text-brand-primary transition-colors">{alert.id}</span>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500/20 flex items-center justify-center">
                               <div className="w-1 h-1 rounded-full bg-red-500" />
                            </div>
                            <span className="text-sm font-bold text-brand-deep tracking-tight">{alert.title}</span>
                         </div>
                      </td>
                      <td className="px-8 py-5">
                         <span className="text-[11px] font-medium text-text-secondary italic">[{alert.target}]</span>
                      </td>
                      <td className="px-8 py-5 text-center">
                         <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ring-1 ring-inset ${
                           alert.severity === 'critical' ? 'bg-red-50 text-red-600 ring-red-100' :
                           alert.severity === 'high' ? 'bg-amber-50 text-amber-600 ring-amber-100' :
                           alert.severity === 'medium' ? 'bg-blue-50 text-blue-600 ring-blue-100' : 'bg-slate-50 text-slate-500 ring-slate-100'
                         }`}>
                           {alert.severity}
                         </span>
                      </td>
                      <td className="px-8 py-5 text-right font-mono text-xs font-black text-brand-deep">
                        {alert.probability}
                      </td>
                      <td className="px-8 py-5 text-right">
                         <div className="flex justify-end gap-2">
                           <button className="p-2 border border-slate-100 rounded-lg hover:bg-white hover:shadow-sm text-slate-400 hover:text-brand-primary transition-all">
                              <Eye size={14} />
                           </button>
                           <button className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
                             审计
                           </button>
                         </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
             </table>
           </div>

           <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
              <p className="text-[10px] items-center flex gap-2 font-black text-text-light tracking-wide">
                 <ShieldAlert size={14} className="text-brand-primary" />
                 审计提示: AI 已自动聚合 12 条此类同类高危告警，建议检查 [权限节点 V2]
              </p>
              <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline flex items-center gap-1">
                 查看详细风控图谱 <ChevronRight size={14} />
              </button>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
