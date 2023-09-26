import { goHigerApi } from 'apis';

export const fetchMonthCalendar = async (year: number, month: number) => {
  const { data }: any = await goHigerApi.get(
    `/v1/applications/calendar?year=${year}&month=${month}`,
  );
  return data.data;
};

export const fetchDetailCalendar = async (date: string) => {
  const { data }: any = await goHigerApi.get(`/v1/applications/processes?date=${date}`);
  return data.data;
};
