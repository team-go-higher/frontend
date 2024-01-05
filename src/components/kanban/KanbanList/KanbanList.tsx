import React, { ReactElement } from 'react';
import { useDrop } from 'react-dnd';

import * as S from './KanbanListStyledComponents';
import { formatProcessToKor } from 'utils/process';

interface IProps {
  processType: string;
  children: ReactElement[] | ReactElement;
}

const KanbanList = ({ processType, children }: IProps) => {
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
    <S.KanbanListContainer ref={ref}>
      <S.ProcessTitle $processType={processType}>{formatProcessToKor(processType)}</S.ProcessTitle>
      <S.KanbanCardContainer>{children}</S.KanbanCardContainer>
    </S.KanbanListContainer>
  );
};

export default KanbanList;
