import styled from 'styled-components';

export const KanbanListContainer = styled.div<{ $processType: string }>`
  min-width: 320px;
  height: ${({ $processType }) => ($processType === 'TO_APPLY' ? `835px` : `405px`)};
  background-color: rgb(var(--kanbanBackground));
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
`;

export const ProcessTitle = styled.div<{ $processType: string }>`
  display: flex;
  flex: 0 0 auto;
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
  overflow-y: auto;
`;

export const KanbanGrid = styled.div`
  display: grid;
  width: 660px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
`;
