import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type Props = {
    children: any; 
}
const ProtectedRoute = ({ children }:Props) => { 
    const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to='/sign-in' />;
  }
  return children;
};

export default ProtectedRoute;