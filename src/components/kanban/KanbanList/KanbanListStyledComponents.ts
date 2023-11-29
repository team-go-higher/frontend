import styled from 'styled-components';

export const KanbanListContainer = styled.div`
  min-width: 327px;
  height: 835px;
  background-color: rgb(var(--kanbanBackground));
  border-radius: 15px;
  overflow-x: auto;
`;

export const ProcessTitle = styled.div<{ $processType: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 15px 15px 0 0;
  background: ${({ $processType }) => `rgb(var(--${$processType}))`};
  font-size: 20px;
  color: rgb(var(--grayText));
`;

export const KanbanCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 18px 14px;
`;
