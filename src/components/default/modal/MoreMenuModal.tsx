import styled from 'styled-components';
import { ReactComponent as MoreItemIcon } from 'assets/main/main_kanban_card_more_item.svg';
import { useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchApplicationsFinished } from 'apis/applications';
import { queryKeys } from 'apis/queryKeys';

interface MoreMenuModalProps {
  closeModal: () => void;
  handleEditButton: () => void;
  application: {
    currentProcessType: string;
    applicationId: number;
  };
}

const MoreMenuModal = ({ closeModal, handleEditButton, application }: MoreMenuModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { applicationId, currentProcessType } = application;

  const applicationsFinishedMutation = useMutation({
    mutationFn: () => patchApplicationsFinished(applicationId, true),
    onSuccess: () => {
      [queryKeys.KANBAN, queryKeys.CALENDAR, queryKeys.UNSCHEDULED].forEach(key => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
      closeModal();
    },
  });

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
      <MoreItem onClick={() => applicationsFinishedMutation.mutate()}>
        <MoreItemIcon />
        <MoreItemText>지원서 비활성화</MoreItemText>
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
  padding: 10px 16px;
  min-width: 150px;
  width: fit-content;
  height: fit-content;
  gap: 2px;
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
  font-weight: 500;
`;
