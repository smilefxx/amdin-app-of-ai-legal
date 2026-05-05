import { 
  User, 
  ShieldCheck, 
  Lock, 
  Bell, 
  FileText, 
  Database, 
  Globe, 
  Palette, 
  ChevronRight, 
  Smartphone,
  Mail,
  Key,
  Shield,
  Eye,
  Settings as SettingsIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SettingItemProps {
  icon: any;
  title: string;
  desc: string;
  action?: React.ReactNode;
  onClick?: () => void;
}

function SettingItem({ icon: Icon, title, desc, action, onClick }: SettingItemProps) {
  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-2xl transition-all ${onClick ? 'cursor-pointer hover:bg-slate-50 active:bg-slate-100 active:scale-[0.99] group' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-text-secondary transition-all ${onClick ? 'group-hover:border-slate-300 group-hover:text-brand-primary group-hover:shadow-md' : ''}`}>
          <Icon size={22} className="transition-transform group-active:scale-90" />
        </div>
        <div>
          <h4 className={`text-sm font-bold text-text-main transition-colors ${onClick ? 'group-hover:text-brand-primary' : ''}`}>{title}</h4>
          <p className="text-[11px] text-text-light">{desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div onClick={(e) => { if (onClick) e.stopPropagation(); }}>
          {action}
        </div>
        {onClick && <ChevronRight size={18} className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-primary" />}
      </div>
    </div>
  );
}

function SettingCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="card-base p-6 bg-white shadow-light border-slate-100 space-y-4">
      <h3 className="text-sm font-bold text-text-main uppercase tracking-widest px-1">{title}</h3>
      <div className="divide-y divide-slate-50">
        {children}
      </div>
    </div>
  );
}

const Toggle = ({ enabled, onChange }: { enabled: boolean, onChange: (val: boolean) => void }) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full p-1 transition-colors relative hover:opacity-90 active:scale-95 focus:outline-none ${enabled ? 'bg-brand-primary shadow-sm shadow-brand-primary/20' : 'bg-slate-200 hover:bg-slate-300'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full shadow-sm shadow-black/10 transition-transform duration-300 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

interface SettingsProps {
  onNavigate?: (id: string) => void;
}

export default function Settings({ onNavigate }: SettingsProps) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true,
    legal: true
  });

  const [security, setSecurity] = useState({
    mfa: true,
    biometric: false,
    autoLock: true
  });

  const handleToggle = (setter: any, key: string, val: boolean) => {
    setter((prev: any) => ({ ...prev, [key]: val }));
    showToast(`系统提示: 选项已${val ? '开启' : '关闭'}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-10 relative">
      <AnimatePresence>
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
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-text-main">系统设置</h2>
          <p className="text-sm text-text-light">管理您的个人资料、安全偏好与律所系统级配置</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
           <CheckCircle2 size={14} />
           <span>系统所有服务运行正常</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account & Profile */}
        <SettingCard title="账号与资料">
          <SettingItem 
            icon={User} 
            title="个人信息" 
            desc="修改您的头像、昵称、邮箱等基本资料" 
            onClick={() => showToast('正在打开个人信息编辑面板...')}
          />
          <SettingItem 
            icon={Mail} 
            title="绑定邮箱" 
            desc="xiaoxiaofang***@gmail.com" 
            action={<span className="text-[10px] font-bold text-brand-primary bg-blue-50 px-2 py-1 rounded-full border border-blue-100">已认证</span>}
            onClick={() => showToast('安全操作: 验证当前邮箱')}
          />
          <SettingItem 
            icon={Smartphone} 
            title="手机号码" 
            desc="138****8888" 
            action={<span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">主设备</span>}
            onClick={() => showToast('安全操作: 验证当前手机号')}
          />
        </SettingCard>

        {/* Security & Privacy */}
        <SettingCard title="安全与隐私">
          <SettingItem 
            icon={Lock} 
            title="登录密码" 
            desc="建议定期更换，以保障账户安全" 
            onClick={() => showToast('将发送密码重置邮件至您的注册邮箱')}
          />
          <SettingItem 
            icon={ShieldCheck} 
            title="多重身份验证 (MFA)" 
            desc="登录时需要额外的安全验证码" 
            action={<Toggle enabled={security.mfa} onChange={(v) => handleToggle(setSecurity, 'mfa', v)} />}
          />
          <SettingItem 
            icon={Eye} 
            title="登录审计日志" 
            desc="查看最近的异地登录与特权操作记录" 
            onClick={() => onNavigate && onNavigate('system_logs')}
          />
        </SettingCard>

        {/* Notifications */}
        <SettingCard title="通知偏好">
          <SettingItem 
            icon={Bell} 
            title="邮件通知" 
            desc="重要日程、办案进度与系统更新" 
            action={<Toggle enabled={notifications.email} onChange={(v) => handleToggle(setNotifications, 'email', v)} />}
          />
          <SettingItem 
            icon={Smartphone} 
            title="APP 推送服务" 
            desc="实时接收案件变更与团队协作提醒" 
            action={<Toggle enabled={notifications.app} onChange={(v) => handleToggle(setNotifications, 'app', v)} />}
          />
          <SettingItem 
            icon={AlertCircle} 
            title="法规更新提醒" 
            desc="当您常用的法条被废止或修改时通知我" 
            action={<Toggle enabled={notifications.legal} onChange={(v) => handleToggle(setNotifications, 'legal', v)} />}
          />
        </SettingCard>

        {/* System Config */}
        <SettingCard title="系统扩展与模板">
          <SettingItem 
            icon={Palette} 
            title="界面主题与配色" 
            desc="切换律所专属配色方案与全屏背景" 
            action={<span className="text-[10px] font-bold text-text-light px-2 py-0.5 rounded bg-slate-100 uppercase">默认</span>}
            onClick={() => showToast('主题编辑器即将上线')}
          />
          <SettingItem 
            icon={Database} 
            title="知识库同步引擎" 
            desc="配置第三方法律数据库或接口映射" 
            onClick={() => onNavigate && onNavigate('firm_knowledge')}
          />
          <SettingItem 
            icon={Globe} 
            title="多语言支持" 
            desc="支持 简体中文、英文、日文" 
            action={<span className="text-[10px] font-bold text-text-secondary px-2 py-0.5 rounded bg-slate-100">中文</span>}
            onClick={() => showToast('切换系统默认语言')}
          />
        </SettingCard>
      </div>

       {/* Footer / Danger Zone */}
       <div className="card-base p-8 bg-white shadow-light border-slate-100 border-l-4 border-l-red-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="space-y-1">
                <h3 className="text-base font-bold text-red-600">律所成员权限管理</h3>
                <p className="text-xs text-text-light">只有“事务所管理员”角色可以访问团队权限分配与套餐升级设置</p>
             </div>
             <div className="flex items-center gap-3">
                <button 
                  className="h-11 px-6 rounded-2xl border border-slate-200 text-sm font-bold text-text-secondary hover:bg-slate-50 transition-all active:scale-95 active:bg-slate-100"
                  onClick={() => onNavigate && onNavigate('system_logs')}
                >
                  查看历史纪录
                </button>
                <button 
                  className="btn-primary h-11 px-8 bg-red-600 hover:bg-red-700 shadow-red-200 text-white border-none active:scale-95 shadow-xl hover:shadow-red-500/30 transition-all group"
                  onClick={() => onNavigate && onNavigate('permission_management')}
                >
                   <Key size={18} className="group-active:scale-90 transition-transform" />
                   <span>配置团队特权</span>
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}
