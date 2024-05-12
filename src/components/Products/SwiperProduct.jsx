import React, { useEffect, useState } from 'react'
import ItemProduct from './ItemProduct'


// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import productApi from '../../api/productApi';
function SwiperProduct({tagId}) {
    const [productData,setProductData]=useState([]);
    useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await productApi.getAllByTag(tagId);
              if (res.status === 200) {
                console.log('ptag',res)
                setProductData(res.data)
              }
          } catch (error) {
             console.log(error)
          }
      };
      fetchData();
  }, [tagId]);
  return (
    <div >
    <Swiper
    slidesPerView={4}
    spaceBetween={30}
    freeMode={true}
    modules={[FreeMode, Pagination]}
    className="mySwiper"
  >
    {productData.length>0&&productData.map((product)=>(
        <SwiperSlide key={product.id}><ItemProduct product={product}/></SwiperSlide>
    ))}
    
   
  </Swiper>
  </div>
  )
}

export default SwiperProduct
