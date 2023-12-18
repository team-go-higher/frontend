import React from 'react';
import * as S from './ModalStyledComponents';
import SelectArrowIcon from 'assets/main/main_modal_select_arrow.svg';
import { formatProcessToKor } from 'utils/process';

interface IProps {
  dropDownId: string;
  disabled?: boolean;
  toggle: boolean;
  isError: boolean;
  value: string;
  isPlaceHolder: boolean;
  isArrowIconRequired: boolean;
  itemList: string[] | null;
  isInputToggle?: boolean;
  inputToggleHandler?: () => void;
  dropDownToggleHandler: (dropDownId: string) => void;
  dropDownItemHandler: (dropDownId: string, process: string) => void;
}

const ModalDropDown = ({
  dropDownId,
  disabled,
  toggle,
  isError,
  value,
  isPlaceHolder,
  isArrowIconRequired,
  itemList,
  isInputToggle,
  inputToggleHandler,
  dropDownToggleHandler,
  dropDownItemHandler,
}: IProps) => {
  return (
    <S.ModalDropdownBox
      disabled={disabled}
      type='button'
      $showItem={toggle}
      $error={isError}
      onClick={() => {
        dropDownToggleHandler(dropDownId);
      }}>
      <S.PlaceHolder $color={isPlaceHolder} $error={isError}>
        {dropDownId === 'processType' ? formatProcessToKor(value) : value}
      </S.PlaceHolder>
      {isArrowIconRequired && <S.ArrowIcon src={SelectArrowIcon} />}
      {toggle && (
        <S.ModalDropdownItemBox>
          {itemList?.map((process: string) => (
            <S.DropdownItem
              key={process}
              onClick={() => {
                dropDownItemHandler(dropDownId, process);
              }}>
              {dropDownId === 'processType' ? formatProcessToKor(process) : process}
            </S.DropdownItem>
          ))}

          {isInputToggle && (
            <S.DropdownItem onClick={inputToggleHandler}>직접 입력 </S.DropdownItem>
          )}
        </S.ModalDropdownItemBox>
      )}
      {isError && <S.InvalidIcon>!</S.InvalidIcon>}
    </S.ModalDropdownBox>
  );
};

export default ModalDropDown;
