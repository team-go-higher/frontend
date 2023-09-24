export interface IkabanData {
  processType: 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
  applications: application[];
}

export interface application {
  id: number;
  companyName: string;
  duty: string;
  detailedDuty: null | string;
  processDescription: string;
  schedule: string;
}
