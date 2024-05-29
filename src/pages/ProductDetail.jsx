import React, { useEffect, useState } from "react";
import ItemProduct from "../components/Products/ItemProduct";
import { Link, useParams } from "react-router-dom";
import productApi from "../api/productApi";
import { InputNumber } from "primereact/inputnumber";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import appUrl from "../api/appUrl";
import { useDispatch } from "react-redux";
import useCustomException from "../utils/useCustomException";
import { userApi } from "../api/userApi";
import { cartActions } from "../state/actions/cartActions";
import { toast } from "react-toastify";
import rateApi from "../api/rateApi";
import CommentContentBox from "../components/CommentContentBox";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import LikeBox from "../components/LikeBox";

function ProductDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product, setProduct] = useState({});
  const [productData, setProductData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [rateData,setRateData]=useState([])
  const [loading, setLoading] = useState(false);
  const [star,setStar]=useState(0)
  const [content,setContent]=useState('')
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await productApi.getBySlug(slug);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {}
    };
    fecth();
  }, [slug]);
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await productApi.getSame(slug);
        if (response.status === 200) {
          setProductData(response.data);
        }
      } catch (error) {}
    };
    fecth();
  }, [slug]);
  useEffect(() => {
    const fecth = async () => {
      try {
        if(product?.id!==undefined){
          const response = await rateApi.getByPId(product.id);
          console.log("rate",response)
          if (response.status === 200) {
            setRateData(response.data);
          }
        }
      } catch (error) {

      }
    };
    fecth();
  }, [product,loading]);
  const handleAdd2Cart = async () => {
    try {
      const data = {
        cartItem: {
          productId: product.id,
          quantity,
        },
      };
      const res = await userApi.add2Cart(data);
      console.log(res);
      if (res.status === 200) {
        dispatch(cartActions.add2Cart(res.data.data));
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error?.response) {
        handleException(error);
      }
    }
  };
  const handleRate=async()=>{
    try {
        if(star===0){
            toast.warn("Vui lòng chọn số sao")
            return
        }
        if(content===''){
          toast.warn("Vui lòng điền nội dung")
          return
      }
        setLoading(true)
      const data={
          productId:product.id,
          star,
          content
      }
      const response=await rateApi.add(data)
      if(response.status===200){
        toast.success(response.data.message)
        setStar(0)
        setContent('')
        setLoading(false)
      }
    } catch (error) {
        setLoading(false)
        if(error.response?.status){
            handleException(error)
  
          }
    }
  }
  const handleOnSubmit=(e)=>{
    e.preventDefault()
    handleRate()
  }
const setLike=(like,dislike,rateId)=>{
  const updatedRateData = rateData.map(item => {
    if (item.id === rateId) {
        return { ...item, like, dislike };
    }
    return item;
});
setRateData(updatedRateData);
}
  return (
    <div>
      <div className="container">
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="icon-home" />
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={"/san-pham"}>Sản Phẩm</Link>
            </li>
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
                      "--swiper-navigation-color": "#fff",
                      "--swiper-pagination-color": "#fff",
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    {product.galleries &&
                      product.galleries.map((item) => (
                        <SwiperSlide>
                          <img src={appUrl.imageURL + item.imagePath} />
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
                    {product.galleries &&
                      product.galleries.map((item) => (
                        <SwiperSlide>
                          <img src={appUrl.imageURL + item.imagePath} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
            </div>
            {/* End .product-single-gallery */}
            <div className="col-xl-5 product-single-details pt-3">
              <h1 className="product-title">{product.name}</h1>
              <div className="ratings-container">
          <div className="product-ratings">
            <span className="ratings" style={{ width: `${(rateData.star / 5) * 100}%` }}/>
            <span className="tooltiptext tooltip-top" />
          </div>
          <a href="#danhgia" className="rating-link">( {rateData.length} Đánh giá )</a>
        </div>
              <hr className="short-divider" />
              <div className="price-box">
                <span className="old-price">
                  {product.comparePrice?.toLocaleString()} VND
                </span>
                <span className="new-price">
                  {product.salePrice?.toLocaleString()} VND
                </span>
              </div>
              <div
                className="product-desc"
                dangerouslySetInnerHTML={{ __html: product.detail }}
              ></div>
              <ul className="single-info-list mb-0 pb-2">
                <li>
                  Danh mục:
                  <strong>
                    <a className="product-category">{product.category?.name}</a>
                  </strong>
                  ,
                </li>
              </ul>
              <div className="product-action row">
                <div className="col-md-6">
                  <InputNumber
                    style={{ width: "50%", height: "80%", fontSize: 18 }}
                    inputId="minmax-buttons"
                    value={quantity}
                    onValueChange={(e) => setQuantity(e.value)}
                    mode="decimal"
                    showButtons
                    min={1}
                    max={100}
                  />
                </div>
                <div className="col-md-6">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={handleAdd2Cart}
                    className="btn  add-cart icon-shopping-cart mr-2"
                    title="Add to Cart"
                  >
                    Thêm giỏ hàng
                  </a>
                </div>
              </div>
              <hr className="divider mb-0 mt-0" />
              <div className="product-single-share mb-1 mb-sm-4 mb-xl-0">
                <a
                  href="wishlist.html"
                  className="btn-icon-wish add-wishlist"
                  title="Add to Wishlist"
                >
                  <i className="icon-wishlist-2" />
                  <span>Yêu thích</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" id="danhgia">
        <div className="product-single-tabs">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link"
                id="product-tab-desc"
                data-toggle="tab"
                href="#product-desc-content"
                role="tab"
                aria-controls="product-desc-content"
                aria-selected="false"
              >
                Description
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active show"
                id="product-tab-reviews"
                data-toggle="tab"
                href="#product-reviews-content"
                role="tab"
                aria-controls="product-reviews-content"
                aria-selected="true"
              >
                Reviews ({rateData.length})
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade"
              id="product-desc-content"
              role="tabpanel"
              aria-labelledby="product-tab-desc"
            >
              <div
                className="product-desc-content"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
            <div
              className="tab-pane fade active show"
              id="product-reviews-content"
              role="tabpanel"
              aria-labelledby="product-tab-reviews"
            >
              <div className="product-reviews-content">
                <h3 className="reviews-title">
                  {rateData.length} cho sản phẩm {product.name}
                </h3>
                <div className="add-product-review">
                  <form onSubmit={handleOnSubmit} className="comment-form m-0">
                    <div className="rating-form mb-1">
                      <label htmlFor="rating">
                        Đánh giá <span className="required">*</span>
                      </label>
                      <Rating  value={star} onChange={(e) => setStar(e.value)} cancel={false} />
                     
                    </div>
                    <div className="form-group">
                      <label>
                        Nội dung <span className="required">*</span>
                      </label>
                      <textarea
                        cols={5}
                        rows={3}
                        className="form-control form-control-sm"
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                      />
                    </div>
                    <Button label="Gửi" loading={loading} />
                  </form>
                </div>

                <div className="divider" />
                <div className="comment-list">
                  {rateData.length>0?rateData.map((item)=>(<div className="comments">
                    <figure className="img-thumbnail">
                      <img
                        src={appUrl.avatarURL+item.user?.avatar}
                        alt="author"
                        width={80}
                        height={80}
                      />
                    </figure>
                    <div className="comment-block">
                      <div className="comment-header">
                        <div className="comment-arrow" />
                        <div className="ratings-container float-sm-right">
                          <div className="product-ratings">
                            <span
                              className="ratings"
                              style={{ width: `${(item.star / 5) * 100}%` }}
                            />
                            <span className="tooltiptext tooltip-top" />
                          </div>
                        </div>
                        <span className="comment-by">
                          <strong>{item.user?.firstName+" "+item.user?.lastName}</strong> – {new Date(item.createdAt).toLocaleString()}
                         <LikeBox item={item} setLike={setLike}/>
                        </span>
                        
                      </div>
                       <CommentContentBox content={item.content}/>
                    </div>
                  </div>)):(<div>Chưa có đánh giá nào</div>)}
                  
                </div>
              </div>
              {/* End .product-reviews-content */}
            </div>
            {/* End .tab-pane */}
          </div>
          {/* End .tab-content */}
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
            {productData.length > 0 &&
              productData.map((product) => (
                <SwiperSlide key={product.id}>
                  <ItemProduct product={product} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <hr className="mt-0 m-b-5" />
      </div>
    </div>
  );
}

export default ProductDetail;
