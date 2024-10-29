import { ProcessType } from './Common';

export interface IProcesses {
  id?: number;
  type: ProcessType;
  description: string;
  schedule: Date;
  isCurrent: boolean;
}

export interface IApplicationSpecific {
  id?: number;
  companyName?: string;
  team?: string;
  location?: string;
  contact?: string;
  position?: string;
  specificPosition?: string;
  jobDescription?: string;
  workType?: string;
  employmentType?: string;
  careerRequirement?: string;
  requiredCapability?: string;
  preferredQualification?: string;
  processes?: IProcesses[];
  currentProcessOrder?: number;
  url?: string;
}

export interface ApplicationStatusCardData {
  applicationId: number;
  companyName: string;
  position: string;
  specificPosition: string;
  isCompleted: boolean;
  process: {
    id: number;
    type: ProcessType;
    description: string;
    schedule: string;
  };
}

export interface GetApplicationsRes {
  pageNumber: number;
  hasNext: boolean;
  content: ApplicationStatusCardData[];
}

export type ApplicationSort = 'processType' | 'reverseProcessType' | 'closing' | null;

export type ApplicationProcess = ProcessType[] | null;
