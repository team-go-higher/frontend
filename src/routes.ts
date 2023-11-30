import React from 'react';

const Main = React.lazy(() => import('./pages/main/Main'));
const Calendar = React.lazy(() => import('./pages/main/calendar/Calendar'));
const Kanban = React.lazy(() => import('./pages/main/kanban/Kanban'));
const Login = React.lazy(() => import('./pages/login/Login'));
const DesiredPosition = React.lazy(() => import('./pages/signUp/DesiredPosition'));
const Page404 = React.lazy(() => import('./pages/page404/Page404'));
const Page500 = React.lazy(() => import('./pages/page500/Page500'));

const routes = [
  { path: '/', element: Main },
  { path: '/404', element: Page404 },
  { path: '/500', element: Page500 },
  { path: '/login', element: Login },
  { path: '/token', element: Login },
  { path: '/calendar', element: Calendar },
  { path: '/kanban', element: Kanban },
  { path: '/signUp/desiredPosition', element: DesiredPosition },
];

export default routes;
