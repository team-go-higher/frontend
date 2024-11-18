import styled from 'styled-components';
import AlertIcon from 'assets/default/icon_profile.svg';
import { useMutation } from '@tanstack/react-query';
import { postLogout } from 'apis/auth';
import { useNavigate } from 'react-router-dom';
import AlarmImg from 'assets/header/header_alarm.svg';
import ArrowDownImg from 'assets/header/header_arrow_down.svg';
import { useDropdown } from 'hooks/feature/useDropDown';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  const userPositionInfo = JSON.parse(localStorage.getItem('userPositionInfo') || '{}');

  const handleLogoutMutation = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userPositionInfo');
      navigate('/signIn');
    },
    onError: () => alert('로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.'),
  });

  return (
    <HeaderPersonalContainer ref={dropdownRef}>
      <img src={AlarmImg} className='alarmImg' alt='alarmImg' />
      <div className='personalBox' onClick={toggleDropdown}>
        <div className='profile'>고하</div>
        <div className='profileName'>사용자</div>
        <img className='arrowDown' alt='arrowDownImg' src={ArrowDownImg} />
      </div>

      {isOpen && (
        <ProfileContainer>
          <ProfileBoxContainer>
            <div className='profile'>고하</div>
            <div className='infoContainer'>
              <div className='name'>김고하</div>
              <div className='email'>{userPositionInfo?.email || ''}</div>
            </div>
          </ProfileBoxContainer>
          <LogoutContainer
            onClick={() => {
              handleLogoutMutation.mutate();
              toggleDropdown();
            }}>
            <img src={AlertIcon} alt='alertIcon' />
            <div className='logout'>로그아웃</div>
          </LogoutContainer>
        </ProfileContainer>
      )}
    </HeaderPersonalContainer>
  );
};

export default ProfileDropdown;

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
    align-items: center;
    border-radius: 42px;
    border: 0.5px solid rgb(var(--main));
    cursor: pointer;
    box-sizing: border-box;
    width: 95px;
    .profile {
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 4px;
      background: #9570e2;
      color: #fff;
      text-align: center;
      font-size: 8px;
      font-weight: 500;
      line-height: normal;
    }
    .profileName {
      color: #333;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.14px;
      line-height: normal;
    }
    .arrowDown {
      width: 7px;
      height: 4px;
      margin-left: auto;
    }
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(50, 83, 255, 0.3);
  position: absolute;

  min-height: 130px;
  width: fit-content;
  min-width: 259px;

  top: 50px;
  z-index: 10;
  right: 0;
`;

const ProfileBoxContainer = styled.div`
  display: flex;
  gap: 11px;
  align-items: center;
  padding: 19px 24px 17px 26px;
  border-bottom: 1px solid #969696;

  & > .profile {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #9570e2;
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
  }

  & > .infoContainer {
    display: flex;
    flex-direction: column;
    gap: 3px;

    & > .name {
      color: #333;
      font-size: 20px;
      font-weight: 700;
    }

    & > .email {
      color: #969696;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.28px;
    }
  }
`;

const LogoutContainer = styled.div`
  display: flex;
  gap: 7px;
  padding: 8px 24px 10px 26px;
  cursor: pointer;
  align-items: center;

  & > .logout {
    color: #555;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
  }
`;
