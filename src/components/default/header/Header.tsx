import { useEffect, useState } from 'react';
import { HeaderContainer, HeaderMenuContainer } from './HeaderStyledComponents';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoIcon from 'assets/default/icon_logo.svg';
import ProfileDropdown from './ProfileDropdown';

const MENU_ITEM_ARR = ['지원 현황 모아보기', '지원서 추가'];

const Header = () => {
  const { pathname } = useLocation();
  const [isSelect, setIsSelect] = useState('');
  const navigate = useNavigate();

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
      <div className='headerContainer'>
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
            {MENU_ITEM_ARR.map((e, index) => (
              <div
                className={`menuItem ${isSelect === e ? 'active' : ''}`}
                key={index}
                onClick={() => handlePage(e)}>
                {e}
              </div>
            ))}
          </HeaderMenuContainer>
          <ProfileDropdown />
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
