import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledCalendarInput } from './CalendarInputStyledComponents';

type ProcessType = 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';

interface CalendarInputProps {
  onChange: (date: Date | null) => void;
  process?: ProcessType;
  detailProcess?: string;
}

export const CalendarInput = ({ onChange, process, detailProcess }: CalendarInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getFormattedDate = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, 'M') + '월' + format(date, 'd') + '일';
      const formattedTime = format(date, 'HH') + '시' + format(date, 'mm') + '분';
      return `${detailProcess} ${formattedDate} ${formattedTime}`;
    }
    return `${detailProcess} 일정을 선택하세요`;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (process && detailProcess) {
      onChange(date);
    }
  };

  return (
    <StyledCalendarInput process={process}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText={`${detailProcess} 일정을 선택하세요`}
        dateFormat={getFormattedDate(selectedDate)}
        showTimeSelect //시간도 선택할 수 있게
        timeFormat='HH:mm'
        timeIntervals={10}
      />
    </StyledCalendarInput>
  );
};
