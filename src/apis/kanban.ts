import { goHigerApi } from 'apis';
import { IRegisterNewApplication } from 'types/interfaces/KanbanProcess';

export const fetchKanbanList = async () => {
  const data: any = await goHigerApi.get('/v1/applications/kanban');
  return data;
};

export const registerSimpleApplication = async (newApplicationData: IRegisterNewApplication) => {
  const data: any = await goHigerApi.post('/v1/applications/simple', newApplicationData);
  return data;
};

export const editSimpleApplication = async (
  newApplicationData: IRegisterNewApplication,
  applicationId: any,
) => {
  const data: any = await goHigerApi.put(
    `/v1/applications/${applicationId}/simple`,
    newApplicationData,
  );
  return data;
};

export const fetchApplicationStagesByProcessType = async (applicationId: any, processType: any) => {
  const data: any = await goHigerApi.get(
    `/v1/applications/${applicationId}/processes?processType=${processType}`,
  );
  return data;
};

export const updateApplicationProcess = async (applicationId: any, processId: any) => {
  const data: any = await goHigerApi.patch(`/v1/applications/current-process`, {
    applicationId,
    processId,
  });
  return data;
};
