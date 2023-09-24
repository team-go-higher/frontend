import React from 'react';
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
}

export const RenderCells: React.FC<RenderCellsProps> = ({
  currentMonth,
  selectedDate,
  onDateClick,
}) => {
  const monthStart = startOfMonth(currentMonth); //8월 1일
  const monthEnd = endOfMonth(monthStart); //8월 31일
  const startDate = startOfWeek(monthStart); //7월 30일
  const endDate = endOfWeek(monthEnd); //9월 2일

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = new Date(day);

      // const eventsOnThisDate = events.filter(event => {
      //   return format(new Date(event.eventDate), 'yyyy-MM-dd') === format(cloneDay, 'yyyy-MM-dd');
      // });

      days.push(
        <Cell
          day={day}
          monthStart={monthStart}
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          key={day.toDateString()}
          onClick={() => onDateClick(cloneDay)}>
          {/* <div className='date'>{formattedDate.padStart(2, '0')}</div>
          {eventsOnThisDate.map(event => (
            <Event key={event.id} process={event.process}>
              {event.title}
            </Event>
          ))} */}
        </Cell>,
      );
      day = addDays(day, 1);
    }
    rows.push(<Row key={day.toDateString()}>{days}</Row>);
    days = [];
  }
  return <RenderCellsContainer>{rows}</RenderCellsContainer>;
};
