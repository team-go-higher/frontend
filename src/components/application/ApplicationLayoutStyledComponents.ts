import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5.4rem 11rem;

  .title {
    color: #333;
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
  }
`;

export const ContentContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 3.3rem 0 5rem;
  gap: 2.7rem;

  .btnContainer {
    align-self: center;
    display: flex;
    flex-direction: row;
  }
`;
