import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

import { ReactComponent as MoreIcon } from 'assets/main/main_kanban_card_more.svg';
import * as S from './KanbanCardStyledComponents';
import { IApplication, processType } from 'types/interfaces/KanbanProcess';
import { fetchApplicationStagesByProcessType } from 'apis/kanban';
import { modalModeType } from 'hooks/feature/useModal';
import { formatDataType } from 'utils/date';
import MoreMenuModal from 'components/default/modal/MoreMenuModal';

interface IProps {
  item: IApplication;
  currentProcessType: processType;
  openModal: (parameter: {
    mode: modalModeType;
    processType?: string;
    applicationInfo: IApplication;
  }) => void;
  setFetchedProcessData: React.Dispatch<React.SetStateAction<any>>;
}

const KanbanCard = ({ item, currentProcessType, openModal, setFetchedProcessData }: IProps) => {
  const [moreMenuShow, setMoreMenuShow] = useState(false);

  function handleMoreMenu() {
    setMoreMenuShow(!moreMenuShow);
  }

  function handleEditButton() {
    openModal({ mode: 'simpleEdit', applicationInfo: item });
    setMoreMenuShow(false);
  }

  const [{ isDragging }, ref] = useDrag({
    type: 'card',
    item: item,

    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),

    end: async (draggedItem, monitor) => {
      const dropResult: { dropEffect: string; processType: processType } | null =
        monitor.getDropResult();

      if (dropResult) {
        if (dropResult.processType === 'TO_APPLY' || dropResult.processType === 'DOCUMENT') return;

        const response = await fetchApplicationStagesByProcessType(
          draggedItem.applicationId,
          dropResult.processType,
        );

        if (response.success) {
          const applicationInfo = {
            ...draggedItem,
            processDescription: response.data,
          };

          setFetchedProcessData(response.data);

          openModal({
            mode: 'updateCurrentProcess',
            applicationInfo,
            processType: dropResult.processType,
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
        <MoreMenuModal
          closeModal={() => setMoreMenuShow(false)}
          handleEditButton={handleEditButton}
          currentProcessType={currentProcessType}
        />
      )}
    </S.KanbanCardContainer>
  );
};

export default KanbanCard;
