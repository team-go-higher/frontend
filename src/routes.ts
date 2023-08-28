import React from 'react';

const Home = React.lazy(() => import('./pages/home/Home'));
const Kanban = React.lazy(() => import('./pages/kanban/Kanban'));

const routes = [
  { path: '/', element: Home },
  { path: '/kanban', element: Kanban },
];

export default routes;
