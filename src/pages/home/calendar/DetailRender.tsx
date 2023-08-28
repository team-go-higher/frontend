import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import data from './dummy.json';
import { DetailContainer, EventContainer } from './CalendarStyledComponents';

// RenderHeader
// 일단 여기에 둠
interface RenderDetailHeaderProps {
  selectedDate: Date;
  prevDay: () => void;
  nextDay: () => void;
}

interface EventData {
  id: number;
  eventDate: string;
  title: string;
  process: string;
  role: string;
}

export const RenderDetailHeader: React.FC<RenderDetailHeaderProps> = ({
  selectedDate,
  prevDay,
  nextDay,
}) => {
  const [events, setEvents] = useState<EventData[]>([]);
  useEffect(() => {
    const filteredEvents = data.data.filter(event => {
      return format(new Date(event.eventDate), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    });

    setEvents(filteredEvents);
  }, [selectedDate]);
  console.log(events);
  return (
    <DetailContainer>
      <div className='selectDate'>
        <button onClick={prevDay}>◁</button>
        <div className='selectedDate'>{format(selectedDate, 'd, eee').toLowerCase()}</div>
        <button onClick={nextDay}>▷</button>
      </div>
      {events &&
        events.map(event => (
          <EventContainer key={event.id} process={event.process}>
            <div>{event.title}</div>
            <div>{event.role}</div>
            <div>{format(new Date(event.eventDate), 'M월 dd일 HH:mm')}</div>
          </EventContainer>
        ))}
    </DetailContainer>
  );
};
