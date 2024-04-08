import React, { useEffect, useState } from 'react';
import {
  HeaderContainer,
  HeaderMenuContainer,
  HeaderPersonalContainer,
} from './HeaderStyledComponents';
import AlarmImg from 'assets/header/header_alarm.svg';
import ArrowDownImg from 'assets/header/header_arrow_down.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postLogout } from 'apis/auth';

const MENU_ITEM_ARR = ['지원 현황 모아보기', '공고리스트', '지원서 추가'];

const Header = () => {
  const { pathname } = useLocation();
  const [isSelect, setIsSelect] = useState('');
  const navigate = useNavigate();

  //TODO 다른 페이지 개발 시 이동 처리 추가 필요
  const handlePage = (item: string) => {
    if (item === '지원서 추가') {
      setIsSelect(item);
      navigate('/application/add');
      return;
    }
    if (item === '지원 현황 모아보기') {
      setIsSelect(item);
      navigate('/applicationStatus');
      return;
    }
  };

  const handleLogoutMutation = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userPositionInfo');
      navigate('/signin');
    },
    onError: () => alert('로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.'),
  });

  //TODO 다른 페이지 개발 시 이동 처리 추가 필요
  useEffect(() => {
    if (pathname === '/') {
      setIsSelect('');
      return;
    }
    if (pathname === '/application/add') {
      setIsSelect('지원서 추가');
      return;
    }
    if (pathname === '/applicationStatus') {
      setIsSelect('지원 현황 모아보기');
      return;
    }
  }, [pathname]);

  return (
    <HeaderContainer>
      <div className='headerContainer'>
        <div
          className='headerLogo'
          onClick={() => {
            navigate('/');
          }}>
          Go-Higher
        </div>
        <div className='rightContainer'>
          <HeaderMenuContainer>
            {MENU_ITEM_ARR.map((e, index) => {
              return (
                <div
                  className={`menuItem ${isSelect === e ? 'active' : ''}`}
                  key={index}
                  onClick={() => handlePage(e)}>
                  {e}
                </div>
              );
            })}
          </HeaderMenuContainer>
          <HeaderPersonalContainer>
            <img src={AlarmImg} className='alarmImg' alt='alarmImg' />
            <div className='personalBox'>
              <div className='profile'>고하</div>
              <div className='profileName'>사용자</div>
              <img className='arrowDown' alt='arrowDownImg' src={ArrowDownImg} />
            </div>
            <button
              onClick={() => {
                handleLogoutMutation.mutate();
              }}>
              로그아웃
            </button>
          </HeaderPersonalContainer>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
