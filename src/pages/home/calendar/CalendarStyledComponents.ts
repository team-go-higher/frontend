import styled from 'styled-components';
import { format, isSameMonth, isSameDay } from 'date-fns';

export const CalendarPage = styled.div`
  display: flex;
  width: 1070px;
  height: 600px;
  margin: 0 5vw;
  border: 1px solid gray;
`;

//CalendarContainer
export const CalendarContainer = styled.div`
  width: 826px;
  height: 600px;
  margin: 0 5px;
  border: 1px solid blue;
`;

//RenderHeader
export const RenderHeaderContainer = styled.div`
  display: flex;
  width: 213px;
  height: 50px;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  border: 1px solid pink;
`;
export const RenderHeaderMonth = styled.div`
  display: flex;
  height: 50px;
  margin:;
`;

//RenderDays
interface DayProps {
  rowKey: number;
}

export const DaysRow = styled.div<DayProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 33px;
  border: 0.5px solid #ccc;
  font-size: 17px;
  font-weight: 500;
  color: #363636;
  ${props =>
    props.rowKey === 6 &&
    `
    color: #3253FF;
  `}
  ${props =>
    props.rowKey === 0 &&
    `
    color: #FF5555;
  `}
`;

//RenderCells
interface CellProps {
  day: Date;
  monthStart: Date;
  selectedDate: Date;
  currentMonth: Date;
  onClick: () => void;
}

export const Cell = styled.div<CellProps>`
  display: flex;
  justify-content: right;
  width: 100%;
  height: 100px;
  border: 0.5px solid #ccc;
  font-size: 12px;
  font-weight: 500;
  color: #969696;
  ${props =>
    !isSameMonth(props.day, props.monthStart) &&
    `
    color: #D9D9D9;
  `}
  ${props =>
    isSameDay(props.day, props.selectedDate) &&
    `
    border: 0.5px solid #3253FF;
    color: #3253FF;
    box-shadow: 0 0 6px 3px rgba(50, 83, 255, 0.225);
  `}
  ${props =>
    format(props.currentMonth, 'M') !== format(props.day, 'M') &&
    `
    color: #D9D9D9;
  `}
`;
export const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Row = styled.div`
  display: flex;
`;

//DayContainer
export const DayContainer = styled.div`
  width: 250px;
  height: 600px;
  border: 1px solid pink;
`;
