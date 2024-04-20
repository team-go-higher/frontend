import React, { useState } from 'react';
import { format } from 'date-fns';
import { EventContainer } from './CalendarStyledComponents';
import * as S from 'components/kanban/KanbanCard/KanbanCardStyledComponents';
import { ReactComponent as MoreIcon } from 'assets/main/main_kanban_card_more.svg';
import { ReactComponent as MoreItemIcon } from 'assets/main/main_kanban_card_more_item.svg';
import { modalModeType } from 'hooks/feature/useModal';

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
      <div>{event.companyName}</div>
      <div>{event.process.description}</div>
      <div>
        {event.process.schedule
          ? format(new Date(event.process.schedule), 'M월 dd일 HH:mm')
          : '전형일을 입력하세요'}
      </div>
      <S.MoreIconDiv>
        <MoreIcon fill={`rgb(var(--${event.process.type}))`} onClick={handleMoreMenu} />
      </S.MoreIconDiv>
      {moreMenuShow && (
        <S.MoreMenuColumn $currentProcessType={event.process.type}>
          <S.MoreItem onClick={handleEditButton}>
            <MoreItemIcon />
            <S.MoreItemText>간편 수정하기</S.MoreItemText>
          </S.MoreItem>
          <S.MoreItem>
            <MoreItemIcon />
            <S.MoreItemText>지원서 비활성화</S.MoreItemText>
          </S.MoreItem>
        </S.MoreMenuColumn>
      )}
    </EventContainer>
  );
};
