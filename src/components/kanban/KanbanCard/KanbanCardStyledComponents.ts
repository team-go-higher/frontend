import styled from 'styled-components';

interface IKanbanCardContainerProps {
  $isdragging: boolean;
  $currentProcessType: string;
}

export const KanbanCardContainer = styled.div<IKanbanCardContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 18px 35px;
  border-radius: 19px;
  box-shadow: ${({ $currentProcessType }) =>
    `0px 0px 3px 0px rgba(var(--${$currentProcessType}), 0.5);`};
  background-color: rgb(var(--cardBackground));
  opacity: ${({ $isdragging }) => ($isdragging ? '0.5' : '1')};
  cursor: pointer;
`;

export const DetailProcess = styled.div<{ $currentProcessType: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 13px;
  /* max-width: 6rem; */
  width: fit-content;
  height: 1.375rem;
  border-radius: 12.5px;
  color: rgb(var(--grayText));
  font-weight: 500;
  background-color: ${({ $currentProcessType }) => `rgb(var(--${$currentProcessType}))`};
`;

export const CompanyName = styled.p`
  font-size: 25px;
  font-weight: 700;
`;

export const Job = styled.p`
  font-size: 18px;
  color: rgb(var(--grayText));
`;

export const Schedule = styled.p`
  font-size: 16px;
  color: rgb(var(--redText));
  font-weight: 600;
`;

export const MoreIconDiv = styled.div`
  position: absolute;
  bottom: 18px;
  right: 35px;
`;

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
  height: 64px;
  background-color: rgb(var(--white));
  border-radius: 8px;
  box-shadow: ${({ $currentProcessType }) =>
    `0px 0px 4px 0px rgba(var(--${$currentProcessType}), 0.5);`};
`;

export const MoreItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const MoreItemText = styled.p`
  color: rgb(var(--grayText));
  font-size: 16px;
  line-height: 23px;
`;
