import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const EmployeRoute = ({children}) => {
  const{appUser}=useAuth()
  
  
  if (appUser.role !== 'employee') {
  return <Navigate to="/login" replace></Navigate>;
  }

    return children;
};


export default EmployeRoute;