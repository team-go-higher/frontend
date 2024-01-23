import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { privateRoutes, publicRoutes } from 'routes';
import PrivateRoutesComponent from './PrivateRoutesComponent';
import { fetchUserPoistionInfo } from 'apis/auth';

const loading = <div>화면을 불러오는 중 입니다.</div>;

const AppContent = () => {
  const location = useLocation();
  const userInfo = localStorage.getItem('userInfo');

  const storeUserPositionInfo = async () => {
    const userPositionInfo = await fetchUserPoistionInfo();
    localStorage.setItem('userPositionInfo', JSON.stringify(userPositionInfo));
  };

  useEffect(() => {
    if (userInfo !== null) {
      storeUserPositionInfo();
    }
  }, [userInfo, location]);

  return (
    <Suspense fallback={loading}>
      <Routes>
        {/* private route */}
        <Route path='/' element={<PrivateRoutesComponent />}>
          {privateRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        {/* public route */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppContent;
