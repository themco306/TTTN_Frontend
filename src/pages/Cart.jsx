import React, { useEffect, useState } from 'react'
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import appUrl from '../api/appUrl';
import { userApi } from '../api/userApi';
import { cartActions } from '../state/actions/cartActions';
import useCustomException from '../utils/useCustomException';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Cart() {
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const navigate=useNavigate()
  const {carts}=useSelector(state=>state.cartReducers)
  const [cartsOrder,setCartsOrder]=useState(useSelector(state=>state.cartReducers.cartsToOrder))
  const [total,setTotal]=useState(0)
  useEffect(() => {
    // Tính toán tổng số lượng từ cartsOrder
    const newTotal = cartsOrder.reduce((acc, cart) => acc + (cart.quantity*cart.product.salePrice), 0);
    setTotal(newTotal);
  }, [cartsOrder]);
  const handleChangeQuantity =async(quantity,id)=>{
    console.log("qaun",quantity,id)
    try {
      const response = await userApi.changeQuantity(id,parseInt(quantity));
      console.log(response)
      if (response.status === 200) {
        const existingIndex = cartsOrder.findIndex(item => item.id === id);
        if (existingIndex !== -1) {
          // Cập nhật số lượng trong cartsOrder nếu id tồn tại
          const updatedCartsOrder = cartsOrder.map(item =>
            item.id === id ? { ...item, quantity: quantity } : item
          );
          setCartsOrder(updatedCartsOrder);
        }
        dispatch(cartActions.changeQuantity({id:id,quantity:quantity}));
      }
    } catch (error) {
      if (error?.response) {
        handleException(error);
      }
    }
  }
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
  const handleCartToOrder = (cart) => {
    const existingIndex = cartsOrder.findIndex(item => item.id === cart.id);

    if (existingIndex === -1) {
      // Sản phẩm chưa tồn tại trong cartsOrder, thêm vào
      setCartsOrder(prevState => [...prevState, cart]);
    } else {
      // Sản phẩm đã tồn tại trong cartsOrder, loại bỏ ra
      const updatedCartsOrder = cartsOrder.filter(item => item.id !== cart.id);
      setCartsOrder(updatedCartsOrder);
    }
  };
  const handleToOrder=()=>{
    if(cartsOrder.length>0){
      dispatch(cartActions.setCartToOrder(cartsOrder));
      navigate("/dat-hang")
    }
    else{
    toast.error("Vui lòng chọn sản phẩm")
    }
    
  }
  const handleChecked=(id)=>{
    const existingIndex = cartsOrder.findIndex(item => item.id === id);
    if (existingIndex === -1) {
      return false
    }
    return true
  }
  return (
<div className="container">
  <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
  <li className="active">
      <Link to="/gio-hang">Giỏ hàng</Link>
    </li>
    <li >
      <Link to="/dat-hang">Đặt hàng</Link>
    </li>
    <li className="disabled">
      <a href="#">Hoàn thành</a>
    </li>
  </ul>

  <div className="row">
  <div className="col-lg-8">
    <div className="cart-table-container">
      <table className="table table-cart">
        <thead>
          <tr>
          <th className="thumbnail-col" style={{ width:"5%" }} />
            <th className="thumbnail-col" style={{ width:"20%" }} />
            <th className="product-col" style={{ width:"30%" }}>Tên</th>
            <th className="price-col" style={{ width:"15%" }}> Giá</th>
            <th className="qty-col" style={{ width:"5%" }}>Số lượng</th>
            <th className="text-right" style={{ width:"25%" }}>Tổng</th>
          </tr>
        </thead>
        <tbody>
          {carts.length>0&&carts.map((cart)=>(
            <tr className="product-row">
              <td>
                <input checked={handleChecked(cart.id)} type='checkbox' onChange={()=>handleCartToOrder(cart)}/>
              </td>
            <td>
              <figure className="product-image-container">
                <a href="product.html" className="product-image">
                  <img src={cart.product.galleries.length>0&&(appUrl.imageURL+cart.product.galleries[0].imagePath)} alt="product" />
                </a>
                <a style={{ cursor:'pointer' }} onClick={()=>handleRemoveFromCart(cart.id)} className="btn-remove icon-cancel" title="Remove Product" />
              </figure>
            </td>
            <td className="product-col">
              <h5 className="product-title">
                <a href="product.html">{cart.product.name}</a>
              </h5>
            </td>
            <td>{cart.product.salePrice.toLocaleString()} VND</td>
            <td style={{ display:'flex',alignItems:'center',justifyContent:'center' }}>
             
            <InputNumber value={cart.quantity} min={1} max={cart.product.quantity} onValueChange={(e) => {handleChangeQuantity(e.value,cart.id)}} showButtons buttonLayout="vertical" style={{ height:"4rem",width:"4rem" }}
                    decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                   

            </td>
            <td className="text-right"><span className="subtotal-price">{(cart.product.salePrice*cart.quantity).toLocaleString()} VND</span></td>
          </tr>
          ))}
          
        </tbody>
      </table>
    </div>{/* End .cart-table-container */}
  </div>{/* End .col-lg-8 */}
  <div className="col-lg-4">
    <div className="cart-summary">
      <h3>Tổng Giỏ Hàng</h3>
      <table className="table table-totals">
    <tbody>
      {cartsOrder.length>0&&cartsOrder.map((item)=>(
        <tr>
        <td>{item.product.name} x {item.quantity}</td>
        <td>{(item.product.salePrice*item.quantity).toLocaleString()} VND</td>
    </tr>
      ))}
    </tbody>
    <tfoot>
        <tr>
            <td>Tổng cộng</td>
            <td>{total.toLocaleString()} VND</td>
        </tr>
    </tfoot>
</table>

      <div className="checkout-methods">
        <Button  onClick={handleToOrder} className="btn btn-block btn-dark">Đặt Hàng
          <i className="fa fa-arrow-right" /></Button>
      </div>
    </div>{/* End .cart-summary */}
  </div>{/* End .col-lg-4 */}
</div>{/* End .row */}

</div>

  )
}

export default Cart
