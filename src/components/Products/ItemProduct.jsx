import React from 'react'
import appUrl from '../../api/appUrl'

function ItemProduct({product}) {
  console.log("ip",product)
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
          {/* End .ratings */}
          <span className="tooltiptext tooltip-top" />
        </div>
        {/* End .product-ratings */}
      </div>
      {/* End .product-container */}
      <div className="price-box">
       <del className="old-price">{product.comparePrice.toLocaleString()}</del>
<span className="product-price">{product.salePrice.toLocaleString()} VND</span>

      </div>
      {/* End .price-box */}
      <div className="product-action">
        <a
          href="wishlist.html"
          className="btn-icon-wish"
          title="Yêu thích"
        >
          <i className="icon-heart" />
        </a>
        <a
          href="#"
          className="btn-icon btn-add-cart product-type-simple"
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
    {/* End .product-details */}
  </div>
  )
}

export default ItemProduct