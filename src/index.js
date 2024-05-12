import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AllProduct from './pages/AllProduct';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/store';
import Home from './pages/Home';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import NotFound from './pages/notFound/NotFound';
import Cart from './pages/Cart';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRouteLogin from './auth/ProtectedRouteLogin';
import SendEmail from './pages/SendEmail';
import ConfirmEmail from './pages/ConfirmEmail';
import InnitData from './utils/InnitData';
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "san-pham",
        element: (
          <AllProduct/>
        ),
      },
      {
        path: "dang-nhap",
        element: <ProtectedRouteLogin><Login/></ProtectedRouteLogin>, 
      },
      {
        path: "gio-hang",
        element: (
          <ProtectedRoute><Cart/></ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />, 
  },
  {
    path: "/nhan-lien-ket",
    element: <SendEmail />, 
  },
  {
    path: "/xac-nhan-email/:userId/:confirmEmailToken",
    element: <ConfirmEmail />, 
  },
]);

root.render(
  <React.StrictMode>
   
      <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router}>
      
        </RouterProvider>
        </AuthProvider>
      </Provider>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
