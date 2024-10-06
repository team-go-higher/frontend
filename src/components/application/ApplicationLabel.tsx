import styled from 'styled-components';

interface ApplicationLabelProps {
  label: string;
  isRequired?: boolean;
}

const ApplicationLabel = ({ label, isRequired = false }: ApplicationLabelProps) => {
  return (
    <LabelContainer>
      {label}
      {isRequired && <span> *</span>}
    </LabelContainer>
  );
};

export default ApplicationLabel;

const LabelContainer = styled.div`
  width: 130px;
  flex-shrink: 0;
  color: rgb(var(--inputBorder));
  font-size: 1.1rem;
  font-weight: 500;

  span {
    color: rgb(var(--redText));
  }
`;
