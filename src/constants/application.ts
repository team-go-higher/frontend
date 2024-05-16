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
