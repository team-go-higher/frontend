import './App.css';
import { styled } from 'styled-components';
import Header from './components/default/header/Header';
import AppContent from './components/default/Content';

function App() {
  return (
    <Root>
      <Header />
      <AppContent />
    </Root>
  );
}

export default App;

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
