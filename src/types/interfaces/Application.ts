export type ProcessType = 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';

export interface IProcesses {
  type: ProcessType;
  description: string;
  schedule: Date;
}

export interface IApplication {
  companyName: string;
  team?: string;
  location?: string;
  contact?: string;
  position: string;
  specificPosition?: string;
  jobDescription?: string;
  workType?: string;
  employmentType?: string;
  careerRequirement?: string;
  requiredCapability?: string;
  preferredQualification?: string;
  processes?: IProcesses[];
  url?: string;
}
