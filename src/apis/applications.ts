import apiService from 'apis';
import {
  ApplicationProcess,
  ApplicationSort,
  GetApplicationsRes,
  IApplicationSpecific,
} from 'types/interfaces/Application';
import { objectToParams } from 'utils/params';

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
