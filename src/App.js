import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Root from './pages/Root';
import Error from './pages/Error';
import Register from './pages/Register';
import Login from './pages/Login';

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <Error /> },
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
