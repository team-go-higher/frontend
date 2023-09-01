import React, { ReactElement, RefObject, useRef } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal, { Styles } from 'react-modal';

import KanbanList from '../../components/kanban/KanbanList';
import KanbanCard from '../../components/kanban/KanbanCard';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useModal } from '../../hooks/useModal';
import { addResume } from '../../redux/kanbanSlice';

const Kanban = () => {
  const dispatch = useAppDispatch();
  const kanbanProcessData = useAppSelector(state => state.kanban);
  const { modalIsOpen, openModal, closeModal, currentModalProcess } = useModal();
  const companyNameRef = useRef<HTMLInputElement>(null); // RefObject<T>
  const processNameRef = useRef<HTMLInputElement>(null);
  const jobRef = useRef<HTMLInputElement>(null);
  const scheduleRef = useRef<HTMLInputElement>(null);

  const modalStyles: Styles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 1000,
    },
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '21.25rem',
      height: '28.75rem',
      padding: '32px 50px 38px',
      borderRadius: '15px',
    },
  };

  function kanbanListHandler(processName: string): ReactElement[] {
    const cards = kanbanProcessData[processName].data.map((item, i) => (
      <KanbanCard key={`${i} key`} item={item} />
    ));

    const addButton = (
      <PlusButton key={processName} onClick={() => openModal(processName)}>
        <Circle>+</Circle>
      </PlusButton>
    );

    return [...cards, addButton];
  }

  function addResumeHandler(
    processName: string,
    companyNameRef: RefObject<HTMLInputElement>,
    processNameRef: RefObject<HTMLInputElement>,
    jobRef: RefObject<HTMLInputElement>,
    scheduleRef: RefObject<HTMLInputElement>,
  ) {
    const newResumeData = {
      id: 10,
      companyName: companyNameRef?.current?.value as string,
      currentProcess: currentModalProcess,
      detailProcess: processNameRef?.current?.value as string,
      job: jobRef?.current?.value as string,
      schedule: scheduleRef?.current?.value as string,
    };

    dispatch(addResume({ processName, newResumeData }));

    closeModal();
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanContainer>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='간편등록'
          style={modalStyles}
          id={currentModalProcess}
          appElement={document.getElementById('root') as HTMLBodyElement}>
          <ModalTitle>간편등록</ModalTitle>
          <ModalInputWrapper>
            <ModalInput placeholder='회사명을 입력하세요' ref={companyNameRef}></ModalInput>
            <ModalInput placeholder='진행단계를 선택하세요' ref={processNameRef}></ModalInput>
            <ModalInput placeholder='직무' ref={jobRef}></ModalInput>
            <ModalInput placeholder='마감일을 선택하세요' ref={scheduleRef}></ModalInput>
          </ModalInputWrapper>
          <HelperText>
            자세한 채용정보 등록은
            <br />
            일반등록 버튼을 눌러주세요
          </HelperText>
          <ModalButtonWrapper>
            <InModalButton mode='common' onClick={closeModal}>
              일반등록
            </InModalButton>
            <InModalButton
              mode='simple'
              onClick={() =>
                addResumeHandler(
                  currentModalProcess,
                  companyNameRef,
                  processNameRef,
                  jobRef,
                  scheduleRef,
                )
              }>
              간편등록
            </InModalButton>
          </ModalButtonWrapper>
        </Modal>
        <KanbanList processName={'toApply'}>{kanbanListHandler('toApply')}</KanbanList>
        <KanbanList processName={'resumeScreening'}>
          {kanbanListHandler('resumeScreening')}
        </KanbanList>
        <KanbanList processName={'test'}>{kanbanListHandler('test')}</KanbanList>
        <KanbanList processName={'interview'}>{kanbanListHandler('interview')}</KanbanList>
        <KanbanList processName={'complete'}>{kanbanListHandler('complete')}</KanbanList>
      </KanbanContainer>
    </DndProvider>
  );
};

const KanbanContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 10px;
  max-height: 700px;
  overflow: auto;
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

const ModalTitle = styled.h1`
  font-size: 38px;
  color: rgb(var(--blueText));
  font-weight: 700;
`;

const ModalInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ModalInput = styled.input`
  width: 15.375rem;
  padding: 14px 26px 16px;
  border: 1px solid rgb(var(--inputBorder));
  border-radius: 10px;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const InModalButton = styled.button<{ mode: string }>`
  width: 7.5rem;
  padding: 10px 28px;
  border-radius: 50px;
  border: 1px solid rgb(var(--blueText));
  font-size: 15px;
  font-weight: 600;

  ${({ mode }) =>
    mode === 'simple'
      ? `background-color : rgb(var(--white)); color : rgb(var(--blueText))`
      : `background-color : rgb(var(--blueText)); color : rgb(var(--white));`};
`;

const HelperText = styled.div`
  text-align: center;

  font-size: 17px;
  font-weight: 500;
  color: rgb(var(--modalHelperText));
`;
export default Kanban;
