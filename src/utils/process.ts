import { processType } from 'types/interfaces/KanbanProcess';

export const formatProcessToKorean = (process: string) => {
  switch (process) {
    case 'TO_APPLY':
      return '지원예정';
    case 'DOCUMENT':
      return '서류전형';
    case 'TEST':
      return '과제 및 테스트';
    case 'INTERVIEW':
      return '면접전형';
    case 'COMPLETE':
      return '완료';
  }
};

export const fomatProcessTypeToEnglish = (process: string): processType => {
  switch (process) {
    case '지원예정':
      return 'TO_APPLY';
    case '서류전형':
      return 'DOCUMENT';
    case '과제 및 테스트':
      return 'TEST';
    case '면접전형':
      return 'INTERVIEW';
    case '완료':
      return 'COMPLETE';
    default:
      return 'TO_APPLY';
  }
};
