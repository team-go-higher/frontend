import React from 'react';
import { format } from 'date-fns';
import { EventContainer } from './CalendarStyledComponents';

interface CalendarCardProps {
  event: {
    applicationId: number;
    companyName: string;
    process: {
      id: number;
      type: 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
      description: string;
      schedule: string;
    };
  };
}

export const CalendarCard: React.FC<CalendarCardProps> = ({ event }) => {
  return (
    <EventContainer $processType={event.process.type}>
      <div>{event.companyName}</div>
      <div>{event.process.description}</div>
      <div>
        {event.process.schedule
          ? format(new Date(event.process.schedule), 'M월 dd일 HH:mm')
          : '전형일을 입력하세요'}
      </div>
    </EventContainer>
  );
};
