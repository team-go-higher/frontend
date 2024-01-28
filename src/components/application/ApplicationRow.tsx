import styled from 'styled-components';

interface ApplicationRowProps {
  label: string;
  name: string;
  value?: string;
}

const ApplicationRow = ({ label, name, value }: ApplicationRowProps) => {
  return (
    <RowContainer>
      <label>{label}</label>
      {name === 'url' ? (
        <a className='content url' href={value}>
          채용사이트
        </a>
      ) : (
        <div className='content'>{value === '' ? '-' : value}</div>
      )}
    </RowContainer>
  );
};

export default ApplicationRow;

const RowContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  label {
    width: 11rem;
    color: #969696;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .content {
    width: 32.9rem;
    color: #464646;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .url {
    color: #3253ff;
    font-weight: 600;
    text-decoration-line: underline;
  }
`;
