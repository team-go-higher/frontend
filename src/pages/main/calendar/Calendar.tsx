import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, addDays, subDays } from 'date-fns';
import { RenderHeader, RenderDays, RenderCells } from 'components/calendar/CalendarRender';
import { RenderDetailHeader } from 'components/calendar/DetailRender';
import {
  CalendarPage,
  CalendarContainer,
  DayContainer,
} from 'components/calendar/CalendarStyledComponents';
import { fetchMonthCalendar, fetchDetailCalendar } from 'apis/calendar';
import { useQuery } from 'react-query';
import { queryKey } from 'apis/queryKey';
import { ICalendarData, IDetailData } from 'types/interfaces/CalendarProcess';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  //api 연결
  const { data: calendarData } = useQuery(queryKey.CALENDARDATA, () =>
    fetchMonthCalendar(
      parseInt(format(currentMonth, 'yyyy')),
      parseInt(format(currentMonth, 'MM')),
    ),
  );

  const { data: detailData } = useQuery(queryKey.DETAILDATA, () =>
    fetchDetailCalendar(format(selectedDate, 'yyyy-MM-dd')),
  );

  //값 변경
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

  return (
    <CalendarPage>
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
          <RenderDetailHeader
            selectedDate={selectedDate}
            prevDay={prevDay}
            nextDay={nextDay}
            detailData={detailData}
          />
        </DayContainer>
      </div>
    </CalendarPage>
  );
};

export default Calendar;
