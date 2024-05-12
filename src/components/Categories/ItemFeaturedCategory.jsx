import React from 'react'

function ItemFeaturedCategory() {
  return (
    <div className="product-category appear-animate" data-animation-name="fadeInUpShorter">
    <a href="category.html">
      <figure>
        <img src="assets/images/demoes/demo4/products/categories/category-1.jpg" alt="category" width={280} height={240} />
      </figure>
      <div className="category-content">
        <h3>One Piece</h3>
        <span><mark className="count">3</mark> Mô Hình</span>
      </div>
    </a>
  </div>
  )
}

export default ItemFeaturedCategory