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
  AlertCircle,
  X,
  Upload
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

type ModalType = 'profile' | 'email' | 'phone' | 'password' | 'theme' | null;

export default function Settings({ onNavigate }: SettingsProps) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'default';
  });

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

  const [userInfo, setUserInfo] = useState({
    name: '张三律师',
    title: '高级合伙人',
    department: '诉讼部',
    email: 'xiaoxiaofang689@gmail.com',
    phone: '13812348888',
  });
  const [editForm, setEditForm] = useState({...userInfo});
  
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setEditForm(prev => ({...prev, [key]: e.target.value}));
  };
  
  const handleSaveProfile = () => {
    setUserInfo(prev => ({...prev, name: editForm.name, title: editForm.title, department: editForm.department}));
    showToast('个人信息已保存'); 
    closeModal();
  };
  const handleSaveEmail = () => {
    setUserInfo(prev => ({...prev, email: editForm.email}));
    showToast('邮箱更改成功');
    closeModal();
  };
  const handleSavePhone = () => {
    setUserInfo(prev => ({...prev, phone: editForm.phone}));
    showToast('手机号码已重新绑定');
    closeModal();
  };
  

  const handleToggle = (setter: any, key: string, val: boolean) => {
    setter((prev: any) => ({ ...prev, [key]: val }));
    showToast(`系统提示: 选项已${val ? '开启' : '关闭'}`);
  };

  const openModal = (type: ModalType) => {
    setEditForm({...userInfo});
    setActiveModal(type);
  }
  const closeModal = () => setActiveModal(null);

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
            onClick={() => openModal('profile')}
          />
          <SettingItem 
            icon={Mail} 
            title="绑定邮箱" 
            desc={userInfo.email} 
            action={<span className="text-[10px] font-bold text-brand-primary bg-blue-50 px-2 py-1 rounded-full border border-blue-100">已认证</span>}
            onClick={() => openModal('email')}
          />
          <SettingItem 
            icon={Smartphone} 
            title="手机号码" 
            desc={`${userInfo.phone.slice(0, 3)}****${userInfo.phone.slice(7)}`}
            action={<span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">主设备</span>}
            onClick={() => openModal('phone')}
          />
        </SettingCard>

        {/* Security & Privacy */}
        <SettingCard title="安全与隐私">
          <SettingItem 
            icon={Lock} 
            title="登录密码" 
            desc="建议定期更换，以保障账户安全" 
            onClick={() => openModal('password')}
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
            action={<span className="text-[10px] font-bold text-text-light px-2 py-0.5 rounded bg-slate-100 uppercase">{activeTheme === 'default' ? '默认' : activeTheme === 'dark' ? '暗夜' : activeTheme === 'emerald' ? '绿色' : '红色'}</span>}
            onClick={() => openModal('theme')}
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

       {/* Modals */}
       <AnimatePresence>
         {activeModal === 'profile' && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
           >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
               className="bg-white max-w-md w-full rounded-[2rem] p-8 shadow-2xl relative"
             >
               <button onClick={closeModal} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors">
                 <X size={20} className="text-slate-400" />
               </button>
               <h3 className="text-xl font-bold text-brand-deep mb-6">编辑个人信息</h3>
               
               <div className="flex flex-col items-center mb-6">
                 <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-brand-primary/20 flex flex-col items-center justify-center text-brand-primary cursor-pointer hover:bg-blue-100 transition-colors relative overflow-hidden group">
                   <User size={30} className="mb-1" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Upload size={20} className="text-white" />
                   </div>
                 </div>
                 <span className="text-xs text-text-light mt-2">点击更换头像</span>
               </div>

               <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-text-secondary">姓名/昵称</label>
                   <input type="text" value={editForm.name} onChange={(e) => handleEditChange(e, "name")} className="w-full h-11 px-4 rounded-xl border border-border focus:border-brand-primary outline-none transition-all text-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-text-secondary">职级/头衔</label>
                   <input type="text" value={editForm.title} onChange={(e) => handleEditChange(e, "title")} className="w-full h-11 px-4 rounded-xl border border-border focus:border-brand-primary outline-none transition-all text-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-text-secondary">所在部门</label>
                   <input type="text" value={editForm.department} onChange={(e) => handleEditChange(e, "department")} className="w-full h-11 px-4 rounded-xl border border-border focus:border-brand-primary outline-none transition-all text-sm" />
                 </div>
               </div>

               <div className="mt-8">
                 <button onClick={handleSaveProfile} className="w-full btn-primary h-12 text-sm">
                   保存更改
                 </button>
               </div>
             </motion.div>
           </motion.div>
         )}

         {activeModal === 'email' && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
           >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
               className="bg-white max-w-md w-full rounded-[2rem] p-8 shadow-2xl relative"
             >
               <button onClick={closeModal} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors">
                 <X size={20} className="text-slate-400" />
               </button>
               <h3 className="text-xl font-bold text-brand-deep mb-2">更改绑定邮箱</h3>
               <p className="text-xs text-text-light mb-6">当前绑定的邮箱：{userInfo.email}</p>

               <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-text-secondary">新邮箱地址</label>
                   <input type="email" placeholder="输入新的邮箱地址" value={editForm.email} onChange={(e) => handleEditChange(e, "email")} className="w-full h-11 px-4 rounded-xl border border-border focus:border-brand-primary outline-none transition-all text-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-text-secondary">验证码</label>
                   <div className="flex gap-2">
                     <input type="text" placeholder="输入6位验证码" className="flex-1 h-11 px-4 rounded-xl border border-border focus:border-brand-primary outline-none transition-all text-sm tracking-widest" />
                     <button className="h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-text-secondary hover:text-brand-primary hover:bg-blue-50 transition-colors shrink-0">
                       获取验证码
                     </button>
                   </div>
                 </div>
               </div>

               <div className="mt-8">
                 <button onClick={handleSaveEmail} className="w-full btn-primary h-12 text-sm">
                   确认更改
                 </button>
               </div>
             </motion.div>
           </motion.div>
         )}

         {activeModal === 'phone' && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
           >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
               className="bg-white max-w-md w-full rounded-[2rem] p-8 shadow-2xl relative"
             >
               <button onClick={closeModal} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors">
                 <X size={20} className="text-slate-400" />
               </button>
               <h3 className="text-xl font-bold text-brand-deep mb-2">更改绑定手机</h3>
               <p className="text-xs text-text-light mb-6">当前绑定的手机号码：{userInfo.phone.slice(0, 3)}****{userInfo.phone.slice(7)}</p>

               <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-text-secondary">新手机号码</label>
                   <input type="tel" placeholder="输入新的手机号码" className="w-full h-11 px-4 rounded-xl border border-border focus:border-brand-primary outline-none transition-all text-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-text-secondary">验证码</label>
                   <div className="flex gap-2">
                     <input type="text" placeholder="输入短信验证码" className="flex-1 h-11 px-4 rounded-xl border border-border focus:border-brand-primary outline-none transition-all text-sm tracking-widest" />
                     <button className="h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-text-secondary hover:text-brand-primary hover:bg-blue-50 transition-colors shrink-0">
                       获取验证码
                     </button>
                   </div>
                 </div>
               </div>

               <div className="mt-8 text-center space-y-3">
                 <button onClick={() => { showToast('手机号码更改成功'); closeModal(); }} className="w-full btn-primary h-12 text-sm">
                   确认绑新号码
                 </button>
               </div>
             </motion.div>
           </motion.div>
         )}

         {activeModal === 'password' && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
           >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
               className="bg-white max-w-md w-full rounded-[2rem] p-8 shadow-2xl relative"
             >
               <button onClick={closeModal} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors">
                 <X size={20} className="text-slate-400" />
               </button>
               <h3 className="text-xl font-bold text-brand-deep mb-2">修改登录密码</h3>
               <p className="text-xs text-text-light mb-6">定期修改密码可提升您的账号安全性</p>

               <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-text-secondary">当前密码</label>
                   <input type="password" placeholder="请输入当前使用的密码" className="w-full h-11 px-4 rounded-xl border border-border focus:border-brand-primary outline-none transition-all text-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-text-secondary">新密码</label>
                   <input type="password" placeholder="请输入新密码（至少8位）" className="w-full h-11 px-4 rounded-xl border border-border focus:border-brand-primary outline-none transition-all text-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-text-secondary">确认新密码</label>
                   <input type="password" placeholder="请再次输入新密码" className="w-full h-11 px-4 rounded-xl border border-border focus:border-brand-primary outline-none transition-all text-sm" />
                 </div>
               </div>

               <div className="mt-8">
                 <button onClick={() => { showToast('密码修改成功，请妥善保管'); closeModal(); }} className="w-full btn-primary h-12 text-sm bg-brand-deep hover:bg-slate-800 shadow-slate-200">
                   保存新密码
                 </button>
                 <div className="mt-4 text-center">
                    <button onClick={() => { showToast('重置链接已发送到邮箱'); closeModal(); }} className="text-xs text-brand-primary hover:underline">
                      忘记原密码？
                    </button>
                 </div>
               </div>
             </motion.div>
           </motion.div>
         )}

         {activeModal === 'theme' && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
           >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
               className="bg-white max-w-md w-full rounded-[2rem] p-8 shadow-2xl relative"
             >
               <button onClick={closeModal} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors">
                 <X size={20} className="text-slate-400" />
               </button>
               <h3 className="text-xl font-bold text-brand-deep mb-2">界面主题与配色</h3>
               <p className="text-xs text-text-light mb-6">选择适合您的律所系统风格与配色</p>

               <div className="space-y-4">
                 {[
                   { id: 'default', name: '经典商务蓝 (默认)', desc: '专业、沉稳的法律系统经典配色', color: 'bg-blue-600', active: true },
                   { id: 'dark', name: '暗夜曜石黑', desc: '降低视觉疲劳，适合夜间护眼', color: 'bg-slate-800', active: false },
                   { id: 'emerald', name: '生机勃勃绿', desc: '清新自然，提升工作活力', color: 'bg-emerald-600', active: false },
                   { id: 'rose', name: '霞光典雅红', desc: '展现律所热情与独特品味', color: 'bg-rose-600', active: false }
                 ].map((theme) => (
                   <div key={theme.id} onClick={() => setActiveTheme(theme.id)} className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${activeTheme === theme.id ? 'border-brand-primary bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                     <div className={`w-8 h-8 rounded-full shadow-sm shrink-0 mt-1 ${theme.color} border-2 border-white ring-1 ring-slate-200`}></div>
                     <div className="flex-1">
                        <h4 className={`text-sm font-bold ${activeTheme === theme.id ? 'text-brand-primary' : 'text-text-main'}`}>{theme.name}</h4>
                        <p className="text-xs text-text-light mt-1">{theme.desc}</p>
                     </div>
                     {activeTheme === theme.id && (
                       <div className="w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0 mt-2">
                         <CheckCircle2 size={12} />
                       </div>
                     )}
                   </div>
                 ))}
               </div>

               <div className="mt-8">
                 <button onClick={() => {
                   if (activeTheme === 'default') {
                     document.documentElement.className = '';
                   } else {
                     document.documentElement.className = `theme-${activeTheme}`;
                   }
                   localStorage.setItem('app-theme', activeTheme);
                   showToast('系统主题方案已切换'); 
                   closeModal(); 
                 }} className="w-full btn-primary h-12 text-sm bg-brand-deep hover:bg-slate-800 shadow-slate-200">
                   应用此主题
                 </button>
               </div>
             </motion.div>
           </motion.div>
         )}

       </AnimatePresence>
    </div>
  );
}

