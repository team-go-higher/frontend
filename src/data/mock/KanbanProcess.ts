import { IKanbanProcess } from 'types/interfaces/KanbanProcess';

export const KanbanProcessData: IKanbanProcess = {
  toApply: {
    korean: '지원 예정',
    data: [
      {
        id: 1,
        companyName: '카카오 커머스',
        job: 'UI 디자인',
        schedule: '8월 15일 23:59',
        currentProcess: 'toApply',
        detailProcess: '지원예정',
      },
      {
        id: 2,
        companyName: '토스 뱅크',
        job: 'UI 디자인',
        schedule: '8월 15일 23:59',
        currentProcess: 'toApply',
        detailProcess: '지원예정',
      },
      {
        id: 3,
        companyName: '네이버',
        job: 'UI 디자인',
        schedule: '8월 15일 23:59',
        currentProcess: 'toApply',
        detailProcess: '지원예정',
      },
    ],
  },
  resumeScreening: {
    korean: '서류 전형',
    data: [
      {
        id: 4,
        companyName: '현대 오토에버',
        job: 'UI 디자인',
        schedule: '8월 15일 23:59',
        currentProcess: 'resumeScreening',
        detailProcess: '서류 전형',
      },
    ],
  },
  test: {
    korean: '과제/테스트',
    data: [
      {
        id: 5,
        companyName: '국민은행',
        job: 'UI 디자인',
        schedule: '8월 15일 23:59',
        currentProcess: 'test',
        detailProcess: '과제/테스트',
      },
    ],
  },
  interview: {
    korean: '면접 전형',
    data: [
      {
        id: 6,
        companyName: '현대자동차',
        job: 'UI 디자인',
        schedule: '8월 15일 23:59',
        currentProcess: 'interview',
        detailProcess: '면접 전형',
      },
    ],
  },
  complete: {
    korean: '완료',
    data: [
      {
        id: 7,
        companyName: '카카오',
        job: 'UI 디자인',
        schedule: '8월 15일 23:59',
        currentProcess: 'complete',
        detailProcess: '완료',
      },
    ],
  },
};

/**
 * 전형단계명 : {
 * 한글이름 : string;
 * 회사이름 : string;
 * 직무 : string;
 * 일정 : date | string;
 * 상세일정 : string;
 * }
 */
