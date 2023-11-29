import React, { ReactElement } from 'react';
import { styled } from 'styled-components';
import { useDrop } from 'react-dnd';
import { formatProcessToKorean } from 'utils/process';

interface IProps {
  processType: string;
  children: ReactElement[] | ReactElement;
}

const KanbanList = ({ processType, children }: IProps) => {
  const [, ref] = useDrop({
    accept: 'card', // useDrag의 type과 같아야함
    drop: () => {
      return { processType };
    },

    collect: monitor => ({
      isOver: monitor.isOver(), // drag 진행동안 canDrop : true
      canDrop: monitor.canDrop(), // drop할 영역 접근시 isOver : true
    }),
  });

  return (
    <KanbanListContainer ref={ref}>
      <ProcessTitle $processType={processType}>{formatProcessToKorean(processType)}</ProcessTitle>
      <KanbanCardContainer>{children}</KanbanCardContainer>
    </KanbanListContainer>
  );
};

const KanbanListContainer = styled.div`
  min-width: 327px;
  height: 835px;
  background-color: rgb(var(--kanbanBackground));
  border-radius: 15px;
  overflow-x: auto;
`;

const ProcessTitle = styled.div<{ $processType: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 15px 15px 0 0;
  background: ${({ $processType }) => `rgb(var(--${$processType}))`};
  font-size: 20px;
  color: rgb(var(--grayText));
`;

const KanbanCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 18px 14px;
`;

export default KanbanList;
