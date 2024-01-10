import React from 'react';
import { format } from 'date-fns';
import { CalendarCard } from './CalendarCard';
import dayLeft from 'assets/calendar/calendar_day_left_arrow.svg';
import dayRight from 'assets/calendar/calendar_day_right_arrow.svg';
import {
  DetailContainer,
  PlusButton,
  Circle,
  RenderUnscheduledContainer,
} from './CalendarStyledComponents';
import { IDetailData, IUnscheduledData } from 'types/interfaces/CalendarProcess';

// 일별로 띄우기
interface RenderDetailProps {
  selectedDate: Date;
  prevDay: () => void;
  nextDay: () => void;
  detailData: IDetailData[];
}

export const RenderDetail = ({ selectedDate, prevDay, nextDay, detailData }: RenderDetailProps) => {
  return (
    <DetailContainer>
      <div className='selectDate'>
        <img src={dayLeft} alt='dayLeft' onClick={prevDay} />
        <div className='selectedDate'>{format(selectedDate, 'd, eee').toLowerCase()}</div>
        <img src={dayRight} alt='dayRight' onClick={nextDay} />
      </div>
      <div className='cardContainer'>
        {detailData &&
          detailData.map((event, i) => <CalendarCard key={i} event={event}></CalendarCard>)}
        {/* <div>{calendarHandler()}</div> 모달 띄우는 함수였음*/}
      </div>
    </DetailContainer>
  );
};

// 전형일 없는 것 띄우기
interface RenderUnscheduledProps {
  unscheduledData: IUnscheduledData;
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
}

export const RenderUnscheduled = ({
  unscheduledData,
  currentPage,
  prevPage,
  nextPage,
}: RenderUnscheduledProps) => {
  return (
    <RenderUnscheduledContainer>
      <div>
        <div className='text'>전형일을 기다리고 있어요</div>
        <div className='card'>
          {currentPage > 1 && <div onClick={prevPage}>◁</div>}
          {unscheduledData.content.map((event: any) => (
            <CalendarCard key={event.applicationId} event={event}></CalendarCard>
          ))}
          {unscheduledData.hasNext && <div onClick={nextPage}>▷</div>}
        </div>
      </div>
    </RenderUnscheduledContainer>
  );
};
