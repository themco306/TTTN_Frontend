import React, { useEffect } from 'react'
import { orderApi } from '../api/orderApi';
import { toast } from 'react-toastify';
import useCustomException from '../utils/useCustomException';
import { Link } from 'react-router-dom';

function CheckoutSuccess() {
    const  handleException=useCustomException()
    useEffect(() => {
        const fetch=async()=>{
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const partnerCode = urlParams.get('partnerCode');
                const orderId = urlParams.get('orderId');
                const requestId = urlParams.get('requestId');
                const amount = urlParams.get('amount');
                const orderInfo = urlParams.get('orderInfo');
                const orderType = urlParams.get('orderType');
                const transId = urlParams.get('transId');
                const resultCode = urlParams.get('resultCode');
                const message = urlParams.get('message');
                const payType = urlParams.get('payType');
                const responseTime = urlParams.get('responseTime');
                const extraData = urlParams.get('extraData');
                const signature = urlParams.get('signature');
            
                const data={
                    partnerCode,
                    orderId,
                    requestId,
                    amount,
                    orderInfo,
                    orderType,
                    transId,
                    resultCode,
                    message,
                    payType,
                    responseTime,
                    extraData,
                    signature
                }
                const response=await orderApi.paymentMomoSuccess(data)
                if(response.status===20){
                    toast.success(response.data.message)
                }
            } catch (error) {
                if(error?.response){
                handleException(error)
                }
            }
       
        }   
        fetch()

      }, []);
  return (
    <div style={{ margin:100, }}>
      Cảm ơn bạn đã mua hàng 
      <Link to={"/tai-khoan"}> Nhấn vào </Link> để xem đơn hàng của bạn
    </div>
  )
}

export default CheckoutSuccess
