import React from 'react'
import ItemProduct from '../components/Products/ItemProduct'

function ProductDetail() {
  return (
    <div>
    <div className="container">
  <nav aria-label="breadcrumb" className="breadcrumb-nav">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="demo4.html"><i className="icon-home" /></a></li>
      <li className="breadcrumb-item"><a href="#">Sản Phẩm</a></li>
    </ol>
  </nav>
</div>


<div className="product-single-container product-single-default product-transparent-image bg-gray">
  <div className="container">
    <div className="cart-message d-none">
      <strong className="single-cart-notice">“Men Black Sports Shoes”</strong>
      <span>has been added to your cart.</span>
    </div>
    <div className="row">
      <div className="col-xl-7">
        <div className="product-single-gallery pg-vertical">
          <div className="product-slider-container">
            <div className="product-single-carousel owl-carousel owl-theme show-nav-hover">
              <div className="product-item">
                <img className="product-single-image" src="/assets/images/products/zoom/product-1-big.jpg" data-zoom-image="/assets/images/products/zoom/product-1-big.jpg" width={540} height={540} alt="product-img" />
              </div>
              <div className="product-item">
                <img className="product-single-image" src="/assets/images/products/zoom/product-2-big.jpg" data-zoom-image="/assets/images/products/zoom/product-2-big.jpg" width={540} height={540} alt="product-img" />
              </div>
              <div className="product-item">
                <img className="product-single-image" src="/assets/images/products/zoom/product-3-big.jpg" data-zoom-image="/assets/images/products/zoom/product-3-big.jpg" width={540} height={540} alt="product-img" />
              </div>
              <div className="product-item">
                <img className="product-single-image" src="/assets/images/products/zoom/product-4-big.jpg" data-zoom-image="/assets/images/products/zoom/product-4-big.jpg" width={540} height={540} alt="product-img" />
              </div>
            </div>
            {/* End .product-single-carousel */}
            <span className="prod-full-screen">
              <i className="icon-plus" />
            </span>
          </div>
          <div className="vertical-thumbs">
            <button className="thumb-up disabled"><i className="icon-angle-up" /></button>
            <div className="product-thumbs-wrap">
              <div className="product-thumbs owl-dots" id="carousel-custom-dots">
                <div className="owl-dot">
                  <img src="/assets/images/products/zoom/product-1.jpg" width={128} height={128} alt="product-thumbnail-img" />
                </div>
                <div className="owl-dot">
                  <img src="/assets/images/products/zoom/product-2.jpg" width={128} height={128} alt="product-thumbnail-img" />
                </div>
                <div className="owl-dot">
                  <img src="/assets/images/products/zoom/product-3.jpg" width={128} height={128} alt="product-thumbnail-img" />
                </div>
                <div className="owl-dot">
                  <img src="/assets/images/products/zoom/product-4.jpg" width={128} height={128} alt="product-thumbnail-img" />
                </div>
              </div>
            </div>
            <button className="thumb-down disabled"><i className="icon-angle-down" /></button>
          </div>
        </div>
      </div>
      {/* End .product-single-gallery */}
      <div className="col-xl-5 product-single-details pt-3">
        <h1 className="product-title">Men Black Sports Shoes</h1>
        <div className="product-nav">
          <div className="product-prev">
            <a href="#">
              <span className="product-link" />
              <span className="product-popup">
                <span className="box-content">
                  <img alt="product" width={150} height={150} src="assets/images/products/product-3.jpg" style={{paddingTop: 0}} />
                  <span>Circled Ultimate 3D Speaker</span>
                </span>
              </span>
            </a>
          </div>
          <div className="product-next">
            <a href="#">
              <span className="product-link" />
              <span className="product-popup">
                <span className="box-content">
                  <img alt="product" width={150} height={150} src="/assets/images/products/product-4.jpg" style={{paddingTop: 0}} />
                  <span>Blue Backpack for the Young</span>
                </span>
              </span>
            </a>
          </div>
        </div>
        <div className="ratings-container">
          <div className="product-ratings">
            <span className="ratings" style={{width: '60%'}} />
            {/* End .ratings */}
            <span className="tooltiptext tooltip-top" />
          </div>
          {/* End .product-ratings */}
          <a href="#" className="rating-link">( 6 Reviews )</a>
        </div>
        {/* End .ratings-container */}
        <hr className="short-divider" />
        <div className="price-box">
          <span className="old-price">$1,999.00</span>
          <span className="new-price">$1,699.00</span>
        </div>
        {/* End .price-box */}
        <div className="product-desc">
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non.
          </p>
        </div>
        {/* End .product-desc */}
        <ul className="single-info-list mb-0 pb-2">
          {/**/}
          <li>
            SKU:
            <strong>PT0006</strong>
          </li>
          <li>
            CATEGORIES:
            <strong><a href="#" className="product-category">CLOTHING</a></strong>,
            <strong><a href="#" className="product-category">SHOES</a></strong>,
            <strong><a href="#" className="product-category">T-SHIRTS</a></strong>,
            <strong><a href="#" className="product-category">WATCHES</a></strong>
          </li>
        </ul>
        <div className="product-action">
          <div className="price-box product-filtered-price">
            <del className="old-price"><span>$286.00</span></del>
            <span className="product-price">$245.00</span>
          </div>
          <div className="product-single-qty">
            <input className="horizontal-quantity form-control bg-transparent" type="text" />
          </div>
          {/* End .product-single-qty */}
          <a href="cart.html" className="btn btn-dark add-cart icon-shopping-cart mr-2" title="Add to Cart">Thêm giỏ hàng</a>
          <a href="cart.html" className="btn btn-gray view-cart d-none">Giỏ hàng</a>
        </div>
        {/* End .product-action */}
        <hr className="divider mb-0 mt-0" />
        <div className="product-single-share mb-1 mb-sm-4 mb-xl-0">
          <label className="sr-only">Chia sẻ:</label>
          <div className="social-icons mr-2">
            <a href="#" className="social-icon social-facebook icon-facebook" target="_blank" title="Facebook" />
            <a href="#" className="social-icon social-twitter icon-twitter" target="_blank" title="Twitter" />
            <a href="#" className="social-icon social-linkedin fab fa-linkedin-in" target="_blank" title="Linkedin" />
            <a href="#" className="social-icon social-gplus fab fa-google-plus-g" target="_blank" title="Google +" />
            <a href="#" className="social-icon social-mail icon-mail-alt" target="_blank" title="Mail" />
          </div>
          {/* End .social-icons */}
          <a href="wishlist.html" className="btn-icon-wish add-wishlist" title="Add to Wishlist"><i className="icon-wishlist-2" /><span>Yêu thích</span></a>
        </div>
        {/* End .product single-share */}
      </div>
      {/* End .product-single-details */}
    </div>
    {/* End .row */}
  </div>
</div>

<div className="container">
  <div className="product-single-collapse mb-6" id="productAccordion">
    <div className="product-collapse-panel">
      <h3 className="product-collapse-title">
        <a data-toggle="collapse" href="#product-collapse-desc" role="button" aria-expanded="true" aria-controls="product-collapse-desc">Chi tiết</a>
      </h3>
      <div className="product-collapse-body collapse show" id="product-collapse-desc" data-parent="#productAccordion">
        <div className="collapse-body-wrapper pl-0">
          <div className="product-desc-content">
           aaaaaaaaaaa
          </div>
          {/* End .product-desc-content */}
        </div>
        {/* End .collapse-body-wrapper */}
      </div>
      {/* End .product-collapse-body */}
    </div>
    {/* End .product-collapse-panel */}
  </div>
  {/* End .product-single-collapse */}
  <div className="products-section pt-0">
    <h2 className="section-title">Mô hình tương tự</h2>
    <div className="products-slider owl-carousel owl-theme dots-top dots-small">
        <ItemProduct/>
        <ItemProduct/>
        <ItemProduct/>
        <ItemProduct/>
        <ItemProduct/>
        
    </div>
    {/* End .products-slider */}
  </div>
  {/* End .products-section */}
  <hr className="mt-0 m-b-5" />
  {/* End .row */}
</div>

    </div>
  )
}

export default ProductDetail
