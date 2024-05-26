import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import webInfoApi from "../api/webInfoApi";
import menuApi from "../api/menuApi";

function Footer() {
  const [webInfo,setWebInfo]=useState({});
  const [menuData,setMenuData]=useState([])
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
useEffect(()=>{
  const fecth=async()=>{
      try {
        const response=await menuApi.getAllFooter()
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
                  {menuData.length>0&&menuData.map((item)=>(
                     <li>
                     <Link to={"/bai-viet/"+item.link}>{item.name}</Link>
                   </li>
                  ))}
                 
                 
                </ul>
              </div>
              {/* Kết Thúc .widget */}
            </div>
            <div className="col-lg-6 col-sm-6">
              <div  className="widget" dangerouslySetInnerHTML={{ __html:webInfo?.googleMap }}></div>

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
