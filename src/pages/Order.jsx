import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { orderInfoApi } from "../api/orderInfoApi";
import useCustomException from "../utils/useCustomException";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { orderApi } from "../api/orderApi";

function Order() {
  const navigate = useNavigate();
  const handleException = useCustomException();
  const [orderInfoData, setOrderInfoData] = useState([]);
  const [selectedOrderInfo, setSelectedOrderInfo] = useState(null);
  const [visible, setVisible] = useState(false);
  const [note, setNote] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [lCode, setLCode] = useState(false);
  const [code, setCode] = useState("");
  const { cartsToOrder } = useSelector((state) => state.cartReducers);
  const [total, setTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    if (cartsToOrder.length <= 0) {
      navigate("/gio-hang");
    }
  }, [cartsToOrder, navigate]);
  const footerContent = (
    <div>
        <Button label="Thêm địa chỉ" icon="pi pi-plus" onClick={() => navigate("/tai-khoan")} className="p-button-text" />
        <Button label="Thoát" icon="pi pi-times" onClick={() => setVisible(false)} autoFocus />
    </div>
);
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await orderInfoApi.getAll();
        console.log(";;;;", response);
        if (response.status === 200) {
          setOrderInfoData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecth();
  }, []);
  useEffect(() => {
    // Tính toán tổng số lượng từ cartsOrder
    const newTotal = cartsToOrder.reduce(
      (acc, cart) => acc + cart.quantity * cart.product.salePrice,
      0
    );
    setTotal(newTotal);
    if(couponData!==null&&newTotal >=couponData.minimumOrderValue){
      if(couponData.discountType==="Percentage"){
        setFinalTotal(newTotal-(newTotal*(couponData.discountValue/100)));
      }else if(couponData.discountType==="FixedAmount"){
        setFinalTotal(newTotal-couponData.discountValue)
      }
    }else{
      setFinalTotal(newTotal)
    }
    
  }, [cartsToOrder,couponData]);
  const handleChecked = (id) => {
    if (id !== selectedOrderInfo?.id) {
      return false;
    }
    return true;
  };
  const handleSubmitCode = async () => {
    try {
      setLCode(true);
      const response = await orderApi.submitCode(code);
      console.log(response);
      if (response.status === 200) {
        setCouponData(response.data);
        setLCode(false);
      }
    } catch (error) {
      if (error?.response) {
        handleException(error);
      }
      setCouponData(null);
      setLCode(false);
    }
  };
  return (
    <div className="container checkout-container">
      <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
        <li>
          <Link to="/gio-hang">Giỏ hàng</Link>
        </li>
        <li className="active">
          <Link to="/dat-hang">Đặt hàng</Link>
        </li>
        <li className="disabled">
          <a href="#">Hoàn thành</a>
        </li>
      </ul>
      <div className="checkout-discount">
        <h4>
          Bạn có mã giảm giá?
          <button
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseOne"
            className="btn btn-link btn-toggle"
          >
            Nhập mã ở đây
          </button>
        </h4>
        <div id="collapseTwo" className="collapse">
          <div className="feature-box">
            <div className="feature-box-content">
              <p style={{ color: "red" }}>
                *Lưu ý: Mã chỉ áp dụng cho sản phẩm có trong chương trình khuyến
                mãi
              </p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-sm w-auto"
                  placeholder="Mã giảm giá"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <div className="input-group-append">
                  <Button
                    loading={lCode}
                    onClick={handleSubmitCode}
                    className="btn btn-sm mt-0"
                  >
                    Áp dụng
                  </Button>
                </div>
              </div>
              {couponData !== null && (
                <div>
                  <p>{couponData.description}</p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Bắt đầu từ: </span>
                    {new Date(couponData.startDate).toLocaleString()}
                    <span style={{ fontWeight: "bold" }}> Đến hết: </span>
                    {new Date(couponData.endDate).toLocaleString()}
                  </p>
                  <p>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>Tình trạng: </span>
                    {couponData.usageLimit > 1 ? "Còn mã" : "Hết mã"}
                  </p>
                  <p style={{ color: "red" }}>
                    {couponData.usagePerUser === 1
                      ? "*chỉ dùng được 1 lần"
                      : ""}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <h2 className="step-title">Địa chỉ giao hàng</h2>
          <div
            className="flex align-items-center"
            onClick={() => setVisible(!visible)}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "15px 5px",
              cursor: "pointer",
              border: "1px solid ",
            }}
          >
            {selectedOrderInfo !== null ? (
              <div style={{ width: "100%" }}>
                <div style={{ fontSize: 15, color: "orange" }}>
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Tên:{" "}
                  </span>
                  {selectedOrderInfo?.deliveryName}
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    , Sdt:{" "}
                  </span>
                  {selectedOrderInfo?.deliveryPhone}
                </div>
                <div style={{ fontSize: 13, color: "orange" }}>
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Địa chỉ:{" "}
                  </span>
                  <span>{`${selectedOrderInfo?.deliveryAddress}, ${selectedOrderInfo?.deliveryWard}, ${selectedOrderInfo?.deliveryDistrict}, ${selectedOrderInfo?.deliveryProvince}.`}</span>
                </div>
              </div>
            ) : (
              <div>+ Chọn địa chỉ</div>
            )}
          </div>
          <Dialog
            header="Chọn đia chỉ cần gửi đến"
            visible={visible}
            position={"top-right"}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
            footer={footerContent}
            draggable={false}
            resizable={false}
          >
            <table className="table table-cart">
              <thead>
                <tr>
                  <th className="thumbnail-col" style={{ width: "10%" }} />
                  <th className="thumbnail-col" style={{ width: "90%" }} />
                </tr>
              </thead>
              <tbody>
                {orderInfoData.length > 0 &&
                  orderInfoData.map((item) => (
                    <tr className="product-row">
                      <td>
                        <input
                          checked={handleChecked(item.id)}
                          type="checkbox"
                          onChange={() => setSelectedOrderInfo(item)}
                        />
                      </td>
                      <td className="product-col">
                        <div style={{ fontSize: 15, color: "orange" }}>
                          <span style={{ fontWeight: "bold", color: "black" }}>
                            Tên:{" "}
                          </span>
                          {item?.deliveryName}
                          <span style={{ fontWeight: "bold", color: "black" }}>
                            , Sdt:{" "}
                          </span>
                          {item?.deliveryPhone}
                        </div>
                        <div style={{ fontSize: 13, color: "orange" }}>
                          <span style={{ fontWeight: "bold", color: "black" }}>
                            Địa chỉ:{" "}
                          </span>
                          <span>{`${item?.deliveryAddress}, ${item?.deliveryWard}, ${item?.deliveryDistrict}, ${item?.deliveryProvince}.`}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Dialog>
          <h2 className="step-title">Ghi chú</h2>
          <InputTextarea
            style={{ width: "100%" }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={5}
            cols={30}
            placeholder="Nên giao vào buổi trưa, ....."
          />
        </div>
        {/* End .col-lg-8 */}
        <div className="col-lg-6">
          <div className="order-summary">
            <h3>Đơn hàng của bạn</h3>
            <table className="table table-mini-cart">
              <thead>
                <tr>
                  <th colSpan={2}>Sản phẩm</th>
                </tr>
              </thead>
              <tbody>
                {cartsToOrder.length > 0 &&
                  cartsToOrder.map((item) => (
                    <tr>
                      <td className="product-col">
                        <h3 className="product-title">
                          {item.product.name} ×
                          <span className="product-qty">{item.quantity}</span>
                        </h3>
                      </td>
                      <td className="price-col">
                        <span>
                          {(
                            item.product.salePrice * item.quantity
                          ).toLocaleString()}{" "}
                          VND
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="cart-subtotal">
                  <td>
                    <h4>Tổng</h4>
                  </td>
                  <td className="price-col">
                    <span>{total.toLocaleString()} VND</span>
                  </td>
                </tr>
                <tr className="order-shipping">
                  <td className="text-left" colSpan={2}>
                    <h4 className="m-b-sm">Thanh toán</h4>
                    <div className="form-group form-group-custom-control">
                      <div className="custom-control custom-radio d-flex">
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="radio"
                          defaultChecked
                        />
                        <label className="custom-control-label">
                          Thanh toán khi nhận hàng
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .form-group */}
                    <div className="form-group form-group-custom-control mb-0">
                      <div className="custom-control custom-radio d-flex mb-0">
                        <input
                          type="radio"
                          name="radio"
                          className="custom-control-input"
                        />
                        <label className="custom-control-label">
                          Thanh toán trực tuyến
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .form-group */}
                  </td>
                </tr>
                <tr className="order-total">
                  <td>
                    <h4>Giá thanh toán</h4>
                  </td>
                  <td>
                    <b className="total-price">
                      <span>{finalTotal.toLocaleString()} VND</span>
                    </b>
                  </td>
                </tr>
              </tfoot>
            </table>
            <button
              type="submit"
              className="btn btn-dark btn-place-order"
              form="checkout-form"
            >
              Đặt hàng
            </button>
          </div>
          {/* End .cart-summary */}
        </div>
        {/* End .col-lg-4 */}
      </div>
      {/* End .row */}
    </div>
  );
}

export default Order;
