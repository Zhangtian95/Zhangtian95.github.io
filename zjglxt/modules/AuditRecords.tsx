
import React from 'react';
import { Eye, Search } from 'lucide-react';
import { Role } from '../types';

interface Props {
  role: Role;
}

const AuditRecords: React.FC<Props> = ({ role }) => {
  // Mock data representing a history of audits
  const records = [
    { id: '1', name: '张三', domain: '轨道交通工程类', time: '2023-10-21 09:30', auditor: '王主管', status: '审核通过', opinion: '资料齐全，符合专家要求' },
    { id: '2', name: '李四', domain: '房屋建筑工程类', time: '2023-10-18 11:20', auditor: '李主管', status: '审核驳回', opinion: '工作经验年限不满足5年要求' },
    { id: '3', name: '王五', domain: '机电工程类', time: '2023-10-15 16:45', auditor: '王主管', status: '审核通过', opinion: '准予入库' },
  ];

  const filteredRecords = role === 'expert' ? [records[0]] : records;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">审核记录</h2>
        {role === 'manager' && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索专家姓名..." 
              className="pl-10 pr-4 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 w-64"
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-xs text-gray-500 font-semibold uppercase">
            <tr>
              {role === 'manager' && <th className="px-6 py-4">申报人</th>}
              <th className="px-6 py-4">申报业务领域</th>
              <th className="px-6 py-4">审核结果</th>
              <th className="px-6 py-4">审核人员</th>
              <th className="px-6 py-4">审核时间</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredRecords.map(record => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                {role === 'manager' && <td className="px-6 py-4 font-medium">{record.name}</td>}
                <td className="px-6 py-4 text-sm text-gray-600">{record.domain}</td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${record.status === '审核通过' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.auditor}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{record.time}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 ml-auto">
                    <Eye size={16} /> 查看详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditRecords;
