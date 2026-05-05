/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Bell, HelpCircle, User, SwitchCamera } from 'lucide-react';
import { UserRole } from '../../types';

interface NavbarProps {
  currentRole: UserRole;
  title: string;
}

export default function Navbar({ currentRole, title }: NavbarProps) {
  return (
    <header className="h-16 bg-white border-bottom border-border px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-brand-deep tracking-tight">{title}</h1>
        
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light group-focus-within:text-brand-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="搜索模板、案件、用户、知识条目..." 
            className="h-10 w-80 pl-10 pr-4 bg-brand-ice rounded-sm text-sm border border-transparent focus:border-brand-primary focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-8 w-[1px] bg-border mx-2" />

        <button className="p-2 hover:bg-slate-100 rounded-lg text-text-secondary relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white" />
        </button>
        
        <button className="p-2 hover:bg-slate-100 rounded-lg text-text-secondary">
          <HelpCircle size={20} />
        </button>

        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-brand-deep leading-tight">李管理员</p>
            <p className="text-[11px] text-text-light">{currentRole}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-ice border border-blue-100 flex items-center justify-center text-brand-primary">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
