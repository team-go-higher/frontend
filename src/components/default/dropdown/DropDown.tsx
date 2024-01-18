import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { formatProcessToKor } from 'utils/process';
import check_icon from 'assets/default/check_icon.png';

interface DropdownProps {
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
  options: string[];
  selectedOptions: string[];
  onSelect: (option: string) => void;
}

export const TYPE_PROCESS = {
  DOCUMENT: 'rgba(255, 171, 196, 1)',
  TEST: 'rgba(149, 112, 226, 1)',
  INTERVIEW: 'rgba(96, 207, 254, 1)',
  COMPLETE: 'rgba(255, 85, 85, 1)',
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
  border: 1px solid ${props => props.process && TYPE_PROCESS[props.process]};
  border-radius: 12.5px;
  background-color: ${props =>
    props.isOpen ? props.process && TYPE_PROCESS[props.process] : 'rgb(var(--white));'};
  color: ${props =>
    props.isOpen ? 'rgb(var(--white));' : props.process && TYPE_PROCESS[props.process]};
  font-size: 14px;
  cursor: pointer;
  z-index: 2;
`;

const DropdownContent = styled.div<{
  isOpen?: boolean;
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
}>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 50%;
  left: 0;
  border: 0.5px solid ${props => props.process && TYPE_PROCESS[props.process]};
  box-shadow: 0px 0px 4px 0px ${props => props.process && TYPE_PROCESS[props.process]};
  padding: 8px;
  padding-top: 20px;
  border-radius: 10px;
  background-color: rgb(var(--white));
  z-index: 1;
`;

const CheckboxLabel = styled.label<{
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
}>`
  position: relative;
  padding-left: 20px;
  cursor: pointer;
  display: inline-block;
  line-height: 24px;
  font-size: 12px;

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
`;

export const DropDown = ({ process, options, selectedOptions, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option: any) => {
    onSelect(option);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const targetNode = event.target as Node;
    if (dropdownRef.current && !isDescendant(dropdownRef.current, targetNode)) {
      setIsOpen(false);
    }
  };

  const isDescendant: any = (parent: Node, child: Node | null): boolean => {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton isOpen={isOpen} process={process} onClick={handleButtonClick}>
        {process && formatProcessToKor(process)} ▼
      </DropdownButton>
      <DropdownContent isOpen={isOpen} process={process}>
        {options.map(option => (
          <CheckboxLabel key={option} process={process}>
            <input
              type='checkbox'
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            <span className='custom-checkbox'>
              <img src={check_icon} alt='체크 아이콘' />
            </span>
            {option}
          </CheckboxLabel>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};
