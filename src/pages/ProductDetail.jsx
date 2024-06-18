import React, { useEffect, useState } from "react";
import ItemProduct from "../components/Products/ItemProduct";
import { Link, useParams } from "react-router-dom";
import productApi from "../api/productApi";
import { InputNumber } from "primereact/inputnumber";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import appUrl from "../api/appUrl";
import { useDispatch, useSelector } from "react-redux";
import useCustomException from "../utils/useCustomException";
import { userApi } from "../api/userApi";
import { cartActions } from "../state/actions/cartActions";
import { toast } from "react-toastify";
import rateApi from "../api/rateApi";
import CommentContentBox from "../components/CommentContentBox";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import LikeBox from "../components/LikeBox";
import { favoriteActions } from "../state/actions/favoriteActions";
import ItemRate from "../components/ItemRate";
import ReactPlayer from "react-player";
import { Dropdown } from "primereact/dropdown";

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
  const [files, setFiles] = useState([]);
  const [hoveredFile, setHoveredFile] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const [sort,setSort]=useState('date-desc')
  const [starF,setStarF]=useState("null")
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rateL,setRateL]=useState(false)

  const options = [

    { name: "Mới nhất", value: "date-desc" },
    { name: "Cũ nhất", value: "date-asc" },
    // { name: "Thích nhiều", value: "like-desc" },

  ];
  const optionsStar = [
    { name: "Tất cả", value: "null" },
    { name: "5 sao", value: 5 },
    { name: "4 sao", value: 4 },
    { name: "3 sao", value: 3 },
    { name: "2 sao", value: 2 },
    { name: "1 sao", value: 1 },


  ];
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
        setRateL(true)
        const params={
          star:starF=="null"?null:starF,
          sortOrder:sort,
          pageNumber:currentPage
        }
        if(product?.id!==undefined){
          const response = await rateApi.getByPId(product.id,params);
          console.log("rate",response)
          if (response.status === 200) {
            if(currentPage>1){
              setRateData(prevData => [...prevData, ...response.data.items]);
            }else{
              setRateData(response.data.items);
            }
           
            setTotalRecords(response.data.totalCount)
            setRateL(false)
          }
        }
      } catch (error) {
        setRateL(false)
      }
    };
    fecth();
  }, [product,loading,currentPage,sort,starF]);
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
        handleUploadFiles(response.data.data.id)
        toast.success(response.data.message)
        setFiles([]);
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
const favorites = useSelector(state => state.favoriteReducers.favorites);

const isFavorite = favorites.includes(product.id);

const handleFavorite = () => {
    if (isFavorite) {
        dispatch(favoriteActions.removeFromFavorite(product.id));
    } else {
        dispatch(favoriteActions.addToFavorite(product.id));
    }
};
const handleFileChange = (e) => {
  const newFiles = Array.from(e.target.files).slice(0, 5 - files.length); // Limit the number of files to 5
  setFiles([...files, ...newFiles]);
};

const handleRemoveFile = (index) => {
  const newFiles = files.filter((_, i) => i !== index);
  setFiles(newFiles);
};

const handleUploadFiles = async (id) => {
  try {
      const formData = new FormData();
      files.forEach(file => {
          formData.append('files', file);
      });
      const response = await rateApi.addFiles(id,formData);
  } catch (error) {
      handleException(error);
  }
};
const handleVideoClick = (filePath) => {
  // window.open(filePath, '_blank');
  setVideoUrl(filePath);
        setPlaying(true);
};
const selectedTemplate = (option, props) => {
  if (option) {
      return (
          <div className="flex align-items-center">
              <div style={{ fontSize:20 }}>{option.name}</div>
          </div>
      );
  }

  return <span>{props.placeholder}</span>;
};
const itemsTemplate = (option) => {
  return (
      <div className="flex align-items-center">
          <div style={{ fontSize:20 }}>{option.name}</div>
      </div>
  );
};
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
            <span className="ratings" style={{ width: `${(product.star / 5) * 100}%` }}/>
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
                <Button
                  text
                  severity="danger"
                  onClick={handleFavorite}
                >
                  <i style={{ fontSize:15 }} className={`pi pi-heart${isFavorite ? '-fill' : ''} mr-1`} />
                  <span>Yêu thích</span>
                </Button>
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
                Mô tả ngắn
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
                Đánh giá ({totalRecords})
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
                <div className="row">
                <div className="col-8">
                <h3 className="reviews-title">
                  <strong>{totalRecords}</strong> đánh giá {starF!="null"?<strong>{starF} sao</strong>:""} cho sản phẩm 
                </h3>
                </div>
                <div className="col-4 row" style={{ display:'flex',justifyContent:'end' }}>
                  <div className="col-6">
                  <Dropdown value={sort} onChange={(e) => { setSort(e.value);setCurrentPage(1)}} options={options} optionLabel="name" style={{ width:"100%" }} itemTemplate={itemsTemplate} valueTemplate={selectedTemplate} />
                  </div>
                  <div className="col-6">
                  <Dropdown value={starF} onChange={(e) =>{ setStarF(e.value);setCurrentPage(1)}} options={optionsStar} optionLabel="name" style={{ width:"100%" }} itemTemplate={itemsTemplate} valueTemplate={selectedTemplate} />
                  </div>
               
                </div>
        
                </div>
                {/* <div className="add-product-review">
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
                    <div className="col-12 m-2" style={{ display: 'flex',justifyItems:'start' }}>
                    <label style={{ cursor:"pointer" }} htmlFor='files'>
                        Chọn ảnh/video ({files.length}/5)
                        </label>
                        <input id='files' type="file" accept="image/*,video/*" multiple onChange={handleFileChange} disabled={files.length >= 5} style={{ visibility:"hidden" }}/>
                       
                        
                    </div>
                    <div className="col-12 m-2" style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {files.map((file, index) => (
                            <div 
                                key={index} 
                                style={{ position: 'relative', margin: '0.5rem' }} 
                               
                            >
                                {file.type.startsWith('image') ? (
                                    <img src={URL.createObjectURL(file)} alt="preview" style={{ width: 100, height: 100, objectFit: 'cover' }} />
                                ) : (
                                    <Button type="button" text style={{ position: 'relative' }}  onMouseEnter={() => setHoveredFile(index)} 
                                    onMouseLeave={() => setHoveredFile(null)}
                                    onClick={() => file.type.startsWith('video') && handleVideoClick(URL.createObjectURL(file))}>
                                        <ReactPlayer url={URL.createObjectURL(file)}  width={100} height={100} />
                                        {hoveredFile === index && (
                                            <Button  onClick={e=>e.preventDefault()} icon="pi pi-play" className="p-button-rounded p-button-success" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                        )}
                                    </Button>
                                )}
                                <Button icon="pi pi-times" type="button" className="p-button-rounded p-button-danger" style={{ position: 'absolute', top: 0, right: 0 ,zIndex:1000}} onClick={() => handleRemoveFile(index)} />
                            </div>
                        ))}
                    </div>
                    <Button label="Gửi" loading={loading} />
                  </form>
                </div> */}

                <div className="divider" />
                <div className="comment-list">
                  {rateData.length>0?rateData.map((item)=>(
                    <ItemRate item={item} setLike={setLike}/>
                 )):(<div>Chưa có đánh giá nào</div>)}
                  
                </div>
                {(totalRecords > 5 && rateData.length < totalRecords) && (
                  <div style={{ display:"flex",justifyContent:'center' }}>
                  <Button onClick={()=>setCurrentPage(prevPage => prevPage + 1)} loading={rateL} disabled={totalRecords<=5||rateData.length==totalRecords} severity="danger" text raised>Tải thêm đánh giá</Button>
                </div>
                )}
                
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
      {playing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex:1000
          }}
          onClick={() => setPlaying(false)}
        >
          <ReactPlayer
            url={videoUrl}
            playing={playing}
            controls
            width="80%"
            height="80%"
          />
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
