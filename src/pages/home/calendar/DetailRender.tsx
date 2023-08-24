import React from 'react';
import { format } from 'date-fns';
import { DetailContainer } from './CalendarStyledComponents';

// RenderHeader
// 일단 여기에 둠
interface RenderDetailHeaderProps {
  selectedDate: Date;
  prevDay: () => void;
  nextDay: () => void;
}

export const RenderDetailHeader: React.FC<RenderDetailHeaderProps> = ({
  selectedDate,
  prevDay,
  nextDay,
}) => {
  return (
    <DetailContainer>
      <button onClick={prevDay}>◁</button>
      <div>{format(selectedDate, 'd, eee').toLowerCase()}</div>
      <button onClick={nextDay}>▷</button>
    </DetailContainer>
  );
};
