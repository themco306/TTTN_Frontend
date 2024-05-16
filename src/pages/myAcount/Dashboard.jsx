import React from 'react'
import { useAuth } from '../../auth/AuthContext'

function Dashboard({user}) {
  const {logoutContext}=useAuth()
  const handleLogout =()=>{
    logoutContext()
  }
  return (
    <div className="dashboard-content">
          <p>
            Xin chào <strong className="text-dark">{user.firstName+' '+user.lastName}</strong> (nếu không phải 
            <strong className="text-dark"> {user.firstName+' '+user.lastName}</strong>?
            <a onClick={handleLogout} style={{ cursor:'pointer',color:'#0088cc' }} className="btn btn-link ">Đăng xuất</a>)
          </p>
          <p>
          Từ bảng điều khiển tài khoản của mình, bạn có thể xem
            <a className="btn btn-link link-to-tab" href="#order">các đơn hàng gần đây</a>,
            quản lý
            <a className="btn btn-link link-to-tab" href="#address">địa chỉ giao hàng</a>, và
            <a className="btn btn-link link-to-tab" href="#edit">chỉnh sửa mật khẩu và chi tiết tài khoản của mình.</a>
          </p>
          <div className="mb-4" />
          <div className="row row-lg">
            <div className="col-6 col-md-4">
              <div className="feature-box text-center pb-4">
                <a href="#order" className="link-to-tab"><i className="sicon-social-dropbox" /></a>
                <div className="feature-box-content">
                  <h3>Đơn hàng</h3>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="feature-box text-center pb-4">
                <a href="#address" className="link-to-tab"><i className="sicon-location-pin" /></a>
                <div className="feature-box-content">
                  <h3>Địa chỉ</h3>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="feature-box text-center pb-4">
                <a href="#edit" className="link-to-tab"><i className="icon-user-2" /></a>
                <div className="feature-box-content p-0">
                  <h3>Chi tiết</h3>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="feature-box text-center pb-4">
                <a href="wishlist.html"><i className="sicon-heart" /></a>
                <div className="feature-box-content">
                  <h3>Yêu thích</h3>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="feature-box text-center pb-4">
                <a style={{ cursor:'pointer' }} onClick={handleLogout}><i className="sicon-logout" /></a>
                <div className="feature-box-content">
                  <h3>Đăng xuất</h3>
                </div>
              </div>
            </div>
          </div>{/* End .row */}
        </div>
  )
}

export default Dashboard
