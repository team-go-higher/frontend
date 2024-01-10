import ApiService from 'apis';
import { ICalendarData, IDetailData, IUnscheduledData } from 'types/interfaces/CalendarProcess';

export const fetchMonthCalendar = async (year: number, month: number) => {
  const data = await ApiService.Get<ICalendarData[]>(
    `/v1/applications/calendar?year=${year}&month=${month}`,
  );
  return data.data;
};

export const fetchDetailCalendar = async (date: string) => {
  const data = await ApiService.Get<IDetailData[]>(`/v1/applications/processes?date=${date}`);
  return data.data;
};

export const fetchUnscheduledCalendar = async (page: number, size: number) => {
  const data = await ApiService.Get<IUnscheduledData>(
    `/v1/applications/unscheduled?page=${page}&size=${size}`,
  );
  return data.data;
};
