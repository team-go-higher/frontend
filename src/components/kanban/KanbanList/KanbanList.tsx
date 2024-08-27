import React, { ReactElement } from 'react';
import { useDrop } from 'react-dnd';

import * as S from './KanbanListStyledComponents';
import { formatProcessToKor } from 'utils/process';

interface KanbanListProps {
  processType: string;
  children: ReactElement[] | ReactElement;
}

const KanbanList = ({ processType, children }: KanbanListProps) => {
  const [, ref] = useDrop({
    accept: 'card',
    drop: () => {
      return { processType };
    },

    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <S.KanbanListContainer ref={ref} $processType={processType}>
      <S.ProcessTitle $processType={processType}>{formatProcessToKor(processType)}</S.ProcessTitle>
      <S.KanbanCardContainer $processType={processType}>{children}</S.KanbanCardContainer>
    </S.KanbanListContainer>
  );
};

export default KanbanList;
