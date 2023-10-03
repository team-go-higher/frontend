import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, addDays, subDays } from 'date-fns';
import { RenderHeader, RenderDays, RenderCells } from 'components/calendar/CalendarRender';
import { RenderDetailHeader } from 'components/calendar/DetailRender';
import {
  CalendarPage,
  CalendarContainer,
  DayContainer,
  UnscheduledContainer,
} from 'components/calendar/CalendarStyledComponents';
import { fetchMonthCalendar, fetchDetailCalendar, fetchUnscheduledCalendar } from 'apis/calendar';
import { CalendarCard } from 'components/calendar/CalendarCard';
import { useQuery } from 'react-query';
import { queryKey } from 'apis/queryKey';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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
  const { data: unscheduledData } = useQuery(queryKey.UNSCHEDULEDDATA, () =>
    fetchUnscheduledCalendar(1, 1),
  );
  console.log(unscheduledData);
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
      <UnscheduledContainer>
        {unscheduledData && unscheduledData.content.length !== 0 && (
          <div>
            <div className='text'>전형을 기다리고 있어요</div>
            <div className='card'>
              {unscheduledData.content.map((event: any) => (
                <CalendarCard key={event.applicationId} event={event}></CalendarCard>
              ))}
            </div>
          </div>
        )}
      </UnscheduledContainer>
    </CalendarPage>
  );
};

export default Calendar;
