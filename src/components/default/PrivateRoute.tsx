import { ReactElement } from 'react';
import { Navigate, Route } from 'react-router-dom';

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute = ({ element, ...rest }: PrivateRouteProps) => {
  const userInfo = localStorage.getItem('userInfo');

  return userInfo ? <Route {...rest} element={element} /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
