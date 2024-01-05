import { styled } from 'styled-components';
import Header from './components/default/header/Header';
import AppContent from './components/default/Content';

function DefaultLayout() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  console.log(!!userInfo);
  return (
    <Root>
      {userInfo && <Header />}
      <AppContent />
    </Root>
  );
}

export default DefaultLayout;

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
