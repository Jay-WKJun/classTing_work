import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Loading } from '@/pages/Loading';
import { Quiz } from '@/pages/Quiz';

function Router() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
}

export { Router };
