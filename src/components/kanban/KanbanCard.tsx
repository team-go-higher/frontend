import React from 'react';
import { useDrag } from 'react-dnd';
import { styled } from 'styled-components';

import { Data } from 'types/interfaces/KanbanProcess';
import { useAppDispatch } from 'redux/store';
import { updateProcess } from 'redux/kanbanSlice';

interface IProps {
  item: Data;
}

const KanbanCard = ({ item }: IProps) => {
  const dispatch = useAppDispatch();

  function changeKanbanProcess(target: Data, nextProcessName: string) {
    dispatch(updateProcess({ target, nextProcessName }));
  }

  // [CollectedProps, ConnectDragSource, ConnectDragPreview]
  // monitor.getItem() 의 내용으로 들어갈 값을 정의합니다.
  // type 값은 무조건 설정되어 있어야 합니다. (useDrop의 accept와 일치시켜야 함)
  const [{ isDragging }, ref] = useDrag({
    type: 'card', // 드래그 타입을 지정
    item: item, // 드래그 시 전달될 데이터를 설정.

    collect: monitor => ({
      isDragging: monitor.isDragging(), // 드래그 중인지 여부를 수집
    }),

    // 드래그가 완전히 끝났을때 실행됩니다. 보통 여기에서 Redux dispatch를 많이 실행시킵니다.
    end: (draggedItem, monitor) => {
      const dropResult: any = monitor.getDropResult();
      console.log('dropResult', dropResult, 'draggedItem', draggedItem);
      if (dropResult) {
        changeKanbanProcess(draggedItem, dropResult.processName);
      }
    },
  });

  return (
    <KanbanCardContainer ref={ref} $isdragging={isDragging}>
      {/* 드래그 가능한 요소의 내용 */}
      <DetailProcess $currentProcessName={item.currentProcess}>{item.detailProcess}</DetailProcess>
      <CompanyName>{item.companyName}</CompanyName>
      <Job>{item.job}</Job>
      <Schedule>{item.schedule}</Schedule>
    </KanbanCardContainer>
  );
};

interface IKanbanCardContainerProps {
  $isdragging: boolean;
}

const KanbanCardContainer = styled.div<IKanbanCardContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 18px 35px;
  border-radius: 19px;
  background-color: rgb(var(--cardBackground));
  opacity: ${({ $isdragging }) => ($isdragging ? '0.5' : '1')};
  cursor: pointer;
`;

const DetailProcess = styled.div<{ $currentProcessName: string }>`
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
  background-color: ${({ $currentProcessName }) => `rgb(var(--${$currentProcessName}))`};
`;

const CompanyName = styled.p`
  font-size: 25px;
  font-weight: 700;
`;

const Job = styled.p`
  font-size: 18px;
  color: rgb(var(--grayText));
`;

const Schedule = styled.p`
  font-size: 16px;
  color: rgb(var(--redText));
  font-weight: 600;
`;
export default KanbanCard;
