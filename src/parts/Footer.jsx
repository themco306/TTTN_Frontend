import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import webInfoApi from "../api/webInfoApi";

function Footer() {
  const [webInfo,setWebInfo]=useState({});
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
  return (
    <footer className="footer bg-dark">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="widget">
                <h4 className="widget-title">Thông Tin Liên Hệ</h4>
                <ul className="contact-info">
                  {webInfo?.address!==null&&(
                    <li>
                    <span className="contact-info-label">Địa Chỉ:</span>{webInfo?.address}
                  </li>
                  )}
                  
                  <li>
                    <span className="contact-info-label">Điện Thoại:</span>
                  {webInfo?.phoneNumber}
                  </li>
                  <li>
                    <span className="contact-info-label">Email:</span>{" "}
                      <span
                        className="__cf_email__"
                        data-cfemail="711c10181d311409101c011d145f121e1c"
                      >
                        {webInfo?.email}
                      </span>
                  </li>
                  <li>
                    <span className="contact-info-label">
                      Thời Gian Làm Việc:
                    </span>{" "}
                    {webInfo?.workingHours}
                  </li>
                </ul>
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
                {/* Kết Thúc .social-icons */}
              </div>

              {/* End .widget */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-lg-3 col-sm-6">
              <div className="widget">
                <h4 className="widget-title">Dịch Vụ Khách Hàng</h4>
                <ul className="links">
                  <li>
                    <a href="#">Trợ Giúp &amp; Câu Hỏi Thường Gặp</a>
                  </li>
                  <li>
                    <a href="#">Theo Dõi Đơn Hàng</a>
                  </li>
                  <li>
                    <a href="#">Vận Chuyển &amp; Giao Hàng</a>
                  </li>
                  <li>
                    <a href="#">Lịch Sử Đơn Hàng</a>
                  </li>
                  <li>
                    <a href="#">Tìm Kiếm Nâng Cao</a>
                  </li>
                  <li>
                    <a href="dashboard.html">Tài Khoản Của Tôi</a>
                  </li>
                  <li>
                    <a href="#">Cơ Hội Nghề Nghiệp</a>
                  </li>
                  <li>
                    <a href="about.html">Về Chúng Tôi</a>
                  </li>
                  <li>
                    <a href="#">Bán Hàng Doanh Nghiệp</a>
                  </li>
                  <li>
                    <a href="#">Quyền Riêng Tư</a>
                  </li>
                </ul>
              </div>
              {/* Kết Thúc .widget */}
            </div>

            {/* End .col-lg-3 */}
            <div className="col-lg-3 col-sm-6">
              <div className="widget">
                <h4 className="widget-title">Thẻ Phổ Biến</h4>
                <div className="tagcloud">
                  <a href="#">Túi</a>
                  <a href="#">Màu Đen</a>
                  <a href="#">Màu Xanh</a>
                  <a href="#">Quần Áo</a>
                  <a href="#">Thời Trang</a>
                  <a href="#">Trung Tâm</a>
                  <a href="#">Áo Sơ Mi</a>
                  <a href="#">Giày</a>
                  <a href="#">Váy</a>
                  <a href="#">Thể Thao</a>
                  <a href="#">Áo Len</a>
                </div>
              </div>

              {/* End .widget */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-lg-3 col-sm-6">
              <div className="widget widget-newsletter">
                <h4 className="widget-title">Đăng ký nhận bản tin</h4>
                <p>
                  Nhận thông tin mới nhất về sự kiện, khuyến mãi và ưu đãi. Đăng
                  ký nhận bản tin:
                </p>
                <form action="#" className="mb-0">
                  <input
                    type="email"
                    className="form-control m-b-3"
                    placeholder="Địa chỉ email"
                    required
                  />
                  <input
                    type="submit"
                    className="btn btn-primary shadow-none"
                    defaultValue="Đăng Ký"
                  />
                </form>
              </div>

              {/* End .widget */}
            </div>
            {/* End .col-lg-3 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
      {/* End .footer-middle */}
      <div className="container">
        <div className="footer-bottom">
          <div className="container d-sm-flex align-items-center">
            <div className="footer-left">
              <span className="footer-copyright">
                Bản Quyền Thuộc Về TK-THEM
              </span>
            </div>
            <div className="footer-right ml-auto mt-1 mt-sm-0">
              <div className="payment-icons">
                <span
                  className="payment-icon visa"
                  style={{
                    backgroundImage:
                      "url(assets/images/payments/payment-visa.svg)",
                  }}
                />
                <span
                  className="payment-icon paypal"
                  style={{
                    backgroundImage:
                      "url(assets/images/payments/payment-paypal.svg)",
                  }}
                />
                <span
                  className="payment-icon stripe"
                  style={{
                    backgroundImage:
                      "url(assets/images/payments/payment-stripe.png)",
                  }}
                />
                <span
                  className="payment-icon verisign"
                  style={{
                    backgroundImage:
                      "url(assets/images/payments/payment-verisign.svg)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* End .footer-bottom */}
      </div>
      {/* End .container */}
    </footer>
  );
}

export default Footer;
