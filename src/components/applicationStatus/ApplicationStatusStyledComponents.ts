import styled from 'styled-components';

export const Wrapper = styled.div<{ $isView: boolean }>`
  display: flex;
  width: 100%;
  border-top: 1px solid #d6d6d6;
  padding: 26px 0;
  align-items: center;

  .labelContainer {
    min-width: 16%;

    label {
      margin: 0;
      display: flex;
      height: 23px;
      width: fit-content;
      padding-top: 4.5px;
      background-color: ${({ $isView }) => $isView && '#DCDCDC'};
      border-color: ${({ $isView }) => $isView && '#DCDCDC'};
    }
  }

  .companyName {
    color: #333;
    font-size: 24px;
    margin-top: 5px;
    font-weight: 600;
    min-width: 20%;
  }

  .contentBox {
    display: flex;
    flex-direction: column;
    gap: 26px;
    margin-top: 5px;

    .content {
      color: #555;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .companyName,
  .deadline,
  .contentBox > .content {
    color: ${({ $isView }) => $isView && '#DCDCDC'};
  }
`;

export const UtilContainer = styled.div`
  display: flex;
  margin-left: auto;
  gap: 15px;
  align-items: flex-start;

  .deadline {
    color: #f55;
    font-size: 20px;
    font-weight: 600;
  }

  .closeIcon {
    cursor: pointer;
    width: 15px;
  }
`;

export const ToggleContainer = styled.div`
  cursor: pointer;
  width: 32.4px;
  height: 18.3px;
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
