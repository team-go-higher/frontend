import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format, addMonths, subMonths, addDays, subDays } from 'date-fns';
import { RenderHeader, RenderDays, RenderCells } from 'components/calendar/CalendarRender';
import { RenderDetail, RenderUnscheduled } from 'components/calendar/DetailRender';
import * as S from './CalendarStyledComponents';
import {
  fetchApplicationByMonth,
  fetchApplicationByDate,
  fetchApplicationUnscheduled,
} from 'apis/calendar';
import { queryKeys } from 'apis/queryKeys';
import { ICalendarData, IDetailData } from 'types/interfaces/CalendarProcess';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);

  //api 연결
  const { data: calendarData } = useQuery({
    queryKey: [queryKeys.CALENDAR, 'fetchApplicationByMonth', currentMonth],
    queryFn: () =>
      fetchApplicationByMonth(
        parseInt(format(currentMonth, 'yyyy')),
        parseInt(format(currentMonth, 'MM')),
      ),
  });

  const { data: detailData } = useQuery({
    queryKey: [queryKeys.CALENDAR, 'fetchApplicationByDate', selectedDate],
    queryFn: () => fetchApplicationByDate(format(selectedDate, 'yyyy-MM-dd')),
  });

  const { data: unscheduledData } = useQuery({
    queryKey: [queryKeys.CALENDAR, 'fetchApplicationUnscheduled', currentPage],
    queryFn: () => fetchApplicationUnscheduled(currentPage, 4),
  });

  // 달력 관련 함수
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onMonthClick = (month: Date) => {
    setCurrentMonth(month);
  };
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };
  const prevDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };
  const nextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  //전형일 없는 지원서 페이지
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  //달력 값 변경
  useEffect(() => {
    if (format(selectedDate, 'yyyy-MM') !== format(currentMonth, 'yyyy-MM')) {
      setCurrentMonth(selectedDate);
    }
  }, [selectedDate]);

  return (
    <S.CalendarPage>
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        onMonthClick={onMonthClick}
      />
      <div className='calendar-detail'>
        <S.CalendarContainer>
          <RenderDays />
          <RenderCells
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
            calendarData={calendarData?.data as ICalendarData[]}
          />
        </S.CalendarContainer>

        <S.DayContainer>
          <RenderDetail
            selectedDate={selectedDate}
            prevDay={prevDay}
            nextDay={nextDay}
            detailData={detailData?.data as IDetailData[]}
          />
        </S.DayContainer>
      </div>
      <S.UnscheduledContainer>
        {unscheduledData && unscheduledData.data.content.length !== 0 && (
          <RenderUnscheduled
            unscheduledData={unscheduledData.data}
            currentPage={currentPage}
            prevPage={prevPage}
            nextPage={nextPage}></RenderUnscheduled>
        )}
      </S.UnscheduledContainer>
    </S.CalendarPage>
  );
};

export default Calendar;
