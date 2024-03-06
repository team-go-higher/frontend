import React, { useEffect, useState } from 'react';
import {
  HeaderContainer,
  HeaderMenuContainer,
  HeaderPersonalContainer,
} from './HeaderStyledComponents';
import AlarmImg from 'assets/header/header_alarm.svg';
import ArrowDownImg from 'assets/header/header_arrow_down.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const MENU_ITEM_ARR = ['내 공고 리스트', '공고리스트', '지원서 추가'];

const Header = () => {
  const { pathname } = useLocation();
  const [isSelect, setIsSelect] = useState('');
  const navigate = useNavigate();

  const handlePage = (item: string) => {
    if (item === '지원서 추가') {
      setIsSelect(item);
      navigate('/application/add');
    }
    //TODO 다른 페이지 개발 시 이동 처리 추가 필요
  };

  useEffect(() => {
    if (pathname === '/') {
      setIsSelect('');
      return;
    }
    if (pathname === '/application/add') {
      setIsSelect('지원서 추가');
      return;
    }
    //TODO 다른 페이지 개발 시 이동 처리 추가 필요
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
                navigate('/signIn');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('userPositionInfo');
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
