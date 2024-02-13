import styled, { css } from 'styled-components';
import { formatProcessToKor } from 'utils/process';

interface LabelProps {
  process?: 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
  isPast?: boolean;
}

export const TYPE_PROCESS = {
  DOCUMENT: 'rgb(var(--defaultPink))',
  TEST: 'rgb(var(--defaultPurple))',
  INTERVIEW: 'rgb(var(--defaultSkyblue))',
  COMPLETE: 'rgb(var(--defaultRed))',
};

const StyledLabel = styled.label<LabelProps>`
  width: fit-content;
  height: 22px;
  white-space: nowrap;
  padding: 0 10px;
  outline: none;
  border: 1px solid ${props => props.process && TYPE_PROCESS[props.process]};
  border-radius: 12.5px;
  background-color: ${props =>
    props.isPast ? props.process && TYPE_PROCESS[props.process] : 'rgb(var(--white));'};
  color: ${props =>
    props.isPast ? 'rgb(var(--white));' : props.process && TYPE_PROCESS[props.process]};
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
