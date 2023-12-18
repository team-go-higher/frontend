import { ReactElement, useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from 'react-query';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { useModal } from 'hooks/useModal';
import { fetchKanbanList } from 'apis/kanban';
import { setApplications } from 'redux/kanbanSlice';
import { IKabanData, processType } from 'types/interfaces/KanbanProcess';
import { processTypeList } from 'constants/process';
import LeftIcon from 'assets/main/main_left_arrow.svg';
import RightIcon from 'assets/main/main_right_arrow.svg';
import * as S from './KanbanStyledComponents';
import { KanbanList, KanbanCard } from 'components/kanban';
import { ModalViewModel, ModalView } from 'components/default';

const initialApplicationInfo = {
  applicationId: 0,
  companyName: '',
  position: '',
  process: {
    id: 0,
    type: '',
    description: '',
    schedule: '',
  },
  specificPosition: null,
};

const Kanban = () => {
  const dispatch = useAppDispatch();
  const kanbanList: IKabanData[] = useAppSelector(state => state.kanban);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal, closeModal, mode, modalIsOpen, applicationInfo, currentProcessType } =
    useModal();
  const [fetchedProcessData, setFetchedProcessData] = useState();

  const { data, isLoading, isSuccess } = useQuery('fetchKanbanList', fetchKanbanList);
  const modalViewModel = ModalViewModel({
    mode,
    modalIsOpen,
    closeModal,
    currentProcessType,
    fetchedProcessData,
    applicationInfo,
  });

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
