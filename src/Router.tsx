import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';

function Router() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
}

export { Router };
