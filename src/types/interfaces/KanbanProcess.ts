export type processType = undefined | 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';

export interface IkabanData {
  processType: processType;
  applications: application[];
}

export interface application {
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
