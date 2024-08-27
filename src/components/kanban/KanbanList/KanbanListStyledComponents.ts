import styled from 'styled-components';

export const KanbanListContainer = styled.div<{ $processType: string }>`
  min-width: 240px;
  height: 835px;
  background-color: rgb(var(--kanbanBackground));
  border-radius: 15px;
  border: ${({ $processType }) => `1px solid rgb(var(--${$processType}))`};
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
`;

export const ProcessTitle = styled.div<{ $processType: string }>`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 15px 15px 0 0;
  background: ${({ $processType }) => `rgb(var(--${$processType}))`};
  font-size: 18px;
  font-weight: 500;
  color: rgb(var(--greyText));
`;

export const KanbanCardContainer = styled.div<{ $processType: string }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 16px 14px;
  overflow-y: auto;
  background: ${({ $processType }) => `rgba(var(--${$processType}), 0.2)`};
`;
