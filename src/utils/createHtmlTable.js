// tableUtils.js

// Hàm nhận dữ liệu đơn hàng và trả về một chuỗi HTML của bảng
export const createHtmlTable = (orderData) => {
  let tableHtml = `<table border="1">
    <thead>
      <tr>
        <th>STT</th>
        <th>Mã sản phẩm</th>
        <th>Tên sản phẩm</th>
        <th>Số lượng</th>
        <th>Đơn giá</th>
        <th>Thành tiền</th>
      </tr>
    </thead>
    <tbody>`;
  
  orderData.orderDetails.forEach((detail, index) => {
    tableHtml += `<tr>
      <td>${index + 1}</td>
      <td>${detail.product.id}</td>
      <td>${detail.product.name}</td>
      <td>${detail.quantity}</td>
      <td>${detail.price.toFixed(2)}</td>
      <td>${detail.totalPrice.toFixed(2)}</td>
    </tr>`;
  });

  tableHtml += `</tbody>
    <tfoot>
      <tr>
        <td colspan="4">Tổng tiền:</td>
        <td colspan="2">${orderData.total.toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="4">Ghi chú:</td>
        <td colspan="2">${orderData.note}</td>
      </tr>
      <tr>
        <td colspan="4">Phương thức thanh toán:</td>
        <td colspan="2">${orderData.paymentType}</td>
      </tr>
      <tr>
        <td colspan="4">Địa chỉ giao hàng:</td>
        <td colspan="2">${orderData.orderInfo.deliveryAddress}, ${orderData.orderInfo.deliveryWard}, ${orderData.orderInfo.deliveryDistrict}, ${orderData.orderInfo.deliveryProvince}</td>
      </tr>
    </tfoot>
  </table>`;
  
  return tableHtml;
};
