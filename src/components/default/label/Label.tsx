import styled from 'styled-components';
import { processType } from 'types/interfaces/KanbanProcess';
import { formatProcessToKor } from 'utils/process';

interface LabelProps {
  process?: processType;
}

const StyledLabel = styled.label<LabelProps>`
  white-space: nowrap;
  padding: 3px 10px;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid ${props => props.process && `rgb(var(--${props.process}))`};
  border-radius: 12.5px;
  background-color: ${props => props.process && `rgb(var(--${props.process}))`};
  color: rgb(var(--white));
  font-size: 14px;
  cursor: default;
`;

export const Label = ({ process }: LabelProps) => {
  return <StyledLabel process={process}>{process && formatProcessToKor(process)}</StyledLabel>;
};
