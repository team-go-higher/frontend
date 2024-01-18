import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// 색상 바꾸기
// export 바꾸기
interface CalendarInputProps {
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
  detailProcess?: string;
}

export const TYPE_PROCESS = {
  DOCUMENT: css`
    color: rgba(255, 171, 196, 1);
  `,
  TEST: css`
    color: rgba(149, 112, 226, 1);
  `,
  INTERVIEW: css`
    color: rgba(96, 207, 254, 1);
  `,
  COMPLETE: css`
    color: rgba(255, 85, 85, 1);
  `,
};

const StyledCalendarInput = styled.div<CalendarInputProps>`
  .react-datepicker__input-container {
    height: 30px;
    border-radius: 5px;
    line-height: 30px;
    input {
      width: 300px;
      font-size: 14px;
      font-weight: 500;
      ${props => props.process && TYPE_PROCESS[props.process]};
      &::placeholder {
        font-size: 14px;
        font-weight: 500;
        ${props => props.process && TYPE_PROCESS[props.process]};
      }
    }
  }
`;

export const CalendarInput = ({ process = 'DOCUMENT', detailProcess }: CalendarInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const getFormattedDate = () => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'MM월 dd일');
      const formattedTime = format(selectedDate, 'HH시 mm분');
      return `${detailProcess} ${formattedDate} ${formattedTime}`;
    }
    return `${detailProcess} 일정을 선택하세요`;
  };

  return (
    <StyledCalendarInput process={process}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText={getFormattedDate()}
        dateFormat={getFormattedDate()}
        showTimeSelect
        timeFormat='HH:mm'
        timeIntervals={10}
      />
    </StyledCalendarInput>
  );
};
