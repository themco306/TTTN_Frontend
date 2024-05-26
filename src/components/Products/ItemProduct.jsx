import React, { useState } from "react";
import appUrl from "../../api/appUrl";
import { userApi } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { cartActions } from "../../state/actions/cartActions";
import useCustomException from "../../utils/useCustomException";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

function ItemProduct({ product }) {
  console.log("ip", product);
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const [visible, setVisible] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const calculateDiscountPercent = (comparePrice, salePrice) => {
    if (comparePrice <= 0 || salePrice < 0) {
      throw new Error("Prices must be positive numbers");
    }
  
    const discount = comparePrice - salePrice;
    const discountPercent = (discount / comparePrice) * 100;
    
    return discountPercent.toFixed(2); // returns the discount percentage rounded to 2 decimal places
  };
  const discountPercent = calculateDiscountPercent(product.comparePrice, product.salePrice);
  const handleAdd2Cart = async () => {
    try {
      const data = {
        cartItem: {
          productId: product.id,
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
  return (
    <div className="product-default " data-animation-name="fadeInRightShorter">
      <figure>
        {product?.galleries.length > 0 && product?.galleries.length > 1 ? (
          <Link to={`/san-pham/${product.slug}`}>
            <img
              src={appUrl.imageURL + product?.galleries[0].imagePath}
              width={280}
              height={280}
              alt="product"
            />
            <img
              src={appUrl.imageURL + product?.galleries[1].imagePath}
              width={280}
              height={280}
              alt="product"
            />
          </Link>
        ) : (
          <Link to={`/san-pham/${product?.slug}`}>
            <img
              src={appUrl.imageURL + product?.galleries[0].imagePath}
              width={280}
              height={280}
              alt="product"
            />
            <img
              src={appUrl.imageURL + product?.galleries[0].imagePath}
              width={280}
              height={280}
              alt="product"
            />
          </Link>
        )}

        <div className="label-group">
          {/* <div className="product-label label-hot">HOT</div> */}
          <div className="product-label label-sale">-{parseInt(discountPercent)}%</div>
        </div>
      </figure>
      <div className="product-details">
        <div className="category-list">
          <a href="category.html" className="product-category">
            {product?.category.name}
          </a>
        </div>
        <h3 className="product-title">
          <Link to={`/san-pham/${product?.slug}`}>{product?.name}</Link>
        </h3>
        <div className="ratings-container">
          <div className="product-ratings">
            <span className="ratings" style={{ width: "80%" }} />
            <span className="tooltiptext tooltip-top" />
          </div>
        </div>
        <div className="price-box">
          <del className="old-price">
            {product?.comparePrice.toLocaleString()}
          </del>
          <span className="product-price">
            {product?.salePrice.toLocaleString()} VND
          </span>
        </div>
        <div className="product-action">
          <Button
            tooltip="yêu thích"
            severity="danger"
            style={{ width: 35, height: 35 }}
            icon={"pi pi-receipt"}
          />
          <a className="btn-icon btn-add-cart " onClick={handleAdd2Cart}>
            <i className="icon-shopping-cart" />
            <span>Thêm giỏ hàng</span>
          </a>
          <Button
            onClick={() => setVisible(true)}
            tooltip="xem nhanh"
            severity="success"
            style={{ width: 35, height: 35 }}
            icon={"pi pi-receipt"}
          />
          <Dialog
            header="Xem nhanh"
            visible={visible}
            style={{ width: "60vw", minHeight: "60vh" }}
            onHide={() => {
              if (!visible) return;
              setThumbsSwiper(null);
              setVisible(false);
            }}
            closeOnEscape
           key={product.id}
          >
            <div className="row">
              <div className="col-md-6">
                <Swiper
                key={product.id}
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {product.galleries &&
                    product.galleries.map((item) => (
                      <SwiperSlide key={item.id+"gg"}>
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
                  key={product.id}
                >
                  {product.galleries &&
                    product.galleries.map((item) => (
                      <SwiperSlide key={product.item}>
                        <img src={appUrl.imageURL + item.imagePath} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              <div className="col-md-6">
                <h3>{product.name}</h3>
                <div className="category-list">
                  <p>
                    Danh mục:{" "}
                    <a className="product-category">{product?.category.name}</a>
                  </p>
                </div>
                <div className="price-box">
                  <span style={{ fontSize: 15 }}>Giá: </span>
                  <del className="old-price">
                    {product?.comparePrice.toLocaleString()}
                  </del>
                  <span className="product-price">
                    {product?.salePrice.toLocaleString()} VND
                  </span>
                </div>
                <Link to={`/san-pham/${product?.slug}`} style={{ fontSize:18 }}>Xem chi tiết</Link>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
