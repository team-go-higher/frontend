export interface IKanbanProcess {
  [processName: string]: {
    korean: string;
    data: Data[];
  };
}

export interface Data {
  id: number;
  companyName: string;
  job: string;
  schedule: string;
  currentProcess: string;
  detailProcess: string;
}
