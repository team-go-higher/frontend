import { goHigerApi } from 'apis';

export const fetchMonthCalendar = async (year: number, month: number) => {
  try {
    const response = await goHigerApi.get(`/v1/applications/calendar?year=${year}&month=${month}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    throw error;
  }
};

export const fetchDayCalendar = async (date: string) => {
  try {
    const response = await goHigerApi.get(`/v1/applications/processes?date=${date}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    throw error;
  }
};
