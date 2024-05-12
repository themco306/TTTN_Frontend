import React from 'react'
import ItemFeaturedCategory from './ItemFeaturedCategory'

function FeaturedCategory() {
  return (
  
 <>
     <h2 className="section-title categories-section-title heading-border border-0 ls-0 appear-animate" data-animation-delay={100} data-animation-name="fadeInUpShorter">Danh Mục HOT
    </h2>
    <div className="categories-slider owl-carousel owl-theme show-nav-hover nav-outer">
        <ItemFeaturedCategory/>
        <ItemFeaturedCategory/>
        <ItemFeaturedCategory/>
        <ItemFeaturedCategory/>
        <ItemFeaturedCategory/>
        <ItemFeaturedCategory/>

    </div></>

  )
}

export default FeaturedCategory