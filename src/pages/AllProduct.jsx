import React, { useEffect, useState } from "react";
import ItemProduct from "../components/Products/ItemProduct";
import productApi from "../api/productApi";
import { InputNumber } from "primereact/inputnumber";
import categoryApi from "../api/categoryApi";
import brandApi from "../api/brandApi";
import { Paginator } from 'primereact/paginator';
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
function AllProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('danhmuc');
  const brandParam = urlParams.get('thuonghieu');
  const [productData,setProductData]=useState([])
  const [categoryData,setCategoryData]=useState([])
  const [brandData,setBrandData]=useState([])
  const [totalPages,setTotalPages]=useState(0)
  const [totalCount,setTotalCount]=useState(0)
  const [pageSize,setPageSize]=useState(12);
  const [pageNumber,setPageNumber]=useState(0);
  const [sortBy, setSortBy] = useState('');
const [sortOrder, setSortOrder] = useState('');
const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(1000000);
const [categoryId,setCategoryId]=useState(null)
const [brandId,setBrandId]=useState(null)
const [onFP,setOnFP]=useState(true)
  useEffect(()=>{
    const fecth=async()=>{
      try {
        const params={
          pageNumber:pageNumber+1,
          pageSize,
          sortBy,
          sortOrder,
          minPrice,
          maxPrice,
          categoryId:categoryParam,
          brandId:brandParam,
        }
        const response=await productApi.getFilter(params)
        console.log(response)
        if(response.status===200){
          setTotalPages(response.data.totalPages)
          setTotalCount(response.data.totalCount)
          setProductData(response.data.items)
        }
      } catch (error) {
        
      }
    }
    fecth()
  },[pageSize,sortBy,sortOrder,onFP,categoryId,brandId,pageNumber])
  useEffect(()=>{
    const fecth=async()=>{
      try {
        const response=await categoryApi.getActive()
        console.log(response)
        if(response.status===200){
            setCategoryData(response.data)
            if(categoryParam!==null){
              const topic=response.data.find((item)=>item.slug===categoryParam)
              if(topic!==undefined){
                setCategoryId(topic)
              }
            }
        }
      } catch (error) {
        
      }
    }
    fecth()
  },[])
  useEffect(()=>{
    const fecth=async()=>{
      try {
        const response=await brandApi.getActive()
        console.log(response)
        if(response.status===200){
            setBrandData(response.data)
            if(brandParam!==null){
              const topic=response.data.find((item)=>item.slug===brandParam)
              if(topic!==undefined){
                setBrandId(topic)
              }
            }
        }
      } catch (error) {
        
      }
    }
    fecth()
  },[])
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
  const handleSelectCategory = (item) => {
    if (categoryId === item) {
      setCategoryId(null);
        const url = new URL(window.location);
        url.searchParams.delete('danhmuc');
        window.history.pushState({}, '', url);
    } else {
      setCategoryId(item);
        const url = new URL(window.location);
        url.searchParams.set('danhmuc', item.slug);
        window.history.pushState({}, '', url);
    }
};
const handleSelectBrand = (item) => {
  if (brandId === item) {
    setBrandId(null);
      const url = new URL(window.location);
      url.searchParams.delete('thuonghieu');
      window.history.pushState({}, '', url);
  } else {
    setBrandId(item);
      const url = new URL(window.location);
      url.searchParams.set('thuonghieu', item.slug);
      window.history.pushState({}, '', url);
  }
};
const onPageChange = (event) => {
  setPageNumber(event.first);
};

  return (
    <>
   <div className="container"  style={{ minHeight: "90vh" }}>
  <nav aria-label="breadcrumb" className="breadcrumb-nav">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to={'/'}><i className="icon-home" /></Link></li>
      <li className="breadcrumb-item"><a>Sản phẩm</a></li>
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
              <div style={{ display:'flex' }}>
                <p style={{ display:'inline-block',fontSize:18 }}>Tìm thấy: <strong>{totalCount}</strong> sản phẩm.</p>
              </div>
            </div>
          </div>
          <div className="toolbox-right">
            <div className="toolbox-item toolbox-show">
              <label>Hiển thị:</label>
              <div className="select-custom">
                <select  onChange={(e)=>setPageSize(e.target.value)} name="count" className="form-control" value={pageSize}>
                  <option  value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={36}>36</option>
                </select>
              </div>
            </div>
          </div>
        </nav></div>
      <div className="row">
        {productData.length>0&&productData.map((item)=>(
           <div className="col-6 col-sm-4">
           <ItemProduct product={item}/>
         </div>
        ))}
       
      </div>
      {/* End .row */}
      <nav className="toolbox toolbox-pagination">
        <div className="toolbox-item toolbox-show">
          <label>Hiển thị:</label>
          <div className="select-custom">
            <select value={pageSize} name="count" className="form-control" onChange={(e)=>setPageSize(e.target.value)}>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={36}>36</option>
            </select>
          </div>
          {/* End .select-custom */}
        </div>
        {/* End .toolbox-item */}
        <ul className="pagination toolbox-item">
        <Paginator first={pageNumber} rows={pageSize} totalRecords={totalPages} onPageChange={onPageChange} />
        </ul>
      </nav>
    </div>
    {/* End .col-lg-9 */}
    <div className="sidebar-overlay" />
    <aside className="sidebar-shop col-lg-3 order-lg-first mobile-sidebar mb-2">
      <div className="pin-wrapper" ><div className="sidebar-wrapper" style={{borderBottom: '0px none rgb(119, 119, 119)', width: 280}}>
          <div className="widget">
            <h3 className="widget-title">
              <a data-toggle="collapse" href="#widget-body-2" role="button" aria-expanded="true" aria-controls="widget-body-2">Danh mục</a>
            </h3>
            <div className="collapse show" id="widget-body-2">
              <div className="widget-body">
                <ul className="cat-list">
                {categoryData.length>0&&categoryData.map((item)=>(
                <li><a onClick={()=>handleSelectCategory(item)} style={{ cursor: "pointer", color: categoryId === item ? "blue" : "inherit" }}>{item.name}<span className="products-count">({item.totalProduct})</span></a></li>
                ))}
                  
                </ul>
              </div>
              {/* End .widget-body */}
            </div>
            {/* End .collapse */}
          </div>
          <div className="widget">
            <h3 className="widget-title">
              <a data-toggle="collapse" href="#widget-body-4" role="button" aria-expanded="true" aria-controls="widget-body-4">Thương hiệu</a>
            </h3>
            <div className="collapse show" id="widget-body-4">
              <div className="widget-body">
                <ul className="cat-list">
                {brandData.length>0&&brandData.map((item)=>(
                <li><a onClick={()=>handleSelectBrand(item)} style={{ cursor: "pointer", color: brandId === item ? "blue" : "inherit" }}>{item.name}<span className="products-count">({item.totalProduct})</span></a></li>
                ))}
                  
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
                  <div className="price-slider-wrapper row" >
                    <div className="col-md-5">
                      <input value={minPrice} type="number" onChange={(e)=>setMinPrice(parseInt(e.target.value))} className="form-control" min={0} />
                    </div>
                    <div className="col-md-2" style={{ display:'flex',alignItems:'center',justifyContent:'center',width:"20em" }}>
                      <Button onClick={()=>{setMinPrice(0);setMaxPrice(1000000)}} tooltip="Nhấn để làm mới giá" icon="pi pi-history" ></Button>
                    </div>
                    <div className="col-md-5">
                      <input min={minPrice}  value={maxPrice} type="number" className="form-control" onChange={(e)=>setMaxPrice(parseInt(e.target.value))} />
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
            <h3 className="widget-title">Shop TK</h3>
            <h5>Mô hình rẻ , nhưng chất lượng.</h5>
            <p>Chúc bạn một ngày mua sắm vui vẻ</p>
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
