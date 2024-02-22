import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from 'routes';
import PrivateRoutesComponent from './PrivateRoutesComponent';

const loading = <div>화면을 불러오는 중 입니다.</div>;

const AppContent = () => {
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
