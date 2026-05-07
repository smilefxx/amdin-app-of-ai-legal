/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Calculator, 
  FileText,
  User,
  Calendar,
  ChevronDown,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Dropdown from '@/src/components/common/Dropdown';

interface BillingCreatorProps {
  onBack: () => void;
}

export default function BillingCreator({ onBack }: BillingCreatorProps) {
  const [items, setItems] = useState([
    { id: 1, desc: '法律咨询服务 - 知识产权', qty: 2.5, rate: 2000, total: 5000 },
    { id: 2, desc: '合同起草及审查', qty: 1, rate: 3500, total: 3500 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), desc: '', qty: 0, rate: 0, total: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newItem = { ...item, [field]: value };
        if (field === 'qty' || field === 'rate') {
          newItem.total = newItem.qty * newItem.rate;
        }
        return newItem;
      }
      return item;
    }));
  };

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100"
          >
            <X size={20} className="text-text-secondary" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">创建结算账单</h2>
            <p className="text-xs text-text-light mt-0.5">生成新的财务结算单，系统将自动关联至对应客户的待支付款项</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="h-11 px-6 rounded-xl bg-slate-50 border border-slate-200 text-brand-deep text-sm font-bold hover:bg-slate-100 transition-all"
          >
            取消
          </button>
          <button className="h-11 px-8 rounded-xl bg-brand-primary text-white text-sm font-bold shadow-lg shadow-brand-primary/20 hover:bg-blue-600 transition-all flex items-center gap-2">
            <Save size={18} />
            保存并生成
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           {/* Basic Info */}
           <div className="card p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-text-light uppercase">结算客户</label>
                 <div className="relative">
                    <Dropdown 
                       buttonClassName="h-11 border border-slate-100 bg-slate-50 hover:bg-slate-100"
                       leftIcon={<User size={16} />}
                       value=""
                       onChange={() => {}}
                       options={[
                         { label: "阿里云计算有限公司", value: "阿里云计算有限公司" },
                         { label: "腾讯科技", value: "腾讯科技" },
                         { label: "字节跳动", value: "字节跳动" }
                       ]}
                       placeholder="阿里云计算有限公司"
                    />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-text-light uppercase">关联案件/项目</label>
                 <div className="relative">
                    <Dropdown 
                       buttonClassName="h-11 border border-slate-100 bg-slate-50 hover:bg-slate-100"
                       leftIcon={<FileText size={16} />}
                       value=""
                       onChange={() => {}}
                       options={[
                         { label: "2026-合规治理项目-01", value: "2026-合规治理项目-01" },
                         { label: "知识产权侵权纠纷(二审)", value: "知识产权侵权纠纷(二审)" }
                       ]}
                       placeholder="2026-合规治理项目-01"
                    />
                 </div>
              </div>
           </div>

           {/* Line Items */}
           <div className="card p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                 <h3 className="text-sm font-bold text-brand-deep">费用明细</h3>
                 <button 
                  onClick={addItem}
                  className="text-xs font-bold text-brand-primary flex items-center gap-1 hover:underline"
                 >
                    <Plus size={14} />
                    添加费项
                 </button>
              </div>

              <div className="space-y-4">
                 <AnimatePresence>
                    {items.map((item, idx) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="flex gap-4 items-end"
                      >
                         <div className="flex-1 space-y-2 text-left">
                            {idx === 0 && <label className="text-[10px] font-bold text-text-light uppercase">描述</label>}
                            <input 
                               type="text" 
                               value={item.desc}
                               onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                               placeholder="费项名称..."
                               className="w-full h-11 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 ring-brand-primary/20"
                            />
                         </div>
                         <div className="w-24 space-y-2">
                            {idx === 0 && <label className="text-[10px] font-bold text-text-light uppercase">工时/数量</label>}
                            <input 
                               type="number" 
                               value={item.qty}
                               onChange={(e) => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)}
                               className="w-full h-11 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 ring-brand-primary/20 font-mono"
                            />
                         </div>
                         <div className="w-32 space-y-2">
                            {idx === 0 && <label className="text-[10px] font-bold text-text-light uppercase">单价</label>}
                            <input 
                               type="number" 
                               value={item.rate}
                               onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                               className="w-full h-11 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 ring-brand-primary/20 font-mono text-brand-primary font-bold"
                            />
                         </div>
                         <div className="w-32 space-y-2">
                            {idx === 0 && <label className="text-[10px] font-bold text-text-light uppercase">合计</label>}
                            <div className="w-full h-11 px-4 bg-brand-ice flex items-center text-sm font-mono font-bold text-brand-deep rounded-xl border border-brand-primary/10">
                               ¥{item.total.toLocaleString()}
                            </div>
                         </div>
                         <button 
                           onClick={() => removeItem(item.id)}
                           className="h-11 w-11 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                         >
                            <Trash2 size={18} />
                         </button>
                      </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           </div>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
           <div className="card p-8 bg-brand-deep text-white border-none shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-primary/10 -rotate-45 translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative space-y-6">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest text-center">总计金额 (Grand Total)</p>
                    <h3 className="text-4xl font-mono font-bold text-center tracking-tighter">¥{grandTotal.toLocaleString()}</h3>
                 </div>
                 <div className="pt-6 border-t border-white/10 space-y-3">
                    <div className="flex justify-between text-xs">
                       <span className="text-white/40 font-bold">税前总额</span>
                       <span className="font-mono">¥{(grandTotal * 0.94).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="text-white/40 font-bold">增值税 (6%)</span>
                       <span className="font-mono">¥{(grandTotal * 0.06).toFixed(2)}</span>
                    </div>
                    <div className="pt-2 flex justify-between text-sm font-bold text-brand-primary">
                       <span>需支付净额</span>
                       <span className="font-mono">¥{grandTotal.toLocaleString()}</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="card p-6 bg-slate-50 border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                 <Calendar size={16} className="text-brand-primary" />
                 <h4 className="text-[11px] font-bold text-brand-deep">账单计划设置</h4>
              </div>
              <div className="space-y-4">
                 <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-text-light uppercase">期望收款日期</label>
                    <input type="date" className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-[11px] outline-none font-bold" />
                 </div>
                 <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" className="rounded-md border-slate-300 text-brand-primary focus:ring-brand-primary/20" id="notify-client" />
                    <label htmlFor="notify-client" className="text-[10px] font-bold text-text-secondary">生成后自动邮件通知客户</label>
                 </div>
              </div>
           </div>

           <div className="card p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-500">
                 <Info size={14} />
                 <h4 className="text-[10px] font-bold uppercase">风险提示</h4>
              </div>
              <p className="text-[10px] text-text-light leading-relaxed">
                 单笔结算金额超过 ¥50,000 时，系统将自动触发财务总监二级审批流程。当前账单符合律所第 14 号财务管理规范。
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
