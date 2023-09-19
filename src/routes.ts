import React from 'react';

const Main = React.lazy(() => import('./pages/main/Main'));
const Calendar = React.lazy(() => import('./pages/main/calendar/Calendar'));
const Kanban = React.lazy(() => import('./pages/main/kanban/Kanban'));
const Login = React.lazy(() => import('./pages/login/Login'));

const routes = [
  { path: '/', element: Main },
  { path: '/login', element: Login },
  { path: '/calendar', element: Calendar },
  { path: '/kanban', element: Kanban },
];

export default routes;
