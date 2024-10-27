import React from 'react';
import { format } from 'date-fns';
import { CalendarCard } from './CalendarCard';
import dayLeft from 'assets/calendar/calendar_day_left_arrow.svg';
import dayRight from 'assets/calendar/calendar_day_right_arrow.svg';
import * as S from './CalendarStyledComponents';
import { IDetailData } from 'types/interfaces/CalendarProcess';
import { useModal } from 'hooks/feature/useModal';
import { ModalView, ModalViewModel } from 'components/default';
import { queryKeys } from 'apis/queryKeys';

interface RenderDetailProps {
  selectedDate: Date;
  prevDay: () => void;
  nextDay: () => void;
  detailData: IDetailData[];
}

const DetailRender = ({ selectedDate, prevDay, nextDay, detailData }: RenderDetailProps) => {
  const { openModal, closeModal, mode, modalIsOpen, applicationInfo, currentProcessType } =
    useModal();

  const modalViewModel = ModalViewModel({
    mode,
    queryKey: [queryKeys.CALENDAR],
    closeModal,
    currentProcessType,
    applicationInfo,
  });

  return (
    <S.DetailContainer>
      <ModalView viewModel={modalViewModel} modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <div className='selectDate'>
        <img src={dayLeft} alt='dayLeft' onClick={prevDay} />
        <div className='selectedDate'>{format(selectedDate, 'd, eee')}</div>
        <img src={dayRight} alt='dayRight' onClick={nextDay} />
      </div>
      <div className='cardContainer'>
        {detailData &&
          detailData.map((event, i) => (
            <CalendarCard key={i} event={event} openModal={openModal}></CalendarCard>
          ))}
        <S.PlusButton>
          <S.Circle
            onClick={() =>
              openModal({
                mode: 'simpleRegister',
                processType: 'TO_APPLY',
                applicationInfo,
                schedule: format(selectedDate, "yyyy-MM-dd'T'00:00"),
              })
            }>
            +
          </S.Circle>
        </S.PlusButton>
      </div>
    </S.DetailContainer>
  );
};

export default DetailRender;
