import styled from 'styled-components';
import { ReactComponent as MoreItemIcon } from 'assets/main/main_kanban_card_more_item.svg';
import { useEffect, useRef } from 'react';

interface MoreMenuModalProps {
  closeModal: () => void;
  handleEditButton: () => void;
  currentProcessType: string;
}

const MoreMenuModal = ({
  closeModal,
  handleEditButton,
  currentProcessType,
}: MoreMenuModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [modalRef]);

  return (
    <MoreMenuColumn $currentProcessType={currentProcessType} ref={modalRef}>
      <MoreItem onClick={handleEditButton}>
        <MoreItemIcon />
        <MoreItemText>간편 수정하기</MoreItemText>
      </MoreItem>
      <MoreItem>
        <MoreItemIcon />
        <MoreItemText>공고 숨기기</MoreItemText>
      </MoreItem>
    </MoreMenuColumn>
  );
};

export default MoreMenuModal;

export const MoreMenuColumn = styled.div<{ $currentProcessType: string }>`
  z-index: 5;
  position: absolute;
  bottom: -43px;
  right: 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 9px 25px 9px 16px;
  width: 150px;
  /* height: 64px; */
  height: fit-content;
  min-height: 64px;
  background-color: rgb(var(--white));
  border-radius: 8px;
  box-shadow: ${({ $currentProcessType }) =>
    `0px 0px 4px 0px rgba(var(--${$currentProcessType}), 0.5);`};
`;

export const MoreItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

export const MoreItemText = styled.p`
  color: rgb(var(--grayText));
  font-size: 16px;
  line-height: 23px;
`;
