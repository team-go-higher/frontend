import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { formatProcessToKor } from 'utils/process';
import { useDropdown } from 'hooks/feature/useDropDown';
import CheckIcon from 'assets/default/check_icon.svg';
import { ReactComponent as SelectArrowIcon } from 'assets/main/main_modal_select_arrow.svg';

type ProcessType = 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';

interface DropdownProps {
  process: ProcessType;
  options: string[] | null;
  selectedOptions: { process: ProcessType; option: string }[];
  onSelect: (process: ProcessType, option: string) => void;
}

export const TYPE_PROCESS = {
  DOCUMENT: 'rgb(var(--defaultPink))',
  TEST: 'rgb(var(--defaultPurple))',
  INTERVIEW: 'rgb(var(--defaultSkyblue))',
  COMPLETE: 'rgb(var(--defaultRed))',
};

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button<{
  isOpen?: boolean;
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
}>`
  position: relative;
  padding: 3px 10px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.process && TYPE_PROCESS[props.process]};
  border-radius: 12.5px;
  background-color: ${props =>
    props.isOpen ? props.process && TYPE_PROCESS[props.process] : 'rgb(var(--white));'};
  color: ${props =>
    props.isOpen ? 'rgb(var(--white));' : props.process && TYPE_PROCESS[props.process]};
  font-size: 14px;
  cursor: pointer;
  z-index: ${props => (props.isOpen ? '3' : '1')};

  .process-text {
    display: inline-block;
    margin-right: 5px;
  }
`;

const DropdownContent = styled.div<{
  isOpen?: boolean;
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
}>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 50%;
  left: 0;
  padding: ${props => (props.process === 'COMPLETE' ? '10px' : '8px')};
  padding-top: 20px;
  border: 0.5px solid ${props => props.process && TYPE_PROCESS[props.process]};
  border-top: 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 0px 4px 0px ${props => props.process && TYPE_PROCESS[props.process]};
  background-color: rgb(var(--white));
  z-index: 2;
`;

const CheckboxLabel = styled.label<{
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
}>`
  position: relative;
  padding-left: ${props => (props.process === 'COMPLETE' ? '0' : '20px')};
  cursor: pointer;
  display: ${props => (props.process === 'COMPLETE' ? '' : 'inline-block')};
  line-height: 24px;
  font-size: 12px;
  color: ${props => props.process && TYPE_PROCESS[props.process]};

  .checkbox-container {
    display: ${props => (props.process === 'COMPLETE' ? 'none' : 'block')};
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
    background-color: ${props => props.process && TYPE_PROCESS[props.process]};
    z-index: -1;
  }

  .option-text {
    text-align: center;
  }
`;

export const DropDown = ({ process, options, selectedOptions, onSelect }: DropdownProps) => {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleDropdown();
  };

  const handleCheckboxChange = (process: ProcessType, option: string) => {
    onSelect(process, option);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton isOpen={isOpen} process={process} onClick={handleButtonClick}>
        <div className='process-text'>{process && formatProcessToKor(process)}</div>
        <SelectArrowIcon fill={isOpen ? 'rgb(var(--white))' : process && TYPE_PROCESS[process]} />
      </DropdownButton>
      {options && (
        <DropdownContent isOpen={isOpen} process={process}>
          {options.map(option => (
            <CheckboxLabel key={option} process={process}>
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
