/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Plus,
  Clock,
  LayoutGrid,
  List,
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';

interface TaskCalendarProps {
  onBack: () => void;
  onAddTask: (date?: string) => void;
  tasks?: any[];
}

export default function TaskCalendar({ onBack, onAddTask, tasks = [] }: TaskCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Transform dynamic tasks for calendar view
  const calendarTasks = tasks
    .filter(t => t.dueDate) // Only tasks with dates
    .map(t => {
      const date = new Date(t.dueDate);
      return {
        id: t.id,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        title: t.title,
        color: t.priority === 'high' ? 'bg-red-500' : t.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500',
        time: '待定',
        project: t.project
      };
    });

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const offset = firstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100"
          >
            <X size={20} className="text-text-secondary" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-brand-deep tracking-tight">日程视图</h2>
            <p className="text-xs text-text-light mt-0.5">多维审视办案排期，确保无死角时效管理</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
             <button className="px-4 py-2 rounded-lg bg-white shadow-sm text-xs font-bold text-brand-primary flex items-center gap-2">
                <LayoutGrid size={14} /> 月视图
             </button>
             <button className="px-4 py-2 rounded-lg text-xs font-bold text-text-secondary hover:text-brand-primary flex items-center gap-2 transition-colors">
                <List size={14} /> 周视图
             </button>
          </div>
          <button 
            onClick={onAddTask}
            className="h-10 px-6 rounded-xl bg-brand-primary hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-brand-primary/20 flex items-center gap-2 transition-all"
          >
            <Plus size={18} />
            发布日程
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Body */}
        <div className="lg:col-span-3 card p-8 bg-white border-slate-100">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                 <h3 className="text-xl font-bold text-brand-deep font-mono">
                    {year}年 {monthNames[month]}
                 </h3>
                 <div className="flex items-center gap-1">
                    <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg text-text-light transition-colors">
                       <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg text-text-light transition-colors">
                       <ChevronRight size={20} />
                    </button>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
                    <input 
                       type="text" 
                       placeholder="检索日期描述..."
                       className="h-9 w-40 pl-9 pr-4 bg-slate-50 border-none rounded-lg text-xs outline-none focus:ring-1 ring-brand-primary/20"
                    />
                 </div>
                 <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-50 text-text-light hover:bg-slate-100 transition-colors">
                    <Filter size={16} />
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-7 border-t border-l border-slate-50">
              {weekDays.map(d => (
                <div key={d} className="h-12 flex items-center justify-center text-[11px] font-bold text-text-light border-b border-r border-slate-50 bg-slate-50/30 uppercase tracking-widest">
                  {d}
                </div>
              ))}
              
              {Array.from({ length: offset }).map((_, i) => (
                <div key={`offset-${i}`} className="h-32 border-b border-r border-slate-50 bg-slate-50/10" />
              ))}
              
              {Array.from({ length: days }).map((_, i) => {
                const day = i + 1;
                // Only show tasks for the CURRENTLY VIEWED month/year
                const dayTasks = calendarTasks.filter(t => 
                  t.day === day && 
                  t.month === month && 
                  t.year === year
                );
                const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

                return (
                  <div key={day} className={`h-32 p-2 border-b border-r border-slate-50 hover:bg-slate-50/50 transition-colors group relative ${isToday ? 'bg-brand-primary/5' : ''}`}>
                    <span className={`text-xs font-mono font-bold ${isToday ? 'text-brand-primary bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm' : 'text-slate-400 group-hover:text-brand-deep'}`}>
                      {day}
                    </span>
                    <div className="mt-2 space-y-1">
                      {dayTasks.map((task, idx) => (
                        <div 
                          key={task.id || idx} 
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold text-white truncate cursor-pointer transition-transform hover:scale-105 ${task.color} shadow-sm`}
                          title={`${task.title} (${task.project})`}
                        >
                          {task.time} {task.title}
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        const d = new Date(year, month, day);
                        const dateStr = d.toISOString().split('T')[0];
                        onAddTask(dateStr);
                      }}
                      className="absolute bottom-2 right-2 p-1 bg-white rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-brand-primary border border-slate-100"
                    >
                       <Plus size={12} />
                    </button>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Legend / Upcoming Sidebar */}
        <div className="space-y-6">
           <div className="card p-6 bg-brand-deep text-white border-none shadow-xl">
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                 <Clock size={16} className="text-brand-primary" />
                 今日关键时刻
              </h4>
              <div className="space-y-4">
                 {[
                   { time: '09:30', title: '法院开庭 (205庭)', project: '张三纠纷案', status: 'upcoming' },
                   { time: '14:00', title: '合伙人会议', project: '年度规划', status: 'done' },
                   { time: '16:30', title: '回复当事人', project: '李四劳动案', status: 'pending' },
                 ].map((event, i) => (
                   <div key={i} className={`p-3 rounded-xl border ${event.status === 'done' ? 'bg-white/5 border-white/10 opacity-50' : 'bg-white/10 border-white/20'}`}>
                      <div className="flex items-center justify-between mb-1">
                         <span className="text-[10px] font-mono font-bold text-brand-primary">{event.time}</span>
                         {event.status === 'upcoming' && <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />}
                      </div>
                      <p className="text-[11px] font-bold truncate">{event.title}</p>
                      <p className="text-[9px] text-white/40 truncate">{event.project}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="card p-6 space-y-4">
              <h4 className="text-xs font-bold text-brand-deep uppercase tracking-widest">排期颜色说明</h4>
              <div className="space-y-3">
                 {[
                   { label: '重要开庭/举证', color: 'bg-red-500' },
                   { label: '当事人约谈', color: 'bg-blue-500' },
                   { label: '内部协作任务', color: 'bg-emerald-500' },
                   { label: '行政/合规事项', color: 'bg-purple-500' },
                   { label: '其他/待定', color: 'bg-slate-300' }
                 ].map(item => (
                   <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-[10px] font-bold text-text-secondary">{item.label}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
