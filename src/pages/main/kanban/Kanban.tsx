import React, { ReactElement, useRef } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import LeftIcon from 'assets/main/main_left_arrow.svg';
import RightIcon from 'assets/main/main_right_arrow.svg';
import KanbanList from 'components/kanban/KanbanList';
import KanbanCard from 'components/kanban/KanbanCard';
import ModalComponent from 'components/default/modal/ModalComponent';
import { useAppSelector } from 'redux/store';
import { useModal } from 'hooks/useModal';

const Kanban = () => {
  const kanbanProcessData = useAppSelector(state => state.kanban);
  const { modalIsOpen, openModal, closeModal, currentModalProcess } = useModal();

  const containerRef = useRef<HTMLDivElement>(null);

  function kanbanListHandler(processName: string): ReactElement[] {
    const filterdData = kanbanProcessData?.filter(data => data.processType === processName)[0];

    const cards = filterdData.applications.map((item, i) => (
      <KanbanCard key={`${i} key`} item={item} currentProcessName={processName} />
    ));

    const addButton = (
      <PlusButton key={processName} onClick={() => openModal(processName, 'normal')}>
        <Circle>+</Circle>
      </PlusButton>
    );

    return [...cards, addButton];
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <KanbanHeaderContainer>
          <ScrollButton src={LeftIcon} onClick={() => scrollButtonHandler('prev')} />
          <Paragraph>채용보드</Paragraph>
          <ScrollButton src={RightIcon} onClick={() => scrollButtonHandler('next')} />
        </KanbanHeaderContainer>
        <KanbanBoardContainer ref={containerRef}>
          <ModalComponent
            isEditMode={false}
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            currentModalProcess={currentModalProcess}
          />
          <KanbanList processName={'TO_APPLY'}>{kanbanListHandler('TO_APPLY')}</KanbanList>
          <KanbanList processName={'DOCUMENT'}>{kanbanListHandler('DOCUMENT')}</KanbanList>
          <KanbanList processName={'TEST'}>{kanbanListHandler('TEST')}</KanbanList>
          <KanbanList processName={'INTERVIEW'}>{kanbanListHandler('INTERVIEW')}</KanbanList>
          <KanbanList processName={'COMPLETE'}>{kanbanListHandler('COMPLETE')}</KanbanList>
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
