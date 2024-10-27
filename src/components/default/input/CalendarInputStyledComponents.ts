import styled from 'styled-components';
import { TYPE_PROCESS } from 'styles/processColor';

export const StyledCalendarInput = styled.div<{
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
}>`
  width: 100%;

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__header {
    background-color: rgb(var(--main));
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker-time__header {
    color: rgb(var(--white));
  }

  .react-datepicker__day,
  .react-datepicker__day:hover {
    border-radius: 50%;
  }

  .react-datepicker__day--selected {
    background-color: rgb(var(--main));
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list {
    overflow-x: hidden;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list::-webkit-scrollbar {
    width: 10px;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list::-webkit-scrollbar-thumb {
    height: 30%;
    background: rgba(92, 92, 92, 0.4);
    border-radius: 10px;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list::-webkit-scrollbar-track {
    background: rgba(92, 92, 92, 0.1);
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: rgb(var(--main));
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    input {
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      color: ${({ process }) => process && TYPE_PROCESS[process]};
      &::placeholder {
        font-size: 14px;
        font-weight: 500;
        color: ${({ process }) => process && TYPE_PROCESS[process]};
      }
      background-color: transparent;
    }
  }
`;
