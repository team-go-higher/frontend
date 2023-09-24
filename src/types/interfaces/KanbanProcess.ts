export type processType = undefined | 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';

export interface IkabanData {
  processType: processType;
  applications: application[];
}

export interface application {
  id: number;
  companyName: string;
  position: string;
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
