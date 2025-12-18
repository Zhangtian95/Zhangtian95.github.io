
export type Gender = '男' | '女';
export type PoliticalStatus = '中共党员' | '民主党派' | '共青团员' | '群众';
export type Education = '博士' | '硕士' | '本科' | '大专';
export type ExpertLevel = '资深' | '普通';
export type AuditStatus = '待审核' | '审核通过' | '审核驳回';

export interface ExpertData {
  id: string;
  name: string;
  avatar: string;
  gender: Gender;
  idCard: string;
  birthday: string;
  politicalStatus: PoliticalStatus;
  education: Education;
  university: string;
  professionalQualifications: string[]; // 一级注册消防工程师, 注册咨询工程师 etc.
  position: string; // 职务
  title: string; // 职称: 高级工程师, 正高级工程师
  titleProfession: string; // 职称专业
  employer: string;
  employmentStatus: string; // 在职情况
  address: string;
  graduationYears: number;
  phone: string;
  email: string;
  
  // 申报信息
  targetPool: string; // 申请专家库
  businessDomain: string[]; // 轨道交通工程类, 市政公用工程类
  expertLevel: ExpertLevel;
  professionalCategory: string[]; // 智慧工地类, 深基坑工程类, 机电类
  
  auditStatus: AuditStatus;
  submitTime: string;
  auditOpinion?: string;
  auditor?: string;
  auditTime?: string;
  returnedFormUrl?: string; // 回传的报名表
  inStocks: string[]; // 入库标签
}

export type Role = 'expert' | 'manager';
