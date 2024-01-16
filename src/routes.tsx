import React from 'react';

const Login = React.lazy(() => import('./pages/login/Login'));
const Calendar = React.lazy(() => import('./pages/main/calendar/Calendar'));
const Kanban = React.lazy(() => import('./pages/main/kanban/Kanban'));
const Page404 = React.lazy(() => import('./pages/page404/Page404'));
const Page500 = React.lazy(() => import('./pages/page500/Page500'));
const DesiredPosition = React.lazy(() => import('./pages/signUp/DesiredPosition'));
const ApplicationDetail = React.lazy(() => import('./pages/applications/ApplicationDetail'));
const ApplicationEdit = React.lazy(() => import('./pages/applications/ApplicationEdit'));

export const privateRoutes = [
  { path: '/calendar', element: <Calendar /> },
  { path: '/kanban', element: <Kanban /> },
  { path: '/applicationDetail', element: <ApplicationDetail /> },
  { path: '/applicatioEdit', element: <ApplicationEdit /> },
];

export const publicRoutes = [
  { path: '/404', element: <Page404 /> },
  { path: '/500', element: <Page500 /> },
  { path: '/login', element: <Login /> },
  { path: '/token', element: <Login /> },
  { path: '/signUp/desiredPosition', element: <DesiredPosition /> },
];
