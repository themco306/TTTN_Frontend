import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { orderApi } from "../api/orderApi";
import useCustomException from "../utils/useCustomException";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Image } from "primereact/image";
import appUrl from "../api/appUrl";
import ShowOrderStatus from "../utils/ShowOrderStatus";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import ModalRate from "../components/ModalRate";

function OrderDetail() {
  const getStatusText = (status,paymentType) => {
    switch (status) {
      case 'PendingUserConfirmation':
        return {
          text: 'Chờ bạn xác nhận',
          icon: "pi pi-file-check",
          tooltip: "Vui lòng xác nhận đặt hàng trong Email",
          type: "warn"
        };
      case 'Confirmed':
        return {
          text: 'Đã xác nhận',
          icon: "pi pi-box",
          tooltip: paymentType==="OnlinePayment"?"Chờ thanh toán":"Chờ đóng gói hàng",
          type: "success"
        };
      case 'Shipped':
        return {
          text: 'Đang giao hàng',
          icon: "pi pi-truck",
          tooltip: "Đang giao hàng",
          type: "warn"
        };
      case 'Delivered':
        return {
          text: 'Đã giao hàng',
          icon: "pi pi-check",
          tooltip: "Giao thành công",
          type: "info"
        };
      case 'Received':
        return {
          text: 'Đã nhận hàng',
          icon: "pi pi-check-circle",
          tooltip: "Bạn đã nhận hàng",
          type: "success"
        };
      case 'Cancelled':
        return {
          text: 'Đơn bị hủy',
          icon: "pi pi-times-circle",
          tooltip: "Đã hủy",
          type: "error"
        };
      case 'PaymentCompleted':
        return {
          text: 'Đã thanh toán',
          icon: "pi pi-credit-card",
          tooltip: "Chờ đóng gói hàng",
          type: "success"
        };
      default:
        return {
          text: 'Không xác định',
          icon: "pi pi-question-circle",
          tooltip: "Trạng thái không xác định",
          type: "info"
        };
    }
  };
  const { code } = useParams();
  const handleException = useCustomException();
  const [order, setOrder] = useState(null);
  const [couponU, setCouponU] = useState(null);

  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await orderApi.getByCode(code);
        console.log(response);
        if (response.status === 200) {
          setOrder(response.data.order);
          setCouponU(response.data.couponUsage)
        }
      } catch (error) {
        if (error.response) {
          handleException(error);
        }
      }
    };
    fecth();
  }, [code]);
  const handleDis =(status,statusD,paymentType)=>{
    switch (statusD) {
        case "Cancelled":
            if(status==="PendingUserConfirmation"){
                return false;
            }
            return true;
        case "Received":
            if(status==="Delivered")
                {
                    return false;
                }
            return true;
        default:
            return false;
    }
       
  }
  const handleChangeStatus = async (status) => {
    try {
        const data = {
            status: status
        };
        const response = await orderApi.updateStatus(order.id, data);
        console.log(response)
        if (response.status === 200) {
            setOrder(prev => ({ ...prev, status: status }));
            toast.success(response.data.message);
        }
    } catch (error) {
        toast.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
};

  return (
    <div className="row m-5">
      <div className="col-md-5">
        <h3>Thông tin đơn hàng</h3>
        {order!==null && (
          <>
            <p>Mã đơn hàng: {order.code}</p>
            <p>Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Hình thức thanh toán: {order.paymentType==="OnlinePayment"? "Thanh toán online":"Thanh toán khi nhận hàng"}</p>
            <p>Giá tiền: <strong>{order.total.toLocaleString()} VND</strong></p>
            <div style={{ display:'flex', alignItems:'center' }}> <span className="mr-1">Trạng thái: </span><ShowOrderStatus data={getStatusText(order.status,order.paymentType)} id={order.id}/> </div>
          </>
        )}
      </div>
      <div className="col-md-7">
        <h3>Thông tin người nhận</h3>
        {order!==null && (
          <>
        <p>Danh xưng: {order.orderInfo.deliveryName}</p>
        <p>Số ĐT: {order.orderInfo.deliveryPhone}</p>
        <p>Đia chỉ giao hàng: {order.orderInfo.deliveryAddress}, {order.orderInfo.deliveryWard}, {order.orderInfo.deliveryDistrict}, {order.orderInfo.deliveryProvince}</p>
        <p>Ghi chú: {order.note}</p>
        </>)}
      </div>
      <div className="col-md-8">
        <h4>Chi tiết đơn hàng</h4>
        {order!==null&&(
             <DataTable value={order.orderDetails} tableStyle={{ minWidth: '50rem',fontSize:15 }}>
             <Column style={{ width:"15%" }} header="Hình ảnh" body={(item)=>(
                <><Image src={appUrl.imageURL+item.product.galleries[0].imagePath} width="100%"/></>
             )}></Column>
             <Column  style={{ width:"35%" }}  header="Tên" body={(item)=>(<Link to={'/san-pham/'+item.product.slug}>{item.product.name}</Link>)}></Column>
             <Column  style={{ width:"20%" }} header="Giá mua" body={(item)=>(<span>{item.price.toLocaleString()} VND</span>)}></Column>
             <Column  style={{ width:"10%" }} field="quantity" header="Số lượng"></Column>
             <Column  style={{ width:"20%" }}  header="Đánh giá" body={(item)=>(<ModalRate item={item}/>)}>
             
             </Column>
            </DataTable>
        )}
      </div>
      <div className="col-md-4">
        <h4>Khác</h4>
        <p><strong>Mã giảm giá: </strong>{couponU??"Không có"}</p>

        {order?.paidOrder&&order?.paidOrder.paymentDate!==null&&(
            <p>Đã thanh toán qua: <strong>{order?.paidOrder.paymentMethod}</strong> vào lúc {new Date(order?.paidOrder.paymentDate).toLocaleString()}</p>
        )}
        <div style={{ display:'flex',justifyContent:'space-between',width:"40%" }}>
            <Button onClick={()=>handleChangeStatus("Received")} disabled={handleDis(order?.status,"Received",order?.paymentType)} severity='success' icon={'pi pi-verified'} tooltip='Nhấn vào để xác nhận bạn đã nhận được hàng'/>
            <Button onClick={()=>handleChangeStatus("Cancelled")} disabled={handleDis(order?.status,"Cancelled",order?.paymentType)} severity='danger' icon={'pi pi-trash'} tooltip='Nhấn vào để hủy đơn hàng'/>
        </div>

      </div>
    </div>
  );
}

export default OrderDetail;
