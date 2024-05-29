import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import productApi from '../api/productApi';
import { Link } from 'react-router-dom';
import appUrl from '../api/appUrl';
import { favoriteActions } from '../state/actions/favoriteActions';
import useCustomException from '../utils/useCustomException';
import { toast } from 'react-toastify';
import { cartActions } from '../state/actions/cartActions';
import { userApi } from '../api/userApi';

function FavoriteList() {
    const dispatch=useDispatch()
    const handleException=useCustomException()
  const favorites = useSelector(state => state.favoriteReducers.favorites);
  const [productData,setProductData]=useState([])
    useEffect(()=>{
        const fecth =async()=>{
            try {
                const data={
                    ids:favorites
                }
                console.log(data)
                const response=await productApi.getMultiple(data)
                console.log(response)
                if(response.status===200){
                    setProductData(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fecth()
    },[favorites])
    const handelRemoveFromFavorite=(id)=>{
        console.log(id)
        dispatch(favoriteActions.removeFromFavorite(id));
    }
    const handleAdd2Cart = async (id) => {
        try {
          const data = {
            cartItem: {
              productId:id,
            },
          };
          const res = await userApi.add2Cart(data);
          console.log(res);
          if (res.status === 200) {
            dispatch(cartActions.add2Cart(res.data.data));
            handelRemoveFromFavorite(id)
            toast.success(res.data.message);
          }
        } catch (error) {
          if (error?.response) {
            handleException(error);
          }
        }
      };
  return (
    <div className="container">
  <div className="wishlist-title">
    <h2 className="px-2 ">Danh sách yêu thích</h2>
  </div>
  <div className="wishlist-table-container">
    <table className="table table-wishlist mb-0">
      <thead>
        <tr>
          <th className="thumbnail-col" />
          <th className="product-col">Sản phẩm</th>
          <th className="price-col">Giá</th>
          <th className="price-col">Số lượng</th>
          <th className="status-col">Đánh giá</th>
          <th className="action-col">Khác</th>
        </tr>
      </thead>
      <tbody>
        {productData.length>0&&productData.map((item)=>(
 <tr className="product-row">
 <td>
   <figure className="product-image-container">
     <Link to={"/san-pham/"+item.slug} className="product-image">
       <img src={appUrl.imageURL+item.galleries[0]?.imagePath} alt="product" />
     </Link>
     <Link onClick={()=>handelRemoveFromFavorite(item.id)}  className="btn-remove icon-cancel" title="Remove Product" />
   </figure>
 </td>
 <td>
   <h5 className="product-title">
     <Link to={"/san-pham/"+item.slug}>{item.name}</Link>
   </h5>
 </td>
 <td className="price-box">{item.salePrice.toLocaleString()} VMD</td>
 <td className="price-box">Còn {item.quantity}</td>
 <td>
 <div className="ratings-container">
          <div className="product-ratings">
            <span className="ratings" style={{ width: `${(item?.star / 5) * 100}%` }}/>
            <span className="tooltiptext tooltip-top" />
          </div>
        </div>
 </td>
 <td className="action">
   <button onClick={()=>handleAdd2Cart(item.id)} className="btn btn-dark btn-add-cart product-type-simple btn-shop">
    Thêm giỏ hàng
   </button>
 </td>
</tr>
        ))}
       
      </tbody>
    </table>
  </div>{/* End .cart-table-container */}
</div>

  )
}

export default FavoriteList