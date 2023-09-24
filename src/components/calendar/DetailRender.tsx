import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarCard } from './CalendarCard';
import dayLeft from 'assets/calendar/calendar_day_left_arrow.svg';
import dayRight from 'assets/calendar/calendar_day_right_arrow.svg';
import { DetailContainer } from './CalendarStyledComponents';

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

  return (
    <DetailContainer>
      <div className='selectDate'>
        <img src={dayLeft} alt='dayLeft' onClick={prevDay} />
        <div className='selectedDate'>{format(selectedDate, 'd, eee').toLowerCase()}</div>
        <img src={dayRight} alt='dayLeft' onClick={nextDay} />
      </div>
      {events && events.map(event => <CalendarCard key={event.id} event={event}></CalendarCard>)}
    </DetailContainer>
  );
};
