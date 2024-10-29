import styled from 'styled-components';
import { EllipsisText } from 'styles/common';

export const Wrapper = styled.div<{ $isCompleted: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 1px solid #d6d6d6;
  padding: 26px 0;
  cursor: pointer;

  .labelContainer {
    width: 100px;

    label {
      background-color: ${({ $isCompleted }) => $isCompleted && 'rgb(var(--border))'};
      border-color: ${({ $isCompleted }) => $isCompleted && 'rgb(var(--border))'};
    }
  }

  .companyName {
    color: #333;
    font-size: 18px;
    font-weight: 700;
    width: 250px;
    ${EllipsisText}
  }

  .content {
    color: rgb(var(--greyText));
    font-size: 18px;
    font-weight: 400;
    width: 180px;
    ${EllipsisText}
  }

  .companyName,
  .deadline,
  .content {
    color: ${({ $isCompleted }) => $isCompleted && 'rgb(var(--border))'};
  }

  &:hover {
    background-color: rgb(var(--hoverBackground));
  }
`;

export const UtilContainer = styled.div<{ $isCompleted: boolean }>`
  display: flex;
  gap: 15px;
  align-items: center;

  .deadline {
    color: ${({ $isCompleted }) => ($isCompleted ? 'rgb(var(--border))' : 'rgb(var(--redText))')};
    font-size: 14px;
    font-weight: 600;
  }

  .closeIcon {
    cursor: pointer;
    width: 15px;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 30px;
  height: 15px;
  border-radius: 17.5px;
  background: rgb(var(--border));
  position: relative;
  display: flex;

  .toggleCircle {
    width: 20.3px;
    height: 20.3px;
    margin-top: -1px;
    margin-left: -1px;
    border-radius: 50%;
    background-color: rgb(var(--main));
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toggleCircle.false {
    margin-left: auto;
    margin-right: -1px;
    background-color: #949494;
  }
`;
