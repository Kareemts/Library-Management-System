import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivetRouter = () => {
  const login = localStorage.getItem('login');

  let auth = false;
  if (login) {
    auth = true;
  } else {
    auth = false;
  }
  return auth ? <Outlet /> : <Navigate to="/" />;
};
export default PrivetRouter;
