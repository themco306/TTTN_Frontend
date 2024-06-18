import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import Order from './Order';
import Address from './Address';
import AccountDetail from './AccountDetail';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function MyAccount() {
  const { user } = useSelector(state => state.authReducer);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bang-deu-khien');

  // Set the active tab based on the URL parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('t');
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    } else if (!tab) {
      setActiveTab('bang-deu-khien');
    }
  }, [location.search]);

  const handleTabChange = (tab) => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('t') !== tab) {
      queryParams.set('t', tab);
      navigate({ search: queryParams.toString() }, { replace: true });
    }
    setActiveTab(tab);
  };

  return (
    <div className="container account-container custom-account-container">
      <div className="row">
        <div className="sidebar widget widget-dashboard mb-lg-0 mb-3 col-lg-3 order-0">
          <h2 className="text-uppercase">Tài khoản của tôi</h2>
          <ul className="nav nav-tabs list flex-column mb-0" role="tablist">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'bang-deu-khien' ? 'active show' : ''}`}
                id="dashboard-tab"
                data-toggle="tab"
                href="#dashboard"
                role="tab"
                aria-controls="dashboard"
                aria-selected={activeTab === 'bang-deu-khien'}
                onClick={() => handleTabChange('bang-deu-khien')}
              >
                Bảng điều khiển
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'don-hang' ? 'active show' : ''}`}
                id="order-tab"
                data-toggle="tab"
                href="#order"
                role="tab"
                aria-controls="order"
                aria-selected={activeTab === 'don-hang'}
                onClick={() => handleTabChange('don-hang')}
              >
                Đơn hàng
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'dia-chi' ? 'active show' : ''}`}
                id="address-tab"
                data-toggle="tab"
                href="#address"
                role="tab"
                aria-controls="address"
                aria-selected={activeTab === 'dia-chi'}
                onClick={() => handleTabChange('dia-chi')}
              >
                Địa chỉ
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'thong-tin' ? 'active show' : ''}`}
                id="edit-tab"
                data-toggle="tab"
                href="#edit"
                role="tab"
                aria-controls="edit"
                aria-selected={activeTab === 'thong-tin'}
                onClick={() => handleTabChange('thong-tin')}
              >
                Thông tin chi tiết
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/yeu-thich">
                Yêu thích
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-9 order-lg-last order-1 tab-content">
          <div className={`tab-pane fade ${activeTab === 'bang-deu-khien' ? 'active show' : ''}`} id="dashboard" role="tabpanel">
            <Dashboard user={user} handleTabChange={handleTabChange} />
          </div>
          <div className={`tab-pane fade ${activeTab === 'don-hang' ? 'active show' : ''}`} id="order" role="tabpanel">
            <Order />
          </div>
          <div className={`tab-pane fade ${activeTab === 'dia-chi' ? 'active show' : ''}`} id="address" role="tabpanel">
            <Address />
          </div>
          <div className={`tab-pane fade ${activeTab === 'thong-tin' ? 'active show' : ''}`} id="edit" role="tabpanel">
            <AccountDetail user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
