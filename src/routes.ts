import React from 'react';

const Home = React.lazy(() => import('./pages/home/Home'));
const Kanban = React.lazy(() => import('./pages/kanban/Kanban'));
const Login = React.lazy(() => import('./pages/login/Login'));

const routes = [
  { path: '/', element: Home },
  { path: '/login', element: Login },
  { path: '/kanban', element: Kanban },
];

export default routes;
