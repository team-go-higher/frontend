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

const StyledLabel = styled.div<LabelProps>`
  display: inline-block;
  padding: 4px 10px;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid ${props => props.process && TYPE_PROCESS[props.process]};
  background-color: ${props =>
    props.isPast ? props.process && TYPE_PROCESS[props.process] : 'rgb(var(--white));'};
  color: ${props =>
    props.isPast ? 'rgb(var(--white));' : props.process && TYPE_PROCESS[props.process]};
  border-radius: 12.5px;
  font-size: 14px;
`;

export const Label = ({ process, isPast = true }: LabelProps) => {
  return (
    <StyledLabel process={process} isPast={isPast}>
      {process && formatProcessToKor(process)}
    </StyledLabel>
  );
};
