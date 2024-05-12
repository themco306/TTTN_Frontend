import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appUrl from "../api/appUrl";
import webInfoApi from "../api/webInfoApi";
import { useSelector } from "react-redux";
import { useAuth } from "../auth/AuthContext";

function Header() {
  const {logoutContext}=useAuth()
  const [webInfo,setWebInfo]=useState({});
  const isLoggedIn=useSelector(state=>state.authReducer?.isLoggedIn)
    useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await webInfoApi.getFirst();
              if (res.status === 200) {
                console.log(res)
                 setWebInfo(res.data)
              }
          } catch (error) {
             console.log(error)
          }
      };
      fetchData();
  }, []);


  const handleLogout =()=>{
    logoutContext()
  }
  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-left d-none d-sm-block">
            <p className="top-message text-uppercase">
              {webInfo?.description}
            </p>
          </div>
          <div className="header-right header-dropdowns ml-0 ml-sm-auto w-sm-100">
            <div className="header-dropdown dropdown-expanded d-none d-lg-block">
              <a href="#">Links</a>
              <div className="header-menu">
                <ul>
                  {isLoggedIn&&(
                     <li>
                     <a href="dashboard.html">Tài Khoản</a>
                   </li>
                  )}
                 
                  <li>
                    <a href="about.html">Về Chúng Tôi</a>
                  </li>
                  <li>
                    <a href="blog.html">Blog</a>
                  </li>
                  <li>
                    <a href="wishlist.html">Yêu Thích</a>
                  </li>
                  <li>
                    <Link to="gio-hang">Giỏ Hàng</Link>
                  </li>
                  {!isLoggedIn?(<li>
                    <Link to="dang-nhap" >
                      Đăng Nhập
                    </Link>
                  </li>):(
                    <li>
                    <a style={{ cursor:"pointer" }} onClick={handleLogout}>
                      Đăng xuất
                    </a>
                  </li>
                  )}
                  
                </ul>
              </div>
            </div>
            <span className="separator" />
            <div className="social-icons">
              {webInfo?.facebookLink!==null&&(
                 <a
                 href={webInfo?.facebookLink}
                 className="social-icon social-facebook icon-facebook"
                 target="_blank"
               />
              )}
             {webInfo?.twitterLink!==null&&(
              <a
              href={webInfo?.twitterLink}
              className="social-icon social-twitter icon-twitter"
              target="_blank"
            />
             )}
             {webInfo?.instagramLink!==null&&(
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
                src={webInfo?.icon&&(appUrl.logoURL+webInfo?.icon)}
                width={111}
                height={44}
                alt="Porto Logo"
              />
            </Link>
          </div>
          <div className="header-right w-lg-max">
            <div className="header-icon header-search header-search-inline header-search-category w-lg-max text-right mt-0">
              <a href="#" className="search-toggle" role="button">
                <i className="icon-search-3" />
              </a>
              <form action="#" method="get">
                <div className="header-search-wrapper">
                  <input
                    type="search"
                    className="form-control"
                    name="q"
                    id="q"
                    placeholder="Tìm kiếm..."
                    required
                  />
                  <div className="select-custom">
                    <select id="cat" name="cat">
                      <option value>Danh mục</option>
                      <option value={4}>Fashion</option>
                      <option value={12}>- Women</option>
                      <option value={13}>- Men</option>
                      <option value={66}>- Jewellery</option>
                      <option value={67}>- Kids Fashion</option>
                      <option value={5}>Electronics</option>
                      <option value={21}>- Smart TVs</option>
                      <option value={22}>- Cameras</option>
                      <option value={63}>- Games</option>
                      <option value={7}>Home &amp; Garden</option>
                      <option value={11}>Motors</option>
                      <option value={31}>- Cars and Trucks</option>
                      <option value={32}>
                        - Motorcycles &amp; Powersports
                      </option>
                      <option value={33}>- Parts &amp; Accessories</option>
                      <option value={34}>- Boats</option>
                      <option value={57}>- Auto Tools &amp; Supplies</option>
                    </select>
                  </div>
                  {/* End .select-custom */}
                  <button
                    className="btn icon-magnifier p-0"
                    title="search"
                    type="submit"
                  />
                </div>
                {/* End .header-search-wrapper */}
              </form>
            </div>
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
            <a href="login.html" className="header-icon" title="login">
              <i className="icon-user-2" />
            </a>
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
                <span className="cart-count badge-circle">3</span>
              </a>
              <div className="cart-overlay" />
              <div className="dropdown-menu mobile-cart">
                <a href="#" title="Close (Esc)" className="btn-close">
                  ×
                </a>
                <div className="dropdownmenu-wrapper custom-scrollbar">
                  <div className="dropdown-cart-header">GIỎ HÀNG</div>
                  {/* End .dropdown-cart-header */}
                  <div className="dropdown-cart-products">
                    <div className="product">
                      <div className="product-details">
                        <h4 className="product-title">
                          <a href="product.html">
                            Ultimate 3D Bluetooth Speaker
                          </a>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span> × $99.00
                        </span>
                      </div>
                      {/* End .product-details */}
                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img
                            src="/assets/images/products/product-1.jpg"
                            alt="product"
                            width={80}
                            height={80}
                          />
                        </a>
                        <a
                          href="#"
                          className="btn-remove"
                          title="Remove Product"
                        >
                          <span>×</span>
                        </a>
                      </figure>
                    </div>
                    {/* End .product */}
                    <div className="product">
                      <div className="product-details">
                        <h4 className="product-title">
                          <a href="product.html">Brown Women Casual HandBag</a>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span> × $35.00
                        </span>
                      </div>
                      {/* End .product-details */}
                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img
                            src="/assets/images/products/product-2.jpg"
                            alt="product"
                            width={80}
                            height={80}
                          />
                        </a>
                        <a
                          href="#"
                          className="btn-remove"
                          title="Remove Product"
                        >
                          <span>×</span>
                        </a>
                      </figure>
                    </div>
                    {/* End .product */}
                    <div className="product">
                      <div className="product-details">
                        <h4 className="product-title">
                          <a href="product.html">Circled Ultimate 3D Speaker</a>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span> × $35.00
                        </span>
                      </div>
                      {/* End .product-details */}
                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img
                            src="/assets/images/products/product-3.jpg"
                            alt="product"
                            width={80}
                            height={80}
                          />
                        </a>
                        <a
                          href="#"
                          className="btn-remove"
                          title="Remove Product"
                        >
                          <span>×</span>
                        </a>
                      </figure>
                    </div>
                    {/* End .product */}
                  </div>
                  {/* End .cart-product */}
                  <div className="dropdown-cart-total">
                    <span>TỔNG:</span>
                    <span className="cart-total-price float-right">
                      $134.00
                    </span>
                  </div>
                  {/* End .dropdown-cart-total */}
                  <div className="dropdown-cart-action">
                    <a
                      href="/cart"
                      className="btn btn-gray btn-block view-cart"
                    >
                      Xem Thêm
                    </a>
                    <a href="checkout.html" className="btn btn-dark btn-block">
                      Thanh Toán
                    </a>
                  </div>
                  {/* End .dropdown-cart-total */}
                </div>
                {/* End .dropdownmenu-wrapper */}
              </div>
              {/* End .dropdown-menu */}
            </div>
            {/* End .dropdown */}
          </div>
          {/* End .header-right */}
        </div>
        {/* End .container */}
      </div>
      {/* End .header-middle */}
      <div
        className="header-bottom sticky-header d-none d-lg-block"
        data-sticky-options="{'mobile': false}"
      >
        <div className="container">
          <nav className="main-nav w-100">
            <ul className="menu">
              <li className="active">
                <a href={"/"}>Trang Chủ</a>
              </li>
              <li>
                <a href="#">Danh mục</a>
                <ul>
                  <li>
                    <a href="wishlist.html">Wishlist</a>
                  </li>
                  <li>
                    <a href="cart.html">Shopping Cart</a>
                  </li>
                  <li>
                    <a href="checkout.html">Checkout</a>
                  </li>
                  <li>
                    <a href="dashboard.html">Dashboard</a>
                  </li>
                  <li>
                    <a href="about.html">About Us</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                    <ul>
                      <li>
                        <a href="blog.html">Blog</a>
                      </li>
                      <li>
                        <a href="single.html">Blog Post</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="contact.html">Contact Us</a>
                  </li>
                  <li>
                    <a href="login.html">Login</a>
                  </li>
                  <li>
                    <a href="forgot-password.html">Forgot Password</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href={"/products"}>Sản Phẩm</a>
                <div className="megamenu megamenu-fixed-width">
                  <div className="row">
                    <div className="col-lg-4">
                      <a href="#" className="nolink">
                        PRODUCT PAGES
                      </a>
                      <ul className="submenu">
                        <li>
                          <a href="product.html">SIMPLE PRODUCT</a>
                        </li>
                        <li>
                          <a href="product-variable.html">VARIABLE PRODUCT</a>
                        </li>
                        <li>
                          <a href="product.html">SALE PRODUCT</a>
                        </li>
                        <li>
                          <a href="product.html">FEATURED &amp; ON SALE</a>
                        </li>
                        <li>
                          <a href="product-custom-tab.html">WITH CUSTOM TAB</a>
                        </li>
                        <li>
                          <a href="product-sidebar-left.html">
                            WITH LEFT SIDEBAR
                          </a>
                        </li>
                        <li>
                          <a href="product-sidebar-right.html">
                            WITH RIGHT SIDEBAR
                          </a>
                        </li>
                        <li>
                          <a href="product-addcart-sticky.html">
                            ADD CART STICKY
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* End .col-lg-4 */}
                    <div className="col-lg-4">
                      <a href="#" className="nolink">
                        PRODUCT LAYOUTS
                      </a>
                      <ul className="submenu">
                        <li>
                          <a href="product-extended-layout.html">
                            EXTENDED LAYOUT
                          </a>
                        </li>
                        <li>
                          <a href="product-grid-layout.html">GRID IMAGE</a>
                        </li>
                        <li>
                          <a href="product-full-width.html">
                            FULL WIDTH LAYOUT
                          </a>
                        </li>
                        <li>
                          <a href="product-sticky-info.html">STICKY INFO</a>
                        </li>
                        <li>
                          <a href="product-sticky-both.html">
                            LEFT &amp; RIGHT STICKY
                          </a>
                        </li>
                        <li>
                          <a href="product-transparent-image.html">
                            TRANSPARENT IMAGE
                          </a>
                        </li>
                        <li>
                          <a href="product-center-vertical.html">
                            CENTER VERTICAL
                          </a>
                        </li>
                        <li>
                          <a href="#">BUILD YOUR OWN</a>
                        </li>
                      </ul>
                    </div>
                    {/* End .col-lg-4 */}
                    <div className="col-lg-4 p-0">
                      <div className="menu-banner menu-banner-2">
                        <figure>
                          <img
                            src="/assets/images/menu-banner-1.jpg"
                            width={182}
                            height={317}
                            alt="Menu banner"
                            className="product-promo"
                          />
                        </figure>
                        <i>OFF</i>
                        <div className="banner-content">
                          <h4>
                            <span className>UP TO</span>
                            <br />
                            <b className>50%</b>
                          </h4>
                        </div>
                        <a href="category.html" className="btn btn-sm btn-dark">
                          SHOP NOW
                        </a>
                      </div>
                    </div>
                    {/* End .col-lg-4 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .megamenu */}
              </li>
              <li>
                <a href="#">Bài viết</a>
                <ul>
                  <li>
                    <a href="wishlist.html">Tin Tức</a>
                  </li>
                  <li>
                    <a href="cart.html">Dịch Vụ</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="blog.html">Hàng mới</a>
              </li>
              <li>
                <a href="contact.html">Liên hệ</a>
              </li>
            </ul>
          </nav>
        </div>
        {/* End .container */}
      </div>
      {/* End .header-bottom */}
    </header>
  );
}

export default Header;
