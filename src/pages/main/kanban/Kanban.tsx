import { ReactElement, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from 'react-query';

import LeftIcon from 'assets/main/main_left_arrow.svg';
import RightIcon from 'assets/main/main_right_arrow.svg';
import KanbanList from 'components/kanban/KanbanList/KanbanList';
import KanbanCard from 'components/kanban/KanbanCard/KanbanCard';
import ModalComponent from 'components/default/modal/ModalComponent';
import * as S from './KanbanStyledComponents';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { useModal } from 'hooks/useModal';
import { fetchKanbanList } from 'apis/kanban';
import { setApplications } from 'redux/kanbanSlice';
import { IkabanData } from 'types/interfaces/KanbanProcess';
import { processTypeList } from 'constants/process';

const Kanban = () => {
  const dispatch = useAppDispatch();
  const kanbanList: IkabanData[] = useAppSelector(state => state.kanban);
  const containerRef = useRef<HTMLDivElement>(null);
  const { modalIsOpen, openModal, closeModal, currentModalProcessName, mode, applicationInfo } =
    useModal();

  const [fetchedProcessData, setFetchedProcessData] = useState();

  const { data, isLoading, isSuccess } = useQuery('fetchKanbanList', fetchKanbanList);

  if (!isLoading && isSuccess) {
    const kanbanList = data.data;
    dispatch(setApplications(kanbanList));
  }

  function kanbanListHandler(processType: string): ReactElement[] | ReactElement {
    if (kanbanList) {
      const kanbanListByProcessType = kanbanList.filter(
        data => data.processType === processType,
      )[0];
      let cards: ReactElement[] = [];

      const addButton = (
        <S.PlusButton
          key={processType}
          onClick={() => openModal({ mode: 'add', processName: processType })}>
          <S.Circle>+</S.Circle>
        </S.PlusButton>
      );

      if (kanbanListByProcessType) {
        cards = kanbanListByProcessType.applications.map((item, i) => (
          <KanbanCard
            key={`${i} key`}
            item={item}
            currentProcessType={processType}
            openModal={openModal}
            setFethedProcessData={setFetchedProcessData}
          />
        ));

        return [...cards, addButton];
      } else {
        return [addButton];
      }
    } else return <></>;
  }

  function handleArrowButton(type: 'prev' | 'next') {
    if (!containerRef.current) return;

    if (type === 'prev') {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - containerRef.current.offsetWidth,
        behavior: 'smooth',
      });
    } else {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + containerRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }

  if (isLoading) return <div>로딩중...</div>;
  else
    return (
      <DndProvider backend={HTML5Backend}>
        <ModalComponent
          mode={mode}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          currentModalProcess={currentModalProcessName}
          fetchedProcessData={fetchedProcessData}
          applicationInfo={applicationInfo}
        />
        <div>
          <S.KanbanHeaderContainer>
            <S.ArrowButton src={LeftIcon} onClick={() => handleArrowButton('prev')} />
            <S.Paragraph>채용보드</S.Paragraph>
            <S.ArrowButton src={RightIcon} onClick={() => handleArrowButton('next')} />
          </S.KanbanHeaderContainer>
          <S.KanbanBoardContainer ref={containerRef}>
            {processTypeList.map(processType => (
              <KanbanList key={processType} processType={processType}>
                {kanbanListHandler(processType)}
              </KanbanList>
            ))}
          </S.KanbanBoardContainer>
        </div>
      </DndProvider>
    );
};

export default Kanban;
