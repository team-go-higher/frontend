import React from 'react';
import styled from 'styled-components';
import {
  UseControllerProps,
  useController,
  Control,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

const StyledTextField = styled.input<{ error?: boolean }>`
  width: 100%;
  height: 40px;
  padding: 0 18px;
  font-size: 15px;
  line-height: 48px;
  margin: 0;
  outline: none;
  border: 0.5px solid ${props => (props.error ? `rgb(var(--redText))` : `rgb(var(--inputBorder))`)};
  border-radius: 10px;
  transition:
    background 0.2s ease,
    color 0.1s ease,
    box-shadow 0.2s ease;
  &:focus {
    box-shadow: inset 0 0 0 2px
      ${props => (props.error ? `rgb(var(--redText))` : `rgb(var(--inputBorder))`)};
  }
  &::placeholder {
    color: rgb(var(--inputBorder));
  }
`;

interface InputProps extends UseControllerProps {
  error?: boolean;
  placeholder?: string;
  label: string;
  control: Control<FieldValues>;
  name: FieldPath<FieldValues>;
  isRequired: boolean;
}

export const Input = ({
  control,
  name,
  defaultValue = '',
  error,
  placeholder,
  isRequired,
  ...rest
}: InputProps) => {
  const { field } = useController({
    defaultValue,
    name,
    control,
    rules: isRequired
      ? {
          required: { value: true, message: '값을 입력해주세요' },
        }
      : {},
  });

  return <StyledTextField {...field} error={error} placeholder={placeholder} {...rest} />;
};
