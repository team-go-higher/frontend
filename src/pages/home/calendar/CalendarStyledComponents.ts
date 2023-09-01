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

interface EventProps {
  process: string;
}
export const Event = styled.div<EventProps>`
  width: 91px;
  height: 17px;
  margin: auto;
  margin-bottom: 1px;
  padding: 2.5px 5px;
  border-radius: 5px;
  color: white;
  ${({ process }) => {
    type Color = string;

    const colors: { [key: string]: Color } = {
      '0': '#A2E270',
      '1': '#60CFFE',
      '2': '#FEAC60',
      '3': '#9570E2',
    };

    return `
      background: ${colors[process]};
    `;
  }}
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
  height: 589px;
  border-radius: 15px;
  border: 1px solid #3253ff;
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
    color: #3253ff;
    text-align: center;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 1.4px;
    margin: 10px;
  }
`;

export const EventContainer = styled.div<EventProps>`
  box-sizing: border-box;
  width: 222px;
  height: 110px;
  margin: auto;
  margin-bottom: 9px;
  padding: 12px 21px;
  border-radius: 10px;

  ${({ process }) => {
    type Color = string;

    const colors: { [key: string]: Color } = {
      '0': '#A2E270',
      '1': '#60CFFE',
      '2': '#FEAC60',
      '3': '#9570E2',
    };

    return `
      border: 1px solid ${colors[process]};
      border-top: 14px solid ${colors[process]};

      div:nth-child(1) {
        color: #333;
        font-size: 22px;
        font-weight: 700;
      }
      div:nth-child(2) {
        color: ${colors[process]};
        font-size: 17px;
        font-weight: 600;
      }
      div:nth-child(3) {
        color: #f55;
        font-size: 15px;
        font-weight: 600;
      }
    `;
  }}
`;
