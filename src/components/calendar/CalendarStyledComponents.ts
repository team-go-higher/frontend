import styled from 'styled-components';
import { isSameMonth, isSameDay } from 'date-fns';

//RenderHeader
export const RenderHeaderContainer = styled.div`
  display: flex;
  width: 213px;
  height: 50px;
  margin: 20px auto;
  justify-content: space-between;
  align-items: center;
  .month {
    font-size: 22px;
    font-weight: 700;
  }
  img {
    cursor: pointer;
  }
`;

//RenderDays
export const RenderDaysContainer = styled.div`
  display: flex;
  .daysRow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 33px;
    border: 0.5px solid #ccc;
    font-size: 17px;
    font-weight: 500;
    color: #363636;
  }
  .sat {
    color: rgb(var(--main));
  }
  .sun {
    color: #ff5555;
  }
`;

//RenderCells
export const RenderCellsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface CellProps {
  $day: Date;
  $selectedDate: Date;
  $currentMonth: Date;
}

export const Cell = styled.div<CellProps>`
  width: 100%;
  height: 111px;
  border: 0.5px solid #ccc;
  font-size: 12px;
  font-weight: 500;
  color: #969696;
  cursor: pointer;
  .date {
    width: 16px;
    height: 16px;
    margin: 4px 4px 2px 81px;
  }
  ${props =>
    !isSameMonth(props.$day, props.$currentMonth) &&
    `
    color: rgb(var(--border));
  `}
  ${props =>
    isSameDay(props.$day, props.$selectedDate) &&
    `
    border: 0.5px solid rgb(var(--main));
    color: rgb(var(--main));
    box-shadow: 0 0 6px 3px rgba(50, 83, 255, 0.225);
    .date{
      font-size: 14px;
      font-weight: 600;
    }
  `}
  .plus {
    margin-left: 4px;
    color: rgb(var(--main));
    font-size: 15px;
    font-weight: 600;
  }
`;

interface EventProps {
  $processType: string;
}
export const Event = styled.div<EventProps>`
  width: 99px;
  height: 22px;
  margin: auto;
  margin-bottom: 1px;
  padding: 5px 6px;
  border-radius: 5px;
  color: white;
  background: ${({ $processType }) => `rgb(var(--${$processType}))`};
`;

export const Row = styled.div`
  display: flex;
`;

// RenderDayDetail
export const DetailContainer = styled.div`
  .selectDate {
    display: flex;
    width: 213px;
    height: 50px;
    margin: 20px auto;
    justify-content: center;
    align-items: center;
  }
  .selectedDate {
    width: 120px;
    color: rgb(var(--main));
    text-align: center;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 1.4px;
    margin: 10px;
  }
  img {
    cursor: pointer;
  }
  .cardContainer {
    height: 485px;
    overflow-x: hidden;
  }
  .cardContainer::-webkit-scrollbar {
    width: 8px;
  }

  .cardContainer::-webkit-scrollbar-thumb {
    height: 30%;
    background: rgba(92, 92, 92, 0.4);
    border-radius: 10px;
  }

  .cardContainer::-webkit-scrollbar-track {
    background: rgba(92, 92, 92, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;

export const PlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 222px;
  margin: auto;
  height: 110px;
  border: 1px solid rgb(var(--border));
  border-radius: 10px;
  cursor: pointer;
`;

export const Circle = styled.div`
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

export const EventContainer = styled.div<EventProps>`
  position: relative;
  box-sizing: border-box;
  width: 222px;
  height: 110px;
  margin: auto;
  margin-bottom: 10px;
  padding: 14px 21px;
  border-radius: 10px;
  border: 1px solid ${({ $processType }) => `rgb(var(--${$processType}))`};
  border-top: 14px solid ${({ $processType }) => `rgb(var(--${$processType}))`};
  div {
    margin: 4px 0;
  }
  div:nth-child(1) {
    color: #333;
    font-size: 22px;
    font-weight: 700;
  }
  div:nth-child(2) {
    color: ${({ $processType }) => `rgb(var(--${$processType}))`};
    font-size: 17px;
    font-weight: 600;
  }
  div:nth-child(3) {
    color: #f55;
    font-size: 15px;
    font-weight: 600;
  }
`;

export const MoreIconDiv = styled.div`
  position: absolute;
  bottom: 7px;
  right: 16px;
  cursor: pointer;
`;

// UnscheduledContainer
export const RenderUnscheduledContainer = styled.div`
  margin: 100px 0;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  .arrow {
    cursor: pointer;
  }
  .text {
    color: #333;
    font-size: 25px;
    font-weight: 700;
  }
`;

export const CalendarCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;
