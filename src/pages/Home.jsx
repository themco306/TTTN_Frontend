import React from 'react'
import HomeSlide from '../parts/HomeSlide'
import FeaturedProducts from '../components/Products/FeaturedProducts'
import NewProducts from '../components/Products/NewProducts'
import ItemPost from '../components/Posts/ItemPost'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
function Home() {
  return (
    <>
   <HomeSlide/>
 <div className="container">
  <div className="info-boxes-slider owl-carousel owl-theme mb-2" data-owl-options="{
 'dots': false,
 'loop': false,
 'responsive': {
     '576': {
         'items': 2
     },
     '992': {
         'items': 3
     }
 }
   }">
<div className="info-box info-box-icon-left">
  <i className="icon-shipping" />
  <div className="info-box-content">
    <h4>Miễn phí vận chuyển và đổi trả</h4>
    <p className="text-body">Miễn phí vận chuyển cho tất cả các đơn hàng trên $99.</p>
  </div>
  {/* Kết Thúc .info-box-content */}
</div>
{/* Kết Thúc .info-box */}
<div className="info-box info-box-icon-left">
  <i className="icon-money" />
  <div className="info-box-content">
    <h4>Đảm bảo hoàn tiền</h4>
    <p className="text-body">Đảm bảo hoàn tiền 100%</p>
  </div>
  {/* Kết Thúc .info-box-content */}
</div>
{/* Kết Thúc .info-box */}
<div className="info-box info-box-icon-left">
  <i className="icon-support" />
  <div className="info-box-content">
    <h4>Hỗ trợ trực tuyến 24/7</h4>
    <p className="text-body">Lorem ipsum dolor sit amet.</p>
  </div>
  {/* Kết Thúc .info-box-content */}
</div>
{/* Kết Thúc .info-box */}

    {/* End .info-box */}
  </div>
  {/* End .info-boxes-slider */}
  <div className="banners-container mb-2">
    <div className="banners-slider owl-carousel owl-theme" data-owl-options="{
     'dots': false
 }">
      <div className="banner banner1 banner-sm-vw d-flex align-items-center appear-animate" style={{backgroundColor: '#ccc'}} data-animation-name="fadeInLeftShorter" data-animation-delay={500}>
        <figure className="w-100">
          <img src="assets/images/demoes/demo4/banners/banner-1.jpg" alt="banner" width={380} height={175} />
        </figure>
        <div className="banner-layer">
          <h3 className="m-b-2">Porto Watches</h3>
          <h4 className="m-b-3 text-primary"><sup className="text-dark"><del>20%</del></sup>30%<sup>OFF</sup></h4>
          <a href="category.html" className="btn btn-sm btn-dark">Shop Now</a>
        </div>
      </div>
      {/* End .banner */}
      <div className="banner banner2 banner-sm-vw text-uppercase d-flex align-items-center appear-animate" data-animation-name="fadeInUpShorter" data-animation-delay={200}>
        <figure className="w-100">
          <img src="assets/images/demoes/demo4/banners/banner-2.jpg" style={{backgroundColor: '#ccc'}} alt="banner" width={380} height={175} />
        </figure>
        <div className="banner-layer text-center">
          <div className="row align-items-lg-center">
            <div className="col-lg-7 text-lg-right">
              <h3>Deal Promos</h3>
              <h4 className="pb-4 pb-lg-0 mb-0 text-body">Starting at $99</h4>
            </div>
            <div className="col-lg-5 text-lg-left px-0 px-xl-3">
              <a href="category.html" className="btn btn-sm btn-dark">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
      {/* End .banner */}
      <div className="banner banner3 banner-sm-vw d-flex align-items-center appear-animate" style={{backgroundColor: '#ccc'}} data-animation-name="fadeInRightShorter" data-animation-delay={500}>
        <figure className="w-100">
          <img src="assets/images/demoes/demo4/banners/banner-3.jpg" alt="banner" width={380} height={175} />
        </figure>
        <div className="banner-layer text-right">
          <h3 className="m-b-2">Handbags</h3>
          <h4 className="m-b-2 text-secondary text-uppercase">Starting at $99</h4>
          <a href="category.html" className="btn btn-sm btn-dark">Shop Now</a>
        </div>
      </div>
      {/* End .banner */}
    </div>
  </div>
</div>

<FeaturedProducts/>
<NewProducts/>

<section className="feature-boxes-container">
  <div className="container appear-animate" data-animation-name="fadeInUpShorter">
    <div className="row">
      <div className="col-md-4">
        <div className="feature-box px-sm-5 feature-box-simple text-center">
          <div className="feature-box-icon">
            <i className="icon-earphones-alt" />
          </div>
          <div className="feature-box-content p-0">
            <h3>Hỗ Trợ Khách Hàng</h3>
            <h5>Bạn Sẽ Không Bao Giờ Cô Đơn</h5>
            <p>Chúng tôi thực sự quan tâm đến bạn và website của bạn cũng như bạn. Khi mua Porto hoặc bất kỳ chủ đề nào khác từ chúng tôi, bạn sẽ nhận được hỗ trợ miễn phí 100%.</p>
          </div>
          {/* Kết Thúc .feature-box-content */}
        </div>
        {/* Kết Thúc .feature-box */}
      </div>
      {/* Kết Thúc .col-md-4 */}
      <div className="col-md-4">
        <div className="feature-box px-sm-5 feature-box-simple text-center">
          <div className="feature-box-icon">
            <i className="icon-credit-card" />
          </div>
          <div className="feature-box-content p-0">
            <h3>Tùy Biến Đầy Đủ</h3>
            <h5>Hàng Ngàn Lựa Chọn</h5>
            <p>Với Porto, bạn có thể tùy chỉnh bố cục, màu sắc và kiểu dáng chỉ trong vài phút. Bắt đầu tạo ra một website tuyệt vời ngay bây giờ!</p>
          </div>
          {/* Kết Thúc .feature-box-content */}
        </div>
        {/* Kết Thúc .feature-box */}
      </div>
      {/* Kết Thúc .col-md-4 */}
      <div className="col-md-4">
        <div className="feature-box px-sm-5 feature-box-simple text-center">
          <div className="feature-box-icon">
            <i className="icon-action-undo" />
          </div>
          <div className="feature-box-content p-0">
            <h3>Admin Mạnh Mẽ</h3>
            <h5>Được Tạo Ra Để Giúp Bạn</h5>
            <p>Porto có các tính năng quản trị rất mạnh mẽ để giúp khách hàng xây dựng cửa hàng của riêng họ chỉ trong vài phút mà không cần bất kỳ kỹ năng đặc biệt nào trong phát triển web.</p>
          </div>
          {/* Kết Thúc .feature-box-content */}
        </div>
        {/* Kết Thúc .feature-box */}
      </div>
      {/* Kết Thúc .col-md-4 */}
    </div>
    {/* Kết Thúc .row */}
  </div>
  {/* Kết Thúc .container*/}
</section>

<section className="blog-section pb-0">
  <div className="container">
    <h2 className="section-title heading-border border-0 appear-animate" data-animation-name="fadeInUp">
      Tin MỚi</h2>
    <div className="owl-carousel owl-theme appear-animate" data-animation-name="fadeIn" data-owl-options="{
						'loop': false,
						'margin': 20,
						'autoHeight': true,
						'autoplay': false,
						'dots': false,
						'items': 2,
						'responsive': {
							'0': {
								'items': 1
							},
							'480': {
								'items': 2
							},
							'576': {
								'items': 3
							},
							'768': {
								'items': 4
							}
						}
					}">
                    <ItemPost/>
                    <ItemPost/>
                    <ItemPost/>
                    <ItemPost/>

    </div>
    <hr className="mt-0 m-b-5" />
    <div className="brands-slider owl-carousel owl-theme images-center appear-animate" data-animation-name="fadeIn" data-animation-duration={500} data-owl-options="{
					'margin': 0}">
      <img src="assets/images/brands/brand1.png" width={130} height={56} alt="brand" />
      <img src="assets/images/brands/brand2.png" width={130} height={56} alt="brand" />
      <img src="assets/images/brands/brand3.png" width={130} height={56} alt="brand" />
      <img src="assets/images/brands/brand4.png" width={130} height={56} alt="brand" />
      <img src="assets/images/brands/brand5.png" width={130} height={56} alt="brand" />
      <img src="assets/images/brands/brand6.png" width={130} height={56} alt="brand" />
    </div>
    <hr className="mt-0 m-b-5" />

  </div>
</section>



</>
  )
}

export default Home