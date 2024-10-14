import { useDropdown } from 'hooks/feature/useDropDown';
import { Controller, Control } from 'react-hook-form';
import styled, { keyframes } from 'styled-components';

interface DropdownProps {
  dropdownItems: { id: number; position: string }[];
  control: Control;
  name: string;
  readonly?: boolean;
}

const dropdown = keyframes`
  0% {
    transform: translateY(-10%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const DropdownContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 160px;
  height: 40px;
`;

const DropdownToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  padding: 10px 18px;

  font-size: 15px;
  color: rgb(var(--greyText));

  border: 1px solid rgb(var(--inputBorder));
  border-radius: 10px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  z-index: 5;
  right: 0;

  display: flex;
  flex-direction: column;

  width: 100%;

  background-color: white;
  border: 1px solid rgb(var(--inputBorder));
  border-radius: 4px;

  animation: ${dropdown} 0.4s ease;
`;

const DropdownItemWrapper = styled.ul`
  margin: 0.6rem;
`;

const DropdownItem = styled.li`
  cursor: pointer;

  display: flex;
  align-items: center;

  padding: 0.8rem 0;

  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(var(--placeholder));
  }

  span {
    font-size: 15px;
    color: rgb(var(--greyText));
  }
`;

const ApplicationDropdown = ({ dropdownItems, control, name, readonly = false }: DropdownProps) => {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const handleDropdownItemClick = (position: string) => {
          field.onChange(position);
          toggleDropdown();
        };

        return (
          <DropdownContainer ref={dropdownRef}>
            <DropdownToggle onClick={() => !readonly && toggleDropdown()}>
              {dropdownItems.find(item => item.position === field.value)?.position ||
                '선택해주세요'}
              <span>{isOpen ? '▲' : '▼'}</span>
            </DropdownToggle>

            {isOpen && (
              <DropdownMenu>
                <DropdownItemWrapper>
                  {dropdownItems.map(item => (
                    <DropdownItem
                      key={item.id}
                      onClick={() => handleDropdownItemClick(item.position)} // position 값을 저장
                    >
                      <span>{item.position}</span>
                    </DropdownItem>
                  ))}
                </DropdownItemWrapper>
              </DropdownMenu>
            )}
          </DropdownContainer>
        );
      }}
    />
  );
};

export default ApplicationDropdown;
