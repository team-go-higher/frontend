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
  position: relative;
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

  .dropdown {
    position: absolute;
    top: 55px;
    right: 0;
    z-index: 100;
    padding: 13px 27px;
    background-color: rgb(var(--white));
    width: 260px;
    height: 170px;
    border-radius: 20px;
    box-shadow: 0px 0px 5px 0px rgba(50, 83, 255, 0.3);
    .row {
      display: flex;
      align-items: center;
    }
    ul {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      li {
        color: rgb(var(--grayText));
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.14px;
        cursor: pointer;
      }
      span {
        width: 100%;
        height: 1px;
        background-color: #e0e0e0;
      }
      .profile-image {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 4px;
        background: #9570e2;
        color: #fff;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
      }
      .user-info {
        margin-left: 11px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 40px;
        .name {
          color: #333;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.14px;
        }
        .email {
          color: rgb(var(—grayText));
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.14px;
        }
      }
    }
  }
`;
