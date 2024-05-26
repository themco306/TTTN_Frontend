import React, { useEffect, useState } from "react";

import { Paginator } from 'primereact/paginator';
import { Link } from "react-router-dom";
import postApi from "../api/postApi";
import topicApi from "../api/topicApi";
import ItemPost from "../components/Posts/ItemPost";
function AllPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const topicParam = urlParams.get('chuDe');
  const [postData,setPostData]=useState([])
  const [topicData,setTopicData]=useState([])
  const [totalPages,setTotalPages]=useState(0)
  const [totalCount,setTotalCount]=useState(0)
  const [pageSize,setPageSize]=useState(4);
  const [pageNumber,setPageNumber]=useState(0);
  const [sortBy, setSortBy] = useState('');
const [sortOrder, setSortOrder] = useState('');
const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(1000000);
const [topicId,setTopicId]=useState(null)
const [onFP,setOnFP]=useState(true)
useEffect(()=>{
  const fecth=async()=>{
    try {
      const response=await topicApi.getActive()
      console.log(response)
      if(response.status===200){
       
          setTopicData(response.data)
          if(topicParam!==null){
            const topic=response.data.find((item)=>item.slug===topicParam)
            if(topic!==undefined){
              console.log('adasd',topic)
              setTopicId(topic)
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
        const params={
          pageNumber:pageNumber+1,
          pageSize,
          sortBy,
          sortOrder,
          minPrice,
          maxPrice,
          topicId:topicParam,
        }
        const response=await postApi.getFilter(params)
        console.log(response)
        if(response.status===200){
          setTotalPages(response.data.totalPages)
          setTotalCount(response.data.totalCount)
          setPostData(response.data.items)
        }
      } catch (error) {
        
      }
    }
    fecth()
  },[pageSize,sortBy,sortOrder,onFP,topicId,pageNumber])

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
  const handleSelectTopic = (item) => {
    if (topicId === item) {
        setTopicId(null);
        const url = new URL(window.location);
        url.searchParams.delete('chuDe');
        window.history.pushState({}, '', url);
    } else {
        setTopicId(item);
        const url = new URL(window.location);
        url.searchParams.set('chuDe', item.slug);
        window.history.pushState({}, '', url);
    }
};
const onPageChange = (event) => {
  setPageNumber(event.first);
};

  return (
    <>
   <div className="container" style={{ minHeight: "90vh" }}>
  <nav aria-label="breadcrumb" className="breadcrumb-nav">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to={'/'}><i className="icon-home" /></Link></li>
      <li className="breadcrumb-item"><a>Bài viết</a></li>
      {topicId!==null&&(<li className="breadcrumb-item ">{topicId.name}</li>)}
      
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
                  <option value="date-asc">Bài viết mới</option>
                </select>
              </div>
              <div style={{ display:'flex' }}>
                <p style={{ display:'inline-block',fontSize:18 }}>Tìm thấy: <strong>{totalCount}</strong> bài viết.</p>
              </div>
            </div>
          </div>
          <div className="toolbox-right">
            <div className="toolbox-item toolbox-show">
              <label>Hiển thị:</label>
              <div className="select-custom">
                <select  onChange={(e)=>setPageSize(e.target.value)} name="count" className="form-control" value={pageSize}>
                  <option  value={4}>4</option>
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                </select>
              </div>
            </div>
          </div>
        </nav></div>
      <div className="row">
        {postData.length>0&&postData.map((item)=>(
           <div className="col-6 col-sm-4">
           <ItemPost data={item}/>
         </div>
        ))}
       
      </div>
      {/* End .row */}
      <nav className="toolbox toolbox-pagination">
        <div className="toolbox-item toolbox-show">
          <label>Hiển thị:</label>
          <div className="select-custom">
            <select value={pageSize} name="count" className="form-control" onChange={(e)=>setPageSize(e.target.value)}>
            <option  value={4}>4</option>
                  <option value={8}>8</option>
                  <option value={12}>12</option>
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
    <aside className="sidebar-shop col-lg-3 order-lg-first ">
      <div className="pin-wrapper"><div className="sidebar-wrapper" style={{borderBottom: '0px none rgb(119, 119, 119)', width: 280}}>
          <div className="widget">
            <h3 className="widget-title">
              <a data-toggle="collapse" href="#widget-body-2" role="button" aria-expanded="true" aria-controls="widget-body-2">Chủ đề</a>
            </h3>
            <div className="collapse show" id="widget-body-2">
              <div className="widget-body">
                <ul className="cat-list">
                {topicData.length>0&&topicData.map((item)=>(
                <li><a onClick={()=>handleSelectTopic(item)} style={{ cursor: "pointer", color: topicId === item ? "blue" : "inherit" }}>{item.name}</a></li>
                ))}
                  
                </ul>
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

export default AllPost;
