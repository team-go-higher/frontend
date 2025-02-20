import ApiService from 'apis';

import {
  IKabanData,
  IRegisterNewApplication,
  IRegisterNewApplicationRes,
  IApplicationStagesRes,
  ICreateNewProcess,
} from 'types/interfaces/KanbanProcess';

export const fetchKanbanList = async () => {
  const config = await ApiService.Get<IKabanData[]>('/v1/applications/kanban');
  return config.data;
};

export const registerSimpleApplication = async (newApplicationData: IRegisterNewApplication) => {
  const config = await ApiService.Post<IRegisterNewApplicationRes>(
    '/v1/applications/simple',
    newApplicationData,
  );
  return config.data;
};

export const editSimpleApplication = async (
  newApplicationData: IRegisterNewApplication,
  applicationId: number,
) => {
  await ApiService.Put(`/v1/applications/${applicationId}/simple`, newApplicationData);
};

// 지원서의 전형 타입에 따른 전형들 조회
export const fetchApplicationStagesByProcessType = async (
  applicationId: number,
  processType: string,
) => {
  const config = await ApiService.Get<IApplicationStagesRes[]>(
    `/v1/applications/${applicationId}/processes?processType=${processType}`,
  );
  return config.data;
};

// 현재 진행 전형 변경
export const updateApplicationProcess = async (applicationId: number, processId: number) => {
  await ApiService.Patch(`/v1/applications/current-process`, {
    applicationId,
    processId,
  });
};

// 전형 이동을 위한 새로운 전형 생성
export const createNewProcess = async (newProcess: ICreateNewProcess) => {
  const { applicationId, newProcessData } = newProcess;

  const config = await ApiService.Post<IApplicationStagesRes>(
    `/v1/applications/${applicationId}/processes`,
    newProcessData,
  );
  return config.data;
};
