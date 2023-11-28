import { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from 'react-query';

import LeftIcon from 'assets/main/main_left_arrow.svg';
import RightIcon from 'assets/main/main_right_arrow.svg';
import KanbanList from 'components/kanban/KanbanList';
import KanbanCard from 'components/kanban/KanbanCard';
import ModalComponent from 'components/default/modal/ModalComponent';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { useModal } from 'hooks/useModal';
import { fetchKanbanList } from 'apis/kanban';
import { setApplications } from 'redux/kanbanSlice';

const Kanban = () => {
  const dispatch = useAppDispatch();
  const kanbanList = useAppSelector(state => state.kanban);
  const containerRef = useRef<HTMLDivElement>(null);
  const { modalIsOpen, openModal, closeModal, currentModalProcessName, mode, applicationInfo } =
    useModal();
  const { data, isLoading, isSuccess } = useQuery('fetchKanbanList', fetchKanbanList);

  const [fetchedProcessData, setFethedProcessData] = useState();

  function kanbanListHandler(processName: string): ReactElement[] {
    const filterdData = kanbanList?.filter(data => data.processType === processName)[0];
    let cards: ReactElement[] = [];

    if (filterdData?.applications.length > 0) {
      cards = filterdData?.applications.map((item, i) => (
        <KanbanCard
          key={`${i} key`}
          item={item}
          currentProcessName={processName}
          openModal={openModal}
          setFethedProcessData={setFethedProcessData}
        />
      ));
    }

    const addButton = (
      <PlusButton key={processName} onClick={() => openModal({ mode: 'add', processName })}>
        <Circle>+</Circle>
      </PlusButton>
    );

    if (filterdData?.applications.length > 0) {
      return [...cards, addButton];
    } else {
      return [addButton];
    }
  }

  function scrollButtonHandler(type: 'prev' | 'next') {
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

  if (!isLoading && isSuccess) {
    const kanbanList = data.data;
    dispatch(setApplications(kanbanList));
  }

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
        <KanbanHeaderContainer>
          <ScrollButton src={LeftIcon} onClick={() => scrollButtonHandler('prev')} />
          <Paragraph>채용보드</Paragraph>
          <ScrollButton src={RightIcon} onClick={() => scrollButtonHandler('next')} />
        </KanbanHeaderContainer>
        <KanbanBoardContainer ref={containerRef}>
          <KanbanList processName={'TO_APPLY'} openModal={openModal}>
            {kanbanListHandler('TO_APPLY')}
          </KanbanList>
          <KanbanList processName={'DOCUMENT'} openModal={openModal}>
            {kanbanListHandler('DOCUMENT')}
          </KanbanList>
          <KanbanList processName={'TEST'} openModal={openModal}>
            {kanbanListHandler('TEST')}
          </KanbanList>
          <KanbanList processName={'INTERVIEW'} openModal={openModal}>
            {kanbanListHandler('INTERVIEW')}
          </KanbanList>
          <KanbanList processName={'COMPLETE'} openModal={openModal}>
            {kanbanListHandler('COMPLETE')}
          </KanbanList>
        </KanbanBoardContainer>
      </div>
    </DndProvider>
  );
};

const KanbanHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  width: 213px;
  height: 50px;
`;

const Paragraph = styled.p`
  font-size: 22px;
  font-weight: 700;
`;

const ScrollButton = styled.img`
  cursor: pointer;
`;

const KanbanBoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex: 1;
  gap: 20px;
  margin: 0 auto;
  width: 1000px;
  overflow-x: auto;
`;

const PlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8.75rem;
  border: 1px solid rgb(var(--border));
  border-radius: 19px;
  cursor: pointer;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid rgb(var(--border));
  color: rgb(var(--border));
  background-color: rgb(var(--white));
`;

export default Kanban;
