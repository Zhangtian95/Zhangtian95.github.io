
import React, { useState, useRef } from 'react';
import { Plus, Edit, Eye, Download, Upload, AlertCircle, CheckCircle2, X, Camera, FileCheck, FileText, CloudUpload } from 'lucide-react';
import { ExpertData, Gender, PoliticalStatus, Education, ExpertLevel } from '../types';
import { 
  BUSINESS_DOMAINS, 
  PROFESSIONAL_CATEGORIES, 
  TARGET_POOLS, 
  TITLES, 
  POLITICAL_STATUS_OPTIONS, 
  EDUCATION_OPTIONS, 
  EMPLOYMENT_STATUS_OPTIONS, 
  PROFESSIONAL_QUALIFICATION_OPTIONS 
} from '../constants';

const ExpertDeclaration: React.FC = () => {
  // 初始列表清空
  const [list, setList] = useState<ExpertData[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // 严格初始化所有字段为空或 undefined
  const emptyFormData: Partial<ExpertData> = {
    name: '',
    avatar: '',
    gender: undefined,
    idCard: '',
    birthday: '',
    politicalStatus: undefined,
    education: undefined,
    university: '',
    professionalQualifications: [],
    position: '',
    title: '',
    titleProfession: '',
    employer: '',
    employmentStatus: '',
    address: '',
    graduationYears: undefined,
    phone: '',
    email: '',
    targetPool: '',
    businessDomain: [],
    expertLevel: undefined,
    professionalCategory: [],
    auditStatus: '待审核',
    inStocks: [],
    returnedFormUrl: ''
  };

  const [formData, setFormData] = useState<Partial<ExpertData>>(emptyFormData);
  const [viewOnly, setViewOnly] = useState(false);
  
  const [uploadTargetId, setUploadTargetId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = (expert?: ExpertData, view = false) => {
    // 确保新增时使用纯净的空对象
    setFormData(expert || { ...emptyFormData });
    setViewOnly(view);
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const required = ['name', 'idCard', 'birthday', 'phone', 'email', 'employer', 'education', 'targetPool', 'gender', 'expertLevel'];
    const missing = required.filter(field => !((formData as any)[field]));
    return missing.length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
       alert('请完善必填信息（带*项）');
       return;
    }
    if (!formData.id) {
      const newExpert: ExpertData = {
        ...formData as ExpertData,
        id: Date.now().toString(),
        submitTime: new Date().toLocaleString(),
        auditStatus: '待审核',
        inStocks: [],
        // 只有在保存时如果没有头像才给一个占位图，或者保持为空
        avatar: formData.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name || 'EX'}`
      };
      setList([newExpert, ...list]);
    } else {
      setList(list.map(item => item.id === formData.id ? { ...item, ...formData } as ExpertData : item));
    }
    setIsModalOpen(false);
    alert('保存成功！');
  };

  const toggleArrayItem = (field: keyof ExpertData, value: string) => {
    const current = (formData[field] as string[]) || [];
    const updated = current.includes(value) 
      ? current.filter(item => item !== value) 
      : [...current, value];
    setFormData({ ...formData, [field]: updated });
  };

  const openUploadModal = (id: string) => {
    setUploadTargetId(id);
    setSelectedFile(null);
    setIsUploadModalOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadSave = () => {
    if (!selectedFile || !uploadTargetId) {
      alert('请先选择需要回传的文件');
      return;
    }
    setList(prev => prev.map(item => 
      item.id === uploadTargetId 
        ? { ...item, returnedFormUrl: URL.createObjectURL(selectedFile) } 
        : item
    ));
    alert('申请表回传保存成功！');
    setIsUploadModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[rgba(0,0,0,0.9)]">专家申报</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#0052d9] text-white px-5 py-2.5 rounded flex items-center gap-2 hover:bg-[#1469e3] transition-colors shadow-sm font-medium"
        >
          <Plus size={18} />
          新增申报
        </button>
      </div>

      <div className="bg-white rounded border border-[#e7e7e7] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f3f3f3] border-b border-[#e7e7e7]">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-[rgba(0,0,0,0.6)] uppercase tracking-wider">申报人</th>
              <th className="px-6 py-4 text-xs font-semibold text-[rgba(0,0,0,0.6)] uppercase tracking-wider">申请库房</th>
              <th className="px-6 py-4 text-xs font-semibold text-[rgba(0,0,0,0.6)] uppercase tracking-wider">业务领域</th>
              <th className="px-6 py-4 text-xs font-semibold text-[rgba(0,0,0,0.6)] uppercase tracking-wider text-center">等级</th>
              <th className="px-6 py-4 text-xs font-semibold text-[rgba(0,0,0,0.6)] uppercase tracking-wider text-center">状态</th>
              <th className="px-6 py-4 text-xs font-semibold text-[rgba(0,0,0,0.6)] uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7e7e7]">
            {list.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                  暂无申报记录，请点击上方按钮新增申报。
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.avatar} className="w-9 h-9 rounded-full border border-gray-100 shadow-sm object-cover" alt="" />
                      <div>
                        <span className="font-bold text-[rgba(0,0,0,0.9)] block text-sm">{item.name}</span>
                        <span className="text-[11px] text-[rgba(0,0,0,0.4)] font-medium">{item.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[rgba(0,0,0,0.9)]">{item.targetPool}</td>
                  <td className="px-6 py-4 text-sm text-[rgba(0,0,0,0.6)]">{item.businessDomain?.join(', ') || '-'}</td>
                  <td className="px-6 py-4 text-center">
                     <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${item.expertLevel === '资深' ? 'bg-[#f2f3ff] text-[#0052d9]' : 'bg-gray-100 text-gray-600'}`}>
                       {item.expertLevel || '未设定'}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded ${
                        item.auditStatus === '待审核' ? 'bg-[#fff1e9] text-[#e37318]' : 
                        item.auditStatus === '审核通过' ? 'bg-[#e3f9e9] text-[#2ba471]' : 'bg-[#fff0f0] text-[#d54941]'
                      }`}>
                        {item.auditStatus === '待审核' ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
                        {item.auditStatus}
                      </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 text-[#00000066]">
                      <button onClick={() => handleOpenModal(item, true)} className="hover:text-[#0052d9] transition-colors" title="查看"><Eye size={18} /></button>
                      <button onClick={() => handleOpenModal(item)} className="hover:text-[#0052d9] transition-colors" title="修改"><Edit size={18} /></button>
                      <button 
                        onClick={() => openUploadModal(item.id)} 
                        className={`transition-colors flex items-center gap-0.5 ${item.returnedFormUrl ? 'text-[#2ba471] hover:text-[#2ba471] font-bold' : 'hover:text-[#0052d9]'}`} 
                        title="回传"
                      >
                        {item.returnedFormUrl ? <FileCheck size={18} /> : <Upload size={18} />}
                        {item.returnedFormUrl && <span className="text-[10px]">已传</span>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 专家申报主弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center p-4 backdrop-blur-[2px]">
          <div className="bg-white rounded w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-[#e7e7e7] flex justify-between items-center bg-[#f3f3f3]">
              <div>
                <h3 className="text-lg font-bold text-[rgba(0,0,0,0.9)]">{viewOnly ? '申报详情' : formData.id ? '修改申报信息' : '新专家入库申报'}</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.9)] transition-colors"><X size={24} /></button>
            </div>
            
            {/* Body */}
            <div className="p-8 overflow-y-auto flex-1 space-y-10">
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-5 bg-[#0052d9] rounded-full"></div>
                  <h4 className="font-bold text-[rgba(0,0,0,0.9)] text-base">基本信息</h4>
                </div>
                
                <div className="flex gap-10">
                   {/* 头像上传 */}
                   <div className="flex flex-col items-center gap-3">
                     <div className="w-32 h-40 bg-[#f3f3f3] rounded border border-[#e7e7e7] flex flex-col items-center justify-center text-[rgba(0,0,0,0.4)] hover:border-[#0052d9] hover:bg-[#ecf2fe] transition-all cursor-pointer relative group overflow-hidden">
                        {formData.avatar ? (
                          <img src={formData.avatar} className="w-full h-full object-cover" alt="avatar" />
                        ) : (
                          <>
                            <Camera size={32} className="mb-2" />
                            <span className="text-[11px]">上传证件照</span>
                          </>
                        )}
                        {!viewOnly && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">更换照片</div>
                        )}
                     </div>
                   </div>

                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8">
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">姓名 <span className="text-[#d54941]">*</span></label>
                        <input disabled={viewOnly} type="text" className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm focus:border-[#0052d9] outline-none disabled:bg-[#f3f3f3] transition-all" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="请输入姓名"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">性别 <span className="text-[#d54941]">*</span></label>
                        <select disabled={viewOnly} className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none focus:border-[#0052d9] disabled:bg-[#f3f3f3] cursor-pointer" value={formData.gender || ''} onChange={e => setFormData({...formData, gender: e.target.value as Gender})}>
                          <option value="">请选择</option>
                          <option value="男">男</option>
                          <option value="女">女</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">身份证号 <span className="text-[#d54941]">*</span></label>
                        <input disabled={viewOnly} type="text" className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm focus:border-[#0052d9] outline-none disabled:bg-[#f3f3f3]" value={formData.idCard || ''} onChange={e => setFormData({...formData, idCard: e.target.value})} placeholder="请输入18位身份证号"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">出生日期 <span className="text-[#d54941]">*</span></label>
                        <input disabled={viewOnly} type="date" className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none focus:border-[#0052d9] disabled:bg-[#f3f3f3]" value={formData.birthday || ''} onChange={e => setFormData({...formData, birthday: e.target.value})}/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">政治面貌</label>
                        <select disabled={viewOnly} className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.politicalStatus || ''} onChange={e => setFormData({...formData, politicalStatus: e.target.value as PoliticalStatus})}>
                          <option value="">请选择</option>
                          {POLITICAL_STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">学历 <span className="text-[#d54941]">*</span></label>
                        <select disabled={viewOnly} className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.education || ''} onChange={e => setFormData({...formData, education: e.target.value as Education})}>
                          <option value="">请选择</option>
                          {EDUCATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">最高学历毕业院校 <span className="text-[#d54941]">*</span></label>
                        <input disabled={viewOnly} type="text" className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.university || ''} onChange={e => setFormData({...formData, university: e.target.value})} placeholder="请输入毕业院校全称"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">毕业年限 <span className="text-[#d54941]">*</span></label>
                        <input disabled={viewOnly} type="number" className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.graduationYears || ''} onChange={e => setFormData({...formData, graduationYears: parseInt(e.target.value)})} placeholder="请输入年数"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">职务</label>
                        <input disabled={viewOnly} type="text" className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.position || ''} onChange={e => setFormData({...formData, position: e.target.value})} placeholder="请输入现任职务"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">职称</label>
                        <select disabled={viewOnly} className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})}>
                          <option value="">请选择</option>
                          {TITLES.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">职称专业</label>
                        <input disabled={viewOnly} type="text" className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.titleProfession || ''} onChange={e => setFormData({...formData, titleProfession: e.target.value})} placeholder="请输入专业名称"/>
                      </div>
                      <div className="space-y-1 col-span-1 lg:col-span-2">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">职业资格</label>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {PROFESSIONAL_QUALIFICATION_OPTIONS.map(q => (
                            <label key={q} className={`flex items-center gap-1.5 text-[11px] font-bold px-2 py-1 rounded border transition-all cursor-pointer ${formData.professionalQualifications?.includes(q) ? 'bg-[#0052d9] text-white border-[#0052d9]' : 'bg-gray-50 text-[rgba(0,0,0,0.6)] border-[#e7e7e7] hover:bg-white'}`}>
                               <input disabled={viewOnly} type="checkbox" checked={formData.professionalQualifications?.includes(q)} onChange={() => toggleArrayItem('professionalQualifications', q)} className="hidden"/> {q}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1 col-span-1 lg:col-span-2">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">工作单位 <span className="text-[#d54941]">*</span></label>
                        <input disabled={viewOnly} type="text" className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.employer || ''} onChange={e => setFormData({...formData, employer: e.target.value})} placeholder="请输入现供职单位全称"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">在职情况</label>
                        <select disabled={viewOnly} className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.employmentStatus || ''} onChange={e => setFormData({...formData, employmentStatus: e.target.value})}>
                          <option value="">请选择</option>
                          {EMPLOYMENT_STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1 col-span-1 md:col-span-2">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">通讯地址</label>
                        <input disabled={viewOnly} type="text" className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="请输入联系地址"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">电话 <span className="text-[#d54941]">*</span></label>
                        <input disabled={viewOnly} type="tel" className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="请输入手机号"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-[rgba(0,0,0,0.6)]">邮箱 <span className="text-[#d54941]">*</span></label>
                        <input disabled={viewOnly} type="email" className="w-full border border-[#e7e7e7] rounded px-3 py-2 text-sm outline-none disabled:bg-[#f3f3f3]" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="请输入电子邮箱"/>
                      </div>
                   </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-5 bg-[#0052d9] rounded-full"></div>
                  <h4 className="font-bold text-[rgba(0,0,0,0.9)] text-base">申报信息</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#f9f9f9] p-6 rounded border border-[#e7e7e7]">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[rgba(0,0,0,0.9)]">申请专家库 <span className="text-[#d54941]">*</span></label>
                    <select disabled={viewOnly} className="w-full border border-[#e7e7e7] rounded px-3 py-2.5 text-sm outline-none focus:border-[#0052d9] bg-white transition-all" value={formData.targetPool || ''} onChange={e => setFormData({...formData, targetPool: e.target.value})}>
                      <option value="">请选择目标专家库</option>
                      {TARGET_POOLS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[rgba(0,0,0,0.9)]">申报专家等级 <span className="text-[#d54941]">*</span></label>
                    <div className="flex gap-10 bg-white p-2.5 border border-[#e7e7e7] rounded">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input disabled={viewOnly} type="radio" className="w-4 h-4 accent-[#0052d9]" checked={formData.expertLevel === '资深'} onChange={() => setFormData({...formData, expertLevel: '资深'})}/> 
                        <span className="text-sm text-[rgba(0,0,0,0.9)]">资深专家</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input disabled={viewOnly} type="radio" className="w-4 h-4 accent-[#0052d9]" checked={formData.expertLevel === '普通'} onChange={() => setFormData({...formData, expertLevel: '普通'})}/> 
                        <span className="text-sm text-[rgba(0,0,0,0.9)]">普通专家</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-[rgba(0,0,0,0.9)]">申报业务领域</label>
                    <div className="flex flex-wrap gap-2">
                      {BUSINESS_DOMAINS.map(domain => (
                        <label key={domain} className={`flex items-center gap-2 px-3 py-2 rounded border transition-all cursor-pointer ${formData.businessDomain?.includes(domain) ? 'bg-[#0052d9] text-white border-[#0052d9]' : 'bg-white text-[rgba(0,0,0,0.6)] border-[#e7e7e7] hover:border-[#0052d9]'}`}>
                          <input disabled={viewOnly} type="checkbox" className="hidden" checked={formData.businessDomain?.includes(domain)} onChange={() => toggleArrayItem('businessDomain', domain)}/>
                          <CheckCircle2 size={16} className={formData.businessDomain?.includes(domain) ? 'opacity-100' : 'opacity-20'} />
                          <span className="text-xs font-bold">{domain}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-[rgba(0,0,0,0.9)]">申报专业类别</label>
                    <div className="flex flex-wrap gap-2">
                      {PROFESSIONAL_CATEGORIES.map(cat => (
                        <button key={cat} disabled={viewOnly} type="button" onClick={() => toggleArrayItem('professionalCategory', cat)} className={`px-4 py-1.5 rounded border text-[11px] font-bold transition-all ${formData.professionalCategory?.includes(cat) ? 'bg-[#0052d9] text-white border-[#0052d9]' : 'bg-white text-[rgba(0,0,0,0.6)] border-[#e7e7e7] hover:bg-[#ecf2fe] hover:text-[#0052d9]'}`}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="p-5 border-t border-[#e7e7e7] flex justify-end gap-3 bg-[#f3f3f3]">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-[#e7e7e7] bg-white text-[rgba(0,0,0,0.6)] rounded font-bold hover:bg-gray-50 transition-all">取消</button>
              {!viewOnly && (
                <button type="button" onClick={handleSave} className="px-10 py-2 bg-[#0052d9] text-white rounded hover:bg-[#1469e3] font-bold shadow-sm transition-all">
                  保存
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 申报表回传专用弹窗 */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60] flex items-center justify-center p-4 backdrop-blur-[2px]">
          <div className="bg-white rounded w-full max-w-md overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-[#e7e7e7] flex justify-between items-center bg-[#f3f3f3]">
              <h3 className="text-lg font-bold text-[rgba(0,0,0,0.9)]">申请表回传</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.9)]"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-[rgba(0,0,0,0.9)] block">申请表回传 <span className="text-[#d54941] font-bold">*</span></label>
                <div 
                  onClick={() => uploadInputRef.current?.click()}
                  className={`border-2 border-dashed rounded p-10 flex flex-col items-center justify-center transition-all cursor-pointer group ${selectedFile ? 'border-[#2ba471] bg-[#e3f9e9]/30' : 'border-[#e7e7e7] bg-gray-50 hover:border-[#0052d9] hover:bg-[#ecf2fe]/30'}`}
                >
                  <input 
                    type="file" 
                    ref={uploadInputRef} 
                    className="hidden" 
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  
                  {selectedFile ? (
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-[#e3f9e9] text-[#2ba471] rounded-full flex items-center justify-center mb-3">
                        <FileText size={32} />
                      </div>
                      <p className="text-sm font-bold text-[rgba(0,0,0,0.9)] line-clamp-1 px-4">{selectedFile.name}</p>
                      <p className="text-xs text-[rgba(0,0,0,0.4)] mt-1">文件准备就绪</p>
                      <span className="text-[10px] text-[#0052d9] mt-3 font-bold">点击更换文件</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-[#ecf2fe] text-[#0052d9] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <CloudUpload size={28} />
                      </div>
                      <p className="text-sm font-bold text-[rgba(0,0,0,0.9)]">点击或拖拽上传扫描件</p>
                      <p className="text-[10px] text-[rgba(0,0,0,0.4)] mt-2">支持 PDF/DOC/JPG/PNG</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-[#e7e7e7] flex gap-3 bg-[#f3f3f3]">
              <button 
                type="button"
                onClick={() => setIsUploadModalOpen(false)} 
                className="flex-1 py-2.5 border border-[#e7e7e7] bg-white text-[rgba(0,0,0,0.6)] rounded font-bold hover:bg-gray-50 transition-all"
              >
                取消
              </button>
              <button 
                type="button"
                onClick={handleUploadSave}
                disabled={!selectedFile}
                className={`flex-1 py-2.5 rounded font-bold transition-all ${selectedFile ? 'bg-[#0052d9] text-white hover:bg-[#1469e3] shadow-sm' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertDeclaration;
