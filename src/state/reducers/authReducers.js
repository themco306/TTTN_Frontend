import { userApi } from "../../api/userApi";
import { AuthActionTypes } from "../actions/authActions";

const initialState = {
  isLoggedIn: localStorage.getItem('tokenCustomer')?true:false,
  user: localStorage.getItem('userCustomer')!==undefined ? JSON.parse(localStorage.getItem('userCustomer')) : null,
  token:localStorage.getItem('tokenCustomer')?localStorage.getItem('tokenCustomer'):''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, isLoggedIn: true, user: action.payload };
      case AuthActionTypes.CONFIRM_EMAIL:
        return { ...state, user: { ...state.user, emailConfirmed: true } };
      case AuthActionTypes.SET_TOKEN:
        return { ...state, token: action.payload };
    case AuthActionTypes.LOGOUT:
      return { ...state, isLoggedIn: false, user: null,token:null };
    default:
      return state;
  }
};

export default authReducer;
