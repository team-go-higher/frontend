import React from 'react';

const SignIn = React.lazy(() => import('./pages/signIn/SignIn'));
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
  { path: '/signIn', element: <SignIn /> },
  { path: '/token', element: <SignIn /> },
  { path: '/signUp/desiredPosition', element: <DesiredPosition /> },
  { path: '/500', element: <Page500 /> },
  { path: '*', element: <Page404 /> },
];
