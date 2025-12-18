
import React, { useState } from 'react';
import { Eye, ShieldCheck, X, Check, XCircle } from 'lucide-react';
import { ExpertData } from '../types';
import ExpertDetail from '../components/ExpertDetail';

const MultiLevelAudit: React.FC = () => {
  const [list, setList] = useState<ExpertData[]>([]);

  const [selectedExpert, setSelectedExpert] = useState<ExpertData | null>(null);
  const [auditMode, setAuditMode] = useState(false);
  const [opinion, setOpinion] = useState('');

  const handleAudit = (status: '审核通过' | '审核驳回') => {
    alert(`审核结果：${status}`);
    setSelectedExpert(null);
    setAuditMode(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">待审核专家</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-[#e7e7e7] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">申报人</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">毕业年限</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">工作单位</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">提交日期</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">暂无待审核记录</td>
              </tr>
            ) : (
              list.map(expert => (
                <tr key={expert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{expert.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{expert.graduationYears}年</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{expert.employer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{expert.submitTime}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => setSelectedExpert(expert)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 inline-flex text-sm">
                      <Eye size={16} /> 查看
                    </button>
                    <button onClick={() => {setSelectedExpert(expert); setAuditMode(true);}} className="text-green-600 hover:text-green-800 flex items-center gap-1 inline-flex text-sm font-medium">
                      <ShieldCheck size={16} /> 审核
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedExpert && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg">专家审核详情</h3>
              <button onClick={() => {setSelectedExpert(null); setAuditMode(false);}}><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-12">
              <section>
                <h4 className="text-blue-600 font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-600 rounded"></span>
                  专家填报信息
                </h4>
                <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                  <ExpertDetail data={selectedExpert} />
                </div>
              </section>

              {auditMode && (
                <section className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
                  <h4 className="text-blue-600 font-bold mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-blue-600 rounded"></span>
                    审核信息
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    <p>审核人员：主管管理员</p>
                    <p>审核时间：{new Date().toLocaleString()}</p>
                  </div>
                  <textarea 
                    className="w-full h-32 border rounded-md p-3 outline-none focus:ring-1 focus:ring-blue-500 mb-4"
                    placeholder="请输入审核意见..."
                    value={opinion}
                    onChange={e => setOpinion(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => handleAudit('审核驳回')}
                      className="flex items-center gap-2 px-6 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                    >
                      <XCircle size={18} />
                      审核驳回
                    </button>
                    <button 
                      onClick={() => handleAudit('审核通过')}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <Check size={18} />
                      审核通过
                    </button>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiLevelAudit;
