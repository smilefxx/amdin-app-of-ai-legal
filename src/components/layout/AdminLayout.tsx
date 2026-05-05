/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { UserRole } from '../../types';

interface AdminLayoutProps {
  children: ReactNode;
  currentRole: UserRole;
  onLogout: () => void;
  activeId: string;
  onNavigate: (id: string) => void;
  title: string;
}

export default function AdminLayout({ 
  children, 
  currentRole, 
  onLogout,
  activeId, 
  onNavigate,
  title 
}: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-gray">
      <Sidebar 
        currentRole={currentRole} 
        activeId={activeId} 
        onNavigate={onNavigate}
        onLogout={onLogout}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          currentRole={currentRole} 
          title={title}
        />
        
        <main className="flex-1 p-8 max-w-[1440px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
