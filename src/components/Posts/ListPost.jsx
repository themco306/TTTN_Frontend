import React, { useEffect, useState } from 'react'

import { FreeMode, Pagination } from 'swiper/modules'
import ItemPost from './ItemPost'
import { Swiper, SwiperSlide } from 'swiper/react'
import postApi from '../../api/postApi'

function ListPost() {
    const [postData,setPostData]=useState([])
    useEffect(()=>{
        const fecth=async()=>{
          try {
            const response=await postApi.getPostActive()
            console.log("jjjjjjj",response)
            if(response.status===200){
                setPostData(response.data)
            }
          } catch (error) {
            
          }
        }
        fecth()
      },[])
  return (
    <>
    <Swiper
    key={"post-content"}
    slidesPerView={4}
    spaceBetween={30}
    freeMode={true}
    modules={[FreeMode, Pagination]}
    className="mySwiper"
  >
    {postData.length>0&&postData.map((item)=>(
        <SwiperSlide key={item.id}><ItemPost data={item}/></SwiperSlide>
    ))}
    
   
  </Swiper>
  </>
  )
}

export default ListPost
