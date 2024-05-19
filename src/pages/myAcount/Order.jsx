import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { orderApi } from "../../api/orderApi";
import { Paginator } from 'primereact/paginator';
import ShowOrderStatus from "../../utils/ShowOrderStatus";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import useCustomException from "../../utils/useCustomException";
function Order() {
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
  const handleException=useCustomException()
  const navigate=useNavigate()
  const [orderData, setOrderData] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [visible,setVisible]=useState(false);
  const [loading,setLoading]=useState(false)

  const footerContent = (
    <div>
        <Button label="Thoát" icon="pi pi-times" onClick={() => setVisible(false)} autoFocus  />
    </div>
);
  useEffect(() => {
    const fetch = async () => {
      try {
        const respone = await orderApi.getMyOrder(currentPage,rows);
        console.log(respone)
        if (respone.status === 200) {
          setOrderData(respone.data.items);
        setTotalRecords(respone.data.totalCount);
        setRows(respone.data.pageSize);
        setCurrentPage(respone.data.currentPage);
        setFirst((respone.data.currentPage - 1) * respone.data.pageSize);
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetch()
  }, [currentPage,rows]);


  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);  
};
const handlePaymentMomo=async(code)=>{
  try {
  setVisible(false)
  setLoading(true)
    const currentHost = window.location.origin;
    const data={
      orderCode:code,
      redirectUrl:currentHost+'/thanh-toan-thanh-cong'
    }
    const res =await orderApi.getLinkPaymentMomo(data)
    if(res.status===200){
      window.location.href=res.data
      setLoading(false)
    }
  } catch (error) {
    if(error?.response){
      handleException(error)
    }
    setLoading(false)
  }
}
  return (
    <div className="order-content">
      <h3 className="account-sub-title d-none d-md-block">
        <i className="sicon-social-dropbox align-middle mr-3" />
        Đơn hàng
      </h3>
      <div className="order-table-container text-center">
        <table className="table table-order text-left">
          <thead>
            <tr>
              <th className="order-id" style={{ width: "10%" }}>
                Mã
              </th>
              <th className="order-id" style={{ width: "15%" }}>
                Thanh toán
              </th>
              <th className="order-date" style={{ width: "15%" }}>
                Ngày đặt
              </th>
              <th className="order-status" style={{ width: "15%" }}>
                Trạng thái
              </th>
              <th className="order-price" style={{ width: "15%" }}>
                Giá tiền
              </th>
              <th className="order-action">Khác</th>
            </tr>
          </thead>
          <tbody>
          

              {orderData.length > 0 ? (
                orderData.map((item, index) => (
                  <tr key={index}>
                  <td >{item.code}</td>
                  <td >{item.paymentType==="CashOnDelivery"?"Khi nhận hàng":"Trực tuyến"}</td>
                  <td >{new Date(item.createdAt).toLocaleString()}</td>
                  <td>
                    <ShowOrderStatus data={getStatusText(item.status,item.paymentType)} id={item.id}/>
                  </td>
                  <td><span style={{ fontWeight:'bold' }}>{item.total.toLocaleString()} VND</span></td>
                  <td style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                    <Button label="Chi tiết" onClick={()=>navigate('/chi-tiet-don-hang/'+item.code)}/>
                    {item.paymentType==="OnlinePayment"&&item.status==="Confirmed"&&(
                     <> <Button loading={loading} severity="success" label="Thanh toán" onClick={()=>setVisible(true)}/>
                       <Dialog header="Chọn phương thức thanh toán" visible={visible} position={"top-right"} style={{ width: '30vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={false}>
                        <Button onClick={()=>handlePaymentMomo(item.code)} label="Với Momo" style={{fontSize:15, height:"3em",width:"50%" }}>

                        </Button>
                       </Dialog>
                      </>
                    )}
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                <td className="text-center p-0" colSpan={5}>
                  <p className="mb-5 mt-5">Chưa có gì trong giỏ hàng</p>
                </td>
                 </tr>
              )}
          
          </tbody>
          <tfoot>
            <tr>
              <td className="text-center" colSpan={5}>
              <Paginator first={first} rows={rows} totalRecords={totalRecords} rowsPerPageOptions={[5, 10, 20]} onPageChange={onPageChange} />
              </td>
            </tr>
          </tfoot>
        </table>
        <hr className="mt-0 mb-3 pb-2" />
        <Link to="/" className="btn btn-dark">
          Mua sắm
        </Link>
      </div>
    </div>
  );
}

export default Order;
