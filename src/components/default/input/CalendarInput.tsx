import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledCalendarInput } from './CalendarInputStyledComponents';

type ProcessType = 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';

interface CalendarInputProps {
  onChange: (process: ProcessType, detailProcess: string, date: Date | null) => void;
  applicationType: 'edit' | 'default' | 'add';
  process?: ProcessType;
  detailProcess?: string;
  schedule?: Date | null;
}

export const CalendarInput = ({
  onChange,
  applicationType,
  process,
  detailProcess,
  schedule,
}: CalendarInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    schedule ? new Date(schedule) : null,
  );

  const getFormattedDate = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, "'M'월 'd'일");
      const formattedTime = format(date, "'HH'시 'mm'분");
      return `${detailProcess} ${formattedDate} ${formattedTime}`;
    }
    return `${detailProcess} 일정을 선택하세요`;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (process && detailProcess && date) {
      onChange(process, detailProcess, date);
    }
  };

  return (
    <StyledCalendarInput process={process}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText={
          process === 'COMPLETE'
            ? detailProcess === '최종합격'
              ? '합격을 축하드립니다!'
              : `${detailProcess}`
            : `${detailProcess} 일정을 선택하세요`
        }
        dateFormat={getFormattedDate(selectedDate)}
        showTimeSelect //시간도 선택할 수 있게
        timeFormat='HH:mm'
        timeIntervals={10}
        readOnly={applicationType === 'default' || process === 'COMPLETE' ? true : false}
      />
    </StyledCalendarInput>
  );
};
