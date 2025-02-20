import { UseControllerProps, useController } from 'react-hook-form';
import styled from 'styled-components';
import check_icon from 'assets/default/check_icon.svg';

interface RadioInputProps {
  label: string;
  name: string;
  control: UseControllerProps['control'];
  radioValue: string;
  readOnly: boolean;
}

const StyledRadioInput = styled.div`
  label {
    position: relative;
    width: 100%;
    padding-left: 25px;
    margin-right: 10px;
    cursor: pointer;
    display: inline-block;
    line-height: 24px;
  }

  input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }

  .custom-radio {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 19px;
    height: 19px;
    background-color: rgb(var(--border));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input:checked + .custom-radio:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background-color: rgb(var(--main));
    z-index: -1;
  }
`;

export const RadioInput = ({ label, name, control, radioValue, readOnly }: RadioInputProps) => {
  const { field } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <StyledRadioInput>
      <label>
        <input
          type='radio'
          {...field}
          value={radioValue}
          checked={field.value === radioValue}
          disabled={readOnly}
          onChange={() => field.onChange(radioValue)}
        />
        <span className='custom-radio'>
          <img src={check_icon} alt='체크 아이콘' />
        </span>
        {label}
      </label>
    </StyledRadioInput>
  );
};
