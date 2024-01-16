import styled from 'styled-components';

interface ApplicationRowProps {
  label: string;
  name: string;
  value?: string;
}

const ApplicationRowEdit = ({ label, name, value }: ApplicationRowProps) => {
  return (
    <RowContainer>
      <label>{label}</label>
      {/* TODO input component 교체 필요 */}
      <input className='content' name={name} value={value} placeholder='선택 입력' />
    </RowContainer>
  );
};

export default ApplicationRowEdit;

const RowContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  label {
    width: 11rem;
    color: #969696;
    font-size: 1.8rem;
    font-weight: 500;
  }

  .content {
    padding: 0.5rem 2.6rem;
    width: 32.9rem;
    color: #464646;
    font-size: 1.6rem;
    font-weight: 600;
    border-radius: 1rem;
    border: 0.5px solid #969696;
    height: 4rem;

    &::placeholder {
      color: #d9d9d9;
      font-size: 1.5rem;
      font-weight: 500;
    }
  }
`;
