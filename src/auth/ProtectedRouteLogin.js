import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRouteLogin({ children }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.authReducer);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? null : children;
}

export default ProtectedRouteLogin;
