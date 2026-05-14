/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './views/Dashboard';
import TemplateLibrary from './views/TemplateLibrary';
import TemplateEditor from './views/TemplateEditor';
import TemplateUpload from './views/TemplateUpload';
import CategoryManagement from './views/CategoryManagement';
import KnowledgeBase from './views/KnowledgeBase';
import KnowledgeEditor from './views/KnowledgeEditor';
import KnowledgeDiscovery from './views/KnowledgeDiscovery';
import IssueCenter from './views/IssueCenter';
import IssueDetails from './views/IssueDetails';
import TodoItems from './views/TodoItems';
import CaseManagement from './views/CaseManagement';
import CaseEditor from './views/CaseEditor';
import CaseDetails from './views/CaseDetails';
import ClientManagement from './views/ClientManagement';
import ClientEditor from './views/ClientEditor';
import ContractTemplates from './views/ContractTemplates';
import DocumentGenerator from './views/DocumentGenerator';
import TaskManagement from './views/TaskManagement';
import TaskEditor from './views/TaskEditor';
import TaskDetails from './views/TaskDetails';
import TaskCalendar from './views/TaskCalendar';
import MemberManagement from './views/MemberManagement';
import MemberEditor from './views/MemberEditor';
import MemberDetails from './views/MemberDetails';
import MemberPermissions from './views/MemberPermissions';
import PermissionManagement from './views/PermissionManagement';
import CompliancePrecheck from './views/CompliancePrecheck';
import ComplianceUploader from './views/ComplianceUploader';
import ComplianceHistory from './views/ComplianceHistory';
import ComplianceDetails from './views/ComplianceDetails';
import FinanceBilling from './views/FinanceBilling';
import BillingCreator from './views/BillingCreator';
import StatementExport from './views/StatementExport';
import OrderDetails from './views/OrderDetails';
import Analytics from './views/Analytics';
import ArchiveCenter from './views/ArchiveCenter';
import Settings from './views/Settings';
import FirmManagement from './views/FirmManagement';
import UserManagement from './views/UserManagement';
import BillingPlans from './views/BillingPlans';
import SystemLogs from './views/SystemLogs';
import RiskEngine from './views/RiskEngine';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import { UserRole } from './types';

export default function App() {
  const [role, setRole] = useState<UserRole>(UserRole.FIRM_ADMIN);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'default';
    if (savedTheme !== 'default') {
      document.documentElement.className = `theme-${savedTheme}`;
    }
  }, []);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedGeneratorTemplate, setSelectedGeneratorTemplate] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [selectedKnowledge, setSelectedKnowledge] = useState<any>(null);
  const [selectedClientSearch, setSelectedClientSearch] = useState<string>('');
  const [tickets, setTickets] = useState([
    { id: 'TK-10023', title: '文书预览显示 HTML 源码', type: '系统异常', priority: 'high', status: 'pending', user: '张三律师', createdAt: '2026-05-01 10:20', content: '在预览合同范本时，系统没有渲染 PDF，而是直接显示了 HTML 标签。', replies: [] },
    { id: 'TK-10024', title: '会员费用余额无法同步', type: '支付问题', priority: 'medium', status: 'processing', user: '某某律师事务所', createdAt: '2026-05-01 09:15', content: '我们刚充值了 5000 元，但是账户余额显示的还是充值前的金额。', replies: [{ user: '客服小王', content: '正在为您核实银行流水，请稍等。', time: '2026-05-01 11:30' }] },
    { id: 'TK-10025', title: '建议增加离婚协议模板', type: '模板需求', priority: 'low', status: 'resolved', user: '李四', createdAt: '2026-04-30 15:40', content: '希望能增加一些更细分的离婚协议，比如涉及跨国婚姻的。', replies: [{ user: '系统管理员', content: '感谢建议，已收录到 Q3 模板更新计划。', time: '2026-05-01 10:00' }] },
  ]);
  const [members, setMembers] = useState([
    { id: '1', name: '王振华', role: 'partner', department: '民事业务部', email: 'wang.zh@firm.com', phone: '138****8888', status: 'active' as const, caseLoad: 12, joinDate: '2020-03-15' },
    { id: '2', name: '李晓青', role: 'associate', department: '商事业务部', email: 'li.xq@firm.com', phone: '139****1122', status: 'busy' as const, caseLoad: 18, joinDate: '2022-05-10' },
    { id: '3', name: '陈思宇', role: 'assistant', department: '知识产权部', email: 'chen.sy@firm.com', phone: '137****3344', status: 'active' as const, caseLoad: 5, joinDate: '2024-01-08' },
    { id: '4', name: '张大伟', role: 'partner', department: '刑事业务部', email: 'zhang.dw@firm.com', phone: '136****5566', status: 'away' as const, caseLoad: 8, joinDate: '2019-11-20' },
    { id: '5', name: '赵小雅', role: 'admin', department: '行政管理部', email: 'zhao.xy@firm.com', phone: '135****0000', status: 'active' as const, caseLoad: 0, joinDate: '2023-08-12' },
  ]);
  const [tasks, setTasks] = useState([
    { id: '1', title: '完成《隐私政策》V2.0 更新', project: '阿里云合规项目', assignee: { name: '王律师' }, priority: 'high', status: 'completed', dueDate: '2026-05-15', commentCount: 3 },
    { id: '2', title: '张三 vs 李四 借款案证据整理', project: '民事纠纷案件', assignee: { name: '赵助理' }, priority: 'medium', status: 'in_progress', dueDate: '2026-05-18', commentCount: 12 },
    { id: '3', title: '律所年度审计资料提交', project: '行政管理', assignee: { name: '财务张姐' }, priority: 'low', status: 'todo', dueDate: '2026-05-25', commentCount: 0 },
    { id: '4', title: '某互联网大厂股权激励合同审阅', project: '非诉法律服务', assignee: { name: '李高伙' }, priority: 'high', status: 'todo', dueDate: '2026-05-22', commentCount: 5 },
    { id: '5', title: '法庭质证大纲编写', project: '李某合同纠纷', assignee: { name: '孙律师' }, priority: 'high', status: 'in_progress', dueDate: '2026-05-03', commentCount: 8 },
  ]);

  const handleAddTaskTab = (date?: string) => {
    setSelectedDate(date || null);
    setActiveTab('task_editor');
  };

  const selectedMember = members.find(m => m.id === selectedMemberId);
  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const handleSelectMember = (id: string, tab: string = 'member_details') => {
    setSelectedMemberId(id);
    setActiveTab(tab);
  };

  const handleSelectTicket = (id: string) => {
    setSelectedTicketId(id);
    setActiveTab('issue_details');
  };

  const handleUpdateMember = (id: string | null, data: any) => {
    if (id) {
      setMembers(prev => prev.map(m => m.id === id ? { ...m, ...data, joinDate: data.entryDate } : m));
    } else {
      const newMember = {
        ...data,
        id: Date.now().toString(),
        caseLoad: 0,
        joinDate: data.entryDate || new Date().toISOString().split('T')[0]
      };
      setMembers(prev => [...prev, newMember]);
    }
  };

  const handleResolveTicket = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'resolved' } : t));
  };

  const handleAddTask = (taskData: any) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      status: 'todo',
      commentCount: 0,
      assignee: { name: taskData.assignee || '未分配' }
    };
    setTasks(prev => [...prev, newTask]);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const handleRegisterComplete = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthView('login');
  };

  if (!isLoggedIn) {
    return authView === 'login' ? (
      <Login onLogin={handleLogin} onGoToRegister={() => setAuthView('register')} />
    ) : (
      <Register onBackToLogin={() => setAuthView('login')} onRegisterComplete={handleRegisterComplete} />
    );
  }

  const getPageTitle = () => {
    if (activeTab === 'template_editor') return '模板编辑器';
    if (activeTab === 'todos') return '待处理事项';
    switch(activeTab) {
      case 'dashboard': return '工作台';
      case 'users': return '用户管理';
      case 'firms': return '律所管理';
      case 'platform_templates':
      case 'firm_templates': return '模板库管理';
      case 'firm_knowledge': return '知识库管理';
      case 'knowledge_editor': return '专业知识录入';
      case 'knowledge_discovery': return 'AI 知识发现';
      case 'case_editor': return '案件卷宗录入/编辑';
      case 'case_editor_edit': return '案件卷宗录入/编辑';
      case 'case_details': return '案件详情';
      case 'client_editor': return '客户档案录入/编辑';
      case 'firm_cases': return '案件与文书';
      case 'firm_members': return '团队成员管理';
      case 'member_details': return '成员详细信息';
      case 'member_editor': return '编辑成员资料';
      case 'member_permissions': return '个性化权限设置';
      case 'permission_management': return '权限策略配置';
      case 'compliance_uploader': return 'AI 文书合规扫描';
      case 'compliance_history': return '合规检索历史';
      case 'compliance_details': return '合规深度报告';
      case 'firm_clients': return '客案管理中心';
      case 'firm_contracts': return '合同范本库';
      case 'template_upload': return '上传合同范本';
      case 'category_management': return '合同分类管理';
      case 'firm_tasks': return '团队协作任务';
      case 'task_editor': return '任务发布与编辑';
      case 'task_details': return '任务详情与协作';
      case 'task_calendar': return '团队日程全景';
      case 'firm_compliance': return '合规性预检';
      case 'billing_plans': return '套餐方案管理';
      case 'system_logs': return '系统审计日志';
      case 'archived': return '归档中心';
      case 'issues': return '问题处理中心';
      case 'issue_details': return '工单处理详情';
      case 'risk': return 'AI 风控中心';
      case 'orders': return '财务与结算';
      case 'order_details': return '账单详情';
      case 'billing_creator': return '创建结算回款单';
      case 'statement_export': return '财务对账数据导出';
      case 'analytics': return '数据看板';
      case 'settings': return '系统设置';
      default: return '金律文典';
    }
  };

  return (
    <AdminLayout 
      currentRole={role} 
      onLogout={handleLogout}
      activeId={activeTab}
      onNavigate={setActiveTab}
      title={getPageTitle()}
    >
      <div className="flex-1">
        {activeTab === 'dashboard' && <Dashboard role={role} onNavigate={setActiveTab} />}
        {(activeTab === 'platform_templates' || activeTab === 'firm_templates') && (
          <TemplateLibrary 
            onEdit={(tmpl) => {
              setSelectedTemplate(tmpl);
              setActiveTab('template_editor');
            }} 
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === 'template_editor' && (
          <TemplateEditor 
            template={selectedTemplate}
            onBack={() => setActiveTab(role === UserRole.PLATFORM_ADMIN ? 'platform_templates' : 'firm_templates')} 
          />
        )}
        {activeTab === 'todos' && <TodoItems onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'firm_cases' && <CaseManagement onNavigate={setActiveTab} initialSearchTerm={selectedClientSearch} />}
        {activeTab === 'case_editor' && (
          <CaseEditor onBack={() => setActiveTab('firm_cases')} />
        )}
        {activeTab === 'case_editor_edit' && (
          <CaseEditor onBack={() => setActiveTab('case_details')} caseId="mock-case-id" />
        )}
        {activeTab === 'case_details' && (
          <CaseDetails onBack={() => setActiveTab('firm_cases')} onNavigate={setActiveTab} />
        )}
        {activeTab === 'firm_clients' && <ClientManagement onNavigate={setActiveTab} onViewClientCases={(clientName) => {
          setSelectedClientSearch(clientName);
          setActiveTab('firm_cases');
        }} />}
        {activeTab === 'client_editor' && (
          <ClientEditor onBack={() => setActiveTab('firm_clients')} />
        )}
        {activeTab === 'firm_contracts' && <ContractTemplates onNavigate={setActiveTab} onSelectTemplate={setSelectedGeneratorTemplate} />}
        {activeTab === 'document_generator' && (
          <DocumentGenerator 
            onBack={() => setActiveTab('firm_contracts')} 
            templateName={selectedGeneratorTemplate || undefined} 
          />
        )}
        {activeTab === 'template_upload' && (
          <TemplateUpload onBack={() => setActiveTab('firm_contracts')} />
        )}
        {activeTab === 'category_management' && (
          <CategoryManagement onBack={() => setActiveTab('firm_contracts')} />
        )}
        {activeTab === 'firm_tasks' && (
          <TaskManagement 
            onNavigate={setActiveTab} 
            tasks={tasks} 
            onToggleTask={(id, completed) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status: completed ? 'completed' : 'todo' } : t))}
          />
        )}
        {activeTab === 'task_editor' && (
          <TaskEditor 
            onBack={() => {
              setActiveTab('firm_tasks');
              setSelectedDate(null);
            }} 
            onSave={handleAddTask}
            initialDate={selectedDate || undefined}
          />
        )}
        {activeTab === 'task_details' && (
          <TaskDetails onBack={() => setActiveTab('firm_tasks')} onNavigate={setActiveTab} />
        )}
        {activeTab === 'task_calendar' && (
          <TaskCalendar 
            onBack={() => setActiveTab('firm_tasks')} 
            onAddTask={handleAddTaskTab} 
            tasks={tasks}
          />
        )}
        {activeTab === 'firm_members' && (
          <MemberManagement 
            onNavigate={setActiveTab} 
            members={members} 
            onSelectMember={handleSelectMember}
          />
        )}
        {activeTab === 'member_details' && (
          <MemberDetails 
            onBack={() => {
              setActiveTab('firm_members');
              setSelectedMemberId(null);
            }} 
            onEdit={() => setActiveTab('member_editor')}
            onPermissions={() => setActiveTab('member_permissions')}
            member={selectedMember}
          />
        )}
        {activeTab === 'member_editor' && (
          <MemberEditor 
            onBack={() => setActiveTab(selectedMemberId ? 'member_details' : 'firm_members')} 
            member={selectedMember}
            onSave={handleUpdateMember}
          />
        )}
        {activeTab === 'member_permissions' && (
          <MemberPermissions 
            onBack={() => setActiveTab('member_details')} 
            member={selectedMember}
          />
        )}
        {activeTab === 'permission_management' && (
          <PermissionManagement onBack={() => setActiveTab('firm_members')} />
        )}
        {activeTab === 'firm_compliance' && (
          <CompliancePrecheck 
            onNavigate={setActiveTab} 
            onSelectReport={(id) => {
              setSelectedReportId(id);
              setActiveTab('compliance_details');
            }}
          />
        )}
        {activeTab === 'compliance_uploader' && (
          <ComplianceUploader 
            onBack={() => setActiveTab('firm_compliance')} 
            onViewDetails={(id) => {
              setSelectedReportId(id);
              setActiveTab('compliance_details');
            }}
          />
        )}
        {activeTab === 'compliance_history' && (
          <ComplianceHistory 
            onBack={() => setActiveTab('firm_compliance')} 
            onViewDetails={(id) => {
              setSelectedReportId(id);
              setActiveTab('compliance_details');
            }}
          />
        )}
        {activeTab === 'compliance_details' && (
          <ComplianceDetails 
            onBack={() => setActiveTab('compliance_history')} 
            reportId={selectedReportId}
          />
        )}
        {activeTab === 'firm_knowledge' && (
          <KnowledgeBase 
            onAdd={() => {
              setSelectedKnowledge(null);
              setActiveTab('knowledge_editor');
            }} 
            onEdit={(item) => {
              setSelectedKnowledge(item);
              setActiveTab('knowledge_editor');
            }}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === 'knowledge_editor' && (
          <KnowledgeEditor 
            initialData={selectedKnowledge}
            onBack={() => setActiveTab('firm_knowledge')} 
          />
        )}
        {activeTab === 'knowledge_discovery' && (
          <KnowledgeDiscovery 
            onBack={() => setActiveTab('firm_knowledge')} 
            onViewKnowledge={(id) => setActiveTab('knowledge_editor')}
          />
        )}
        {activeTab === 'issues' && (
          <IssueCenter 
            tickets={tickets} 
            onSelectTicket={handleSelectTicket} 
          />
        )}
        {activeTab === 'issue_details' && (
          <IssueDetails 
            ticket={selectedTicket} 
            members={members}
            onBack={() => {
              setActiveTab('issues');
              setSelectedTicketId(null);
            }}
            onResolve={handleResolveTicket}
            onDispatch={(ticketId, userId) => {
              setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'processing', assigneeId: userId } : t));
            }}
          />
        )}
        {activeTab === 'orders' && (
          <FinanceBilling 
            onNavigate={(tab, param) => {
              setActiveTab(tab);
              if (param) setSelectedTransactionId(param);
            }} 
          />
        )}
        {activeTab === 'order_details' && (
          <OrderDetails orderId={selectedTransactionId} onBack={() => setActiveTab('orders')} />
        )}
        {activeTab === 'billing_creator' && (
          <BillingCreator onBack={() => setActiveTab('orders')} />
        )}
        {activeTab === 'statement_export' && (
          <StatementExport onBack={() => setActiveTab('orders')} />
        )}
        {activeTab === 'analytics' && <Analytics onNavigate={setActiveTab} />}
        {activeTab === 'archived' && <ArchiveCenter />}
        {activeTab === 'settings' && <Settings onNavigate={setActiveTab} />}
        {activeTab === 'firms' && <FirmManagement />}
        {activeTab === 'users' && <UserManagement onNavigate={setActiveTab} />}
        {activeTab === 'billing_plans' && <BillingPlans />}
        {activeTab === 'system_logs' && <SystemLogs />}
        {activeTab === 'risk' && <RiskEngine />}

        {![
          'dashboard', 'users', 'firms', 'platform_templates', 'firm_templates', 'template_editor',
          'firm_knowledge', 'knowledge_editor', 'knowledge_discovery', 'firm_cases', 'case_editor', 'case_details', 'case_editor_edit',
          'firm_clients', 'client_editor', 'firm_contracts', 'template_upload', 'category_management',
          'firm_tasks', 'task_editor', 'task_calendar', 'firm_members', 'member_details', 'member_editor',
          'member_permissions', 'permission_management', 'firm_compliance', 'compliance_uploader',
          'compliance_history', 'compliance_details', 'issues', 'issue_details', 'orders', 'order_details', 'billing_creator',
          'statement_export', 'analytics', 'archived', 'settings', 'billing_plans', 'system_logs', 'risk', 'todos'
        ].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center py-24 text-text-light card bg-white shadow-premium">
            <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
              <span className="text-3xl animate-pulse">⏳</span>
            </div>
            <h3 className="font-serif font-black text-2xl text-brand-deep tracking-tight">{getPageTitle()} 正在筹备中</h3>
            <p className="text-sm font-medium mt-2 text-slate-400">我们将很快为您上线 {getPageTitle()} 的深度业务逻辑</p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="mt-8 px-6 py-2.5 bg-brand-deep text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:shadow-lg transition-all"
            >
              返回中央控制台
            </button>
          </div>
        )}
      </div>

    </AdminLayout>
  );
}
