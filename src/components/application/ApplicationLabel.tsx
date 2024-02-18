import styled from 'styled-components';

interface ApplicationLabelProps {
  label: string;
  isRequired: boolean;
}

const ApplicationLabel = ({ label, isRequired }: ApplicationLabelProps) => {
  return (
    <LabelContainer>
      <label>
        {label}
        {isRequired && <span> *</span>}
      </label>
    </LabelContainer>
  );
};

export default ApplicationLabel;

const LabelContainer = styled.div`
  width: 130px;
  label {
    color: rgb(var(--inputBorder));
    font-size: 1.1rem;
    font-weight: 500;
  }
  span {
    color: rgb(var(--redText));
  }
`;
