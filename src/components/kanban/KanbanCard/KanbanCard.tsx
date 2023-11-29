import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

import { ReactComponent as MoreIcon } from 'assets/main/main_kanban_card_more.svg';
import { ReactComponent as MoreItemIcon } from 'assets/main/main_kanban_card_more_item.svg';
import * as S from './KanbanCardStyledComponents';
import { application } from 'types/interfaces/KanbanProcess';
import { fetchApplicationProcessType } from 'apis/kanban';
import { modalMode } from 'hooks/useModal';
import { formatDataType } from 'utils/date';

interface IProps {
  item: application;
  currentProcessType: string;
  openModal: (parameter: { mode: modalMode; processName?: string; applicationInfo?: any }) => void;
  setFethedProcessData: React.Dispatch<React.SetStateAction<any>>;
}

const KanbanCard = ({ item, currentProcessType, openModal, setFethedProcessData }: IProps) => {
  const [moreMenuShow, setMoreMenuShow] = useState(false);

  function handleMoreMenu() {
    setMoreMenuShow(!moreMenuShow);
  }

  function handleEditButton() {
    openModal({ mode: 'edit', applicationInfo: item });
    setMoreMenuShow(false);
  }

  const [{ isDragging }, ref] = useDrag({
    type: 'card',
    item: item,

    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),

    end: async (draggedItem, monitor) => {
      const dropResult: any = monitor.getDropResult();

      if (dropResult) {
        const { data } = await fetchApplicationProcessType(
          draggedItem.applicationId,
          dropResult.processName,
        );

        if (data.success) {
          setFethedProcessData(data);
          openModal({
            mode: 'move',
            applicationInfo: { applicationId: draggedItem.applicationId },
            processName: dropResult.processName,
          });
        }
      }
    },
  });

  return (
    <S.KanbanCardContainer
      ref={ref}
      $isdragging={isDragging}
      $currentProcessType={currentProcessType}>
      {/* 드래그 가능한 요소의 내용 */}
      <S.DetailProcess $currentProcessType={currentProcessType}>
        {item.process.description}
      </S.DetailProcess>
      <S.CompanyName>{item.companyName}</S.CompanyName>
      <S.Job>{item.position}</S.Job>
      <S.Schedule>{formatDataType(item.process.schedule)}</S.Schedule>
      <S.MoreIconDiv>
        <MoreIcon fill={`rgb(var(--${currentProcessType}))`} onClick={handleMoreMenu} />
      </S.MoreIconDiv>
      {moreMenuShow && (
        <S.MoreMenuColumn $currentProcessType={currentProcessType}>
          <S.MoreItem onClick={handleEditButton}>
            <MoreItemIcon />
            <S.MoreItemText>간편 수정하기</S.MoreItemText>
          </S.MoreItem>
          <S.MoreItem>
            <MoreItemIcon />
            <S.MoreItemText>공고 숨기기</S.MoreItemText>
          </S.MoreItem>
        </S.MoreMenuColumn>
      )}
    </S.KanbanCardContainer>
  );
};

export default KanbanCard;
