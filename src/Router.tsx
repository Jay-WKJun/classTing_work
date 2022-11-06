import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Loading } from '@/pages/Loading';
import { QuizPage } from '@/pages/QuizPage';
import { Result } from '@/pages/Result';

function Router() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/quiz/:id" element={<QuizPage />} />
      <Route path="/result" element={<Result />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
}

export { Router };
