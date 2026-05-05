/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { UserRole } from '../../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  onGoToRegister: () => void;
}

export default function Login({ onLogin, onGoToRegister }: LoginProps) {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left: Brand Side */}
      <div className="hidden md:flex md:w-1/2 bg-brand-deep p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-brand-primary blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500 blur-[100px]" />
        </div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-white tracking-widest">金律文典</span>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
              数字化文书中枢<br />
              <span className="text-brand-primary">重新定义律所效率</span>
            </h1>
            
            <div className="space-y-6 mb-12">
              {[
                { title: '智能模板引擎', desc: '基于 AI 的动态变量映射，分钟级生成复杂法律文书', icon: ShieldCheck },
                { title: '知识资产沉淀', desc: '全所案例、私有知识库统一管理，经验价值最大化', icon: UserCheck },
                { title: '全链路风控', desc: '实时合规预检，多维度识别文书逻辑漏洞与潜在风险', icon: Mail }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 border border-brand-primary/30 rounded flex items-center justify-center shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">{feature.title}</h4>
                    <p className="text-slate-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
          <div>
            <p className="text-3xl font-bold text-white">1,200+</p>
            <p className="text-slate-500 text-sm">专业合规律所已入驻</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">50k+</p>
            <p className="text-slate-500 text-sm">智能模板日均调用</p>
          </div>
        </div>
      </div>

      {/* Right: Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-bg-gray lg:bg-white">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-brand-deep">欢迎回归</h2>
            <p className="text-text-light mt-2">请登录您的管理员控制台</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-text-secondary">邮箱地址/账号</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="admin@firm.com"
                  className="w-full h-12 pl-10 pr-4 bg-slate-50 lg:bg-white border border-border rounded-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-text-secondary">登录密码</label>
                <button className="text-xs text-brand-primary font-medium hover:underline">忘记密码？</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-4 bg-slate-50 lg:bg-white border border-border rounded-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-border text-brand-primary focus:ring-brand-primary" />
            <label htmlFor="remember" className="text-sm text-text-secondary">保持 30 天内自动登录</label>
          </div>

          <button 
            onClick={() => onLogin(UserRole.FIRM_ADMIN)}
            className="w-full btn-primary h-12 justify-center text-lg"
          >
            <span>立即登录</span>
            <ArrowRight size={20} />
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-text-light">快速登录</span></div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 btn-secondary h-11 justify-center">
              <UserCheck size={18} />
              <span>CA 证书</span>
            </button>
            <button className="flex-1 btn-secondary h-11 justify-center">
              <span>手机号</span>
            </button>
          </div>

          <p className="text-center text-sm text-text-light">
            还没有管理员账号？ 
            <button onClick={onGoToRegister} className="text-brand-primary font-bold ml-1 hover:underline">立即入驻</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
