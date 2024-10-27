import { ProcessType } from 'types/interfaces/Common';

export const formatProcessToKor = (process: string) => {
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
      return '최종발표';
    default:
      return '';
  }
};

export const fomatProcessTypeToEng = (process: string): ProcessType => {
  switch (process) {
    case '지원예정':
      return 'TO_APPLY';
    case '서류전형':
      return 'DOCUMENT';
    case '과제 및 테스트':
      return 'TEST';
    case '면접전형':
      return 'INTERVIEW';
    case '최종발표':
      return 'COMPLETE';
    default:
      return 'TO_APPLY';
  }
};
