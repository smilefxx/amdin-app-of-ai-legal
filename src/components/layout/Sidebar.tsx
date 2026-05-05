/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Library, 
  BookOpen, 
  FileText, 
  FolderOpen, 
  Users, 
  ShieldCheck, 
  BarChart3, 
  AlertTriangle, 
  MessageCircleWarning, 
  Receipt, 
  Building, 
  Settings,
  ChevronLeft,
  LogOut,
  ScrollText,
  ShieldAlert,
  Archive,
  FileSearch,
  CreditCard,
  Contact2,
  CalendarDays
} from 'lucide-react';
import { UserRole, MenuItem } from '../../types';

interface SidebarProps {
  currentRole: UserRole;
  activeId: string;
  onNavigate: (id: string) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

const MENU_ITEMS: MenuItem[] = [
  // Platform Admin Items
  { id: 'dashboard', label: '工作台', icon: LayoutDashboard, path: '/', roles: [UserRole.PLATFORM_ADMIN, UserRole.FIRM_ADMIN] },
  { id: 'users', label: '用户管理', icon: Users, path: '/users', roles: [UserRole.PLATFORM_ADMIN] },
  { id: 'firms', label: '律所管理', icon: Building, path: '/firms', roles: [UserRole.PLATFORM_ADMIN] },
  { id: 'platform_templates', label: '模板库总控', icon: Library, path: '/templates', roles: [UserRole.PLATFORM_ADMIN] },
  { id: 'billing_plans', label: '套餐方案管理', icon: CreditCard, path: '/plans', roles: [UserRole.PLATFORM_ADMIN] },
  { id: 'system_logs', label: '系统审计日志', icon: FileSearch, path: '/logs', roles: [UserRole.PLATFORM_ADMIN] },
  
  // Firm Admin Items
  { id: 'firm_templates', label: '模板库管理', icon: Library, path: '/templates', roles: [UserRole.FIRM_ADMIN] },
  { id: 'firm_knowledge', label: '知识库管理', icon: BookOpen, path: '/knowledge', roles: [UserRole.FIRM_ADMIN, UserRole.PLATFORM_ADMIN] },
  { id: 'firm_cases', label: '案件与文书', icon: FolderOpen, path: '/cases', roles: [UserRole.FIRM_ADMIN] },
  { id: 'firm_clients', label: '客户管理', icon: Contact2, path: '/clients', roles: [UserRole.FIRM_ADMIN] },
  { id: 'firm_contracts', label: '合同范本', icon: ScrollText, path: '/contracts', roles: [UserRole.FIRM_ADMIN] },
  { id: 'firm_tasks', label: '团队协作任务', icon: CalendarDays, path: '/tasks', roles: [UserRole.FIRM_ADMIN] },
  { id: 'firm_members', label: '团队成员', icon: Users, path: '/members', roles: [UserRole.FIRM_ADMIN] },
  { id: 'firm_compliance', label: '合规性预检', icon: ShieldAlert, path: '/compliance', roles: [UserRole.FIRM_ADMIN] },
  
  // Shared / Support Items
  { id: 'issues', label: '问题处理中心', icon: MessageCircleWarning, path: '/issues', roles: [UserRole.PLATFORM_ADMIN, UserRole.FIRM_ADMIN] },
  { id: 'risk', label: 'AI 风控中心', icon: AlertTriangle, path: '/risk', roles: [UserRole.PLATFORM_ADMIN] },
  { id: 'orders', label: '财务与结算', icon: Receipt, path: '/orders', roles: [UserRole.PLATFORM_ADMIN, UserRole.FIRM_ADMIN] },
  { id: 'analytics', label: '数据分析看板', icon: BarChart3, path: '/analytics', roles: [UserRole.PLATFORM_ADMIN, UserRole.FIRM_ADMIN] },
  { id: 'archived', label: '归档中心', icon: Archive, path: '/archived', roles: [UserRole.PLATFORM_ADMIN, UserRole.FIRM_ADMIN] },
  { id: 'settings', label: '系统参数设置', icon: Settings, path: '/settings', roles: [UserRole.PLATFORM_ADMIN, UserRole.FIRM_ADMIN] },
];

export default function Sidebar({ currentRole, activeId, onNavigate, onLogout, isCollapsed, setIsCollapsed }: SidebarProps) {
  const filteredItems = MENU_ITEMS.filter(item => item.roles.includes(currentRole));

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="h-screen bg-brand-nav text-slate-300 flex flex-col sticky top-0 overflow-hidden"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 gap-3 shrink-0">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shrink-0">
          <ShieldCheck className="text-white w-5 h-5" />
        </div>
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-white text-lg tracking-tight whitespace-nowrap"
          >
            金律文典
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-0 py-6 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-all relative group ${
                isActive 
                  ? 'text-white bg-gradient-to-r from-blue-600/20 to-transparent font-bold' 
                  : 'text-white/65 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-highlight"
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-primary"
                />
              )}
              <Icon className={`shrink-0 transition-colors ${isActive ? 'text-brand-primary' : 'group-hover:text-white'}`} size={20} />
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[14px] whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/5 space-y-1 shrink-0">
        <button 
          id="toggle-collapse"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all text-slate-400 hover:text-white"
        >
          <div className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
             <ChevronLeft size={20} />
          </div>
          {!isCollapsed && <span className="text-[14px]">收起菜单</span>}
        </button>
        <button 
          id="logout-btn"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400"
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="text-[14px]">退出登录</span>}
        </button>
      </div>
    </motion.aside>
  );
}
