import React, { useEffect, useState } from 'react'
import menuApi from '../api/menuApi'
import { Link, useLocation } from 'react-router-dom'
import SubMenuHeader from './SubMenuHeader';

function MenuHeader() {
    const [menuData,setMenuData]=useState([])
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  
    const lastSegment = pathSegments.length === 0 ? '/' : pathSegments[pathSegments.length - 1];
    console.log("iiiiiii",lastSegment)
    useEffect(()=>{
        const fecth=async()=>{
            try {
              const response=await menuApi.getAllHeader()
              console.log(response)  
              if(response.status===200){
                setMenuData(response.data)
              }
            } catch (error) {
                
            }
        }
        fecth()
    },[])
  return (
    <div className="container">
          <nav className="main-nav w-100">
            <ul className="menu">
                {menuData.length>0&&menuData.map((item)=>(
                    <li className={item.link==lastSegment?"active":""}>
                    <Link to={item.link}>{item.name}</Link>
                    <SubMenuHeader menuId={item.id}/>
                  </li>
                  
                ))}
              
              {/* <li>
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

                  </div>
 
                </div>
    
              </li>
              <li>
                <Link href="#">Bài viết</Link>
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
              </li> */}
            </ul>
          </nav>
        </div>
  )
}

export default MenuHeader
