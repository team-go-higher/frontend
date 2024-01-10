import React from 'react';
import styled from 'styled-components';
import { UseControllerProps, useController } from 'react-hook-form';

interface StyledTextFieldProps {
  error?: boolean;
}

const StyledTextField = styled.input<StyledTextFieldProps>`
  width: 100%;
  height: 40px;
  padding: 0 18px;
  font-size: 15px;
  line-height: 48px;
  margin: 0;
  outline: none;
  border: 0.5px solid ${({ error }) => (error ? `rgb(var(--redText))` : `rgb(var(--inputBorder))`)};
  border-radius: 10px;
  transition:
    background 0.2s ease,
    color 0.1s ease,
    box-shadow 0.2s ease;
  &:focus {
    box-shadow: inset 0 0 0 2px
      ${({ error }) => (error ? `rgb(var(--redText))` : `rgb(var(--inputBorder))`)};
  }
  &::placeholder {
    color: rgb(var(--inputBorder));
  }
`;

interface InputProps extends UseControllerProps {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  control,
  name,
  defaultValue = '',
  error,
  ...rest
}) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });

  return (
    <div>
      <StyledTextField {...field} error={error} {...rest} />
    </div>
  );
};
