import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { UseControllerProps, useController } from 'react-hook-form';

interface TextareaProps extends UseControllerProps {
  error: boolean;
  label: string;
  isRequired: boolean;
}

const StyledTextarea = styled(TextareaAutosize)<{ error?: boolean }>`
  width: 100%;
  padding: 10px 18px;
  box-sizing: border-box;
  font-size: 15px;
  border: 0.5px solid ${props => (props.error ? `rgb(var(--redText))` : `rgb(var(--inputBorder))`)};
  border-radius: 10px;
  resize: none;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: rgba(92, 92, 92, 0.4);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(92, 92, 92, 0.1);
  }
`;

export const Textarea = ({
  control,
  name,
  defaultValue = '',
  error,
  isRequired,
  ...rest
}: TextareaProps) => {
  const placeholder = isRequired ? '필수 입력' : '선택 입력';

  const { field } = useController({
    defaultValue,
    name,
    control,
    rules: isRequired ? { required: '값을 입력해주세요' } : {},
  });

  return (
    <StyledTextarea
      minRows={1}
      maxRows={7}
      {...field}
      error={error}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};
