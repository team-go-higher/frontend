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
