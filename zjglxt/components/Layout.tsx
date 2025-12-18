
import React from 'react';
import { User, ClipboardList, Database, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (module: string) => void;
  role: Role;
  setRole: (role: Role) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeModule, onModuleChange, role, setRole }) => {
  const menuItems = [
    { id: 'declaration', name: '专家申报', icon: User, roles: ['expert'] },
    { id: 'audit', name: '多级审核', icon: ShieldCheck, roles: ['manager'] },
    { id: 'records', name: '审核记录', icon: ClipboardList, roles: ['expert', 'manager'] },
    { id: 'ledger', name: '专家台账', icon: Database, roles: ['manager'] },
  ].filter(item => item.roles.includes(role));

  return (
    <div className="flex h-screen overflow-hidden bg-[#f3f4f7]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e7e7e7] flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0052d9] rounded flex items-center justify-center text-white font-bold">Z</div>
          <span className="text-lg font-bold text-[#000000e6]">专家库管理系统</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                activeModule === item.id 
                ? 'bg-[#ecf2fe] text-[#0052d9] font-medium' 
                : 'text-[#000000e6] hover:bg-gray-100'
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#e7e7e7]">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              {role === 'expert' ? '专' : '管'}
            </div>
            <div>
              <p className="text-sm font-medium">{role === 'expert' ? '申请专家001' : '系统管理员'}</p>
              <p className="text-xs text-gray-500">{role === 'expert' ? '专家端' : '主管端'}</p>
            </div>
          </div>
          <button 
            onClick={() => setRole(role === 'expert' ? 'manager' : 'expert')}
            className="w-full text-xs text-gray-400 hover:text-blue-600 mb-2 transition-colors flex items-center justify-center gap-1"
          >
            切换身份 (演示用)
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-md transition-all text-sm">
            <LogOut size={16} />
            退出登录
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-[#e7e7e7] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>首页</span>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">
              {menuItems.find(i => i.id === activeModule)?.name || '概览'}
            </span>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
