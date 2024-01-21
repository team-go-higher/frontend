import React from 'react';
import styled, { css } from 'styled-components';
import { Controller, UseControllerProps, FieldValues, Control, FieldPath } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledCalendarInput } from './CalendarInputStyledComponents';

interface CalendarInputProps extends UseControllerProps {
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
  detailProcess?: string;
  control: Control<FieldValues>;
  name: FieldPath<FieldValues>;
}

export const CalendarInput = ({
  control,
  name,
  process,
  detailProcess,
  ...rest
}: CalendarInputProps) => {
  const getFormattedDate = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, "MM'월' dd'일'");
      const formattedTime = format(date, "HH'시' mm'분'");
      return `${detailProcess} ${formattedDate} ${formattedTime}`;
    }
    return `${detailProcess} 일정을 선택하세요`;
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => (
        <StyledCalendarInput process={process} {...field} {...rest}>
          <DatePicker
            value={''}
            selected={field.value}
            onChange={date => field.onChange(date)}
            placeholderText={getFormattedDate(field.value)}
            dateFormat={getFormattedDate(field.value)}
            showTimeSelect //시간도 선택할 수 있게
            timeFormat='HH:mm'
            timeIntervals={10}
          />
        </StyledCalendarInput>
      )}
    />
  );
};
