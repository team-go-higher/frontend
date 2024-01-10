export interface ICalendarData {
  applicationId: number;
  processId: number;
  name: string;
  processType: 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
  schedule: string;
}

export interface IDetailData {
  applicationId: number;
  companyName: string;
  process: {
    id: number;
    type: 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
    description: string;
    schedule: string;
  };
}
export interface IUnscheduledData {
  hasNext: boolean;
  content: IUnscheduledContent[];
}

export interface IUnscheduledContent {
  applicationId: number;
  companyName: string;
  position: string;
  specificPosition: string | null;
  process: {
    id: number;
    type: 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
    description: string;
    schedule: string;
  };
}
