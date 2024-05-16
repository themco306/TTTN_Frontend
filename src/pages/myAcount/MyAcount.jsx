import React from 'react'
import Dashboard from './Dashboard'
import Order from './Order'
import Address from './Address'
import AccountDetail from './AccountDetail'
import { useSelector } from 'react-redux'

function MyAcount() {
    const {user}=useSelector(state=>state.authReducer)
  return (
   <div className="container account-container custom-account-container">
  <div className="row">
    <div className="sidebar widget widget-dashboard mb-lg-0 mb-3 col-lg-3 order-0">
      <h2 className="text-uppercase">Tài khoản của tôi</h2>
      <ul className="nav nav-tabs list flex-column mb-0" role="tablist">
        <li className="nav-item">
          <a className="nav-link active show" id="dashboard-tab" data-toggle="tab" href="#dashboard" role="tab" aria-controls="dashboard" aria-selected="true">Bảng điều khiển</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="order-tab" data-toggle="tab" href="#order" role="tab" aria-controls="order" aria-selected="false">Đơn hàng</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="address-tab" data-toggle="tab" href="#address" role="tab" aria-controls="address" aria-selected="false">Địa chỉ</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="edit-tab" data-toggle="tab" href="#edit" role="tab" aria-controls="edit" aria-selected="false">Thông tin chi tiết</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="wishlist.html">Yêu thích</a>
        </li>
      </ul>
    </div>
    <div className="col-lg-9 order-lg-last order-1 tab-content">
      <div className="tab-pane fade active show" id="dashboard" role="tabpanel">
        <Dashboard user={user}/>
      </div>{/* End .tab-pane */}
      <div className="tab-pane fade" id="order" role="tabpanel">
        <Order/>
      </div>{/* End .tab-pane */}
      <div className="tab-pane fade" id="address" role="tabpanel">
       <Address/>
      
      </div>{/* End .tab-pane */}
      <div className="tab-pane fade" id="edit" role="tabpanel">
        <AccountDetail user={user}/>
       
      </div>{/* End .tab-pane */}
    </div>{/* End .tab-content */}
  </div>{/* End .row */}
</div>

  )
}

export default MyAcount
