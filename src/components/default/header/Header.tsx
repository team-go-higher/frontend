import React, { useState } from 'react';
import {
  HeaderContainer,
  HeaderMenuContainer,
  HeaderPersonalContainer,
} from './HeaderStyledComponents';
import AlarmImg from 'assets/header/header_alarm.svg';
import ArrowDownImg from 'assets/header/header_arrow_down.svg';

const MenuItemArr = ['내 공고 리스트', '공고리스트', '지원서 추가', '마이페이지'];

const Header = () => {
  const [isSelect, setIsSelect] = useState('공고리스트');
  if (window.location.pathname === '/login') return null;
  return (
    <HeaderContainer>
      <div className='headerContainer'>
        <div className='headerLogo'>Go-Higher</div>
        <HeaderMenuContainer>
          {MenuItemArr.map((e, index) => {
            return (
              <div
                className={`menuItem ${isSelect === e ? 'active' : ''}`}
                key={index}
                onClick={() => setIsSelect(e)}>
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
        </HeaderPersonalContainer>
      </div>
    </HeaderContainer>
  );
};

export default Header;
