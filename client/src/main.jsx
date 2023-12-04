import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Feed from './pages/Feed';

import './index.scss'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: '/:filter',
        element: <Feed />
      },
      {
        path: 'dashboard/:userId',
        element: <Dashboard />
      },
      {
        path: '*',
        element: <Error />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
