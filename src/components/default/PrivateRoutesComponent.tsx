import { Navigate } from 'react-router-dom';
import Main from 'pages/main/Main';

const PrivateRoutesComponent = () => {
  const userInfo = localStorage.getItem('userInfo');

  if (!userInfo) {
    return <Navigate to='/login' replace />;
  }
  return <Main />;
};

export default PrivateRoutesComponent;