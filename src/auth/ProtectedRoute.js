import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from './AuthContext';

function ProtectedRoute({children}) {
  const navigate = useNavigate();
  const {logoutContext}=useAuth()
  const { isLoggedIn } = useSelector(state => state.authReducer);
  const user = useSelector(state => state.authReducer.user);
    console.log("ilogged",isLoggedIn)
  useEffect(() => {
    if (!isLoggedIn) {
      logoutContext()
      navigate('/dang-nhap');
    }
    if(user!==null&&!user.emailConfirmed){
      navigate('/nhan-lien-ket')
     
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children :null ;
}
export  default ProtectedRoute;