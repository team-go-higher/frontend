import React, { useState } from 'react';
import {
  HeaderContainer,
  HeaderMenuContainer,
  HeaderPersonalContaienr,
} from './HeaderStyledComponents';
import AlarmImg from '../../../assets/default/img_alarm.png';
import ArrowDownImg from '../../../assets/default/img_arrow_down.png';

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
        <HeaderPersonalContaienr>
          <img src={AlarmImg} className='alarmImg' alt='alarmImg' />
          <div className='personalBox'>
            <div className='profile'>
              <img src={AlarmImg} className='alarmImg' alt='alarmImg' />
            </div>
            <div className='profileName'>사용자</div>
            <img className='arrowDown' alt='arrowDownImg' src={ArrowDownImg} />
          </div>
        </HeaderPersonalContaienr>
      </div>
    </HeaderContainer>
  );
};

export default Header;
