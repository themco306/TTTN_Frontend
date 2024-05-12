import React, { useEffect, useState } from 'react'
import sliderApi from '../api/sliderApi';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles


// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import appUrl from '../api/appUrl';
function HomeSlide() {
  const [slider,setSlider]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await sliderApi.getAll();
            if (res.status === 200) {
              console.log(res)
              setSlider(res.data)
            }
        } catch (error) {
           console.log(error)
        }
    };
    fetchData();
}, []);
  return (
    <Swiper
    slidesPerView={1}
    spaceBetween={30}
    loop={true}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Pagination, Navigation]}
    className="mySwiper"
  >
    {slider.length>0&&slider.map((item)=>(
      <SwiperSlide key={item.id}>
        <img src={appUrl.sliderURL+item.imagePath} style={{ height:'80vh' }}/>
      </SwiperSlide>
    ))}
    
  </Swiper>


  )
}

export default HomeSlide