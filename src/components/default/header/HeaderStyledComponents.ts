import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d6d6d6;
  .headerContainer {
    display: flex;
    align-items: center;
    width: 996px;
    justify-content: space-between;
    .headerLogo {
      color: #333;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 1.08px;
    }
    .rightContainer {
      display: flex;
    }
  }
`;
export const HeaderMenuContainer = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  .menuItem {
    cursor: pointer;
    text-align: center;
    line-height: 50px;
    color: #333;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.52px;
    width: 84px;
    box-sizing: border-box;
    height: 50px;
  }
  .active {
    color: rgb(var(--main));
    width: fit-content;
    font-weight: 700;
    border-bottom: 3px solid rgb(var(--main));
  }
`;
export const HeaderPersonalContainer = styled.div`
  display: flex;
  margin-left: 66px;
  align-items: center;
  .alarmImg {
    width: 16px;
    height: 17px;
    margin-right: 17px;
    cursor: pointer;
  }
  .personalBox {
    padding: 4px 7px;
    display: flex;
    height: 29px;
    width: 80px;
    align-items: center;
    border-radius: 42px;
    border: 0.5px solid rgb(var(--main));
    cursor: pointer;
    box-sizing: border-box;
    width: 95px;
    .profile {
      border-radius: 50%;
      width: 23px;
      height: 23px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 4px;
      background: #9570e2;
      color: #fff;
      text-align: center;
      font-size: 10px;
      font-weight: 500;
    }
    .profileName {
      color: #333;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.14px;
    }
    .arrowDown {
      width: 7px;
      height: 4px;
      margin-left: auto;
    }
  }
`;
