import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

const loading = <div>화면을 불러오는 중 입니다.</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./DefaultLayout'));

//컴포넌트
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <DefaultLayout />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
