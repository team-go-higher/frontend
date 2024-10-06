import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5.4rem 11rem;

  .title {
    color: rgb(var(--title));
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
  }
`;

export const ContentContainer = styled.form`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  margin: 3.3rem 0 5rem;
  gap: 2.7rem;

  .btnContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2.7rem;
  }
`;

export const RowContainer = styled.div<{ isProcessRow?: boolean }>`
  display: flex;
  align-items: ${props => (props.isProcessRow ? 'flex-start' : 'center')};

  & > :first-child {
    width: 130px;
    flex-shrink: 0;
    margin-top: ${props => (props.isProcessRow ? '13px' : '0')};
  }

  & > :nth-child(2) {
    flex-grow: 1;
  }
`;

export const RadioInputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;
