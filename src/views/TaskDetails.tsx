import React, { useState } from 'react';
import { 
  X, 
  User, 
  Calendar, 
  Flag, 
  MessageSquare,
  Clock,
  Layout,
  ChevronRight,
  MoreHorizontal,
  CheckCircle2,
  Paperclip,
  Share2,
  Trash2,
  Send,
  Pencil
} from 'lucide-react';

interface TaskDetailsProps {
  onBack: () => void;
  onNavigate?: (tab: string) => void;
}

export default function TaskDetails({ onBack, onNavigate }: TaskDetailsProps) {
  const [newComment, setNewComment] = useState('');
  
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
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
            <div className="flex items-center gap-3">
               <h2 className="text-2xl font-bold text-brand-deep tracking-tight">
                 法庭质证大纲编写
               </h2>
               <span className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-600 rounded-full border border-blue-100">进行中</span>
               <span className="px-2.5 py-1 text-[10px] font-bold bg-red-50 text-red-600 rounded-full border border-red-100 flex items-center gap-1"><Flag size={10}/> 高优先级</span>
            </div>
            <p className="text-xs text-text-light mt-1 flex items-center gap-2">
              <Layout size={12} /> 所属案件：某互联网科技公司合同纠纷案
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => onNavigate?.('task_editor')}
             className="h-10 px-6 rounded-xl bg-brand-primary hover:bg-blue-600 text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all"
           >
             <Pencil size={16} /> 编辑
           </button>
           <button className="h-10 px-4 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2">
             <Share2 size={16} /> 分享
           </button>
           <button className="h-10 px-4 rounded-xl text-xs font-bold text-red-600 bg-white border border-slate-200 hover:bg-red-50 transition-all flex items-center gap-2">
             <Trash2 size={16} /> 删除
           </button>
           <button 
             className="h-10 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all"
           >
             <CheckCircle2 size={16} />
             标记为已完成
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Content Info */}
         <div className="lg:col-span-2 space-y-6">
            <div className="card-base p-6 border-slate-100 shadow-sm bg-white">
               <h3 className="text-sm font-bold text-brand-deep mb-4">任务描述</h3>
               <p className="text-sm text-text-secondary leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                 请根据最新收到的被告诉状和证据清单，编写法庭质证大纲。重点关注这几个部分：
                 <br/><br/>
                 1. 被告声称未违约的合同条款解释 
                 <br/>
                 2. 我方邮件往来中提及的时间节点 
                 <br/>
                 3. 对方提供的第三方鉴定报告的资质问题
                 <br/><br/>
                 务必在开庭前三天完成并与我过一遍。
               </p>
            </div>

            <div className="card-base p-6 border-slate-100 shadow-sm bg-white">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-brand-deep">子任务 / 检查项</h3>
                  <span className="text-xs font-bold text-brand-primary">1 / 3 已完成</span>
               </div>
               <div className="space-y-3">
                  {[
                    { title: '整理原告相关证据材料索引', done: true },
                    { title: '提取争议焦点：关于第三条的合理解释', done: false },
                    { title: '准备对对方证据【报告】的质证意见草稿', done: false },
                  ].map((sub, i) => (
                    <label key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${sub.done ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200 hover:border-brand-primary/50'} cursor-pointer transition-colors max-w-full overflow-hidden`}>
                       <input 
                         type="checkbox" 
                         defaultChecked={sub.done}
                         className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary disabled:opacity-50"
                       />
                       <span className={`text-sm ${sub.done ? 'text-slate-400 line-through' : 'text-brand-deep font-medium'}`}>{sub.title}</span>
                    </label>
                  ))}
               </div>
            </div>

            {/* Comments block */}
            <div className="card-base p-6 border-slate-100 shadow-sm bg-white flex flex-col h-[500px]">
               <div className="flex items-center gap-2 mb-4 shrink-0">
                  <MessageSquare size={16} className="text-brand-primary" />
                  <h3 className="text-sm font-bold text-brand-deep">评论协作 (4)</h3>
               </div>
               <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4">
                  {[
                     { user: '系统通知', content: '创建了该协作任务', time: '5月1日 09:00', isSystem: true },
                     { user: '李合伙人', content: '大纲的第一版需要在本周三前完成初稿，周四我们核对。', time: '5月1日 10:15' },
                     { user: '孙律师', content: '收到，我已经开始整理第一部分证据索引了。', time: '5月1日 10:30' },
                     { user: '孙律师', content: '遇到一个问题，对方补充证据3里提到的协议在我们的存档里找不到，请问是原件丢失了吗？', time: '今天 09:00' },
                  ].map((comment, i) => (
                     <div key={i} className={`flex gap-3 ${comment.isSystem ? 'justify-center' : ''}`}>
                       {!comment.isSystem && (
                         <div className="w-8 h-8 rounded-full bg-slate-200 border border-white shadow-sm flex items-center justify-center shrink-0 font-bold text-slate-500 text-xs">
                           {comment.user.charAt(0)}
                         </div>
                       )}
                       <div className={comment.isSystem ? 'text-center' : 'w-full'}>
                         {comment.isSystem ? (
                           <span className="text-[10px] bg-slate-100 text-slate-400 px-3 py-1 rounded-full">{comment.content}</span>
                         ) : (
                           <div className="bg-slate-50 border border-slate-100 shadow-sm p-4 rounded-2xl rounded-tl-sm space-y-2 relative">
                             <div className="flex items-center justify-between gap-4">
                               <span className="text-xs font-bold text-brand-deep">{comment.user}</span>
                               <span className="text-[10px] text-text-light">{comment.time}</span>
                             </div>
                             <p className="text-sm text-text-secondary leading-relaxed">{comment.content}</p>
                           </div>
                         )}
                       </div>
                     </div>
                  ))}
               </div>
               <div className="shrink-0 pt-4 border-t border-slate-100">
                  <div className="relative flex items-center">
                    <input 
                       type="text" 
                       placeholder="输入评论或提醒成员 (使用 @)..."
                       className="w-full h-12 pr-12 pl-4 rounded-xl bg-slate-50 border-none focus:ring-2 ring-brand-primary/20 outline-none text-sm"
                       value={newComment}
                       onChange={e => setNewComment(e.target.value)}
                    />
                    <button className="absolute right-2 w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <Send size={14} />
                    </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Sidebar Info */}
         <div className="space-y-6">
            <div className="card-base p-6 border-slate-100 shadow-sm bg-white space-y-5">
               <div>
                  <h4 className="text-xs font-bold text-text-light uppercase tracking-widest mb-2">负责人 / Assignee</h4>
                  <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">孙</div>
                    <span className="text-sm font-bold text-brand-deep">孙律师</span>
                  </div>
               </div>
               <div>
                  <h4 className="text-xs font-bold text-text-light uppercase tracking-widest mb-2">截止时间 / Due Date</h4>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-2">
                       <Calendar size={14} className="text-red-500" />
                       <span className="text-sm text-red-700 font-bold">2026-05-03 23:59</span>
                    </div>
                  </div>
               </div>
               <div>
                  <h4 className="text-xs font-bold text-text-light uppercase tracking-widest mb-2">发布者 / Reporter</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold">李</div>
                    <span className="text-xs font-bold text-text-secondary">李合伙人</span>
                  </div>
               </div>
               <div>
                  <h4 className="text-xs font-bold text-text-light uppercase tracking-widest mb-2">更新时间 / Last Updated</h4>
                  <div className="flex items-center gap-2 text-text-secondary text-xs">
                    <Clock size={14} /> 今天 09:00
                  </div>
               </div>
            </div>

            <div className="card-base p-6 border-slate-100 shadow-sm bg-white space-y-4">
               <h3 className="text-sm font-bold text-brand-deep">附件资料</h3>
               <div className="space-y-2">
                  {[
                    '起诉状副本_扫描件.pdf',
                    '证据清单目录.xlsx'
                  ].map((file, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                        <div className="flex items-center gap-2 overflow-hidden">
                           <Paperclip size={14} className="text-brand-primary shrink-0" />
                           <span className="text-xs font-medium text-brand-deep truncate">{file}</span>
                        </div>
                        <ChevronRight size={14} className="text-slate-400 shrink-0" />
                     </div>
                  ))}
               </div>
               <button className="w-full h-10 border border-dashed border-slate-300 rounded-xl text-xs font-bold text-slate-500 hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5 transition-all">
                 上传新附件
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
