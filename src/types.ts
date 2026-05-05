/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  PLATFORM_ADMIN = '平台总管理员',
  FIRM_ADMIN = '律所管理员',
}

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  roles: UserRole[];
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon: any;
  colorClass: string;
  iconBgClass: string;
  iconTextClass: string;
}

export interface Template {
  id: string;
  name: string;
  type: string;
  version: string;
  status: 'published' | 'draft' | 'review' | 'disabled';
  usageCount: number;
  successRate: string;
  rating: number; // 效果评分
  updatedAt: string;
  author: string;
  variablesCount: number;
  isVisibleTo?: string[]; // 可见围律师/团队
}

export interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  aiEnabled: boolean;
  refCount: number;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'processing' | 'resolved' | 'closed';
  user: string;
  createdAt: string;
}
