import './App.css';
import { styled } from 'styled-components';
import Header from './components/default/header/Header';
import AppContent from './components/default/Content';
import { useLocation } from 'react-router-dom';

function DefaultLayout() {
  const currentPath = useLocation().pathname;

  return (
    <Root>
      {currentPath.includes('login') || currentPath.includes('signUp/desiredPosition') ? (
        <></>
      ) : (
        <Header />
      )}

      <AppContent />
    </Root>
  );
}

export default DefaultLayout;

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
