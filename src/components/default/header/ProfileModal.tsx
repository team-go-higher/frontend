import styled from 'styled-components';
import AlertIcon from 'assets/default/icon_profile.svg';
import { useMutation } from '@tanstack/react-query';
import { postLogout } from 'apis/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const ProfileModal = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const userInfo = JSON.parse(localStorage.getItem('userPositionInfo') || '{}');

  const handleLogoutMutation = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userPositionInfo');
      navigate('/signin');
    },
    onError: () => alert('로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.'),
  });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [modalRef]);

  return (
    <ProfileContainer ref={modalRef}>
      <ProfileBoxContainer>
        <div className='profile'>고하</div>
        <div className='infoContainer'>
          <div className='name'>김고하</div>
          <div className='email'>{userInfo?.email || ''}</div>
        </div>
      </ProfileBoxContainer>
      <LogoutContainer
        onClick={() => {
          closeModal();
          handleLogoutMutation.mutate();
        }}>
        <img src={AlertIcon} alt='alertIcon' />
        <div className='logout'>로그아웃</div>
      </LogoutContainer>
    </ProfileContainer>
  );
};

export default ProfileModal;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(50, 83, 255, 0.3);
  position: absolute;

  min-height: 130px;
  width: 259px;

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
