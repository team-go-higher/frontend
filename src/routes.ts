import React from 'react';

const Home = React.lazy(() => import('./pages/home/Home'));
const Login = React.lazy(() => import('./pages/login/Login'));

const routes = [
  { path: '/', element: Home },
  { path: '/login', element: Login },
];

export default routes;
