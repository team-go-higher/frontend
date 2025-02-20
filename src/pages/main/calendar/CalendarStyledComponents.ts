import styled from 'styled-components';

//Calendar
export const CalendarPage = styled.div`
  width: 996px;
  margin: auto;
`;

export const CalenderSection = styled.section`
  display: flex;
`;

//CalendarContainer
export const CalendarContainer = styled.div`
  width: 735px;
  margin-right: 11px;
  border: 0.5px solid #ccc;
`;

//DayContainer
export const DayContainer = styled.div`
  width: 250px;
  height: 589px;
  border-radius: 15px;
  border: 1px solid rgb(var(--main));
`;

// UnscheduledContainer
export const UnscheduledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 262px;
`;
