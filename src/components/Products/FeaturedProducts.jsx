import React, { useEffect, useState } from "react";
import ProductItem from "./ItemProduct";
import tagApi from "../../api/tagApi";
import SwiperProduct from "./SwiperProduct";

function FeaturedProducts() {
  const [tagData,setTagData]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await tagApi.getAll();
            if (res.status === 200) {
              console.log('tag',res)
              setTagData(res.data)
            }
        } catch (error) {
           console.log(error)
        }
    };
    fetchData();
}, []);
  return (
    <>
    {tagData.length>0&&tagData.map((tag)=>(
 <section key={tag.name} className="featured-products-section">
 <div className="container">
   <h2 className="section-title heading-border ls-20 border-0">
     {tag.name}
   </h2>
   <SwiperProduct tagId={tag.id}/>
 </div>
</section>
    ))}
    </>
   
  );
}

export default FeaturedProducts;
