import React, { useEffect, useState } from 'react'
import rateApi from '../api/rateApi';
import useCustomException from '../utils/useCustomException';

function LikeBox({item,setLike}) {
    const handleException = useCustomException();
    const [rateLike,setRateLike]=useState({})
    const fecth=async()=>{
        try {
            const response =await rateApi.getRateLike(item.id)
            console.log("reate like",response)
            if(response.status===200){
                setRateLike(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{

       fecth()
    },[])
    const handleActionLike=async(rateId,isLike)=>{
        try {
          const response =await rateApi.action(rateId,isLike)
          console.log("Action like",response)
          if(response.status===200){
            fecth()
            const { like, dislike } = response.data;
            setLike(like,dislike,rateId)
                
          }
        } catch (error) {
          if(error.response?.status){
            handleException(error)
    
          }
        }
      }
  return (
    <div style={{ display:"inline-block",marginLeft:5,fontSize:18 }}>
    <div style={{ display:'flex',alignItems:'center',padding:5 }}>
    <span style={{ marginRight:5 }}>
    <i onClick={() => handleActionLike(item.id, true)} style={{ fontSize: 18, cursor: "pointer" }} className={`pi pi-thumbs-up${rateLike && rateLike.isLike ? "-fill" : ""}`}></i>
({item.like})
    </span>
    <span style={{ marginRight:5 }}>
    <i  onClick={()=>handleActionLike(item.id,false)} style={{ fontSize:18 ,cursor:"pointer"}} className={`pi pi-thumbs-down${rateLike && !rateLike.isLike ? "-fill" : ""}`}></i>({item.dislike})
    </span>
    </div>
  </div>
  )
}

export default LikeBox