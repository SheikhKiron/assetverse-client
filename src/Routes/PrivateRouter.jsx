import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Spinner from './../Components/Spinner';

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) {
    return <Spinner></Spinner>
  }
  if (!user) {
    return <Navigate to='/login'></Navigate>
  }
  return children;
};

export default PrivateRouter;