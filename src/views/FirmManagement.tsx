import { 
  Building, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  ExternalLink, 
  MapPin, 
  Users, 
  Clock,
  ShieldCheck,
  Ban,
  Settings,
  ArrowUpRight
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

const MOCK_FIRMS = [
  { id: 'F001', name: '正大联合律师事务所', scale: '50-100人', contact: '张正大', phone: '13812345678', location: '北京·朝阳区', status: 'active', joinDate: '2025-10-12', docCount: '4.2k' },
  { id: 'F002', name: '金杜（上海）分处', scale: '500人以上', contact: '王凯文', phone: '13900001111', location: '上海·浦东新区', status: 'active', joinDate: '2025-11-05', docCount: '12.8k' },
  { id: 'F003', name: '君合（广州）办公室', scale: '100-200人', contact: '李思源', phone: '13788889999', location: '广东·广州', status: 'inactive', joinDate: '2026-01-20', docCount: '1.5k' },
  { id: 'F004', name: '中伦（成都）分所', scale: '200-500人', contact: '赵敏', phone: '13655556666', location: '四川·成都', status: 'active', joinDate: '2026-02-15', docCount: '3.1k' },
  { id: 'F005', name: '盈科（深圳）法务部', scale: '500人以上', contact: '陈志雄', phone: '13577778888', location: '广东·深圳', status: 'active', joinDate: '2026-03-01', docCount: '5.6k' },
];

export default function FirmManagement() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-text-main">律所入驻管理</h2>
          <p className="text-sm text-text-light">管理全平台已入驻的律师事务所、分所及企业法务部门</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary h-11 px-6">
            <span>导出律所名录</span>
          </button>
          <button className="btn-primary h-11 px-8">
            <Plus size={18} />
            <span>手动添加律所</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: '累计律所', val: '156', trend: '+12' },
           { label: '本月新增', val: '18', trend: '+5' },
           { label: '平均规模', val: '120人', trend: '稳定' },
           { label: '平台活跃度', val: '92%', trend: '+3.2%' },
         ].map((stat, i) => (
           <div key={i} className="card-base p-6 bg-white shadow-light">
              <span className="text-[11px] font-bold text-text-light uppercase tracking-wider">{stat.label}</span>
              <div className="flex items-baseline gap-2">
                 <span className="text-2xl font-bold text-text-main">{stat.val}</span>
                 <span className="text-[10px] font-bold text-emerald-500">{stat.trend}</span>
              </div>
           </div>
         ))}
      </div>

      {/* Main List */}
      <div className="space-y-6">
         {/* Filters */}
         <div className="card-base p-6 bg-white shadow-light border-slate-100">
            <div className="flex flex-col md:flex-row gap-4 items-center">
               <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light group-focus-within:text-brand-primary transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="搜索律所名称、联系人、所在地..."
                    className="w-full h-12 pl-12 pr-4 bg-slate-50 border-transparent focus:border-brand-primary focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
                  />
               </div>
               <div className="flex items-center gap-3">
                  <button className="btn-secondary h-12 px-5 border-none bg-slate-50">
                    <Filter size={18} />
                    <span>筛选</span>
                  </button>
                  <select className="h-12 px-4 rounded-2xl bg-slate-50 text-sm font-bold text-brand-deep border-transparent focus:bg-white focus:border-brand-primary outline-none transition-all">
                     <option>按加入时间</option>
                     <option>按文书量</option>
                     <option>按规模</option>
                  </select>
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="card-base overflow-hidden bg-white shadow-light border-slate-100">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">律所名称 / ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">负责人 / 联系方式</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">入驻时长</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">业务规模</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest text-right">管理操作</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {MOCK_FIRMS.map((firm, i) => (
                    <motion.tr 
                      key={firm.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                               <Building size={24} />
                            </div>
                            <div className="flex flex-col min-w-0">
                               <span className="text-sm font-bold text-text-main flex items-center gap-2 group-hover:text-brand-primary transition-colors">
                                 {firm.name}
                                 {firm.status === 'active' && <ShieldCheck size={14} className="text-emerald-500" />}
                               </span>
                               <span className="text-[10px] text-text-light flex items-center gap-2">
                                  {firm.id} <span className="w-1 h-1 rounded-full bg-slate-300"></span> {firm.location}
                               </span>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex flex-col">
                            <span className="text-xs font-bold text-text-secondary">{firm.contact}</span>
                            <span className="text-[10px] font-mono text-text-light">{firm.phone}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-2 text-[11px] text-text-light font-medium">
                            <Clock size={14} />
                            {firm.joinDate}
                         </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                           <div className="flex flex-col">
                              <span className="text-xs font-bold text-text-main">{firm.docCount} 份文书</span>
                              <span className="text-[10px] text-text-light">{firm.scale}</span>
                           </div>
                           <div className="text-emerald-500">
                              <ArrowUpRight size={14} />
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:text-brand-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100" title="进入律所控制台">
                               <ExternalLink size={18} />
                            </button>
                            <button className="p-2 hover:text-brand-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100" title="禁用">
                               <Ban size={18} />
                            </button>
                            <button className="p-2 hover:text-brand-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100" title="设置">
                               <Settings size={18} />
                            </button>
                         </div>
                      </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
