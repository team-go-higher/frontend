import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const ApplicationDetail = React.lazy(() => import('./ApplicationDetail'));
const ApplicationEdit = React.lazy(() => import('./ApplicationEdit'));
const ApplicationAdd = React.lazy(() => import('./ApplicationAdd'));

const routes = [
  { path: '/detail/:applicationId', element: <ApplicationDetail /> },
  { path: '/edit/:applicationId', element: <ApplicationEdit /> },
  { path: '/add', element: <ApplicationAdd /> },
];

const loading = <div>화면을 불러오는 중 입니다.</div>;

const Index = () => {
  return (
    <Suspense fallback={loading}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Index;
