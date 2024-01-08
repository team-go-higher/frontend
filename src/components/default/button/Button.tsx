import styled, { css } from 'styled-components';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const TYPE_VARIANTS = {
  primary: css`
    color: rgb(var(--white));
    background-color: rgb(var(--main));
  `,
  secondary: css`
    color: rgb(var(--main));
    border: 1px solid rgb(var(--main));
  `,
  tertiary: css`
    color: rgb(var(--border));
    border: 1px solid rgb(var(--border));
  `,
};

const StyledButton = styled.button<Props>`
  width: 115px;
  height: 37px;
  outline: none;
  border: 1px solid transparent;
  border-radius: 50px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.1s ease;
  font-size: 14px;
  font-weight: 400;
  line-height: 37px;
  ${({ variant }) => variant && TYPE_VARIANTS[variant]};
`;

export function Button({ variant = 'primary', ...props }: Props) {
  return <StyledButton variant={variant} {...props} />;
}
