import React from 'react';

const Login = React.lazy(() => import('./pages/signIn/SignIn'));
const Calendar = React.lazy(() => import('./pages/main/calendar/Calendar'));
const Kanban = React.lazy(() => import('./pages/main/kanban/Kanban'));
const Page404 = React.lazy(() => import('./pages/page404/Page404'));
const Page500 = React.lazy(() => import('./pages/page500/Page500'));
const DesiredPosition = React.lazy(() => import('./pages/signUp/DesiredPosition'));

export const privateRoutes = [
  { path: '/calendar', element: <Calendar /> },
  { path: '/kanban', element: <Kanban /> },
];

export const publicRoutes = [
  { path: '/404', element: <Page404 /> },
  { path: '/500', element: <Page500 /> },
  { path: '/login', element: <Login /> },
  { path: '/token', element: <Login /> },
  { path: '/signUp/desiredPosition', element: <DesiredPosition /> },
];
