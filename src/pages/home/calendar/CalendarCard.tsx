import React from 'react';
import { format } from 'date-fns';
import { EventContainer } from './CalendarStyledComponents';

interface CalendarCardProps {
  event: {
    process: string;
    title: string;
    role: string;
    eventDate: string;
  };
}

export const CalendarCard: React.FC<CalendarCardProps> = ({ event }) => {
  return (
    <EventContainer process={event.process}>
      <div>{event.title}</div>
      <div>{event.role}</div>
      <div>{format(new Date(event.eventDate), 'M월 dd일 HH:mm')}</div>
    </EventContainer>
  );
};
