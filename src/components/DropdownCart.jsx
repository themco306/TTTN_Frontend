import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import appUrl from "../api/appUrl";
import { userApi } from "../api/userApi";
import { cartActions } from "../state/actions/cartActions";
import useCustomException from "../utils/useCustomException";

function DropdownCart() {
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const { carts } = useSelector((state) => state.cartReducers);
  let totalPrice = carts.reduce((total, cart) => {
    return total + cart.quantity * cart.product.salePrice;
  }, 0);
  const handleRemoveFromCart = async (id) => {
    try {
      const response = await userApi.removeFromCart(id);
      console.log(response)
      if (response.status === 200) {
        dispatch(cartActions.removeFromCart(id));
      }
    } catch (error) {
      if (error?.response) {
        handleException(error);
      }
    }
  };
  return (
    <div className="dropdownmenu-wrapper custom-scrollbar">
      <div className="dropdown-cart-header">GIỎ HÀNG</div>
      <div className="dropdown-cart-products">
        {carts.length > 0 &&
          carts.map((cart) => (
            <div className="product">
              <div className="product-details">
                <h4 className="product-title">
                  <a href="product.html">{cart.product.name}</a>
                </h4>
                <span className="cart-product-info">
                  <span className="cart-product-qty">{cart.quantity}</span> ×{" "}
                  {cart.product.salePrice.toLocaleString()} VND
                </span>
              </div>
              <figure className="product-image-container">
                <Link to="" className="product-image">
                  <img
                    src={
                      cart.product.galleries.length > 0 &&
                      appUrl.imageURL + cart.product.galleries[0].imagePath
                    }
                    alt="product"
                    width={80}
                    height={80}
                  />
                </Link>
                <a style={{ cursor:'pointer' }} onClick={()=>handleRemoveFromCart(cart.id)} className="btn-remove" title="Remove Product">
                  <span>×</span>
                </a>
              </figure>
            </div>
          ))}
      </div>
      <div className="dropdown-cart-total">
        <span>TỔNG:</span>
        <span className="cart-total-price float-right">
          {totalPrice.toLocaleString()} VND
        </span>
      </div>
      <div className="dropdown-cart-action">
        <Link to="gio-hang" className="btn btn-gray btn-block view-cart">
          Vào giỏ hàng
        </Link>
      </div>
    </div>
  );
}

export default DropdownCart;
