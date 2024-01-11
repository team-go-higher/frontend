import { useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from '@tanstack/react-query';

import { useAppDispatch } from 'redux/store';
import { useModal } from 'hooks/feature/useModal';
import { fetchKanbanList } from 'apis/kanban';
import { setApplications } from 'redux/kanbanSlice';
import LeftIcon from 'assets/main/main_left_arrow.svg';
import RightIcon from 'assets/main/main_right_arrow.svg';
import * as S from './KanbanStyledComponents';
import { ModalViewModel, ModalView } from 'components/default';
import KanbanBoard from './KanbanBoard';
import { queryKey } from 'apis/queryKey';

const Kanban = () => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal, closeModal, mode, modalIsOpen, applicationInfo, currentProcessType } =
    useModal();
  const [fetchedProcessData, setFetchedProcessData] = useState();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [queryKey.KANBANLIST],
    queryFn: fetchKanbanList,
  });

  const modalViewModel = ModalViewModel({
    mode,
    closeModal,
    currentProcessType,
    fetchedProcessData,
    applicationInfo,
  });

  const handleArrowButton = (type: 'prev' | 'next') => {
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
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      const kanbanList = data.data;
      dispatch(setApplications(kanbanList));
    }
  }, [isLoading, isSuccess, data, dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <ModalView viewModel={modalViewModel} modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <div>
        <S.KanbanHeaderContainer>
          <S.ArrowButton src={LeftIcon} onClick={() => handleArrowButton('prev')} />
          <S.Paragraph>채용보드</S.Paragraph>
          <S.ArrowButton src={RightIcon} onClick={() => handleArrowButton('next')} />
        </S.KanbanHeaderContainer>
        <S.KanbanBoardContainer ref={containerRef}>
          <KanbanBoard openModal={openModal} setFetchedProcessData={setFetchedProcessData} />
        </S.KanbanBoardContainer>
      </div>
    </DndProvider>
  );
};

export default Kanban;
