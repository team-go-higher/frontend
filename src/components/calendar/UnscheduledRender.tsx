import { queryKeys } from 'apis/queryKeys';
import { ModalView, ModalViewModel } from 'components/default';
import { useApplicationModal } from 'hooks/feature/useApplicationModal';
import { IUnscheduledData } from 'types/interfaces/CalendarProcess';
import * as S from './CalendarStyledComponents';
import { CalendarCard } from './CalendarCard';

interface RenderUnscheduledProps {
  unscheduledData: IUnscheduledData;
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
}

const UnscheduledRender = ({
  unscheduledData,
  currentPage,
  prevPage,
  nextPage,
}: RenderUnscheduledProps) => {
  const { openModal, closeModal, mode, modalIsOpen, applicationInfo, currentProcessType } =
    useApplicationModal();

  const modalViewModel = ModalViewModel({
    mode,
    queryKey: [queryKeys.CALENDAR],
    closeModal,
    currentProcessType,
    applicationInfo,
  });

  return (
    <S.RenderUnscheduledContainer>
      <ModalView viewModel={modalViewModel} modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <S.TitleSection>
        <div className='arrow' onClick={prevPage}>
          {currentPage > 1 ? '◁' : ''}
        </div>
        <p className='text'>전형일을 기다리고 있어요</p>
        <div className='arrow' onClick={nextPage}>
          {unscheduledData.hasNext ? '▷' : ''}
        </div>
      </S.TitleSection>
      <S.CalendarCardDiv>
        {unscheduledData.content.map((event: any) => (
          <CalendarCard
            key={event.applicationId}
            event={event}
            openModal={openModal}></CalendarCard>
        ))}
      </S.CalendarCardDiv>
    </S.RenderUnscheduledContainer>
  );
};

export default UnscheduledRender;
