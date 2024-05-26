import React from 'react'
import HomeSlide from '../parts/HomeSlide'
import FeaturedProducts from '../components/Products/FeaturedProducts'
import NewProducts from '../components/Products/NewProducts'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ListPost from '../components/Posts/ListPost';
function Home() {
  return (
    <>
   <HomeSlide/>


<FeaturedProducts/>
<NewProducts/>

<section className="feature-boxes-container">
  <div className="container " >
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
        </div>
      </div>
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
        </div>
      </div>
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
        </div>
      </div>
    </div>
  </div>
</section>

<section className="blog-section pb-0">
  <div className="container">
    <h2 className="section-title heading-border border-0 " >
      Bài viết mới</h2>
      <ListPost />

    <hr className="mt-0 m-b-5" />

  </div>
</section>



</>
  )
}

export default Home