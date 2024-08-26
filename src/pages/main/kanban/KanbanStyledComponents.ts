import styled from 'styled-components';

export const KanbanContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

export const KanbanHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 213px;
  height: 50px;
`;

export const Paragraph = styled.p`
  font-size: 22px;
  font-weight: 700;
`;

export const ArrowButton = styled.img`
  cursor: pointer;
`;

export const KanbanBoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex: 1;
  gap: 15px;
  margin: 0 auto;
  overflow-x: auto;
`;

export const PlusButton = styled.button`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  height: 110px;
  border: 1px solid rgb(var(--border));
  border-radius: 19px;
  cursor: pointer;
`;

export const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid rgb(var(--border));
  color: rgb(var(--border));
  background-color: rgb(var(--white));
`;
