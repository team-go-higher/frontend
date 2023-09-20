import { goHigerApi } from 'apis';

export const fetchKanbanList = async () => {
  const { data }: any = goHigerApi.get('/v1/applications/kanban');
  return data;
};
