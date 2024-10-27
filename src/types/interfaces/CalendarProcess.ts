import { ProcessType } from './Common';

export interface IProcessData {
  id: number;
  type: ProcessType;
  description: string;
  schedule: string;
}

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
  process: IProcessData;
}

export interface IUnscheduledContent {
  applicationId: number;
  companyName: string;
  position: string;
  specificPosition: string | null;
  process: IProcessData;
}
export interface IUnscheduledData {
  hasNext: boolean;
  content: IUnscheduledContent[];
}
