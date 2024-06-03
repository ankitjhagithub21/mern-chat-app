import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { useSelector } from 'react-redux';
import { SocketProvider } from './SocketContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const App = () => {
  const authUser = useSelector((state) => state.user.authUser);

  return (
    <SocketProvider authUser={authUser}>
      <Toaster />
      <RouterProvider router={router} />
    </SocketProvider>
  );
};

export default App;
