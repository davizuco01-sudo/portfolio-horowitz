import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { RootLayout } from './components/layout/RootLayout';
import { ErrorPage } from './pages/ErrorPage';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ProjectDetail } from './pages/ProjectDetail';

/**
 * Routes
 *   /                 Home
 *   /projects/:slug   Project case study (any project with `hasDetailPage: true`)
 *   *                 404
 *
 * The pathless child route carries the error boundary, so the navigation bar
 * and footer stay visible if a page fails to render.
 */
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Home /> },
          { path: 'projects/:slug', element: <ProjectDetail /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
