import apiService from 'apis';
import { IApplicationSpecific } from 'types/interfaces/Application';
import { IApplication } from 'types/interfaces/KanbanProcess';
import { objectToParams } from 'utils/params';

export type ApplicationProcessType = 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
export interface ApplicationStatusCardData {
  applicationId: number;
  companyName: string;
  position: string;
  specificPosition: string;
  isCompleted: boolean;
  process: {
    id: number;
    type: ApplicationProcessType;
    description: string;
    schedule: string;
  };
}

interface GetApplicationsRes {
  hasNext: boolean;
  content: ApplicationStatusCardData[];
}

export type ApplicationSort = 'processType' | 'reverseProcessType' | 'closing' | null;
export type ApplicationProcess = ApplicationProcessType[] | null;

export const getApplications = async (
  pageNumber: number,
  companyName: string,
  sort?: ApplicationSort,
  process?: ApplicationProcess,
  complete?: boolean | null,
) => {
  const params = objectToParams({
    page: pageNumber,
    size: 10,
    companyName,
    sort,
    completed: complete,
    process,
  });

  const data = await apiService.Get<GetApplicationsRes>(`/v1/applications?` + params.toString());

  return data;
};

export const patchApplicationsFinished = async (applicationId: number, isCompleted: boolean) => {
  const data = await apiService.Patch(`/v1/applications/${applicationId}/finished`, {
    isCompleted,
  });

  return data.data;
};

export const getApplicationSpecific = async (applicationId: number) => {
  const data = await apiService.Get<IApplicationSpecific>(`/v1/applications/${applicationId}`);
  return data.data;
};

export const createNewApplicationSpecific = async (newApplicationData: IApplicationSpecific) => {
  const data = await apiService.Post<IApplicationSpecific>(
    `/v1/applications/specific`,
    newApplicationData,
  );
  return data.data;
};

export const editApplicationSpecific = async (
  applicationId: number,
  newApplicationData: IApplicationSpecific,
) => {
  const data = await apiService.Put<IApplicationSpecific>(
    `/v1/applications/${applicationId}/specific`,
    newApplicationData,
  );
  return data.data;
};

export const deleteApplication = async (applicationId: number) => {
  const data = await apiService.Delete(`/v1/applications/${applicationId}`);
  return data.data;
};
