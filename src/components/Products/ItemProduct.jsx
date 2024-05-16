import React from 'react'
import appUrl from '../../api/appUrl'
import { userApi } from '../../api/userApi'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../state/actions/cartActions'
import useCustomException from '../../utils/useCustomException'
import { toast } from 'react-toastify'

function ItemProduct({product}) {
  console.log("ip",product)
  const dispatch=useDispatch()
  const handleException = useCustomException();
  const handleAdd2Cart =async()=>{
    try {
      const data={
        cartItem:{
          productId:product.id,
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
    <div
    className="product-default "
    data-animation-name="fadeInRightShorter"
  >
    <figure>
      {product.galleries.length>0 && product.galleries.length>1?(
      <a href="/product/1">
            <img
            src={appUrl.imageURL+product.galleries[0].imagePath}
            width={280}
            height={280}
            alt="product"
          />
           <img
            src={appUrl.imageURL+product.galleries[1].imagePath}
            width={280}
            height={280}
            alt="product"
          />
      </a>):(
        <a href="/product/1">
         <img
            src={appUrl.imageURL+product.galleries[0].imagePath}
            width={280}
            height={280}
            alt="product"
          />
           <img
            src={appUrl.imageURL+product.galleries[0].imagePath}
            width={280}
            height={280}
            alt="product"
          />
      </a>
      )}
      
      <div className="label-group">
        <div className="product-label label-hot">HOT</div>
        <div className="product-label label-sale">-40%</div>
      </div>
    </figure>
    <div className="product-details">
      <div className="category-list">
        <a href="category.html" className="product-category">
          {product.category?.name}
        </a>
      </div>
      <h3 className="product-title">
        <a href="product.html">{product.name}</a>
      </h3>
      <div className="ratings-container">
        <div className="product-ratings">
          <span className="ratings" style={{ width: "80%" }} />
          <span className="tooltiptext tooltip-top" />
        </div>
      </div>
      <div className="price-box">
       <del className="old-price">{product.comparePrice.toLocaleString()}</del>
<span className="product-price">{product.salePrice.toLocaleString()} VND</span>

      </div>
      <div className="product-action">
        <a
          href="wishlist.html"
          className="btn-icon-wish"
          title="Yêu thích"
        >
          <i className="icon-heart" />
        </a>
        <a
          className="btn-icon btn-add-cart "
          onClick={handleAdd2Cart}
        >
          <i className="icon-shopping-cart" />
          <span>Thêm giỏ hàng</span>
        </a>
        <a
          href="ajax/product-quick-view.html"
          className="btn-quickview"
          title="Xem nhanh"
        >
          <i className="fas fa-external-link-alt" />
        </a>
      </div>
    </div>
  </div>
  )
}

export default ItemProduct