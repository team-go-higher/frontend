import React from 'react';

const Home = React.lazy(() => import('./pages/home/Home'));
const Calendar = React.lazy(() => import('./pages/home/calendar/Calendar'));
const Kanban = React.lazy(() => import('./pages/home/kanban/Kanban'));
const Login = React.lazy(() => import('./pages/login/Login'));

const routes = [
  { path: '/', element: Home },
  { path: '/login', element: Login },
  { path: '/calendar', element: Calendar },
  { path: '/kanban', element: Kanban },
];

export default routes;
