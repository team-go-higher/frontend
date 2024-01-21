import styled, { css } from 'styled-components';

export const TYPE_PROCESS = {
  DOCUMENT: css`
    color: rgb(var(--defaultPink));
  `,
  TEST: css`
    color: rgb(var(--defaultPurple));
  `,
  INTERVIEW: css`
    color: rgb(var(--defaultSkyblue));
  `,
  COMPLETE: css`
    color: rgb(var(--defaultRed));
  `,
};

export const StyledCalendarInput = styled.div<{
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
}>`
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

  .react-datepicker__input-container {
    height: 30px;
    border-radius: 5px;
    line-height: 30px;
    input {
      width: 300px;
      font-size: 14px;
      font-weight: 500;
      ${({ process }) => process && TYPE_PROCESS[process]};
      &::placeholder {
        font-size: 14px;
        font-weight: 500;
        ${({ process }) => process && TYPE_PROCESS[process]};
      }
    }
  }
`;
