import { ProcessType } from './Common';

export interface ICalendarData {
  applicationId: number;
  processId: number;
  name: string;
  processType: ProcessType;
  schedule: string;
}

export interface IDetailData {
  applicationId: number;
  companyName: string;
  process: {
    id: number;
    type: ProcessType;
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
    type: ProcessType;
    description: string;
    schedule: string;
  };
}
