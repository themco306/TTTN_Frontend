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
import MyAcount from './pages/myAcount/MyAcount';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Order from './pages/Order';
import OrderCompleted from './pages/OrderCompleted';
import CheckoutSuccess from './pages/CheckoutSuccess';
import OrderDetail from './pages/OrderDetail';
import ProductDetail from './pages/ProductDetail';
import PostDetail from './pages/PostDetail';
import AllPost from './pages/AllPost';
import Contact from './pages/Contact';
import SearchResult from './pages/SearchResult';
import FavoriteList from './pages/FavoriteList';
import SignalRComponent from './signal/SignalRComponent';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
        path: "san-pham/:slug",
        element: (
          <ProductDetail/>
        ),
      },
      {
        path: "ket-qua-tim-kiem",
        element: (
          <SearchResult/>
        ),
      },
      {
        path: "bai-viet",
        element: (
          <AllPost/>
        ),
      },
      {
        path: "bai-viet/:slug",
        element: (
          <PostDetail/>
        ),
      },
      {
        path: "lien-he",
        element: (
          <Contact/>
        ),
      },
      {
        path: "yeu-thich",
        element: (
          <FavoriteList/>
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
      {
        path: "dat-hang",
        element: (
          <ProtectedRoute><Order/></ProtectedRoute>
        ),
      },
      {
        path: "dat-hang-thanh-cong/:code",
        element: (
          <ProtectedRoute><OrderCompleted/></ProtectedRoute>
        ),
      },
      {
        path: "xac-nhan-don-hang/:code/:token",
        element: (
          <OrderCompleted/>
        ),
      },
      {
        path: "thanh-toan-thanh-cong",
        element: (
          <CheckoutSuccess/>
        ),
      },
      {
        path: "tai-khoan",
        element: (
          <ProtectedRoute><MyAcount/></ProtectedRoute>
        ),
      },
      {
        path: "chi-tiet-don-hang/:code",
        element: (
          <ProtectedRoute><OrderDetail/></ProtectedRoute>
        ),
      },
      {
        path: "quen-mat-khau",
        element: (
          <ForgotPassword/>
        ),
      },
      {
        path: "xac-nhan-dat-lai-mat-khau/:email/:confirmToken",
        element: (
          <ChangePassword/>
        ),
      },
      {
        path: "*",
        element: <NotFound />, 
      },
    ],
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
  // <React.StrictMode>
   
      <Provider store={store}>
      <AuthProvider>
      <GoogleOAuthProvider clientId="198953346553-ir20gmnjd7v9h5pbk1gr964qqq8462r5.apps.googleusercontent.com">
        <SignalRComponent>
        <RouterProvider router={router}>
      
        </RouterProvider>
        </SignalRComponent>
        </GoogleOAuthProvider>
        </AuthProvider>
      </Provider>
   
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
