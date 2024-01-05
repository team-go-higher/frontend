import { processType } from 'types/interfaces/KanbanProcess';

type IProcessTypeInfo = Record<processType, { detailed: null | string[]; korean: string }>;

export const processTypeInfo: IProcessTypeInfo = {
  TO_APPLY: { detailed: null, korean: '지원예정' },
  DOCUMENT: { detailed: null, korean: '서류전형' },
  TEST: { detailed: ['코딩 테스트', '역량 검사', '사전 과제'], korean: '과제 및 테스트' },
  INTERVIEW: { detailed: ['1차 면접', '2차 면접'], korean: '면접전형' },
  COMPLETE: { detailed: ['합격', '불합격'], korean: '완료' },
};

export const processTypeList: processType[] = Object.keys(processTypeInfo) as processType[];
export const processTypeListToKorean = Object.values(processTypeInfo).map(info => info.korean);
