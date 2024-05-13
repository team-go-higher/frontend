import { ProcessType } from 'types/interfaces/Application';
import { IApplication } from 'types/interfaces/KanbanProcess';

export const initialApplicationInfo: IApplication = {
  applicationId: 0,
  companyName: '',
  position: '',
  process: {
    id: 0,
    type: '',
    description: '',
    schedule: '',
  },
  specificPosition: null,
};

// TODO 필수인지 여부 이후 api 연동 시 수정 필요
export const InputContentArr = [
  { label: '회사명', name: 'companyName', isRequired: true },
  { label: '부서', name: 'team', isRequired: false },
  { label: '직군', name: 'position', isRequired: true },
  { label: '세부직무', name: 'specificPosition', isRequired: false },
  { label: '전형 단계', name: 'processes', isRequired: false },
  { label: '주요 업무', name: 'jobDescription', isRequired: true },
  { label: '필수 역량', name: 'requiredCapability', isRequired: false },
  { label: '공고 URL', name: 'url', isRequired: true },
  { label: '회사 위치', name: 'location', isRequired: false },
  { label: '우대 사항', name: 'preferredQualification', isRequired: false },
  { label: '채용 담당', name: 'contact', isRequired: false },
];

export const RadioContentArr = [
  {
    label: '고용 형태',
    name: 'employmentType',
    options: ['정규직', '계약직', '파견직', '인턴'],
    isRequired: true,
  },
  {
    label: '경력 조건',
    name: 'careerRequirement',
    options: ['신입', '경력', '무관'],
    isRequired: false,
  },
  {
    label: '근무 형태',
    name: 'workType',
    options: ['상주', '재택근무', '재택가능'],
    isRequired: false,
  },
];

export const ProcessArr: { type: ProcessType; description: string[] | null }[] = [
  {
    type: 'DOCUMENT',
    description: null,
  },
  {
    type: 'TEST',
    description: [
      '실기테스트',
      '사전과제',
      '코딩테스트',
      '인적성검사',
      '인성검사',
      '역량검사',
      '기타(직접입력)',
    ],
  },
  { type: 'INTERVIEW', description: ['1차면접', '2차면접', '3차면접', '인성면접', '직무면접'] },
  {
    type: 'COMPLETE',
    description: [
      '최종합격',
      '서류합격',
      '테스트 합격',
      '과제 합격',
      '검사 합격',
      '1차 면접합격',
      '2차 면접합격',
      '3차 면접합격',
    ],
  },
];
