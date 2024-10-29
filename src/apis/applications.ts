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

  const config = await apiService.Get<GetApplicationsRes>(`/v1/applications?` + params.toString());

  return config.data;
};

export const patchApplicationsFinished = async (applicationId: number, isCompleted: boolean) => {
  await apiService.Patch(`/v1/applications/${applicationId}/finished`, {
    isCompleted,
  });
};

export const getApplicationSpecific = async (applicationId: number) => {
  const config = await apiService.Get<IApplicationSpecific>(`/v1/applications/${applicationId}`);
  return config.data;
};

export const createNewApplicationSpecific = async (newApplicationData: IApplicationSpecific) => {
  const config = await apiService.Post<IApplicationSpecific>(
    `/v1/applications/specific`,
    newApplicationData,
  );
  return config.headers;
};

export const editApplicationSpecific = async (
  applicationId: number,
  newApplicationData: IApplicationSpecific,
) => {
  const config = await apiService.Put<IApplicationSpecific>(
    `/v1/applications/${applicationId}/specific`,
    newApplicationData,
  );
  return config.data;
};

export const deleteApplication = async (applicationId: number) => {
  await apiService.Delete(`/v1/applications/${applicationId}`);
};
