import React, { ReactElement } from 'react';
import { useAppSelector } from 'redux/store';
import { modalModeType } from 'hooks/feature/useModal';
import { processTypeList } from 'constants/process';
import { IApplication, IKabanData, processType } from 'types/interfaces/KanbanProcess';
import * as S from './KanbanStyledComponents';
import { KanbanList, KanbanCard } from 'components/kanban';
import { initialApplicationInfo } from 'constants/application';

interface IProps {
  openModal: (parameter: {
    mode: modalModeType;
    processType?: string;
    applicationInfo: IApplication;
  }) => void;
  setFetchedProcessData: React.Dispatch<React.SetStateAction<any>>;
}

const KanbanBoard = ({ openModal, setFetchedProcessData }: IProps) => {
  const kanbanList: IKabanData[] = useAppSelector(state => state.kanban);

  function kanbanListHandler(processType: processType): ReactElement[] | ReactElement {
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
      {processTypeList.map(processType => (
        <KanbanList key={processType} processType={processType}>
          {kanbanListHandler(processType)}
        </KanbanList>
      ))}
    </>
  );
};

export default KanbanBoard;
