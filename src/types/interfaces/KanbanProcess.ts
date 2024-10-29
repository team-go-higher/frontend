import { ProcessType } from './Common';

export interface IKabanData {
  processType: ProcessType;
  applications: IApplication[];
}

export interface IApplication {
  applicationId: number;
  companyName: string;
  position: string;
  process: {
    description: string;
    id: number;
    schedule: string;
    type: ProcessType;
  };
  specificPosition: null | string;
}

export interface IRegisterNewApplication {
  companyName: string;
  position: string;
  url?: string;
  currentProcess: {
    type: ProcessType;
    description?: string;
    schedule?: string;
  };
}

export interface IRegisterNewApplicationRes {
  id: number;
  companyName: string;
  currentProcessSchedule: null | string;
  currentProcessDescription: string;
}

export interface INewProcessRes {
  description: string;
  type: string;
}

export interface ICreateNewProcess {
  applicationId: number;
  newProcessData: INewProcessRes;
}
export interface IApplicationStagesRes {
  id: number;
  description: string;
}
