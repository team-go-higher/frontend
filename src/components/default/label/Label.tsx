import styled from 'styled-components';
import { processType } from 'types/interfaces/KanbanProcess';
import { formatProcessToKor } from 'utils/process';

interface LabelProps {
  process?: processType;
  isPast?: boolean;
}

const StyledLabel = styled.label<LabelProps>`
  white-space: nowrap;
  padding: 3px 10px;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid ${props => props.process && `rgb(var(--${props.process}))`};
  border-radius: 12.5px;
  background-color: ${props =>
    props.isPast ? props.process && `rgb(var(--${props.process}))` : 'rgb(var(--white));'};
  color: ${props => (props.isPast ? 'rgb(var(--white));' : `rgb(var(--${props.process}))`)};
  font-size: 14px;
  cursor: default;
`;

export const Label = ({ process, isPast = true }: LabelProps) => {
  return (
    <StyledLabel process={process} isPast={isPast}>
      {process && formatProcessToKor(process)}
    </StyledLabel>
  );
};
