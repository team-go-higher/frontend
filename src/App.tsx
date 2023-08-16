import './App.css';
import { styled } from 'styled-components';
import Header from './components/default/header/Header';
import NavBar from './components/default/navBar/NavBar';
import AppContent from './components/default/Content';

function App() {
  return (
    <Root>
      <div className='leftContainer'>
        <NavBar />
      </div>
      <div className='rightContainer'>
        <Header />
        <AppContent />
      </div>
    </Root>
  );
}

export default App;

const Root = styled.div`
  display: flex;
  .rightContainer {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`;
