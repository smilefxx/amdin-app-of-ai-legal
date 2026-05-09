import { useState } from 'react';
import { ArrowLeft, Clock, Download, Printer, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderDetailsProps {
  orderId?: string | null;
  onBack: () => void;
}

export default function OrderDetails({ orderId, onBack }: OrderDetailsProps) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleDownload = () => {
    showToast('正在生成PDF文件并下载...');
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob(["Order Details Information\n\nClient: " + orderDetails.client + "\nAmount: " + orderDetails.amount], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `账单_${orderDetails.id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  const handlePrint = () => {
    showToast('正在准备打印...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const mockTransactions = [
    { id: '1', orderNo: 'ORD-2026-001', client: '上海某实业公司', caseTitle: '民事借贷纠纷服务费', amount: 50000.00, type: 'income', status: 'paid', date: '2026-05-02', category: '律师服务费' },
    { id: '2', orderNo: 'ORD-2026-002', client: '李晓明', caseTitle: '劳动争议代理首笔款', amount: 8000.00, type: 'income', status: 'pending', date: '2026-05-03', category: '案件代理费' },
    { id: '3', orderNo: 'EXP-2026-105', client: '办公物管', caseTitle: '5月份办公室租赁费', amount: -12500.00, type: 'expense', status: 'paid', date: '2026-05-01', category: '行政支出' },
    { id: '4', orderNo: 'ORD-2026-003', client: '某教育科技集团', caseTitle: '年度法律顾问费 Q2', amount: 120000.00, type: 'income', status: 'overdue', date: '2026-04-15', category: '法律顾问' },
    { id: '5', orderNo: 'EXP-2026-106', client: '阿里云', caseTitle: '云服务器续费', amount: -2800.00, type: 'expense', status: 'paid', date: '2026-04-28', category: 'IT服务' },
    { id: '6', orderNo: 'ORD-2026-004', client: '张三', caseTitle: '文书起草代办费', amount: 3500.00, type: 'income', status: 'paid', date: '2026-05-01', category: '文书服务' },
  ];

  const matchedTx = mockTransactions.find(t => t.id === orderId) || mockTransactions[0];

  // Use mock data since we don't have global state for this in App right now
  const orderDetails = {
    id: matchedTx.orderNo,
    client: matchedTx.client,
    caseTitle: matchedTx.caseTitle,
    amount: Math.abs(matchedTx.amount),
    status: matchedTx.status,
    date: matchedTx.date,
    category: matchedTx.category,
    type: matchedTx.type,
    items: [
      { name: '服务费用/支出一', amount: Math.abs(matchedTx.amount) * 0.6, desc: '基础明细' },
      { name: '附加费用/相关代垫', amount: Math.abs(matchedTx.amount) * 0.4, desc: '相关拓展明细' }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-border text-text-secondary hover:text-brand-primary hover:border-brand-primary/30 transition-all shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-brand-deep">账单详情</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-text-light font-mono.">{orderDetails.id}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="text-xs text-text-light">{orderDetails.date}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handlePrint} className="btn-secondary h-9 px-4 text-xs">
            <Printer size={14} />
            <span>打印</span>
          </button>
          <button onClick={handleDownload} className="btn-primary h-9 px-4 text-xs font-bold shadow-md">
            <Download size={14} />
            <span>下载 PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="card p-6">
             <div className="flex justify-between items-start mb-8">
               <div>
                 <h1 className="text-2xl font-black text-brand-deep">{orderDetails.client}</h1>
                 <p className="text-sm text-text-light mt-1">{orderDetails.caseTitle}</p>
               </div>
               <div className="text-right">
                 <h1 className={`text-3xl font-black mb-1 ${orderDetails.type === 'income' ? 'text-emerald-600' : 'text-slate-700'}`}>
                   {orderDetails.type === 'income' ? '+' : '-'}¥{orderDetails.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}
                 </h1>
                 {orderDetails.status === 'paid' && (
                   <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                     <CheckCircle2 size={12} />
                     已结清
                   </span>
                 )}
                 {orderDetails.status === 'pending' && (
                   <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                     <Clock size={12} />
                     待支付
                   </span>
                 )}
                 {orderDetails.status === 'overdue' && (
                   <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                     <AlertCircle size={12} />
                     已逾期
                   </span>
                 )}
               </div>
             </div>

             <div className="border border-border rounded-xl overflow-hidden">
               <div className="bg-slate-50 px-4 py-3 border-b border-border flex text-xs font-bold text-text-secondary uppercase">
                 <div className="flex-1">收费项目</div>
                 <div className="w-24 text-right">金额</div>
               </div>
               <div className="divide-y divide-border">
                 {orderDetails.items.map((item, idx) => (
                   <div key={idx} className="px-4 py-4 flex items-start hover:bg-slate-50/50 transition-colors">
                     <div className="flex-1">
                        <p className="text-sm font-bold text-brand-deep">{item.name}</p>
                        <p className="text-xs text-text-light mt-0.5">{item.desc}</p>
                     </div>
                     <div className="w-24 text-right">
                        <p className="text-sm font-bold text-text-main font-mono">¥{item.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                     </div>
                   </div>
                 ))}
               </div>
               <div className="bg-slate-50 px-4 py-4 border-t border-border flex items-center justify-between">
                 <span className="text-sm font-bold text-text-secondary">总计金额</span>
                 <span className="text-lg font-black text-brand-deep font-mono">¥{orderDetails.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
               </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">账单信息</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-light mb-1">账单分类</p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-xs font-medium text-slate-600">
                  <FileText size={14} />
                  {orderDetails.category}
                </div>
              </div>
              <div>
                <p className="text-xs text-text-light mb-1">业务经办人</p>
                <p className="text-sm font-bold text-brand-deep">李高伙</p>
              </div>
              <div>
                <p className="text-xs text-text-light mb-1">开票状态</p>
                <span className="inline-block px-2 py-1 rounded bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                  未开票
                </span>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">时间流转记录</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white bg-emerald-500 text-emerald-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] card p-3 rounded-xl shadow-sm border border-border m-2">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs text-brand-deep">回款确认</h4>
                    <span className="text-[10px] text-text-light">5月2日 14:00</span>
                  </div>
                  <p className="text-[10px] text-text-secondary">财务审核通过已入账</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] card p-3 rounded-xl shadow-sm border border-border m-2 opacity-60">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs text-text-main">账单生成</h4>
                    <span className="text-[10px] text-text-light">5月1日 09:30</span>
                  </div>
                  <p className="text-[10px] text-text-secondary">系统自动生成出账</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
            <p className="font-medium text-sm">{toastMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
