import { useState } from 'react';
import { format } from 'date-fns';
import { EventContainer } from './CalendarStyledComponents';
import { ReactComponent as MoreIcon } from 'assets/main/main_kanban_card_more.svg';
import { OpenModalParameter } from 'hooks/feature/useApplicationModal';
import MoreMenuModal from 'components/default/modal/MoreMenuModal';
import { IApplication } from 'types/interfaces/KanbanProcess';
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
  openModal?: (parameter: OpenModalParameter) => void;
}

export const CalendarCard = ({ event, openModal }: CalendarCardProps) => {
  const [moreMenuShow, setMoreMenuShow] = useState(false);

  const handleMoreMenu = () => {
    setMoreMenuShow(!moreMenuShow);
  };

  const handleEditButton = () => {
    openModal?.({ mode: 'simpleEdit', applicationInfo: event as IApplication });
    setMoreMenuShow(false);
  };

  return (
    <EventContainer $processType={event.process.type}>
      <h1 className='companyName' title={event.companyName}>
        {event.companyName}
      </h1>
      <p className='description'>{event.process.description}</p>
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
          closeModal={() => setMoreMenuShow(false)}
          application={{
            applicationId: event.applicationId,
            currentProcessType: event.process.type,
          }}
        />
      )}
    </EventContainer>
  );
};
