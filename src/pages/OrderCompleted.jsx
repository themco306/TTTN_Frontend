import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { orderApi } from '../api/orderApi';
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';
import useCustomException from '../utils/useCustomException';

function OrderCompleted() {
    const { code, token } = useParams();
    const navigate=useNavigate()
    const handleException=useCustomException()
    const [order,setOrder]=useState(null)
    const [loading,setLoading]=useState(false)
    const [loadingC,setLoadingC]=useState(false)
    useEffect(() => {
      if (!code) {
        navigate("/");
      }
    }, [code, token, navigate]);
    useEffect(() => {
      if(token){
        handleConfirmOrder()
      }
     
    }, [token]);
    useEffect(() => {
      const fecth =async()=>{
        try {
          
          // const response=await orderApi.confirmOrder({code:code,token:token})
          const response=await orderApi.getByCode(code)
          console.log('e',response)
          if(response.status===200){
            // if(!token&&response.data.status!==0){
            //     navigate("/")
            // }
            setOrder(response.data.order)
          }
        } catch (error) {
          // navigate("/")
        }
      }
      fecth()
    }, [code, token, navigate,loading]);
    const handleConfirmOrder =async()=>{
      try {
        setLoading(true)
        const response=await orderApi.confirmEmail(code,token)
        console.log('oooo',response)
        if(response.status===200){
            toast.success(response.data.message)
            setOrder(prevOrder => ({
              ...prevOrder,
              status: 1
            }));
            setLoading(false)
        }
      } catch (error) {
        if(error.response.status){
          handleException(error)
      }
      setLoading(false)
      }
    }
    const handlePaymentMomo=async(code)=>{
      try {
      setLoadingC(true)
        const currentHost = window.location.origin;
        const data={
          orderCode:code,
          redirectUrl:currentHost+'/thanh-toan-thanh-cong'
        }
        const res =await orderApi.getLinkPaymentMomo(data)
        if(res.status===200){
          window.location.href=res.data
          setLoadingC(false)
        }
      } catch (error) {
        if(error?.response){
          handleException(error)
        }
        setLoadingC(false)
      }
    }
    if(token)
      {
        return(<div className="container checkout-container">
        <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
          <li className="disabled" >
            <a >Giỏ hàng</a>
          </li>
          <li  className="disabled" >
            <a  >Đặt hàng</a>
          </li>
          <li className=" active">
            <a>Hoàn thành</a>
          </li>
        </ul>
          <div>
              <p>Đơn hàng của bạn đã được tạo thành công.</p>
              {order?.paymentType==="OnlinePayment"&&order?.status==="Confirmed"&&(<div>
                <p>Vui lòng chọn hình thức thanh toán</p>
                <p>Thanh toán :  <Button loading={loadingC} onClick={()=>handlePaymentMomo(order.code)} label="Với Momo" style={{fontSize:15, height:"3em",width:"50%" }}/></p>
              </div>)}
              {order?.status==="Confirmed"&&(<div>
                <Link to={"/tai-khoan"}>Nhấn vào để quản lý đơn hàng</Link>
              </div>)}
              <p>Trạng thái: {order?.status!=="PendingUserConfirmation"?"Đã xác nhận":"Chưa xác nhận"}</p>
              {order?.status==="PendingUserConfirmation"&&(
              <p>Nhấn vào {loading?(<span>...</span>):(<a  style={{ color:"blue", cursor:'pointer' }} onClick={handleConfirmOrder}> đây </a>)}để xác nhận</p>
              )}
          </div>
      </div>)
      }else
      {
        return (
          <div className="container checkout-container">
            <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
              <li className="disabled" >
                <a >Giỏ hàng</a>
              </li>
              <li  className="disabled" >
                <a  >Đặt hàng</a>
              </li>
              <li className=" active">
                <a>Hoàn thành</a>
              </li>
            </ul>
              <div>
                  <p>Đơn hàng của bạn đã được tạo.</p>
                  <p>Vui lòng vào Email để xác nhận rằng bạn chính bạn đã đặt hàng.</p>
                  <p>Lưu ý: Bạn có 5 phút để xác nhận, Nếu qua 5 phút mà bạn chưa xác nhận thì bạn sẽ bị hủy</p>
              </div>
          </div>
        )
      }
}

export default OrderCompleted
