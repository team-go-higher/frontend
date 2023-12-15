import { goHigerApi } from 'apis';
import { IRegisterNewApplication } from 'types/interfaces/KanbanProcess';
import { IKabanData, IRegisterNewApplicationResponse } from 'types/interfaces/KanbanProcess';

interface IResponse<T> {
  success: boolean;
  error: any;
  data: T;
}

export const fetchKanbanList = async (): Promise<IResponse<IKabanData[]>> => {
  const data: IResponse<IKabanData[]> = await goHigerApi.get('/v1/applications/kanban');
  return data;
};

export const registerSimpleApplication = async (
  newApplicationData: IRegisterNewApplication,
): Promise<IResponse<IRegisterNewApplicationResponse>> => {
  const data: IResponse<IRegisterNewApplicationResponse> = await goHigerApi.post(
    '/v1/applications/simple',
    newApplicationData,
  );
  return data;
};

export const editSimpleApplication = async (
  newApplicationData: IRegisterNewApplication,
  applicationId: number,
): Promise<IResponse<null>> => {
  const data: IResponse<null> = await goHigerApi.put(
    `/v1/applications/${applicationId}/simple`,
    newApplicationData,
  );
  return data;
};

// 지원서의 전형 타입에 따른 전형들 조회
export const fetchApplicationStagesByProcessType = async (
  applicationId: number,
  processType: string,
): Promise<IResponse<any>> => {
  const data: IResponse<any> = await goHigerApi.get(
    `/v1/applications/${applicationId}/processes?processType=${processType}`,
  );
  return data;
};

// 현재 진행 전형 변경
export const updateApplicationProcess = async (
  applicationId: number,
  processId: number,
): Promise<IResponse<any>> => {
  const data: IResponse<any> = await goHigerApi.patch(`/v1/applications/current-process`, {
    applicationId,
    processId,
  });
  return data;
};

// 전형 이동을 위한 새로운 전형 생성
export const createNewProcess = async (
  applicationId: number,
  newProcessData: any,
): Promise<IResponse<any>> => {
  const data: IResponse<any> = await goHigerApi.post(
    `/v1/applications/${applicationId}/processes`,
    newProcessData,
  );
  return data;
};
