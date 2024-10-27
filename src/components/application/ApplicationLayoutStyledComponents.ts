import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5.4rem 11rem;
  width: 100%;
  max-width: 800px;
  margin: auto;
`;

export const ApplicationTitle = styled.h1`
  color: rgb(var(--title));
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
`;

export const FormContainer = styled.form`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  margin: 3.3rem 0 5rem;
  gap: 1.5rem;
`;

export const RowContainer = styled.div`
  display: flex;

  & > :first-child {
    display: flex;
    align-items: center;
    height: 40px;
    flex-shrink: 0;
  }

  & > :nth-child(2) {
    flex-grow: 1;
  }
`;

export const RadioInputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2.7rem;
  margin-top: 3rem;
`;

export const ContentBox = styled.div`
  display: flex;
  align-items: center;
  white-space: pre-wrap;
  min-height: 40px;
  line-height: 20px;
  padding: 10px 0;
`;
