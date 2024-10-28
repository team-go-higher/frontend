import styled from 'styled-components';

interface IKanbanCardContainerProps {
  $isDragging: boolean;
  $currentProcessType: string;
}

export const KanbanCardContainer = styled.div<IKanbanCardContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: ${({ $currentProcessType }) =>
    `0px 0px 3px 0px rgba(var(--${$currentProcessType}), 0.5);`};
  background-color: rgb(var(--cardBackground));
  opacity: ${({ $isDragging }) => ($isDragging ? '0.5' : '1')};
  cursor: pointer;
`;

export const DetailProcess = styled.div<{ $currentProcessType: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 12px;
  /* max-width: 6rem; */
  width: fit-content;
  height: 18px;
  border-radius: 12.5px;
  color: rgb(var(--greyText));
  font-weight: 500;
  font-size: 12px;
  background-color: ${({ $currentProcessType }) => `rgb(var(--${$currentProcessType}))`};
`;

export const CompanyName = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

export const Job = styled.p`
  font-size: 14px;
  color: rgb(var(--greyText));
`;

export const Schedule = styled.p`
  font-size: 12px;
  color: rgb(var(--redText));
  font-weight: 600;
`;

export const MoreIconDiv = styled.div`
  position: absolute;
  bottom: 13px;
  right: 13px;
  cursor: pointer;
`;
