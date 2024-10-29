import React, { ReactElement } from 'react';
import { useAppSelector } from 'redux/store';
import { modalModeType } from 'hooks/feature/useApplicationModal';
import { processTypeList } from 'constants/process';
import { IApplication, IKabanData } from 'types/interfaces/KanbanProcess';
import * as S from './KanbanStyledComponents';
import { KanbanList, KanbanCard } from 'components/kanban';
import { initialApplicationInfo } from 'constants/application';
import { ProcessType } from 'types/interfaces/Common';

interface KanbanBoardProps {
  openModal: (parameter: {
    mode: modalModeType;
    processType?: ProcessType;
    applicationInfo: IApplication;
  }) => void;
  setFetchedProcessData: React.Dispatch<React.SetStateAction<any>>;
}

const KanbanBoard = ({ openModal, setFetchedProcessData }: KanbanBoardProps) => {
  const kanbanList: IKabanData[] = useAppSelector(state => state.kanban);

  function kanbanListHandler(processType: ProcessType): ReactElement[] | ReactElement {
    if (kanbanList) {
      const applicationListByProcessType = kanbanList.filter(
        data => data.processType === processType,
      )[0];
      let cards: ReactElement[] = [];

      const addButton = (
        <S.PlusButton
          key={processType}
          onClick={() =>
            openModal({
              mode: 'simpleRegister',
              processType,
              applicationInfo: initialApplicationInfo,
            })
          }>
          <S.Circle>+</S.Circle>
        </S.PlusButton>
      );

      if (applicationListByProcessType) {
        cards = applicationListByProcessType.applications.map((item, i) => (
          <KanbanCard
            key={`${i} key`}
            item={item}
            currentProcessType={processType}
            openModal={openModal}
            setFetchedProcessData={setFetchedProcessData}
          />
        ));

        return [...cards, addButton];
      } else {
        return [addButton];
      }
    } else return <></>;
  }

  return (
    <>
      {processTypeList
        .filter(process => process !== 'COMPLETE')
        .map(processType => (
          <KanbanList key={processType} processType={processType}>
            {kanbanListHandler(processType)}
          </KanbanList>
        ))}
    </>
  );
};

export default KanbanBoard;
