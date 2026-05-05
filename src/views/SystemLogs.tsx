import { 
  Activity, 
  Search, 
  Filter, 
  Download, 
  Terminal, 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Database,
  Cpu,
  Globe,
  Settings,
  ChevronRight,
  HardDrive,
  Network
} from 'lucide-react';
import { motion } from 'motion/react';

const LOGS = [
  { id: 'LOG-8829', status: 'success', type: 'AUTH', action: '管理员登录', user: 'admin_root', ip: '192.168.1.102', timestamp: '2026-05-05 10:20:15', details: 'Session initialized for superuser', severity: 'low' },
  { id: 'LOG-8828', status: 'warning', type: 'SYSTEM', action: '自动备份延迟', user: 'system_daemon', ip: 'internal', timestamp: '2026-05-05 10:15:00', details: 'Main database backup took 120s (expected <60s)', severity: 'medium' },
  { id: 'LOG-8827', status: 'danger', type: 'SECURITY', action: '检测到爆破攻击', user: 'guest', ip: '104.28.19.42', timestamp: '2026-05-05 10:12:45', details: 'User "legal_user_1" failed login 15 times within 10s', severity: 'critical' },
  { id: 'LOG-8826', status: 'success', type: 'DATA', action: '导出全库索引', user: 'xiaofang_audit', ip: '172.16.0.45', timestamp: '2026-05-05 10:05:20', details: 'Full index search export (Size: 24.5MB)', severity: 'low' },
  { id: 'LOG-8825', status: 'info', type: 'CONFIG', action: '套餐价格更新', user: 'admin_billing', ip: '192.168.1.105', timestamp: '2026-05-05 09:55:12', details: 'Updated "Pro" plan price from 199 to 299', severity: 'medium' },
  { id: 'LOG-8824', status: 'success', type: 'AUTH', action: '多因素核验', user: 'partner_001', ip: '210.34.22.8', timestamp: '2026-05-05 09:40:05', details: 'SMS OTP verified successfully', severity: 'low' },
  { id: 'LOG-8823', status: 'info', type: 'SYSTEM', action: '知识发现引擎启动', user: 'ai_worker', ip: 'node-cluster-3', timestamp: '2026-05-05 09:30:00', details: 'AI Knowledge Discovery cluster re-scaled to 8 instances', severity: 'medium' },
  { id: 'LOG-8822', status: 'warning', type: 'SECURITY', action: '越权访问尝试', user: 'member_jr', ip: '192.168.1.201', timestamp: '2026-05-05 09:15:33', details: 'Attempted to access /api/v1/billing without proper scope', severity: 'high' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function SystemLogs() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-20"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-black text-brand-deep tracking-tight">系统审计日志</h1>
          <p className="text-xs font-mono font-bold text-text-light uppercase tracking-widest mt-1">Platform Integrity & Activity Tracking Stream</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-2 px-4 h-10 border border-slate-200 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Download size={14} /> 导出完整报告
          </button>
          <button className="btn-primary bg-slate-900 shadow-none rounded-xl py-2 px-4 h-10 text-[10px] uppercase font-black tracking-widest flex items-center gap-2">
            <Settings size={14} /> 监控配置
          </button>
        </div>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'CPU LOAD', value: '18.4%', status: 'green', icon: Cpu },
          { label: 'DB RESPONSE', value: '42ms', status: 'green', icon: Database },
          { label: 'DATA RATE', value: '1.2 GB/s', status: 'yellow', icon: Network },
          { label: 'SESSIONS', value: '1,429', status: 'green', icon: Activity },
        ].map((stat, idx) => (
          <motion.div 
            key={idx} 
            variants={item}
            className="card p-6 border-slate-100 flex items-center justify-between group cursor-pointer hover:border-brand-primary/50"
          >
            <div>
              <p className="text-[10px] font-mono font-black text-text-light uppercase tracking-widest mb-1 group-hover:text-brand-primary transition-colors">{stat.label}</p>
              <h4 className="text-2xl font-mono font-black text-brand-deep leading-none">{stat.value}</h4>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
              stat.status === 'green' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
            }`}>
              <stat.icon size={22} strokeWidth={2.5} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Log Viewer */}
      <motion.div variants={item} className="card p-0 border border-slate-200 overflow-hidden shadow-strong">
        {/* Fake Terminal Header */}
        <div className="bg-slate-950 px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div className="flex items-center gap-3 text-slate-500 font-mono text-xs font-bold uppercase tracking-widest">
              <Terminal size={14} />
              <span>LOG_STREAM_V2 (PLATFORM_AUDIT)</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-mono font-black uppercase tracking-widest">
            <span className="flex items-center gap-2 text-white/40"><Shield size={12} className="text-emerald-500" /> SECURE_BOOT</span>
            <span className="flex items-center gap-2 text-emerald-500 animate-pulse">● LIVE_FEED</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-8 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold" size={16} />
            <input 
              type="text" 
              placeholder="Search by TraceID, User, or Payload pattern..." 
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all placeholder:text-slate-400 font-bold"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="btn-secondary h-10 px-4 text-[10px] font-black uppercase tracking-widest border border-slate-200 bg-white shadow-none">
              <Filter size={14} /> Filter
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1" />
            <div className="flex gap-1">
               <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">1</span>
               <span className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center font-mono text-xs font-bold transition-colors cursor-pointer text-slate-400">2</span>
               <span className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center font-mono text-xs font-bold transition-colors cursor-pointer text-slate-400">3</span>
            </div>
          </div>
        </div>

        {/* Log Entries Table */}
        <div className="p-0 overflow-x-auto overflow-y-auto max-h-[600px] no-scrollbar">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/50 sticky top-0 z-10 backdrop-blur-md">
                <th className="px-8 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 font-mono">Trace_ID</th>
                <th className="px-8 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 font-mono">Category</th>
                <th className="px-8 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 font-mono">Action_Event</th>
                <th className="px-8 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 font-mono">Initiator</th>
                <th className="px-8 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 font-mono">Timestamp</th>
                <th className="px-8 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 font-mono text-right">Metrics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {LOGS.map((log) => (
                <tr key={log.id} className="group hover:bg-slate-50 transition-all cursor-pointer border-l-2 border-l-transparent hover:border-l-brand-primary">
                  <td className="px-8 py-5">
                     <span className="text-[11px] font-mono font-black text-slate-400 group-hover:text-brand-primary transition-colors">{log.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase flex items-center gap-1.5 w-fit tracking-widest ring-1 ring-inset ${
                      log.type === 'AUTH' ? 'bg-blue-50 text-blue-600 ring-blue-100' :
                      log.type === 'SECURITY' ? 'bg-red-50 text-red-600 ring-red-100' :
                      log.type === 'SYSTEM' ? 'bg-amber-50 text-amber-600 ring-amber-100' :
                      'bg-slate-50 text-slate-500 ring-slate-100'
                    }`}>
                       {log.severity === 'critical' ? <Shield size={10} className="animate-pulse" /> : <Activity size={10} />}
                       {log.type}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-brand-deep tracking-tight">{log.action}</span>
                      <span className="text-[10px] text-slate-400 font-mono font-medium truncate max-w-[320px] mt-0.5">{log.details}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-600">{log.user}</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">{log.ip}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-mono font-black text-slate-400">{log.timestamp}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                      <div className="w-1.5 h-4 rounded-full bg-blue-500/50" />
                      <div className="w-1.5 h-3 rounded-full bg-blue-500/30" />
                      <div className="w-1.5 h-6 rounded-full bg-blue-500" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
           <div className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
              <span>Total_Records: 249,102</span>
              <div className="w-1 h-1 rounded-full bg-slate-200" />
              <span>Load_Time: 0.05s</span>
              <div className="w-1 h-1 rounded-full bg-slate-200" />
              <span>Node: CLUSTER_SH_002</span>
           </div>
           <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline flex items-center gap-1 transition-all">
              Load more entries <ChevronRight size={14} />
           </button>
        </div>
      </motion.div>

      {/* Security Alerts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-12">
        <motion.div variants={item} className="xl:col-span-8 card p-8 border-l-4 border-l-red-500 bg-red-50/5">
           <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-mono font-black text-red-600 uppercase tracking-widest flex items-center gap-3">
                <Shield size={18} /> P1_SECURITY_THREAT_DETECTION
              </h4>
              <span className="text-[9px] font-black text-red-500 bg-red-100/50 px-2 py-0.5 rounded uppercase font-mono tracking-tighter">IMMEDIATE_ACTION_REQUIRED</span>
           </div>
           <div className="space-y-4">
              {[
                { id: 'SEC-402', msg: '异地登录尝试: 来自 RU (Russia) — IP: 91.241.19.45', time: '3m ago', action: 'BLOCK' },
                { id: 'SEC-398', msg: '高频 API 异常流量: /knowledge/export (Threshold exceeded)', time: '12m ago', action: 'REVIEW' },
                { id: 'SEC-395', msg: '敏感目录扫描: /admin/.env 访问请求被自动拦截', time: '45m ago', action: 'DISMISSED' },
              ].map((alert, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white border border-red-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                         <AlertCircle size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono font-bold text-red-400">[{alert.id}]</span>
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{alert.msg}</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <span className="text-[10px] font-mono font-black text-slate-400 uppercase">{alert.time}</span>
                      <button className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                        alert.action === 'BLOCK' ? 'bg-red-900 text-white border-red-950 shadow-lg shadow-red-900/20' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-white'
                      }`}>
                        {alert.action}
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </motion.div>

        <motion.div variants={item} className="xl:col-span-4 card p-8 bg-slate-900 text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <HardDrive size={160} />
           </div>
           <h4 className="text-sm font-mono font-black text-blue-400 uppercase tracking-widest mb-8 flex items-center gap-3 relative z-10">
              <Database size={18} /> INFRASTRUCTURE_LOAD
           </h4>
           <div className="space-y-8 relative z-10">
              <div>
                <div className="flex items-center justify-between mb-2">
                   <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Main_DB_Uptime</span>
                   <span className="text-xl font-mono font-black text-emerald-400">99.998%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full w-[99.998%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Avg_Latency</span>
                    <span className="text-2xl font-mono font-black text-white leading-none">124<span className="text-xs text-white/30 font-bold ml-1">ms</span></span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Log_Storage</span>
                    <span className="text-2xl font-mono font-black text-white leading-none">82<span className="text-xs text-white/30 font-bold ml-1">%</span></span>
                 </div>
              </div>
              <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                 <Terminal size={14} /> 进入原始控制层
              </button>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
