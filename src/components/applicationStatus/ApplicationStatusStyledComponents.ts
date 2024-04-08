import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid #d6d6d6;
  padding: 35px 0 24px;

  label {
    margin-right: 55px;
    height: 23px;
    display: flex;
    align-items: center;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 110px;

  .title {
    color: #333;
    font-size: 24px;
    font-weight: 600;
  }

  .contentBox {
    display: flex;
    flex-direction: column;
    gap: 26px;

    .content {
      color: #555;
      font-size: 20px;
      font-weight: 600;
    }

    .memo {
      color: #c8c8c8;
      font-size: 16px;
      font-weight: 400;
    }
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
  }
`;
