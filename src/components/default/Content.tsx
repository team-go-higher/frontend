import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from 'routes';

const loading = <div>화면을 불러오는 중 입니다.</div>;

const AppContent = () => {
  return (
    <Suspense fallback={loading}>
      <Routes>
        {routes.map(
          (route, idx) =>
            route.element && <Route key={idx} path={route.path} element={<route.element />} />,
        )}
      </Routes>
    </Suspense>
  );
};

export default AppContent;
