import React, { useState } from 'react';
import {
  HeaderContainer,
  HeaderMenuContainer,
  HeaderPersonalContainer,
} from './HeaderStyledComponents';
import AlarmImg from 'assets/header/header_alarm.svg';
import ArrowDownImg from 'assets/header/header_arrow_down.svg';
import { useNavigate } from 'react-router-dom';

const MenuItemArr = ['내 공고 리스트', '공고리스트', '지원서 추가'];

const Header = () => {
  const [isSelect, setIsSelect] = useState('공고리스트');
  const navigate = useNavigate();

  const handlePage = (item: string) => {
    if (item === '지원서 추가') {
      setIsSelect(item);
      navigate('/application/add');
    }
    //TODO 다른 페이지 개발 시 이동 처리 추가 필요
  };

  return (
    <HeaderContainer>
      <div className='headerContainer'>
        <div className='headerLogo'>Go-Higher</div>
        <div className='rightContainer'>
          <HeaderMenuContainer>
            {MenuItemArr.map((e, index) => {
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
