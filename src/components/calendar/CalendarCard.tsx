import { useState } from 'react';
import { format } from 'date-fns';
import { EventContainer } from './CalendarStyledComponents';
import * as S from 'components/kanban/KanbanCard/KanbanCardStyledComponents';
import { ReactComponent as MoreIcon } from 'assets/main/main_kanban_card_more.svg';
import { modalModeType } from 'hooks/feature/useModal';
import MoreMenuModal from 'components/default/modal/MoreMenuModal';

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
  openModal?: (parameter: {
    mode: modalModeType;
    processType?: string;
    applicationInfo: any;
  }) => void;
}

export const CalendarCard = ({ event, openModal }: CalendarCardProps) => {
  const [moreMenuShow, setMoreMenuShow] = useState(false);

  const handleMoreMenu = () => {
    setMoreMenuShow(!moreMenuShow);
  };

  const handleEditButton = () => {
    openModal?.({ mode: 'simpleEdit', applicationInfo: event });
    setMoreMenuShow(false);
  };

  return (
    <EventContainer $processType={event.process.type}>
      <div className='companyName'>{event.companyName}</div>
      <div className='description'>{event.process.description}</div>
      <div className='bottomContainer'>
        <div className='schedule'>
          {event.process.schedule
            ? format(new Date(event.process.schedule), 'M월 dd일 HH:mm')
            : '전형일을 입력하세요'}
        </div>

        <MoreIcon
          className='moreIcon'
          width={15}
          height={15}
          fill={`rgb(var(--${event.process.type}))`}
          onClick={handleMoreMenu}
        />
      </div>

      {moreMenuShow && (
        <MoreMenuModal
          handleEditButton={handleEditButton}
          currentProcessType={event.process.type}
          closeModal={() => setMoreMenuShow(false)}
        />
      )}
    </EventContainer>
  );
};
