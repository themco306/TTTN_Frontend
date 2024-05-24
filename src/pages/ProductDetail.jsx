import React, { useEffect, useState } from 'react'
import ItemProduct from '../components/Products/ItemProduct'
import { Link, useParams } from 'react-router-dom'
import productApi from '../api/productApi'
import { InputNumber } from 'primereact/inputnumber'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules'
import appUrl from '../api/appUrl'
import { useDispatch } from 'react-redux'
import useCustomException from '../utils/useCustomException'
import { userApi } from '../api/userApi'
import { cartActions } from '../state/actions/cartActions'
import { toast } from 'react-toastify'

function ProductDetail() {
  const {slug}=useParams()
  const dispatch=useDispatch()
  const handleException = useCustomException();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product,setProduct]=useState({})
  const [productData,setProductData]=useState([])
  const [quantity,setQuantity]=useState(1)
  useEffect(()=>{
    const fecth=async()=>{
      try {
        const response=await productApi.getBySlug(slug)
        if(response.status===200){
            setProduct(response.data)
        }
      } catch (error) {
        
      }
    }
    fecth()
  },[slug])
  useEffect(()=>{
    const fecth=async()=>{
      try {
        const response=await productApi.getSame(slug)
        if(response.status===200){
            setProductData(response.data)
        }
      } catch (error) {
        
      }
    }
    fecth()
  },[slug])

  const handleAdd2Cart =async()=>{
    try {
      const data={
        cartItem:{
          productId:product.id,
          quantity
        }
      }
      const res= await userApi.add2Cart(data)
      console.log(res)
      if(res.status===200){
        dispatch(cartActions.add2Cart(res.data.data))
        toast.success(res.data.message)
      }
    } catch (error) {
      if(error?.response){
        handleException(error)
      }
    }
  }
  return (
    <div>
    <div className="container">
  <nav aria-label="breadcrumb" className="breadcrumb-nav">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to="/"><i className="icon-home" /></Link></li>
      <li className="breadcrumb-item"><Link to={"/san-pham"}>Sản Phẩm</Link></li>
      <li className="breadcrumb-item">{product.name}</li>
    </ol>
  </nav>
</div>


<div className="product-single-container product-single-default product-transparent-image bg-gray">
  <div className="container">
    <div className="row">
      <div className="col-xl-7">
        <div className="product-single-gallery pg-vertical">
          <div className="product-slider-container">
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {product.galleries&&product.galleries.map((item)=>(
           <SwiperSlide>
           <img src={appUrl.imageURL+item.imagePath}/>
         </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
               {product.galleries&&product.galleries.map((item)=>(
           <SwiperSlide>
           <img src={appUrl.imageURL+item.imagePath}/>
         </SwiperSlide>
        ))}
      </Swiper>
          </div>
        </div>
      </div>
      {/* End .product-single-gallery */}
      <div className="col-xl-5 product-single-details pt-3">
        <h1 className="product-title">{product.name}</h1>
        {/* <div className="ratings-container">
          <div className="product-ratings">
            <span className="ratings" style={{width: '60%'}} />
            <span className="tooltiptext tooltip-top" />
          </div>
          <a href="#" className="rating-link">( 6 Reviews )</a>
        </div> */}
        <hr className="short-divider" />
        <div className="price-box">
          <span className="old-price">{product.comparePrice?.toLocaleString()} VND</span>
          <span className="new-price">{product.salePrice?.toLocaleString()} VND</span>
        </div>
        <div className="product-desc" dangerouslySetInnerHTML={{ __html:product.detail }}>
          
        </div>
        <ul className="single-info-list mb-0 pb-2">
          <li>
            Danh mục:
            <strong><a  className="product-category">{product.category?.name}</a></strong>,
          </li>
        </ul>
        <div className="product-action row">
          <div className='col-md-6'>
          <InputNumber style={{ width:"50%",height:"80%",fontSize:18 }} inputId="minmax-buttons" value={quantity} onValueChange={(e) => setQuantity(e.value)} mode="decimal"  showButtons min={1} max={100} />
          </div>
          <div className="col-md-6">
          <a style={{ cursor:"pointer" }} onClick={handleAdd2Cart} className="btn  add-cart icon-shopping-cart mr-2" title="Add to Cart">Thêm giỏ hàng</a>
          </div>
        </div>
        <hr className="divider mb-0 mt-0" />
        <div className="product-single-share mb-1 mb-sm-4 mb-xl-0">
          <a href="wishlist.html" className="btn-icon-wish add-wishlist" title="Add to Wishlist"><i className="icon-wishlist-2" /><span>Yêu thích</span></a>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="container">
  <div className="product-single-collapse mb-6" id="productAccordion">
    <div className="product-collapse-panel">
      <h3 className="product-collapse-title">
        <a data-toggle="collapse" href="#product-collapse-desc" role="button" aria-expanded="true" aria-controls="product-collapse-desc">Mô tả</a>
      </h3>
      <div className="product-collapse-body collapse show" id="product-collapse-desc" data-parent="#productAccordion">
        <div className="collapse-body-wrapper pl-0">
          <div className="product-desc-content" >
            {product.description}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="products-section pt-0">
    <h2 className="section-title">Mô hình tương tự</h2>
    <Swiper
    key={product.id}
    slidesPerView={4}
    spaceBetween={30}
    freeMode={true}
    modules={[FreeMode, Pagination]}
    className="mySwiper"
  >
    {productData.length>0&&productData.map((product)=>(
        <SwiperSlide key={product.id}><ItemProduct product={product}/></SwiperSlide>
    ))}
    
   
  </Swiper>
  </div>
  <hr className="mt-0 m-b-5" />
</div>

    </div>
  )
}

export default ProductDetail
