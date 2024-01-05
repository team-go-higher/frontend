import styled from 'styled-components';
import { Styles } from 'react-modal';

export const normalModalStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(var(--grayText), 0.8)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '21.25rem',
    height: '580px',
    padding: '32px 50px 38px',
    borderRadius: '15px',
  },
};

export const editModalStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(var(--grayText), 0.8)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '21.25rem',
    height: '300px',
    padding: '32px 50px 38px',
    borderRadius: '15px',
  },
};

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ModalTitle = styled.h1`
  font-size: 38px;
  color: rgb(var(--blueText));
  font-weight: 700;
`;

export const ModalInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ModalInputBox = styled.div`
  position: relative;
`;

export const InvalidIcon = styled.div`
  position: absolute;
  top: 14px;
  right: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  color: rgb(var(--white));
  background-color: rgb(var(--redText));
`;

export const ModalInput = styled.input<{ $error?: boolean }>`
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    color: transparent;
    cursor: pointer;
  }
  width: 15.375rem;
  padding: 14px 26px 16px;
  border: ${({ $error }) =>
    $error ? `1px solid rgb(var(--redText));` : `1px solid rgb(var(--inputBorder));`};
  border-radius: 10px;

  &::placeholder {
    ${({ $error }) => $error && `color : rgb(var(--redText))`}
  }
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

export const InModalButton = styled.button<{ mode: string }>`
  width: 7.5rem;
  padding: 10px 28px;
  border-radius: 50px;
  border: 1px solid rgb(var(--blueText));
  font-size: 15px;
  font-weight: 600;

  ${({ mode }) =>
    mode === 'simple'
      ? `background-color : rgb(var(--white)); color : rgb(var(--blueText))`
      : `background-color : rgb(var(--blueText)); color : rgb(var(--white));`};
`;

export const ModalHelperText = styled.div`
  text-align: center;

  font-size: 17px;
  font-weight: 500;
  color: rgb(var(--modalHelperText));
`;

export const ModalDropdownBox = styled.button<{ $showItem?: boolean; $error?: boolean }>`
  height: 49px;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 15.375rem;
  padding: 14px 26px 16px;
  border: ${({ $error }) =>
    $error ? `1px solid rgb(var(--redText));` : `1px solid rgb(var(--inputBorder));`};
  border-radius: ${({ $showItem }) => ($showItem ? '10px 10px 0px 0px;' : '10px;')};
  ${({ $showItem }) => $showItem && `border-bottom : none;`};
  text-align: left;
  cursor: pointer;
`;

export const PlaceHolder = styled.p<{ $color?: boolean; $error: boolean }>`
  color: ${({ $color, $error }) =>
    $error ? 'rgb(var(--redText));' : $color ? 'black;' : 'rgb(var(--placeholder));'};
  font-size: 17px;
  font-weight: 500;
`;

export const ArrowIcon = styled.img`
  position: absolute;
  top: calc(50% - 4px);
  right: 26px;
  cursor: pointer;
`;

export const ModalDropdownItemBox = styled.ul`
  position: absolute;
  left: -1px;
  top: 47px;
  z-index: 20;
  background-color: rgb(var(--white));
  width: 15.375rem;

  border: 1px solid rgb(var(--inputBorder));
  border-top: none;
  border-radius: 0px 0px 10px 10px;
`;

export const DropdownItem = styled.li`
  padding: 14px 26px 16px;
  font-size: 17px;
  cursor: pointer;

  &:hover {
    background-color: rgb(var(--dropDownHover));
  }
`;
