// AuthContext.js
import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../state/actions/authActions';
import { cartActions } from '../state/actions/cartActions';

const AuthContext = createContext(

);
export const useAuth = () => {
    return useContext(AuthContext);
  };
  const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
  

  
    const loginContext = (userData) => {
      localStorage.setItem('tokenCustomer', userData.token);
      localStorage.setItem('userCustomer', JSON.stringify(userData.user));
      dispatch(authActions.login(userData.user));
      dispatch(authActions.setToken(userData.token))
    };
  
    const logoutContext = () => {
      localStorage.removeItem('tokenCustomer');
      localStorage.removeItem('userCustomer');
      dispatch(cartActions.clearCart())
      dispatch(authActions.logout());
    };
  
    return (
      <AuthContext.Provider value={{ loginContext, logoutContext }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export { AuthProvider };