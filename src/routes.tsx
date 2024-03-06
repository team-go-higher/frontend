import React from 'react';

const SignIn = React.lazy(() => import('./pages/signIn/SignIn'));
const Page404 = React.lazy(() => import('./pages/page404/Page404'));
const Page500 = React.lazy(() => import('./pages/page500/Page500'));
const DesiredPosition = React.lazy(() => import('./pages/signUp/DesiredPosition'));
const Application = React.lazy(() => import('./pages/applications/index'));
const Home = React.lazy(() => import('./pages/main/index'));

export const privateRoutes = [
  { path: '/', element: <Home /> },
  { path: '/application/*', element: <Application /> },
];

export const publicRoutes = [
  { path: '/signIn', element: <SignIn /> },
  { path: '/tokens', element: <SignIn /> },
  { path: '/signUp/desiredPosition', element: <DesiredPosition /> },
  { path: '/500', element: <Page500 /> },
  { path: '*', element: <Page404 /> },
];
