import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import appUrl from "../api/appUrl";
import webInfoApi from "../api/webInfoApi";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../auth/AuthContext";
import { userApi } from "../api/userApi";
import { cartActions } from "../state/actions/cartActions";
import DropdownCart from "../components/DropdownCart";
import { Helmet } from "react-helmet";
import MenuHeader from "./MenuHeader";
import SearchBox from "./SearchBox";

function Header() {
  const { logoutContext } = useAuth();
  const [webInfo, setWebInfo] = useState({});
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer?.isLoggedIn);
  const { quantity } = useSelector((state) => state.cartReducers);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await webInfoApi.getFirst();
        if (res.status === 200) {
          console.log(res);
          setWebInfo(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        try {
          const response = await userApi.getMyCart();
          console.log(response);
          if (response.status === 200) {
            dispatch(cartActions.setInitShow(response.data));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [isLoggedIn]);

  const handleLogout = () => {
    logoutContext();
  };
  return (
    <header className="header">
      <Helmet>
        <title>Trang chủ</title>
        <link
          rel="icon"
          href={webInfo.icon !== undefined && appUrl.logoURL + webInfo?.icon}
        />
      </Helmet>
      <div className="header-top">
        <div className="container">
          <div className="header-left d-none d-sm-block">
            <p className="top-message text-uppercase">{webInfo?.description}</p>
          </div>
          <div className="header-right header-dropdowns ml-0 ml-sm-auto w-sm-100">
            <div className="header-dropdown dropdown-expanded d-none d-lg-block">
              <a href="#">Links</a>
              <div className="header-menu">
                <ul>
                  {isLoggedIn && (
                    <li>
                      <Link to={"/tai-khoan"}>Tài Khoản</Link>
                    </li>
                  )}
                  <li>
                    <Link to="gio-hang">Giỏ Hàng</Link>
                  </li>
                  {!isLoggedIn ? (
                    <li>
                      <Link to="dang-nhap">Đăng Nhập</Link>
                    </li>
                  ) : (
                    <li>
                      <a style={{ cursor: "pointer" }} onClick={handleLogout}>
                        Đăng xuất
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <span className="separator" />
            <div className="social-icons">
              {webInfo?.facebookLink !== null && (
                <a
                  href={webInfo?.facebookLink}
                  className="social-icon social-facebook icon-facebook"
                  target="_blank"
                />
              )}
              {webInfo?.twitterLink !== null && (
                <a
                  href={webInfo?.twitterLink}
                  className="social-icon social-twitter icon-twitter"
                  target="_blank"
                />
              )}
              {webInfo?.instagramLink !== null && (
                <a
                  href={webInfo?.instagramLink}
                  className="social-icon social-instagram icon-instagram"
                  target="_blank"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="header-middle sticky-header"
        data-sticky-options="{'mobile': true}"
      >
        <div className="container">
          <div className="header-left col-lg-2 w-auto pl-0">
            <button
              className="mobile-menu-toggler text-primary mr-2"
              type="button"
            >
              <i className="fas fa-bars" />
            </button>
            <Link to="/" className="logo">
              <img
                src={webInfo?.icon && appUrl.logoURL + webInfo?.icon}
                width={111}
                height={44}
                alt="Porto Logo"
              />
            </Link>
          </div>
          <div className="header-right w-lg-max">
           <SearchBox/>
            {/* End .header-search */}
            <div className="header-contact d-none d-lg-flex pl-4 pr-4">
              <img
                alt="phone"
                src="/assets/images/phone.png"
                width={30}
                height={30}
                className="pb-1"
              />
              <h6>
                <span>SĐT</span>
                <Link to="/" className="text-dark font1">
                  {webInfo?.phoneNumber}
                </Link>
              </h6>
            </div>
            {isLoggedIn ? (
              <Link to="tai-khoan" className="header-icon" title="Tài khoản">
                <i className="icon-user-2" />
              </Link>
            ) : (
              <Link to="dang-nhap" className="header-icon" title="Đăng nhập">
                <i className="icon-user-2" />
              </Link>
            )}

            <a href="wishlist.html" className="header-icon" title="wishlist">
              <i className="icon-wishlist-2" />
            </a>
            <div className="dropdown cart-dropdown">
              <a
                href="#"
                title="Cart"
                className="dropdown-toggle dropdown-arrow cart-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-display="static"
              >
                <i className="minicart-icon" />
                <span className="cart-count badge-circle">
                  {quantity < 100 ? quantity : "99+"}
                </span>
              </a>
              <div className="cart-overlay" />
              <div className="dropdown-menu mobile-cart">
                <a
                  title="Close (Esc)"
                  className="btn-close"
                  style={{ cursor: "pointer" }}
                >
                  ×
                </a>
                <DropdownCart />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .header-middle */}
      <div
        className="header-bottom sticky-header d-none d-lg-block"
        data-sticky-options="{'mobile': false}"
      >
        <MenuHeader />
        {/* End .container */}
      </div>
      {/* End .header-bottom */}
    </header>
  );
}

export default Header;
