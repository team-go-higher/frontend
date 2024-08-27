import styled from 'styled-components';
import { UseControllerProps, useController, FieldValues } from 'react-hook-form';

interface InputProps extends UseControllerProps<FieldValues> {
  error: boolean;
  label: string;
  isRequired: boolean;
}

const StyledInput = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 10px 18px;
  box-sizing: border-box;
  font-size: 15px;
  border: 0.5px solid ${props => (props.error ? `rgb(var(--redText))` : `rgb(var(--inputBorder))`)};
  border-radius: 10px;
  resize: none;
`;

export const Input = ({
  control,
  name,
  defaultValue = '',
  error,
  isRequired,
  ...rest
}: InputProps) => {
  const placeholder = isRequired ? '필수 입력' : '선택 입력';

  const { field } = useController({
    defaultValue,
    name,
    control,
    rules: isRequired ? { required: '값을 입력해주세요' } : {},
  });

  return (
    <StyledInput
      {...field}
      error={error}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};
