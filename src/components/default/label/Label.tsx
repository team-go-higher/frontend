import styled from 'styled-components';
import { TYPE_PROCESS } from 'styles/processColor';
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
  border: 1px solid ${props => TYPE_PROCESS[props.process]};
  border-radius: 15px;
  background-color: ${props => (props.isEmpty ? `rgb(var(--white))` : TYPE_PROCESS[props.process])};
  color: ${props => (props.isEmpty ? TYPE_PROCESS[props.process] : `rgb(var(--white))`)};

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
