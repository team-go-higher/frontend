import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const Main = React.lazy(() => import('./pages/main/Main'));
const Login = React.lazy(() => import('./pages/login/Login'));
const Calendar = React.lazy(() => import('./pages/main/calendar/Calendar'));
const Kanban = React.lazy(() => import('./pages/main/kanban/Kanban'));
const Page404 = React.lazy(() => import('./pages/page404/Page404'));
const Page500 = React.lazy(() => import('./pages/page500/Page500'));
const DesiredPosition = React.lazy(() => import('./pages/signUp/DesiredPosition'));

const userInfo = localStorage.getItem('userInfo');
console.log(userInfo);

const routes: RouteObject[] = [
  {
    path: '/',
    element: userInfo ? <Main /> : <Navigate to='/login' replace />,
    children: [
      { path: '/calendar', element: <Calendar /> },
      { path: '/kanban', element: <Kanban /> },
    ],
  },
  { path: '/404', element: <Page404 /> },
  { path: '/500', element: <Page500 /> },
  { path: '/login', element: <Login /> },
  { path: '/token', element: <Login /> },
  { path: '/signUp/desiredPosition', element: <DesiredPosition /> },
];

export default routes;
