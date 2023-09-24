import { css } from 'styled-components';

export const theme = {
  color: {
    TO_APPLY: '255, 233, 116',
    DOCUMENT: '255, 174, 198',
    TEST: '200, 174, 255',
    INTERVIEW: '158, 220, 255',
    COMPLETE: '150, 150, 150',
    redText: '255, 85, 85',
    blueText: '50, 83, 255',
    grayText: '85, 85, 85',
    kanbanBackground: '242, 242, 242',
    cardBackground: '256, 256, 256',
    border: '217, 217, 217',
    white: '256, 256, 256',
    inputBorder: '150, 150, 150',
    modalHelperText: '150, 150, 150',
    placeholder: '200, 200, 200',
    dropDownHover: '237, 237, 237',
  },
};

type ThemeKey = { [key: string]: any };
const colors = Object.keys(theme.color).map(key => `--${key}: ${(theme.color as ThemeKey)[key]};`);

export const variables = css`
  body {
    ${colors}
  }
`;
