import apiService from 'apis';
import { ICalendarData, IDetailData, IUnscheduledData } from 'types/interfaces/CalendarProcess';

export const fetchApplicationByMonth = async (year: number, month: number) => {
  const config = await apiService.Get<ICalendarData[]>(
    `/v1/applications/calendar?year=${year}&month=${month}`,
  );
  return config.data;
};

export const fetchApplicationByDate = async (date: string) => {
  const config = await apiService.Get<IDetailData[]>(`/v1/applications/processes?date=${date}`);
  return config.data;
};

export const fetchApplicationUnscheduled = async (page: number, size: number) => {
  const config = await apiService.Get<IUnscheduledData>(
    `/v1/applications/unscheduled?page=${page}&size=${size}`,
  );
  return config.data;
};
