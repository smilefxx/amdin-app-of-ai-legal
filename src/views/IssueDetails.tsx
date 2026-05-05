/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  User, 
  Clock, 
  Tag, 
  AlertCircle, 
  MessageSquare, 
  Send,
  CheckCircle2,
  ShieldCheck,
  Zap,
  UserPlus,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IssueDetailsProps {
  ticket?: any;
  members?: any[];
  onBack: () => void;
  onResolve: (id: string) => void;
  onDispatch: (ticketId: string, userId: string) => void;
}

export default function IssueDetails({ ticket, members = [], onBack, onResolve, onDispatch }: IssueDetailsProps) {
  const [replyText, setReplyText] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [showDispatch, setShowDispatch] = useState(false);

  if (!ticket) return null;

  const handleResolve = () => {
    setIsResolving(true);
    setTimeout(() => {
      onResolve(ticket.id);
      setIsResolving(false);
      onBack();
    }, 1000);
  };

  const currentAssignee = members.find(m => m.id === ticket.assigneeId);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100"
          >
            <ArrowLeft size={20} className="text-text-secondary" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">工单详情</h2>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-xs font-mono font-bold text-text-light px-2 py-0.5 bg-slate-100 rounded">{ticket.id}</span>
               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  ticket.status === 'pending' ? 'bg-red-50 text-red-500 border border-red-100' :
                  ticket.status === 'processing' ? 'bg-amber-50 text-amber-500 border border-amber-100' : 
                  'bg-emerald-50 text-emerald-500 border border-emerald-100'
               }`}>
                  {ticket.status === 'pending' ? '待处理' : ticket.status === 'processing' ? '处理中' : '已解决'}
               </span>
               {currentAssignee && (
                 <span className="text-[10px] text-brand-primary font-bold bg-brand-primary/5 px-2 py-0.5 rounded-full flex items-center gap-1 border border-brand-primary/10">
                   <User size={10} />
                   已指派给: {currentAssignee.name}
                 </span>
               )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {ticket.status !== 'resolved' && (
            <>
              <div className="relative">
                <button 
                  onClick={() => setShowDispatch(!showDispatch)}
                  className="h-11 px-6 rounded-xl bg-slate-50 border border-slate-200 text-brand-deep text-sm font-bold hover:bg-slate-100 transition-all flex items-center gap-2"
                >
                  <UserPlus size={18} className="text-brand-primary" />
                  指派处理人
                  <ChevronDown size={14} className={`transition-transform ${showDispatch ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showDispatch && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
                    >
                      <p className="text-[10px] font-bold text-text-light uppercase px-3 py-2 border-b border-slate-50 mb-1">选择指派对象</p>
                      <div className="max-h-60 overflow-y-auto">
                        {members.map(member => (
                          <button
                            key={member.id}
                            onClick={() => {
                              onDispatch(ticket.id, member.id);
                              setShowDispatch(false);
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left ${ticket.assigneeId === member.id ? 'bg-brand-primary/5' : ''}`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs">
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-brand-deep">{member.name}</p>
                              <p className="text-[10px] text-text-light">{member.department}</p>
                            </div>
                            {ticket.assigneeId === member.id && (
                              <CheckCircle2 size={14} className="ml-auto text-emerald-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={handleResolve}
                disabled={isResolving}
                className={`h-11 px-6 rounded-xl bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2 ${isResolving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isResolving ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                   <CheckCircle2 size={18} />
                )}
                标记为已解决
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           {/* Main Issue Content */}
           <div className="card p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                 <h1 className="text-xl font-bold text-brand-deep">{ticket.title}</h1>
                 <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    ticket.priority === 'high' ? 'bg-red-500 text-white' : 
                    ticket.priority === 'medium' ? 'bg-amber-400 text-white' : 'bg-slate-400 text-white'
                 }`}>
                    {ticket.priority} 优先级
                 </span>
              </div>
              
              <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed">
                 <p>{ticket.content}</p>
              </div>

              <div className="flex items-center gap-4 pt-6 text-[11px] text-text-light border-t border-slate-50">
                 <span className="flex items-center gap-1.5"><User size={14} /> {ticket.user}</span>
                 <span className="w-px h-3 bg-slate-200"></span>
                 <span className="flex items-center gap-1.5"><Clock size={14} /> {ticket.createdAt}</span>
                 <span className="w-px h-3 bg-slate-200"></span>
                 <span className="flex items-center gap-1.5"><Tag size={14} /> {ticket.type}</span>
              </div>
           </div>

           {/* Conversation / Replies */}
           <div className="space-y-4">
              <h3 className="text-sm font-bold text-brand-deep flex items-center gap-2 px-1">
                 <MessageSquare size={16} className="text-brand-primary" />
                 流转记录与反馈 ({ticket.replies.length})
              </h3>
              
              <div className="space-y-4">
                 {ticket.replies.map((reply: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card p-6 bg-slate-50/50 border-slate-100"
                    >
                       <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                <User size={12} />
                             </div>
                             <span className="text-xs font-bold text-brand-deep">{reply.user}</span>
                          </div>
                          <span className="text-[10px] text-text-light">{reply.time}</span>
                       </div>
                       <p className="text-sm text-slate-600 leading-relaxed">{reply.content}</p>
                    </motion.div>
                 ))}

                 {ticket.replies.length === 0 && (
                    <div className="card p-12 text-center bg-slate-50/30 border-dashed border-2">
                       <p className="text-sm text-text-light">暂无流转回复</p>
                    </div>
                 )}
              </div>
           </div>

           {/* Reply Input */}
           <div className="card p-4 border-2 border-brand-primary/10 focus-within:border-brand-primary/30 transition-all">
              <textarea 
                 value={replyText}
                 onChange={(e) => setReplyText(e.target.value)}
                 placeholder="输入回复内容，同步给用户..."
                 className="w-full h-32 p-3 text-sm resize-none outline-none bg-transparent"
              ></textarea>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                 <div className="flex items-center gap-3">
                    <button className="p-2 text-slate-400 hover:text-brand-primary transition-colors">
                       <Tag size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-brand-primary transition-colors">
                       <Zap size={18} />
                    </button>
                 </div>
                 <button className="btn-primary h-10 px-6 gap-2">
                    <Send size={16} />
                    发送回复
                 </button>
              </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="card p-6 space-y-4">
              <h4 className="text-[11px] font-bold text-text-light uppercase tracking-widest border-b border-slate-50 pb-3">工单状态追踪</h4>
              <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                 <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm ring-1 ring-emerald-500/20"></div>
                    <p className="text-xs font-bold text-brand-deep">提交成功</p>
                    <p className="text-[10px] text-text-light mt-0.5">{ticket.createdAt}</p>
                 </div>
                 <div className="relative pl-8">
                    <div className={`absolute left-0 top-0 w-4 h-4 rounded-full ${ticket.status !== 'pending' ? 'bg-emerald-500' : 'bg-slate-200'} border-4 border-white shadow-sm ring-1 ring-slate-200`}></div>
                    <p className="text-xs font-bold text-brand-deep">系统受理</p>
                    <p className="text-[10px] text-text-light mt-0.5">自动分配至技术支持组</p>
                 </div>
                 <div className="relative pl-8">
                    <div className={`absolute left-0 top-0 w-4 h-4 rounded-full ${ticket.status === 'resolved' ? 'bg-emerald-500' : 'bg-slate-200'} border-4 border-white shadow-sm ring-1 ring-slate-200`}></div>
                    <p className="text-xs font-bold text-brand-deep">问题已闭环</p>
                    {ticket.status === 'resolved' && <p className="text-[10px] text-emerald-600 font-bold mt-1">处理耗时: 14小时 20分</p>}
                 </div>
              </div>
           </div>

           <div className="card p-6 bg-brand-primary/5 border-brand-primary/10">
              <div className="flex items-center gap-2 mb-3">
                 <ShieldCheck size={16} className="text-brand-primary" />
                 <h4 className="text-xs font-bold text-text-secondary">AI 诊断建议</h4>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed mb-4">
                 根据历史类似工单分析，此 HTML 源码显示问题通常与 Nginx 静态资源映射或 Webpack 打包路径配置有关。
              </p>
              <button className="w-full py-2 rounded-lg bg-white border border-brand-primary/20 text-[10px] font-bold text-brand-primary hover:bg-brand-primary/5 transition-all">
                 查阅排障文档
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
