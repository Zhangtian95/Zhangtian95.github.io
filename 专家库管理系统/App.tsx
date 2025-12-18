
import React, { useState } from 'react';
import Layout from './components/Layout';
import ExpertDeclaration from './modules/ExpertDeclaration';
import MultiLevelAudit from './modules/MultiLevelAudit';
import AuditRecords from './modules/AuditRecords';
import ExpertLedger from './modules/ExpertLedger';
import { Role } from './types';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('expert');
  const [activeModule, setActiveModule] = useState('declaration');

  // Logic to handle module switch when role changes
  React.useEffect(() => {
    if (role === 'expert') {
      if (!['declaration', 'records'].includes(activeModule)) {
        setActiveModule('declaration');
      }
    } else {
      if (!['audit', 'records', 'ledger'].includes(activeModule)) {
        setActiveModule('audit');
      }
    }
  }, [role, activeModule]);

  const renderModule = () => {
    switch (activeModule) {
      case 'declaration':
        return <ExpertDeclaration />;
      case 'audit':
        return <MultiLevelAudit />;
      case 'records':
        return <AuditRecords role={role} />;
      case 'ledger':
        return <ExpertLedger />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
             <p className="text-lg">模块建设中...</p>
          </div>
        );
    }
  };

  return (
    <Layout 
      role={role} 
      setRole={setRole}
      activeModule={activeModule} 
      onModuleChange={setActiveModule}
    >
      {renderModule()}
    </Layout>
  );
};

export default App;
