import { css } from 'styled-components';

export const theme = {
  color: {
    TO_APPLY: '255, 233, 116',
    DOCUMENT: '255, 174, 198',
    TEST: '200, 174, 255',
    INTERVIEW: '96, 207, 254',
    COMPLETE: '255, 85, 85',
    redText: '255, 85, 85',
    blueText: '50, 83, 255',
    greyText: '85, 85, 85',
    greyText2: '150, 150, 150',
    kanbanBackground: '242, 242, 242',
    cardBackground: '256, 256, 256',
    border: '217, 217, 217',
    white: '256, 256, 256',
    inputBorder: '150, 150, 150',
    modalHelperText: '150, 150, 150',
    placeholder: '200, 200, 200',
    dropDownHover: '237, 237, 237',
    main: '50, 83, 255',
    title: '51, 51, 51',
    hoverBackground: '243, 243, 243',
  },
};

type ThemeKey = { [key: string]: any };
const colors = Object.keys(theme.color).map(key => `--${key}: ${(theme.color as ThemeKey)[key]};`);

export const variables = css`
  body {
    ${colors}
  }
`;
