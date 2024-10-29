import styled from 'styled-components';
import { ProcessType } from 'types/interfaces/Common';
import { formatProcessToKor } from 'utils/process';

interface LabelProps {
  process: ProcessType;
  isEmpty?: boolean;
}

const StyledLabel = styled.label<LabelProps>`
  display: flex;
  white-space: nowrap;
  width: fit-content;
  padding: 3px 10px;
  border: 1px solid ${props => `rgb(var(--${props.process}))`};
  border-radius: 15px;
  background-color: ${props =>
    props.isEmpty ? `rgb(var(--white))` : `rgb(var(--${props.process}))`};
  color: ${props => (props.isEmpty ? `rgb(var(--${props.process}))` : `rgb(var(--white))`)};

  font-size: 14px;
  cursor: default;
`;

export const Label = ({ process, isEmpty = false }: LabelProps) => {
  return (
    <StyledLabel process={process} isEmpty={isEmpty}>
      {process && formatProcessToKor(process)}
    </StyledLabel>
  );
};
