import { useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from '@tanstack/react-query';

import { useAppDispatch } from 'redux/store';
import { useApplicationModal } from 'hooks/feature/useApplicationModal';
import { fetchKanbanList } from 'apis/kanban';
import { setApplications } from 'redux/kanbanSlice';
import * as S from './KanbanStyledComponents';
import { ModalViewModel, ModalView } from 'components/default';
import KanbanBoard from './KanbanBoard';
import { queryKeys } from 'apis/queryKeys';

const Kanban = () => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal, closeModal, mode, modalIsOpen, applicationInfo, currentProcessType } =
    useApplicationModal();
  const [fetchedProcessData, setFetchedProcessData] = useState();

  const {
    data: kanbanList,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [queryKeys.KANBAN, 'fetchKanbanList'],
    queryFn: fetchKanbanList,
  });

  const modalViewModel = ModalViewModel({
    mode,
    queryKey: [queryKeys.KANBAN],
    closeModal,
    currentProcessType,
    fetchedProcessData,
    applicationInfo,
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      dispatch(setApplications(kanbanList.data));
    }
  }, [isLoading, isSuccess, kanbanList, dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <ModalView viewModel={modalViewModel} modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <S.KanbanContainer>
        <S.KanbanHeaderContainer>
          <S.Paragraph>채용보드</S.Paragraph>
        </S.KanbanHeaderContainer>
        <S.KanbanBoardContainer ref={containerRef}>
          <KanbanBoard openModal={openModal} setFetchedProcessData={setFetchedProcessData} />
        </S.KanbanBoardContainer>
      </S.KanbanContainer>
    </DndProvider>
  );
};

export default Kanban;
