import { useEffect, useState } from 'react';
import {
  HeaderContainer,
  HeaderMenuContainer,
  HeaderPersonalContainer,
} from './HeaderStyledComponents';
import AlarmImg from 'assets/header/header_alarm.svg';
import ArrowDownImg from 'assets/header/header_arrow_down.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoIcon from 'assets/default/icon_logo.svg';
import ProfileModal from './ProfileModal';
import { useDropdown } from 'hooks/feature/useDropDown';

const MENU_ITEM_ARR = ['지원 현황 모아보기', '지원서 추가'];

const Header = () => {
  const { pathname } = useLocation();
  const [isSelect, setIsSelect] = useState('');
  const navigate = useNavigate();

  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

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

  useEffect(() => {
    if (pathname === '/application/add') {
      setIsSelect('지원서 추가');
      return;
    }
    if (pathname === '/applicationStatus') {
      setIsSelect('지원 현황 모아보기');
      return;
    }
    setIsSelect('');
  }, [pathname]);

  return (
    <HeaderContainer>
      <div className='headerContainer' ref={dropdownRef}>
        <img
          className='headerLogo'
          src={LogoIcon}
          alt='logoIcon'
          onClick={() => {
            navigate('/');
          }}
        />
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
            <div className='personalBox' onClick={toggleDropdown}>
              <div className='profile'>고하</div>
              <div className='profileName'>사용자</div>
              <img className='arrowDown' alt='arrowDownImg' src={ArrowDownImg} />
            </div>
          </HeaderPersonalContainer>
        </div>
        {isOpen && <ProfileModal closeModal={toggleDropdown} />}
      </div>
    </HeaderContainer>
  );
};

export default Header;
