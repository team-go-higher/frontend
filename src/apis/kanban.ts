import { goHigerApi } from 'apis';
import { IRegisterNewApplication } from 'types/interfaces/KanbanProcess';

export const fetchKanbanList = async () => {
  const data: any = goHigerApi.get('/v1/applications/kanban');
  return data;
};

export const registerSimpleApplication = async (newApplicationData: IRegisterNewApplication) => {
  const data: any = goHigerApi.post('/v1/applications/simple', newApplicationData);
  return data;
};
