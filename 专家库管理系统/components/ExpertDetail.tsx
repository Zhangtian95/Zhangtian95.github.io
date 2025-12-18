
import React from 'react';
import { ExpertData } from '../types';
import { FileText, UserCircle } from 'lucide-react';

interface Props {
  data: Partial<ExpertData>;
}

const ExpertDetail: React.FC<Props> = ({ data }) => {
  const sections = [
    {
      title: '基本信息',
      fields: [
        { label: '姓名', value: data.name },
        { label: '性别', value: data.gender },
        { label: '身份证号', value: data.idCard },
        { label: '出生日期', value: data.birthday },
        { label: '政治面貌', value: data.politicalStatus },
        { label: '通讯地址', value: data.address },
        { label: '电话', value: data.phone },
        { label: '邮箱', value: data.email },
      ]
    },
    {
      title: '学历职称',
      fields: [
        { label: '学历', value: data.education },
        { label: '毕业院校', value: data.university },
        { label: '毕业年限', value: data.graduationYears },
        { label: '职业资格', value: data.professionalQualifications?.join(', ') },
        { label: '职称', value: data.title },
        { label: '职称专业', value: data.titleProfession },
      ]
    },
    {
      title: '工作情况',
      fields: [
        { label: '工作单位', value: data.employer },
        { label: '职务', value: data.position },
        { label: '在职情况', value: data.employmentStatus },
      ]
    },
    {
      title: '申报信息',
      fields: [
        { label: '申请专家库', value: data.targetPool },
        { label: '业务领域', value: data.businessDomain?.join(', ') },
        { label: '专家等级', value: data.expertLevel },
        { label: '专业类别', value: data.professionalCategory?.join(', ') },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-28 h-28 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 shadow-sm">
            {data.avatar ? (
              <img src={data.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <UserCircle size={64} className="text-gray-300" />
            )}
          </div>
          <span className="text-xs text-gray-400">证件照</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-12 flex-1">
           {sections.map(section => (
             <React.Fragment key={section.title}>
               <div className="col-span-full border-b pb-1 mb-2 mt-4 first:mt-0">
                 <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider">{section.title}</h4>
               </div>
               {section.fields.map(field => (
                 <div key={field.label}>
                   <p className="text-xs text-gray-500 mb-1">{field.label}</p>
                   <p className="text-sm text-gray-900 font-medium">{field.value || '-'}</p>
                 </div>
               ))}
             </React.Fragment>
           ))}
        </div>
      </div>
      
      {data.returnedFormUrl && (
        <div className="mt-6 border p-4 rounded-md bg-gray-50 flex items-center justify-between border-dashed">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-500" />
            <div>
              <p className="text-sm font-medium">专家申报信息表_已签字回传.pdf</p>
              <p className="text-xs text-gray-400">附件大小：1.2MB | 提交日期：2023-11-01</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="text-blue-600 text-sm hover:underline">预览</button>
            <button className="text-blue-600 text-sm hover:underline">下载</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertDetail;
