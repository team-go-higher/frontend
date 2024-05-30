import ApiService from 'apis';

import {
  IKabanData,
  IRegisterNewApplication,
  IRegisterNewApplicationRes,
  IApplicationStagesRes,
  ICreateNesProcess,
} from 'types/interfaces/KanbanProcess';

export const fetchKanbanList = async () => {
  const data = await ApiService.Get<IKabanData[]>('/v1/applications/kanban');
  return data;
};

export const registerSimpleApplication = async (newApplicationData: IRegisterNewApplication) => {
  const data = await ApiService.Post<IRegisterNewApplicationRes>(
    '/v1/applications/simple',
    newApplicationData,
  );
  return data;
};

export const editSimpleApplication = async (
  newApplicationData: IRegisterNewApplication,
  applicationId: number,
) => {
  const data = await ApiService.Put<null>(
    `/v1/applications/${applicationId}/simple`,
    newApplicationData,
  );
  return data;
};

// 지원서의 전형 타입에 따른 전형들 조회
export const fetchApplicationStagesByProcessType = async (
  applicationId: number,
  processType: string,
) => {
  const data = await ApiService.Get<IApplicationStagesRes[]>(
    `/v1/applications/${applicationId}/processes?processType=${processType}`,
  );
  return data;
};

// 현재 진행 전형 변경
export const updateApplicationProcess = async (applicationId: number, processId: number) => {
  const data = await ApiService.Patch<null>(`/v1/applications/current-process`, {
    applicationId,
    processId,
  });
  return data;
};

// 전형 이동을 위한 새로운 전형 생성
export const createNewProcess = async (newProcess: ICreateNesProcess) => {
  const { applicationId, newProcessData } = newProcess;

  const data = await ApiService.Post<IApplicationStagesRes>(
    `/v1/applications/${applicationId}/processes`,
    newProcessData,
  );
  return data;
};
