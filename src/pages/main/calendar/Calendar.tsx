import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, addDays, subDays } from 'date-fns';
import { RenderHeader, RenderDays, RenderCells } from 'components/calendar/CalendarRender';
import { RenderDetailHeader } from 'components/calendar/DetailRender';
import {
  CalendarPage,
  CalendarContainer,
  DayContainer,
} from 'components/calendar/CalendarStyledComponents';
import { fetchMonthCalendar, fetchDayCalendar } from 'apis/calendar';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchMonth(parseInt(format(currentMonth, 'yyyy')), parseInt(format(currentMonth, 'MM')));
  }, [currentMonth]);

  useEffect(() => {
    fetchDate(format(selectedDate, 'yyyy-MM-dd'));
  }, [selectedDate]);

  //api 연결
  async function fetchMonth(year: number, month: number) {
    try {
      const calendarData = await fetchMonthCalendar(year, month);
      console.log(calendarData);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  }
  async function fetchDate(date: string) {
    try {
      const calendarData = await fetchDayCalendar(date);
      console.log(calendarData);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  }

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
          />
        </CalendarContainer>

        <DayContainer>
          <RenderDetailHeader selectedDate={selectedDate} prevDay={prevDay} nextDay={nextDay} />
        </DayContainer>
      </div>
    </CalendarPage>
  );
};

export default Calendar;
