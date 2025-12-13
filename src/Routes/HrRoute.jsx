
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const HrRoute = ({ children }) => {
  const{appUser}=useAuth()
  
  
  if (appUser.role !== 'hr') {
  return <Navigate to="/login" replace></Navigate>;
  }

    return children;
};

export default HrRoute;