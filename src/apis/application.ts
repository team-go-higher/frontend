import ApiService from 'apis';
import { IApplication } from 'types/interfaces/Application';

export const fetchApplication = async (userId: number, applicationId: number) => {
  const data = await ApiService.Get<IApplication>(
    `/v1/applications/${applicationId}?userId=${userId}`,
  );
  return data;
};

export const createNewApplication = async (newApplicationData: IApplication) => {
  const data = await ApiService.Post<IApplication>(`/v1/applications/specific`, newApplicationData);
  return data;
};

export const editApplication = async (applicationId: number, newApplicationData: IApplication) => {
  const data = await ApiService.Put<IApplication>(
    `/v1/applications/${applicationId}/specific`,
    newApplicationData,
  );
  return data;
};

export const deleteApplication = async (applicationId: number) => {
  const data = await ApiService.Delete<null>(`/v1/applications/${applicationId}`);
  return data;
};
