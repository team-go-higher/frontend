import React, { useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';
import headerLeft from 'assets/main/main_left_arrow.svg';
import headerRight from 'assets/main/main_right_arrow.svg';
import {
  RenderHeaderContainer,
  RenderDaysContainer,
  Cell,
  Event,
  Row,
  RenderCellsContainer,
} from './CalendarStyledComponents';
import { ICalendarData } from 'types/interfaces/CalendarProcess';

// RenderHeader(월)
interface RenderHeaderProps {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

export const RenderHeader: React.FC<RenderHeaderProps> = ({
  currentMonth,
  prevMonth,
  nextMonth,
}) => {
  return (
    <RenderHeaderContainer>
      <img src={headerLeft} alt='headerLeft' onClick={prevMonth} />
      <div className='month'>{format(currentMonth, 'MMMM')}</div>
      <img src={headerRight} alt='headerRight' onClick={nextMonth} />
    </RenderHeaderContainer>
  );
};

// RenderDays(요일)
export const RenderDays = () => {
  const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <RenderDaysContainer>
      {date.map((day, i) => (
        <div className={`daysRow ${i === 6 ? 'sat' : i === 0 ? 'sun' : ''}`} key={i}>
          {day}
        </div>
      ))}
    </RenderDaysContainer>
  );
};

// RenderCells(달력 셀)
interface RenderCellsProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (date: Date) => void;
  calendarData: [];
}

export const RenderCells: React.FC<RenderCellsProps> = ({
  currentMonth,
  selectedDate,
  onDateClick,
  calendarData,
}) => {
  const monthStart = startOfMonth(currentMonth); //8월 1일
  const monthEnd = endOfMonth(currentMonth); //8월 31일
  const startDate = startOfWeek(monthStart); //7월 30일
  const endDate = endOfWeek(monthEnd); //9월 2일

  // 달력 만들기
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = new Date(day);
      let eventsOnThisDate: ICalendarData[] = [];
      if (calendarData && calendarData.length) {
        eventsOnThisDate = calendarData.filter((data: ICalendarData) => {
          return format(new Date(data.schedule), 'yyyy-MM-dd') === format(cloneDay, 'yyyy-MM-dd');
        });
      }
      days.push(
        <Cell
          $day={day}
          $selectedDate={selectedDate}
          $currentMonth={currentMonth}
          key={day.toDateString()}
          onClick={() => onDateClick(cloneDay)}>
          <div className='date'>{formattedDate.padStart(2, '0')}</div>
          {eventsOnThisDate &&
            eventsOnThisDate.slice(0, 3).map((event, i) => (
              <Event key={i} $processType={event.processType}>
                {event.name}
              </Event>
            ))}
          {eventsOnThisDate.length > 3 && (
            <div className='plus'>+{eventsOnThisDate.length - 3}</div>
          )}
        </Cell>,
      );
      day = addDays(day, 1);
    }
    rows.push(<Row key={day.toDateString()}>{days}</Row>);
    days = [];
  }
  return <RenderCellsContainer>{rows}</RenderCellsContainer>;
};
