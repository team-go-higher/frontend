import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarCard } from './CalendarCard';
import dayLeft from 'assets/calendar/calendar_day_left_arrow.svg';
import dayRight from 'assets/calendar/calendar_day_right_arrow.svg';
import { DetailContainer, PlusButton, Circle } from './CalendarStyledComponents';
import ModalComponent from 'components/default/modal/ModalComponent';
import { useModal } from 'hooks/useModal';
import { IDetailData } from 'types/interfaces/CalendarProcess';

interface RenderDetailHeaderProps {
  selectedDate: Date;
  prevDay: () => void;
  nextDay: () => void;
  detailData: [];
}

export const RenderDetailHeader: React.FC<RenderDetailHeaderProps> = ({
  selectedDate,
  prevDay,
  nextDay,
  detailData,
}) => {
  const { modalIsOpen, openModal, closeModal, currentModalProcess } = useModal();

  function calendarHandler() {
    const addButton = (
      <PlusButton key={1} onClick={() => openModal('')}>
        <Circle>+</Circle>
      </PlusButton>
    );

    return addButton;
  }

  return (
    <DetailContainer>
      <div className='selectDate'>
        <img src={dayLeft} alt='dayLeft' onClick={prevDay} />
        <div className='selectedDate'>{format(selectedDate, 'd, eee').toLowerCase()}</div>
        <img src={dayRight} alt='dayRight' onClick={nextDay} />
      </div>
      <ModalComponent
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        currentModalProcess={currentModalProcess}
      />
      {detailData &&
        detailData.map((event, i) => <CalendarCard key={i} event={event}></CalendarCard>)}
      <div>{calendarHandler()}</div>
    </DetailContainer>
  );
};
