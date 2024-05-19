import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { orderApi } from "../api/orderApi";
import useCustomException from "../utils/useCustomException";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Image } from "primereact/image";
import appUrl from "../api/appUrl";

function OrderDetail() {
  const { code } = useParams();
  const handleException = useCustomException();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await orderApi.getByCode(code);
        console.log(response);
        if (response.status === 200) {
          setOrder(response.data);
        }
      } catch (error) {
        if (error.response) {
          handleException(error);
        }
      }
    };
    fecth();
  }, [code]);
  return (
    <div className="row m-5">
      <div className="col-md-5">
        <h3>Thông tin đơn hàng</h3>
        {order!==null && (
          <>
            <p>Mã đơn hàng: {order.code}</p>
            <p>Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Hình thức thanh toán: {order.paymentType==="OnlinePayment"? "Thanh toán online":"Thanh toán khi nhận hàng"}</p>
            <p>Giá tiền: {order.total.toLocaleString()} VND</p>
            <p>Trạng thái: </p>
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
             <Column  style={{ width:"35%" }}  header="Tên" body={(item)=>(<Link>{item.product.name}</Link>)}></Column>
             <Column  style={{ width:"20%" }} header="Giá mua" body={(item)=>(<span>{item.price.toLocaleString()} VND</span>)}></Column>
             <Column  style={{ width:"10%" }} field="quantity" header="Số lượng"></Column>
             <Column  style={{ width:"20%" }}  header="Tổng" body={(item)=>(<span>{item.totalPrice.toLocaleString()} VND</span>)}></Column>
            </DataTable>
        )}
      </div>
      <div className="col-md-4">
        <h4>Khác</h4>
      </div>
    </div>
  );
}

export default OrderDetail;
