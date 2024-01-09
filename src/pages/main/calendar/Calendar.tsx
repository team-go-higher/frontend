import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, addDays, subDays } from 'date-fns';
import { RenderHeader, RenderDays, RenderCells } from 'components/calendar/CalendarRender';
import { RenderDetail, RenderUnscheduled } from 'components/calendar/DetailRender';
import {
  CalendarPage,
  CalendarContainer,
  DayContainer,
  UnscheduledContainer,
} from 'components/calendar/CalendarStyledComponents';
import { fetchMonthCalendar, fetchDetailCalendar, fetchUnscheduledCalendar } from 'apis/calendar';
import { useQuery } from 'react-query';
import { queryKey } from 'apis/queryKey';

import { Input } from 'components/default/input/Input';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);

  //api 연결
  const { data: calendarData } = useQuery([queryKey.CALENDARDATA, currentMonth], () =>
    fetchMonthCalendar(
      parseInt(format(currentMonth, 'yyyy')),
      parseInt(format(currentMonth, 'MM')),
    ),
  );
  const { data: detailData } = useQuery([queryKey.DETAILDATA, selectedDate], () =>
    fetchDetailCalendar(format(selectedDate, 'yyyy-MM-dd')),
  );
  const { data: unscheduledData } = useQuery([currentPage, queryKey.UNSCHEDULEDDATA], () =>
    fetchUnscheduledCalendar(currentPage, 2),
  );

  //달력 값 변경
  useEffect(() => {
    if (format(selectedDate, 'yyyy-MM') !== format(currentMonth, 'yyyy-MM')) {
      setCurrentMonth(selectedDate);
    }
  }, [selectedDate]);
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day: any) => {
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

  return (
    <CalendarPage>
      <Input id='yourInputId' placeholder='Type something...' />
      <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
      <div className='calendar-detail'>
        <CalendarContainer>
          <RenderDays />
          <RenderCells
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
            calendarData={calendarData}
          />
        </CalendarContainer>

        <DayContainer>
          <RenderDetail
            selectedDate={selectedDate}
            prevDay={prevDay}
            nextDay={nextDay}
            detailData={detailData}
          />
        </DayContainer>
      </div>
      <UnscheduledContainer>
        {unscheduledData && unscheduledData.content.length !== 0 && (
          <RenderUnscheduled
            unscheduledData={unscheduledData}
            currentPage={currentPage}
            prevPage={prevPage}
            nextPage={nextPage}></RenderUnscheduled>
        )}
      </UnscheduledContainer>
    </CalendarPage>
  );
};

export default Calendar;
