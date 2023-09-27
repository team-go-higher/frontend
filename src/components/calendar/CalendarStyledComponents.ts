import styled from 'styled-components';
import { format, isSameMonth, isSameDay } from 'date-fns';

//Calendar
export const CalendarPage = styled.div`
  width: 996px;
  margin: auto;
  .calendar-detail {
    display: flex;
    flex-direction: row;
  }
`;

//CalendarContainer
export const CalendarContainer = styled.div`
  width: 735px;
  margin-right: 11px;
  border: 0.5px solid #ccc;
`;

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
  day: Date;
  monthStart: Date;
  selectedDate: Date;
  currentMonth: Date;
  onClick: () => void;
}

export const Cell = styled.div<CellProps>`
  width: 100%;
  height: 111px;
  border: 0.5px solid #ccc;
  font-size: 12px;
  font-weight: 500;
  color: #969696;
  .date {
    margin: 5px 7px 5px 80px;
  }
  ${props =>
    !isSameMonth(props.day, props.monthStart) &&
    `
    color: rgb(var(--border));
  `}
  ${props =>
    isSameDay(props.day, props.selectedDate) &&
    `
    border: 0.5px solid rgb(var(--main));
    color: rgb(var(--main));
    box-shadow: 0 0 6px 3px rgba(50, 83, 255, 0.225);
  `}
  ${props =>
    format(props.currentMonth, 'M') !== format(props.day, 'M') &&
    `
    color: rgb(var(--border));
  `}
`;

interface EventProps {
  processType: string;
}
export const Event = styled.div<EventProps>`
  width: 91px;
  height: 17px;
  margin: auto;
  margin-bottom: 1px;
  padding: 2.5px 5px;
  border-radius: 5px;
  color: white;
  background: ${({ processType }) => `rgb(--${processType})`};
`;

export const Row = styled.div`
  display: flex;
`;

//DayContainer
export const DayContainer = styled.div`
  width: 250px;
  height: 589px;
  border-radius: 15px;
  border: 1px solid rgb(var(--main));
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
`;

export const PlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 222px;
  margin: auto;
  height: 8.75rem;
  border: 1px solid rgb(var(--border));
  border-radius: 19px;
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
  box-sizing: border-box;
  width: 222px;
  height: 110px;
  margin: auto;
  margin-bottom: 9px;
  padding: 12px 21px;
  border-radius: 10px;
  border: 1px solid ${({ processType }) => `rgb(--${processType})`};
  div:nth-child(1) {
    color: #333;
    font-size: 22px;
    font-weight: 700;
  }
  div:nth-child(2) {
    color: ${({ processType }) => `rgb(--${processType})`};
    font-size: 17px;
    font-weight: 600;
  }
  div:nth-child(3) {
    color: #f55;
    font-size: 15px;
    font-weight: 600;
  }
`;
