import React from 'react'
import ItemProduct from '../components/Products/ItemProduct'


function AllProduct() {
  return (<>
<div className="container">
  <nav aria-label="breadcrumb" className="breadcrumb-nav">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="demo4.html"><i className="icon-home" /></a></li>
      <li className="breadcrumb-item"><a href="#">One piece</a></li>
      <li className="breadcrumb-item active" aria-current="page">Nami</li>
    </ol>
  </nav>
  <nav className="toolbox sticky-header horizontal-filter mb-1" data-sticky-options="{'mobile': true}">
    <div className="toolbox-left">
      <a href="#" className="sidebar-toggle"><svg data-name="Layer 3" id="Layer_3" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <line x1={15} x2={26} y1={9} y2={9} className="cls-1" />
          <line x1={6} x2={9} y1={9} y2={9} className="cls-1" />
          <line x1={23} x2={26} y1={16} y2={16} className="cls-1" />
          <line x1={6} x2={17} y1={16} y2={16} className="cls-1" />
          <line x1={17} x2={26} y1={23} y2={23} className="cls-1" />
          <line x1={6} x2={11} y1={23} y2={23} className="cls-1" />
          <path d="M14.5,8.92A2.6,2.6,0,0,1,12,11.5,2.6,2.6,0,0,1,9.5,8.92a2.5,2.5,0,0,1,5,0Z" className="cls-2" />
          <path d="M22.5,15.92a2.5,2.5,0,1,1-5,0,2.5,2.5,0,0,1,5,0Z" className="cls-2" />
          <path d="M21,16a1,1,0,1,1-2,0,1,1,0,0,1,2,0Z" className="cls-3" />
          <path d="M16.5,22.92A2.6,2.6,0,0,1,14,25.5a2.6,2.6,0,0,1-2.5-2.58,2.5,2.5,0,0,1,5,0Z" className="cls-2" />
        </svg>
        <span>Filter</span>
      </a>
      <div className="toolbox-item filter-toggle d-none d-lg-flex">
        <span>Bộ lọc:</span>
        <a href="#">&nbsp;</a>
      </div>
    </div>
    {/* End .toolbox-left */}
    <div className="toolbox-item toolbox-sort ml-lg-auto">
  <label>Sắp xếp theo:</label>
  <div className="select-custom">
    <select name="orderby" className="form-control">
      <option value="menu_order" selected="selected">Mặc định</option>
      <option value="popularity">Sắp xếp theo độ phổ biến</option>
      <option value="rating">Sắp xếp theo đánh giá trung bình</option>
      <option value="date">Sắp xếp theo mới nhất</option>
      <option value="price">Sắp xếp theo giá: thấp đến cao</option>
      <option value="price-desc">Sắp xếp theo giá: cao đến thấp</option>
    </select>
  </div>
  {/* Kết Thúc .select-custom */}
</div>

    {/* End .toolbox-item */}
    <div className="toolbox-item toolbox-show ml-auto ml-lg-0">
      <label>Hiện:</label>
      <div className="select-custom">
        <select name="count" className="form-control">
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>
      {/* End .select-custom */}
    </div>
    {/* End .toolbox-item */}
    <div className="toolbox-item layout-modes">
      <a href="category.html" className="layout-btn btn-grid active" title="Grid">
        <i className="fa fa-th" />
      </a>
      <a href="category-list.html" className="layout-btn" title="List">
        <i className="fa fa-list-ul" />
      </a>
    </div>
    {/* End .layout-modes */}
  </nav>
</div>


<div className="row main-content-wrap">
  <div className="col-lg-9 main-content">
    <div className="row">
      <div className="col-6 col-sm-4 col-md-3">
       {/* <ItemProduct/> */}
      </div>
      <div className="col-6 col-sm-4 col-md-3">
       {/* <ItemProduct/> */}
      </div> <div className="col-6 col-sm-4 col-md-3">
       {/* <ItemProduct/> */}
      </div> <div className="col-6 col-sm-4 col-md-3">
       {/* <ItemProduct/> */}
      </div> <div className="col-6 col-sm-4 col-md-3">
       {/* <ItemProduct/> */}
      </div> <div className="col-6 col-sm-4 col-md-3">
       {/* <ItemProduct/> */}
      </div> <div className="col-6 col-sm-4 col-md-3">
       {/* <ItemProduct/> */}
      </div> <div className="col-6 col-sm-4 col-md-3">
       {/* <ItemProduct/> */}
      </div> <div className="col-6 col-sm-4 col-md-3">
       {/* <ItemProduct/> */}
      </div> <div className="col-6 col-sm-4 col-md-3">
       {/* <ItemProduct/> */}
      </div> <div className="col-6 col-sm-4 col-md-3">
       {/* <ItemProduct/> */}
      </div>
    </div>
    {/* End .row */}
    <nav className="toolbox toolbox-pagination">
      <div className="toolbox-item toolbox-show">

      </div>
      {/* End .toolbox-item */}
      <ul className="pagination toolbox-item">
        <li className="page-item disabled">
          <a className="page-link page-link-btn" href="#"><i className="icon-angle-left" /></a>
        </li>
        <li className="page-item active">
          <a className="page-link" href="#">1 <span className="sr-only">(current)</span></a>
        </li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item"><span className="page-link">...</span></li>
        <li className="page-item">
          <a className="page-link page-link-btn" href="#"><i className="icon-angle-right" /></a>
        </li>
      </ul>
    </nav>
  </div>
  {/* End .col-lg-9 */}
  <div className="sidebar-overlay" />
  <aside className="sidebar-shop col-lg-3 order-lg-first mobile-sidebar">
    <div className="sidebar-wrapper">
      <div className="widget">
        <h3 className="widget-title">
          <a data-toggle="collapse" href="#widget-body-2" role="button" aria-expanded="true" aria-controls="widget-body-2">Danh Mục</a>
        </h3>
        <div className="collapse show" id="widget-body-2">
          <div className="widget-body">
          <ul className="cat-list">
  <li>
    <a href="#widget-category-3" className="collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="widget-category-3">
      Điện tử<span className="products-count">(2)</span>
      <span className="toggle" />
    </a>
    <div className="collapse" id="widget-category-3">
      <ul className="cat-sublist">
        <li>Tai nghe<span className="products-count">(1)</span></li>
        <li>Đồng hồ<span className="products-count">(1)</span></li>
      </ul>
    </div>
  </li>
  <li>
    <a href="#widget-category-4" className="collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="widget-category-4">
      Thời trang<span className="products-count">(6)</span>
      <span className="toggle" />
    </a>
    <div className="collapse" id="widget-category-4">
      <ul className="cat-sublist">
        <li>Giày<span className="products-count">(4)</span></li>
        <li>Túi<span className="products-count">(2)</span></li>
      </ul>
    </div>
  </li>
  <li><a href="#">Âm nhạc</a><span className="products-count">(2)</span></li>
</ul>

          </div>
          {/* End .widget-body */}
        </div>
        {/* End .collapse */}
      </div>
      {/* End .widget */}
      <div className="widget">
        <h3 className="widget-title">
          <a data-toggle="collapse" href="#widget-body-3" role="button" aria-expanded="true" aria-controls="widget-body-3">Giá</a>
        </h3>
        <div className="collapse show" id="widget-body-3">
          <div className="widget-body pb-0">
            <form action="#">
              <div className="price-slider-wrapper">
                <div id="price-slider" />
                {/* End #price-slider */}
              </div>
              {/* End .price-slider-wrapper */}
              <div className="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
                <div className="filter-price-text">
                  Giá:
                  <span id="filter-price-range" />
                </div>
                {/* End .filter-price-text */}
                <button type="submit" className="btn btn-primary">Lọc</button>
              </div>
              {/* End .filter-price-action */}
            </form>
          </div>
          {/* End .widget-body */}
        </div>
        {/* End .collapse */}
      </div>
      {/* End .widget */}
    </div>
    {/* End .sidebar-wrapper */}
  </aside>
  {/* End .col-lg-3 */}
</div>


</>
  )
}

export default AllProduct
