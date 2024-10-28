import React from 'react';
import styled from 'styled-components';
import { formatProcessToKor } from 'utils/process';
import { useDropdown } from 'hooks/feature/useDropDown';
import CheckIcon from 'assets/default/check_icon.svg';
import { ReactComponent as SelectArrowIcon } from 'assets/main/main_modal_select_arrow.svg';
import { ProcessType } from 'types/interfaces/Common';

interface DropdownProps {
  process: ProcessType;
  options: string[] | null;
  selectedOptions: { process: ProcessType; option: string }[];
  onSelect: (process: ProcessType, option: string) => void;
  disabled: boolean;
}

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button<{
  $isOpen: boolean;
  $process: ProcessType;
  $disabled: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  position: relative;
  padding: 3px 10px;
  border: 1px solid ${props => `rgb(var(--${props.$process}))`};
  border-radius: 15px;
  background-color: ${props =>
    props.$isOpen || props.$disabled ? `rgb(var(--${props.$process}))` : 'rgb(var(--white));'};
  color: ${props =>
    props.$isOpen || props.$disabled ? 'rgb(var(--white));' : `rgb(var(--${props.$process}))`};
  font-size: 14px;
  cursor: pointer;
  z-index: ${props => (props.$isOpen ? '3' : '1')};
`;

const DropdownContent = styled.div<{
  $isOpen: boolean;
  $process: ProcessType;
}>`
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  position: absolute;
  top: 50%;
  left: 0;
  padding: ${props => (props.$process === 'COMPLETE' ? '10.9px' : '8px')};
  padding-top: 20px;
  border: 0.5px solid ${props => `rgb(var(--${props.$process}))`};
  border-top: 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 0px 4px 0px ${props => `rgb(var(--${props.$process}))`};
  background-color: rgb(var(--white));
  z-index: 2;
`;

const CheckboxLabel = styled.label<{
  $process: ProcessType;
}>`
  position: relative;
  padding-left: ${props => (props.$process === 'COMPLETE' ? '0' : '20px')};
  cursor: pointer;
  display: ${props => (props.$process === 'COMPLETE' ? '' : 'inline-block')};
  line-height: 24px;
  font-size: 12px;
  color: ${props => `rgb(var(--${props.$process}))`};

  .checkbox-container {
    display: ${props => (props.$process === 'COMPLETE' ? 'none' : 'block')};
  }

  input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }

  .custom-checkbox {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background-color: rgb(var(--border));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input:checked + .custom-checkbox:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: ${props => `rgb(var(--${props.$process}))`};
    z-index: -1;
  }

  .option-text {
    text-align: center;
  }
`;

export const DropDown = ({
  process,
  options,
  selectedOptions,
  onSelect,
  disabled,
}: DropdownProps) => {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (disabled) return;
    toggleDropdown();
  };

  const handleCheckboxChange = (process: ProcessType, option: string) => {
    onSelect(process, option);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        onClick={handleButtonClick}
        $isOpen={isOpen}
        $process={process}
        $disabled={disabled}>
        <div className='process-text'>{process && formatProcessToKor(process)}</div>
        {!disabled && (
          <SelectArrowIcon fill={isOpen ? 'rgb(var(--white))' : `rgb(var(--${process}))`} />
        )}
      </DropdownButton>
      {options && (
        <DropdownContent $isOpen={isOpen} $process={process}>
          {options.map(option => (
            <CheckboxLabel key={option} $process={process}>
              <div className='checkbox-container'>
                <input
                  type='checkbox'
                  value={option}
                  checked={selectedOptions.some(
                    item => item.process === process && item.option === option,
                  )}
                  onChange={() => handleCheckboxChange(process, option)}
                />
                <span className='custom-checkbox'>
                  <img src={CheckIcon} alt='체크 아이콘' />
                </span>
              </div>
              <div className='option-text'>{option}</div>
            </CheckboxLabel>
          ))}
        </DropdownContent>
      )}
    </DropdownContainer>
  );
};
