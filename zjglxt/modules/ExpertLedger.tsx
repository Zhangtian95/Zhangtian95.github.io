
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, LogIn, LogOut, Import, Download, MoreHorizontal, X, User } from 'lucide-react';
import { ExpertData } from '../types';
import { STOCK_TYPES } from '../constants';
import ExpertDetail from '../components/ExpertDetail';

const ExpertLedger: React.FC = () => {
  const [experts, setExperts] = useState<ExpertData[]>([]);

  const [selectedExpert, setSelectedExpert] = useState<ExpertData | null>(null);
  const [showInStockModal, setShowInStockModal] = useState<ExpertData | null>(null);
  const [tempStocks, setTempStocks] = useState<string[]>([]);

  const toggleStock = (stock: string) => {
    setTempStocks(prev => 
      prev.includes(stock) ? prev.filter(s => s !== stock) : [...prev, stock]
    );
  };

  const handleStockAction = (type: 'in' | 'out') => {
    if (!showInStockModal) return;
    const updated = experts.map(e => {
      if (e.id === showInStockModal.id) {
        return {
          ...e,
          inStocks: type === 'in' 
            ? Array.from(new Set([...(e.inStocks || []), ...tempStocks]))
            : (e.inStocks || []).filter(s => !tempStocks.includes(s))
        };
      }
      return e;
    });
    setExperts(updated);
    setShowInStockModal(null);
    setTempStocks([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#000000e6]">专家台账</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm hover:bg-gray-50 transition-all">
            <Import size={16} /> 导入
          </button>
          <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm hover:bg-gray-50 transition-all">
            <Download size={16} /> 导出
          </button>
          <button className="flex items-center gap-1 px-4 py-2 bg-[#0052d9] text-white rounded-md text-sm hover:bg-[#1469e3] transition-all">
            <Plus size={16} /> 新增专家
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#e7e7e7] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">姓名</th>
              <th className="px-6 py-4">工作单位</th>
              <th className="px-6 py-4">所属库</th>
              <th className="px-6 py-4">专业类别</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7e7e7]">
            {experts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">暂无专家台账数据</td>
              </tr>
            ) : (
              experts.map(expert => (
                <tr key={expert.id} className="hover:bg-[#f3f4f7] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={expert.avatar} className="w-10 h-10 rounded-full border border-gray-200" alt="" />
                      <div>
                        <div className="font-bold text-gray-900">{expert.name}</div>
                        <div className="text-xs text-gray-400">{expert.expertLevel}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{expert.employer}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {expert.inStocks && expert.inStocks.length > 0 ? expert.inStocks.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-blue-50 text-[#0052d9] rounded text-[10px] font-medium border border-blue-100">{s}</span>
                      )) : <span className="text-gray-400 text-xs">未入库</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{expert.professionalCategory?.slice(0, 2).join(', ') || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3 text-gray-400">
                      <button onClick={() => setSelectedExpert(expert)} title="画像查看"><User size={18} className="hover:text-blue-600"/></button>
                      <button onClick={() => {setShowInStockModal(expert); setTempStocks([]);}} title="入库操作"><LogIn size={18} className="hover:text-green-600"/></button>
                      <button onClick={() => {setShowInStockModal(expert); setTempStocks([]);}} title="出库操作"><LogOut size={18} className="hover:text-orange-600"/></button>
                      <button className="hover:text-red-500"><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Profile Portrait Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold">专家全息画像</h3>
              <button onClick={() => setSelectedExpert(null)}><X /></button>
            </div>
            <div className="p-8 overflow-y-auto">
              <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-100">
                <img src={selectedExpert.avatar} className="w-32 h-32 rounded-lg border shadow-sm" alt="" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedExpert.name}</h2>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{selectedExpert.expertLevel}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">活跃在库</span>
                  </div>
                  <p className="text-gray-500 text-sm">单位：{selectedExpert.employer}</p>
                </div>
                <div className="ml-auto flex gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg min-w-[80px]">
                    <div className="text-2xl font-bold text-blue-600">{selectedExpert.graduationYears || 0}</div>
                    <div className="text-xs text-gray-400">毕业年限</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg min-w-[80px]">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-xs text-gray-400">评审次数</div>
                  </div>
                </div>
              </div>
              <ExpertDetail data={selectedExpert} />
            </div>
          </div>
        </div>
      )}

      {/* In/Out Stock Modal */}
      {showInStockModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-[400px] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 font-bold">
              选择库房
              <button onClick={() => setShowInStockModal(null)}><X size={18}/></button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500 mb-2">请选择要操作的专家库 (可多选):</p>
              <div className="space-y-2">
                {STOCK_TYPES.map(type => (
                  <label key={type} className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded text-blue-600"
                      checked={tempStocks.includes(type)}
                      onChange={() => toggleStock(type)}
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t flex gap-3">
              <button onClick={() => setShowInStockModal(null)} className="flex-1 py-2 border rounded-md">取消</button>
              <button onClick={() => handleStockAction('in')} className="flex-1 py-2 bg-[#0052d9] text-white rounded-md">确认操作</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertLedger;
