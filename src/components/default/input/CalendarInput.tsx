import React from 'react';
import styled, { css } from 'styled-components';
import { Controller, UseControllerProps, FieldValues, Control, FieldPath } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface CalendarInputProps extends UseControllerProps {
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
  detailProcess?: string;
  control: Control<FieldValues>;
  name: FieldPath<FieldValues>;
}

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

const StyledCalendarInput = styled.div<CalendarInputProps>`
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
        <StyledCalendarInput control={control} process={process} {...field} {...rest}>
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
