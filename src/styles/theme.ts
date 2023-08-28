import { css } from 'styled-components';

export const theme = {
  color: {
    toApply: '255, 233, 116',
    resumeScreening: '255, 174, 198',
    test: '200, 174, 255',
    interview: '158, 220, 255',
    complete: '150, 150, 150',
    redText: '255, 85, 85',
    blueText: '50, 83, 255',
    grayText: '85, 85, 85',
    kanbanBackground: '242, 242, 242',
    cardBackground: '256, 256, 256',
    border: '217, 217, 217',
    white: '256, 256, 256',
    inputBorder: '150, 150, 150',
    modalHelperText: '150, 150, 150',
  },
};

type ThemeKey = { [key: string]: any };
const colors = Object.keys(theme.color).map(key => `--${key}: ${(theme.color as ThemeKey)[key]};`);

export const variables = css`
  body {
    ${colors}
  }
`;
