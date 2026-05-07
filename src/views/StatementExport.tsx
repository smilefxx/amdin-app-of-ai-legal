/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  X, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  User, 
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import Dropdown from '@/src/components/common/Dropdown';

interface StatementExportProps {
  onBack: () => void;
}

export default function StatementExport({ onBack }: StatementExportProps) {
  const [selectedFormat, setSelectedFormat] = useState<'xlsx' | 'pdf'>('xlsx');

  const previewData = [
    { id: 'BILL-001', client: '腾讯科技(深圳)有限公司', amount: 15600.00, date: '2026-04-20', status: 'paid', type: '诉讼代理' },
    { id: 'BILL-002', client: '阿里巴巴集团', amount: 8200.00, date: '2026-04-22', status: 'pending', type: '合规咨询' },
    { id: 'BILL-003', client: '大疆创新', amount: 12500.00, date: '2026-04-25', status: 'paid', type: '专利代理' },
    { id: 'BILL-004', client: '比亚迪股份有限公司', amount: 45000.00, date: '2026-04-28', status: 'processing', type: '常年顾问' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
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
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">导出财务对账单</h2>
            <p className="text-xs text-text-light mt-0.5">选择时间维度、客户范围并批量导出标准化财务底稿。支持 XLS 与 PDF 格式。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Config Panel */}
        <div className="lg:col-span-1 space-y-6">
           <div className="card p-6 space-y-6">
              <div className="space-y-4">
                 <h4 className="text-xs font-bold text-brand-deep uppercase tracking-widest border-b border-slate-50 pb-3">筛选配置</h4>
                 
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-text-light uppercase tracking-wider">周期选择</label>
                    <Dropdown 
                       buttonClassName="h-10 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-xs"
                       value=""
                       onChange={() => {}}
                       options={[
                         { label: "2026年 4月 (本月)", value: "2026年 4月 (本月)" },
                         { label: "2026年 Q1 季度", value: "2026年 Q1 季度" },
                         { label: "2025年 全年", value: "2025年 全年" },
                         { label: "自定义时间范围", value: "自定义时间范围" }
                       ]}
                       placeholder="2026年 4月 (本月)"
                    />
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-text-light uppercase tracking-wider">客户属性</label>
                    <Dropdown 
                       buttonClassName="h-10 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-xs"
                       value=""
                       onChange={() => {}}
                       options={[
                         { label: "全部客户", value: "全部客户" },
                         { label: "常年法律顾问类", value: "常年法律顾问类" },
                         { label: "单笔专项类", value: "单笔专项类" }
                       ]}
                       placeholder="全部客户"
                    />
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-text-light uppercase tracking-wider">结算状态</label>
                    <div className="grid grid-cols-2 gap-2">
                       {['已结算', '待结算', '处理中', '冲销'].map(s => (
                          <div key={s} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
                             <input type="checkbox" defaultChecked className="rounded border-slate-300 text-brand-primary" />
                             <span className="text-[10px] font-bold text-text-secondary">{s}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-50 space-y-4">
                 <h4 className="text-xs font-bold text-brand-deep uppercase tracking-widest">导出格式</h4>
                 <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setSelectedFormat('xlsx')}
                      className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border-2 ${
                        selectedFormat === 'xlsx' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-200'
                      }`}
                    >
                       <FileSpreadsheet size={24} />
                       <span className="text-[10px] font-bold uppercase">XLSX</span>
                    </button>
                    <button 
                      onClick={() => setSelectedFormat('pdf')}
                      className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border-2 ${
                        selectedFormat === 'pdf' ? 'bg-red-50 border-red-500 text-red-600' : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-200'
                      }`}
                    >
                       <FileText size={24} />
                       <span className="text-[10px] font-bold uppercase">PDF</span>
                    </button>
                 </div>
              </div>

              <button className="w-full h-12 rounded-xl bg-brand-primary text-white font-bold text-sm shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                 <Download size={18} />
                 开始生成并下载
              </button>
           </div>

           <div className="card p-5 bg-amber-50 border-amber-100">
              <p className="text-[10px] text-amber-800 font-bold mb-2">温馨提示：</p>
              <p className="text-[10px] text-amber-700/70 leading-relaxed">
                 导出的对账单包含了客户的敏感开票信息与银行账户。系统会自动在 PDF 预览件中添加防伪水印，标注导出人：张三律师。
              </p>
           </div>
        </div>

        {/* Right Preview Panel */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-primary">
                       <FileText size={16} />
                    </div>
                    <span className="text-xs font-bold text-brand-deep">账单预览: LAW_STATEMENT_2026_04.pdf</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <button className="p-2 h-9 w-9 rounded-lg hover:bg-white text-slate-400 hover:text-brand-primary transition-all">
                       <Printer size={16} />
                    </button>
                    <button className="p-2 h-9 w-9 rounded-lg hover:bg-white text-slate-400 hover:text-brand-primary transition-all">
                       <Search size={16} />
                    </button>
                 </div>
              </div>
              
              <div className="flex-1 p-12 bg-slate-100 flex justify-center">
                 <div className="w-full max-w-4xl bg-white shadow-2xl p-16 space-y-12 relative overflow-hidden">
                    {/* Watermark effect */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-45 select-none">
                       <span className="text-9xl font-bold font-mono">CONFIDENTIAL</span>
                    </div>

                    <div className="flex justify-between items-start border-b-2 border-brand-deep pb-8">
                       <div className="space-y-4">
                          <h1 className="text-3xl font-serif font-bold text-brand-deep tracking-widest">某某律师事务所</h1>
                          <div className="space-y-1 text-slate-500 text-[10px] font-bold">
                             <p>地址: 上海市徐汇区XX路XX号XX中心</p>
                             <p>电话: +86 021-XXXX-XXXX</p>
                             <p>网址: www.firm-example.com</p>
                          </div>
                       </div>
                       <div className="text-right space-y-1">
                          <h2 className="text-xl font-bold bg-brand-deep text-white px-4 py-1 inline-block">对账单</h2>
                          <p className="text-[10px] font-mono text-slate-400 font-bold pt-2 uppercase">Statement NO: ST-99210-2026</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-20">
                       <div className="space-y-4">
                          <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">客户信息 / BILL TO</p>
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-brand-deep">XX科技集团股份有限公司</p>
                             <p className="text-[10px] text-slate-500 font-medium">财务部收</p>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">统计周期 / DATE RANGE</p>
                          <p className="text-sm font-bold text-brand-deep">2026-04-01 至 2026-04-30</p>
                       </div>
                    </div>

                    <table className="w-full">
                       <thead>
                          <tr className="border-b-2 border-slate-100">
                             <th className="py-4 text-left text-[10px] font-bold text-text-light uppercase">单号</th>
                             <th className="py-4 text-left text-[10px] font-bold text-text-light uppercase tracking-widest">服务描述</th>
                             <th className="py-4 text-right text-[10px] font-bold text-text-light uppercase tracking-widest">日期</th>
                             <th className="py-4 text-right text-[10px] font-bold text-text-light uppercase tracking-widest">金额 (CNY)</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {previewData.slice(0, 3).map(item => (
                             <tr key={item.id}>
                                <td className="py-4 font-mono text-xs font-bold text-slate-400">#{item.id}</td>
                                <td className="py-4 font-bold text-xs text-brand-deep">{item.type}服务 - {item.client.slice(0, 4)}...</td>
                                <td className="py-4 text-right font-mono text-xs text-slate-400">{item.date}</td>
                                <td className="py-4 text-right font-mono text-xs font-bold text-brand-deep">¥{item.amount.toLocaleString()}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>

                    <div className="flex justify-end pt-8">
                       <div className="w-64 space-y-4">
                          <div className="flex justify-between border-t border-slate-100 pt-4">
                             <span className="text-[10px] font-bold text-text-light uppercase">小计 (SUBTOTAL)</span>
                             <span className="text-sm font-mono font-bold text-brand-deep">¥36,300.00</span>
                          </div>
                          <div className="flex justify-between">
                             <span className="text-[10px] font-bold text-text-light uppercase">税费 (TAX 6%)</span>
                             <span className="text-sm font-mono font-bold text-brand-deep">¥2,178.00</span>
                          </div>
                          <div className="flex justify-between bg-slate-50 p-4 rounded-xl">
                             <span className="text-[10px] font-bold text-brand-primary uppercase">总计 (TOTAL)</span>
                             <span className="text-lg font-mono font-bold text-brand-primary">¥38,478.00</span>
                          </div>
                       </div>
                    </div>

                    <div className="pt-20 border-t border-slate-100 text-[9px] text-slate-400 font-medium leading-relaxed italic text-center">
                       本对账单仅为内部记账参考，并非正式税务票据。如需开具增值税专用发票，请联系律所财务部 (+86 021-分机102)。
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
