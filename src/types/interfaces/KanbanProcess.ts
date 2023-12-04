export type processType = 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';

export interface IKabanData {
  processType: processType;
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
    type: processType;
  };
  specificPosition: null | string;
  processDescription: string;
  schedule: string;
}

export interface IRegisterNewApplication {
  companyName: string;
  position: string;
  url?: string;
  currentProcess: {
    type: processType;
    description?: string;
    schedule?: string;
  };
}
