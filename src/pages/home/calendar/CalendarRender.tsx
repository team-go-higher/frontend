import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';
import data from './dummy.json';
import { RenderHeaderContainer, DaysRow, Cell, Event, Row, Body } from './CalendarStyledComponents';

// RenderHeader
// 일단 여기에 둠
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
      <button onClick={prevMonth}>◁</button>
      <div>{format(currentMonth, 'MMMM')}</div>
      <button onClick={nextMonth}>▷</button>
    </RenderHeaderContainer>
  );
};

// RenderDays
export const RenderDays = () => {
  const days = [];
  const date = ['sun', 'mon', 'thu', 'wed', 'turs', 'fri', 'sat'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <DaysRow key={i} rowKey={i}>
        {date[i]}
      </DaysRow>,
    );
  }
  return <div style={{ display: 'flex' }}>{days}</div>;
};

// RenderCells
// 일단 여기에 둠
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
  const events = data.data;
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

      const eventsOnThisDate = events.filter(event => {
        return format(new Date(event.eventDate), 'yyyy-MM-dd') === format(cloneDay, 'yyyy-MM-dd');
      });

      days.push(
        <Cell
          day={day}
          monthStart={monthStart}
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          key={day.toDateString()}
          onClick={() => onDateClick(cloneDay)}>
          <div className='date'>{formattedDate.padStart(2, '0')}</div>
          {eventsOnThisDate.map(event => (
            <Event key={event.id} process={event.process}>
              {event.title}
            </Event>
          ))}
        </Cell>,
      );
      day = addDays(day, 1);
    }
    rows.push(<Row key={day.toDateString()}>{days}</Row>);
    days = [];
  }
  return <Body>{rows}</Body>;
};
