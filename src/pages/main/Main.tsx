import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from 'components/default/header/Header';

const Main = () => {
  const userInfo = localStorage.getItem('userInfo');

  return (
    <Root>
      {userInfo && <Header />}
      <Outlet />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

export default Main;
