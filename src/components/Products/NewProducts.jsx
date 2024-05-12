import React from 'react'
import ProductItem from './ItemProduct'
import FeaturedCategory from '../Categories/FeaturedCategory'
import ItemProduct from './ItemProduct'

function NewProducts() {
  return (
    <section className="new-products-section">
  <div className="container">
    {/* <h2 className="section-title heading-border ls-20 border-0">Mô HÌnh Mới</h2>
    <div className="products-slider custom-products owl-carousel owl-theme nav-outer show-nav-hover nav-image-center mb-2" data-owl-options="{
						'dots': false,
						'nav': true,
						'responsive': {
							'992': {
								'items': 4
							},
							'1200': {
								'items': 5
							}
						}
					}">
                
    </div> */}
    {/* End .featured-proucts */}





    <div className="banner banner-big-sale appear-animate" data-animation-delay={200} data-animation-name="fadeInUpShorter" style={{background: '#2A95CB center/cover url("assets/images/demoes/demo4/banners/banner-4.jpg")'}}>
      <div className="banner-content row align-items-center mx-0">
        <div className="col-md-9 col-sm-8">
          <h2 className="text-white text-uppercase text-center text-sm-left ls-n-20 mb-md-0 px-4">
            <b className="d-inline-block mr-3 mb-1 mb-md-0">Big Sale</b> All new fashion brands items up to 70% off
            <small className="text-transform-none align-middle">Online Purchases Only</small>
          </h2>
        </div>
        <div className="col-md-3 col-sm-4 text-center text-sm-right">
          <a className="btn btn-light btn-white btn-lg" href="category.html">View Sale</a>
        </div>
      </div>
    </div>
                    <FeaturedCategory/>
  </div>
</section>

  )
}

export default NewProducts