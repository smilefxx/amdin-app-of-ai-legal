import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Shield, 
  ShieldAlert, 
  Fingerprint, 
  Building, 
  Mail, 
  Phone,
  CheckCircle2,
  Ban,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import Dropdown from '@/src/components/common/Dropdown';

const MOCK_USERS = [
  { id: 'U001', name: '李大为', role: '律所管理员', firm: '正大联合律师事务所', email: 'li.dw@firm.com', phone: '13812345678', status: 'active', lastLogin: '10分钟前' },
  { id: 'U002', name: '王嘉尔', role: '合伙人律师', firm: '金杜（上海）分处', email: 'wang.je@kind.com', phone: '13900001111', status: 'busy', lastLogin: '1小时前' },
  { id: 'U003', name: '陈欣然', role: '授薪律师', firm: '正大联合律师事务所', email: 'chen.xr@firm.com', phone: '13722223333', status: 'active', lastLogin: '3小时前' },
  { id: 'U004', name: '赵小龙', role: '律所管理员', firm: '君合（广州）办公室', email: 'zhao.xl@junhe.com', phone: '13611112222', status: 'inactive', lastLogin: '2天前' },
  { id: 'U005', name: '孙美美', role: '行政主管', firm: '中伦（成都）分所', email: 'sun.mm@zhong.com', phone: '13566667777', status: 'active', lastLogin: '5分钟前' },
  { id: 'U006', name: '周志豪', role: '法务经理', firm: '盈科（深圳）法务部', email: 'zhou.zh@ying.com', phone: '13400009999', status: 'active', lastLogin: '今天 09:30' },
];

export default function UserManagement({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleExport = () => {
    showToast('正在为您打包并导出审计报表...');
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob(["Audit Report Data"], { type: 'application/pdf' });
      element.href = URL.createObjectURL(file);
      element.download = "platform_audit_report.pdf";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setToastMsg('报表导出完成！');
      setTimeout(() => setToastMsg(null), 2000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative">
      {toastMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -10, x: '-50%' }}
          className="fixed top-8 left-1/2 z-50 px-6 py-3 bg-slate-800 text-white text-sm font-bold rounded-full shadow-2xl flex items-center gap-2 border border-slate-700"
        >
          <CheckCircle2 size={16} className="text-emerald-400" />
          {toastMsg}
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-text-main">平台全量用户管理</h2>
          <p className="text-sm text-text-light">监控全平台所有律所成员、法务人员及个人的活跃状态与权限分发</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="btn-secondary h-11 px-6">
            <Shield size={18} />
            <span>导出账户审计报表</span>
          </button>
          <button onClick={() => showToast('创建全平台账号功能维护中')} className="btn-primary h-11 px-8">
            <Plus size={18} />
            <span>创建全平台特权账号</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
         {/* Filter Bar */}
         <div className="card-base p-6 bg-white shadow-light">
            <div className="flex flex-col md:flex-row gap-4 items-center">
               <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light group-focus-within:text-brand-primary transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="搜索姓名、邮箱、手机号或所属律所..."
                    className="w-full h-12 pl-12 pr-4 bg-slate-50 border-transparent focus:border-brand-primary focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
                  />
               </div>
               <div className="flex items-center gap-2">
                  <Dropdown 
                    buttonClassName="h-12 w-40 px-4 rounded-2xl bg-slate-50 text-brand-deep font-bold border-none hover:bg-slate-100"
                    value=""
                    onChange={() => {}}
                    options={[
                      { label: "全部所属单位", value: "全部所属单位" },
                      { label: "正大联合", value: "正大联合" },
                      { label: "金杜上海", value: "金杜上海" }
                    ]}
                    placeholder="全部所属单位"
                  />
                  <Dropdown 
                    buttonClassName="h-12 w-36 px-4 rounded-2xl bg-slate-50 text-brand-deep font-bold border-none hover:bg-slate-100"
                    value=""
                    onChange={() => {}}
                    options={[
                      { label: "全部角色", value: "全部角色" },
                      { label: "律所管理员", value: "律所管理员" },
                      { label: "合伙人律师", value: "合伙人律师" }
                    ]}
                    placeholder="全部角色"
                  />
                  <button onClick={() => showToast('正在应用筛选条件...')} className="btn-secondary h-12 px-5 border-none bg-slate-50">
                    <Filter size={18} />
                  </button>
               </div>
            </div>
         </div>

         {/* User Grid/Table */}
         <div className="card-base overflow-hidden bg-white shadow-light">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                     <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">用户信息 / ID</th>
                     <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">所属律所 / 角色</th>
                     <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">联系方式</th>
                     <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest">账号状态</th>
                     <th className="px-6 py-4 text-[10px] font-bold text-text-light uppercase tracking-widest text-right">操作</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {MOCK_USERS.map((user, i) => (
                    <motion.tr 
                      key={user.id}
                      onClick={() => showToast(`加载 ${user.name} 的用户画像...`)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-text-secondary font-bold text-sm uppercase">
                               {user.name[0]}
                            </div>
                            <div className="flex flex-col">
                               <span className="text-sm font-bold text-text-main group-hover:text-brand-primary transition-colors">{user.name}</span>
                               <span className="text-[10px] text-text-light flex items-center gap-2">
                                  {user.id} <span className="w-1 h-1 rounded-full bg-slate-300"></span> 最后活跃：{user.lastLogin}
                               </span>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary">
                               <Building size={12} className="text-text-light" />
                               {user.firm}
                            </div>
                            <span className="text-[10px] text-brand-primary font-bold mt-0.5">{user.role}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-text-secondary">
                               <Mail size={12} className="text-text-light" />
                               {user.email}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
                               <Phone size={12} className="text-text-light" />
                               {user.phone}
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold ${
                           user.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                            : user.status === 'busy'
                            ? 'bg-blue-50 text-blue-600 border-blue-100'
                            : 'bg-red-50 text-red-600 border-red-100'
                         }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              user.status === 'active' ? 'bg-emerald-500' : user.status === 'busy' ? 'bg-blue-500' : 'bg-red-500'
                            }`} />
                            {user.status === 'active' ? '在线' : user.status === 'busy' ? '繁忙' : '已停用'}
                         </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); showToast(`向 ${user.name} 发出安全警告...`); }} className="p-2 hover:text-brand-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100">
                               <ShieldAlert size={18} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); showToast(`已停用 ${user.name} 的账号权限`); }} className="p-2 hover:text-brand-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100">
                               <Ban size={18} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); showToast('用户画像详情页建设中...'); }} className="flex items-center gap-1 text-xs font-bold text-brand-primary hover:bg-brand-primary/5 px-3 py-1.5 rounded-lg transition-all">
                               <span>管理</span>
                               <ArrowRight size={14} />
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
