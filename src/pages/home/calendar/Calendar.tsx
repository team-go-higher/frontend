import React, { useState } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import { RenderHeader, RenderDays, RenderCells } from './CalendarRender';
import { CalendarPage, CalendarContainer, DayContainer } from './CalendarStyledComponents';

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day: any) => {
    setSelectedDate(day);
  };

  return (
    <CalendarPage>
      <CalendarContainer>
        <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
        <RenderDays />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
        />
      </CalendarContainer>
      <DayContainer>{format(selectedDate, 'd, eee').toLowerCase()}</DayContainer>
    </CalendarPage>
  );
};
