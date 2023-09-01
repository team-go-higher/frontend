import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100vw;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d6d6d6;
  .headerContainer {
    display: flex;
    width: fit-content;
    align-items: center;

    justify-content: space-between;
    .headerLogo {
      color: #333;
      margin-right: 250px;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 1.08px;
    }
  }
`;
export const HeaderMenuContainer = styled.div`
  display: flex;
  gap: 62px;
  align-items: center;
  .menuItem {
    cursor: pointer;
    text-align: center;
    line-height: 50px;
    width: fit-content;
    color: #333;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.52px;
  }
  .active {
    color: #3253ff;
    width: fit-content;
    font-weight: 700;
    border-bottom: 3px solid #3253ff;
    width: 75px;
  }
`;
export const HeaderPersonalContaienr = styled.div`
  display: flex;
  margin-left: 90px;
  align-items: center;
  .alarmImg {
    width: 16px;
    height: 17px;
    margin-right: 17px;
  }
  .personalBox {
    padding: 4px 7px;
    display: flex;
    height: 29px;
    width: 80px;
    align-items: center;
    border-radius: 42px;
    border: 0.5px solid #3253ff;
    .profile {
      border-radius: 50%;
      width: 21px;
      height: 21px;
      margin-right: 4px;
    }
    .profileName {
      color: #333;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.14px;
      margin-right: 4px;
    }
    .arrowDown {
      width: 7px;
      height: 4px;
    }
  }
`;
