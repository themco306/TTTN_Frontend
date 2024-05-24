import React, { useEffect, useState } from "react";
import ItemProduct from "../components/Products/ItemProduct";
import productApi from "../api/productApi";
import { InputNumber } from "primereact/inputnumber";

function AllProduct() {
  const [pageSize,setPageSize]=useState(12);
  const [sortBy, setSortBy] = useState('');
const [sortOrder, setSortOrder] = useState('');
const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(1000000);
const [onFP,setOnFP]=useState(true)
  useEffect(()=>{
    const fecth=async()=>{
      try {
        const params={
          pageSize,
          sortBy,
          sortOrder,
          minPrice,
          maxPrice
        }
        const response=await productApi.getFilter(params)
        console.log(response)
        // if(response.status===200){
        //     setProduct(response.data)
        // }
      } catch (error) {
        
      }
    }
    fecth()
  },[pageSize,sortBy,sortOrder,onFP])
  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value.includes('-')) {
      const [sort, order] = value.split('-');
      setSortBy(sort);
      setSortOrder(order);
    } else {
      setSortBy(value);
      setSortOrder('');
    }
  };
  return (
    <>
   <div className="container">
  <nav aria-label="breadcrumb" className="breadcrumb-nav">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="demo4.html"><i className="icon-home" /></a></li>
      <li className="breadcrumb-item"><a href="#">Men</a></li>
      <li className="breadcrumb-item active" aria-current="page">Accessories</li>
    </ol>
  </nav>
  <div className="row">
    <div className="col-lg-9 main-content">
      <div className="sticky-wrapper"><nav className="toolbox sticky-header" data-sticky-options="{'mobile': true}">
          <div className="toolbox-left">
            <a href="#" className="sidebar-toggle">
              <svg data-name="Layer 3" id="Layer_3" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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
            <div className="toolbox-item toolbox-sort">
              <label>Sắp xếp:</label>
              <div className="select-custom">
                <select name="orderby" className="form-control" onChange={handleSortChange}>
                  <option value="menu-order" selected="selected">Mặt định</option>
                  <option value="name-asc">Tên a-z</option>
                  <option value="name-desc">Tên z-a</option>
                  <option value="rating-asc">Nhiều lượt mua</option>
                  <option value="date-asc">Sản phẩm mới</option>
                  <option value="price-asc">Giá từ thấp đến cao</option>
                  <option value="price-desc">Giá từ cao đến thấp</option>
                </select>
              </div>
            </div>
          </div>
          <div className="toolbox-right">
            <div className="toolbox-item toolbox-show">
              <label>Hiển thị:</label>
              <div className="select-custom">
                <select  onChange={(e)=>setPageSize(e.target.value)} name="count" className="form-control">
                  <option  value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={36}>36</option>
                </select>
              </div>
            </div>
          </div>
        </nav></div>
      <div className="row">
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-1.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-1-2.jpg" width={280} height={280} alt="product" />
              </a>
              <div className="label-group">
                <div className="product-label label-hot">HOT</div>
                <div className="product-label label-sale">-20%</div>
              </div>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Ultimate 3D Bluetooth
                  Speaker</a> </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="old-price">$90.00</span>
                <span className="product-price">$70.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="product.html" className="btn-icon btn-add-cart"><i className="fa fa-arrow-right" /><span>SELECT
                    OPTIONS</span></a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-2.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-2-2.jpg" width={280} height={280} alt="product" />
              </a>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Brown Women Casual HandBag</a>
              </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="product-price">$33.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="product.html" className="btn-icon btn-add-cart"><i className="fa fa-arrow-right" /><span>SELECT
                    OPTIONS</span></a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-3.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-3-2.jpg" width={280} height={280} alt="product" />
              </a>
              <div className="label-group">
                <div className="product-label label-sale">-20%</div>
              </div>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Circled Ultimate 3D
                  Speaker</a> </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="old-price">$90.00</span>
                <span className="product-price">$70.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="#" className="btn-icon btn-add-cart product-type-simple"><i className="icon-shopping-cart" />ADD TO CART</a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-4.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-4-2.jpg" width={280} height={280} alt="product" />
              </a>
              <div className="label-group">
                <div className="product-label label-sale">-30%</div>
              </div>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Blue Backpack for the Young -
                  S</a> </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="old-price">$90.00</span>
                <span className="product-price">$70.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="product.html" className="btn-icon btn-add-cart"><i className="fa fa-arrow-right" /><span>SELECT
                    OPTIONS</span></a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-5.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-5-2.jpg" width={280} height={280} alt="product" />
              </a>
              <div className="label-group">
                <div className="product-label label-hot">HOT</div>
              </div>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Casual Spring Blue Shoes</a>
              </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="old-price">$90.00</span>
                <span className="product-price">$70.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="#" className="btn-icon btn-add-cart product-type-simple"><i className="icon-shopping-cart" />ADD TO CART</a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-6.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-6-2.jpg" width={280} height={280} alt="product" />
              </a>
              <div className="label-group">
                <div className="product-label label-sale">-8%</div>
              </div>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Men Black Gentle Belt</a>
              </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="old-price">$90.00</span>
                <span className="product-price">$70.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="#" className="btn-icon btn-add-cart product-type-simple"><i className="icon-shopping-cart" />ADD TO CART</a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-7.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-7-2.jpg" width={280} height={280} alt="product" />
              </a>
              <div className="label-group">
                <div className="product-label label-sale">-8%</div>
              </div>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Brown-Black Men Casual
                  Glasses</a> </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="old-price">$90.00</span>
                <span className="product-price">$70.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="#" className="btn-icon btn-add-cart product-type-simple"><i className="icon-shopping-cart" />ADD TO CART</a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-8.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-8-2.jpg" width={280} height={280} alt="product" />
              </a>
              <div className="label-group">
                <div className="product-label label-sale">-40%</div>
              </div>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Brown-Black Men Casual
                  Glasses</a> </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="old-price">$90.00</span>
                <span className="product-price">$70.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="#" className="btn-icon btn-add-cart product-type-simple"><i className="icon-shopping-cart" />ADD TO CART</a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-9.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-9-2.jpg" width={280} height={280} alt="product" />
              </a>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Black Men Casual Glasses</a>
              </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="old-price">$90.00</span>
                <span className="product-price">$70.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="product.html" className="btn-icon btn-add-cart"><i className="fa fa-arrow-right" /><span>SELECT
                    OPTIONS</span></a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-10.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-10-2.jpg" width={280} height={280} alt="product" />
              </a>
              <div className="label-group">
                <div className="product-label label-sale">-30%</div>
              </div>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Basketball Sports Blue
                  Shoes</a> </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="old-price">$90.00</span>
                <span className="product-price">$70.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="#" className="btn-icon btn-add-cart product-type-simple"><i className="icon-shopping-cart" />ADD TO CART</a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-11.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-11-2.jpg" width={280} height={280} alt="product" />
              </a>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Men Sports Travel Bag</a>
              </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="old-price">$90.00</span>
                <span className="product-price">$70.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="#" className="btn-icon btn-add-cart product-type-simple"><i className="icon-shopping-cart" />ADD TO CART</a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
        <div className="col-6 col-sm-4">
          <div className="product-default">
            <figure>
              <a href="product.html">
                <img src="assets/images/products/product-12.jpg" width={280} height={280} alt="product" />
                <img src="assets/images/products/product-12-2.jpg" width={280} height={280} alt="product" />
              </a>
              <div className="label-group">
                <div className="product-label label-hot">HOT</div>
              </div>
            </figure>
            <div className="product-details">
              <div className="category-wrap">
                <div className="category-list">
                  <a href="category.html" className="product-category">category</a>
                </div>
              </div>
              <h3 className="product-title"> <a href="product.html">Brown HandBag</a> </h3>
              <div className="ratings-container">
                <div className="product-ratings">
                  <span className="ratings" style={{width: '100%'}} />
                  {/* End .ratings */}
                  <span className="tooltiptext tooltip-top" />
                </div>
                {/* End .product-ratings */}
              </div>
              {/* End .product-container */}
              <div className="price-box">
                <span className="old-price">$90.00</span>
                <span className="product-price">$70.00</span>
              </div>
              {/* End .price-box */}
              <div className="product-action">
                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i className="icon-heart" /></a>
                <a href="#" className="btn-icon btn-add-cart product-type-simple"><i className="icon-shopping-cart" />ADD TO CART</a>
                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
              </div>
            </div>
            {/* End .product-details */}
          </div>
        </div>
        {/* End .col-sm-4 */}
      </div>
      {/* End .row */}
      <nav className="toolbox toolbox-pagination">
        <div className="toolbox-item toolbox-show">
          <label>Show:</label>
          <div className="select-custom">
            <select name="count" className="form-control" onChange={(e)=>setPageSize(e.target.value)}>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={36}>36</option>
            </select>
          </div>
          {/* End .select-custom */}
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
      <div className="pin-wrapper" style={{height: '1212.8px'}}><div className="sidebar-wrapper" style={{borderBottom: '0px none rgb(119, 119, 119)', width: 280}}>
          <div className="widget">
            <h3 className="widget-title">
              <a data-toggle="collapse" href="#widget-body-2" role="button" aria-expanded="true" aria-controls="widget-body-2">Danh mục</a>
            </h3>
            <div className="collapse show" id="widget-body-2">
              <div className="widget-body">
                <ul className="cat-list">
                  <li><a style={{cursor:"pointer"}}>Music<span className="products-count">(2)</span></a></li>
                </ul>
              </div>
              {/* End .widget-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .widget */}
          <div className="widget">
            <h3 className="widget-title">
              <a data-toggle="collapse" href="#widget-body-3" role="button" aria-expanded="true" aria-controls="widget-body-3">Price</a>
            </h3>
            <div className="collapse show" id="widget-body-3">
              <div className="widget-body pb-0">
                  <div className="price-slider-wrapper row">
                    <div className="col-md-5">
                      <input value={minPrice} type="number" onChange={(e)=>setMinPrice(parseInt(e.target.value))} className="form-control"  />
                    </div>
                    <div className="col-md-1">--</div>
                    <div className="col-md-6">
                      <input  value={maxPrice} type="number" className="form-control" onChange={(e)=>setMaxPrice(parseInt(e.target.value))} />
                    </div>
                  </div>
                  {/* End .price-slider-wrapper */}
                  <div className="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
                    <div className="filter-price-text">
                      Giá:
                      <span id="filter-price-range">{minPrice.toLocaleString()} đ -- {maxPrice.toLocaleString()} đ</span>
                    </div>
                    {/* End .filter-price-text */}
                    <button onClick={()=>setOnFP(!onFP)} className="btn btn-primary">Lọc</button>
                  </div>
                  {/* End .filter-price-action */}
              </div>
              {/* End .widget-body */}
            </div>
            {/* End .collapse */}
          </div>

          <div className="widget widget-block">
            <h3 className="widget-title">Custom HTML Block</h3>
            <h5>This is a custom sub-title.</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non placerat mi. Etiam non tellus </p>
          </div>
          {/* End .widget */}
        </div></div>
      {/* End .sidebar-wrapper */}
    </aside>
    {/* End .col-lg-3 */}
  </div>
  {/* End .row */}
</div>

    </>
  );
}

export default AllProduct;
