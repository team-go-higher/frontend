import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from 'routes';

const loading = <div>화면을 불러오는 중 입니다.</div>;

const AppContent = () => {
  return <Suspense fallback={loading}>{useRoutes(routes)}</Suspense>;
};

export default AppContent;
