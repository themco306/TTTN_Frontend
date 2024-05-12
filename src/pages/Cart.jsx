import React from 'react'

function Cart() {
  return (
<div className="container">
  <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
    <li className="active">
      <a href="cart.html">Giỏ Hàng</a>
    </li>
    <li>
      <a href="checkout.html">Thanh Toán</a>
    </li>
    <li className="disabled">
      <a href="cart.html">Đơn Thành Công</a>
    </li>
  </ul>

  <div className="row">
  <div className="col-lg-8">
    <div className="cart-table-container">
      <table className="table table-cart">
        <thead>
          <tr>
            <th className="thumbnail-col" />
            <th className="product-col">Tên</th>
            <th className="price-col">Giá</th>
            <th className="qty-col">Số lượng</th>
            <th className="text-right">Tổng</th>
          </tr>
        </thead>
        <tbody>
          <tr className="product-row">
            <td>
              <figure className="product-image-container">
                <a href="product.html" className="product-image">
                  <img src="/assets/images/products/product-4.jpg" alt="product" />
                </a>
                <a href="#" className="btn-remove icon-cancel" title="Remove Product" />
              </figure>
            </td>
            <td className="product-col">
              <h5 className="product-title">
                <a href="product.html">Men Watch</a>
              </h5>
            </td>
            <td>$17.90</td>
            <td>
              <div className="product-single-qty">
                <input className="horizontal-quantity form-control" type="text" />
              </div>{/* End .product-single-qty */}
            </td>
            <td className="text-right"><span className="subtotal-price">$17.90</span></td>
          </tr>
          <tr className="product-row">
            <td>
              <figure className="product-image-container">
                <a href="product.html" className="product-image">
                  <img src="assets/images/products/product-3.jpg" alt="product" />
                </a>
                <a href="#" className="btn-remove icon-cancel" title="Remove Product" />
              </figure>
            </td>
            <td className="product-col">
              <h5 className="product-title">
                <a href="product.html">Men Watch</a>
              </h5>
            </td>
            <td>$17.90</td>
            <td>
              <div className="product-single-qty">
                <input className="horizontal-quantity form-control" type="text" />
              </div>{/* End .product-single-qty */}
            </td>
            <td className="text-right"><span className="subtotal-price">$17.90</span></td>
          </tr>
          <tr className="product-row">
            <td>
              <figure className="product-image-container">
                <a href="product.html" className="product-image">
                  <img src="assets/images/products/product-6.jpg" alt="product" />
                </a>
                <a href="#" className="btn-remove icon-cancel" title="Remove Product" />
              </figure>
            </td>
            <td className="product-col">
              <h5 className="product-title">
                <a href="product.html">Men Black Gentle Belt</a>
              </h5>
            </td>
            <td>$17.90</td>
            <td>
              <div className="product-single-qty">
                <input className="horizontal-quantity form-control" type="text" />
              </div>{/* End .product-single-qty */}
            </td>
            <td className="text-right"><span className="subtotal-price">$17.90</span></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="clearfix">
              <div className="float-left">
                <div className="cart-discount">
                  <form action="#">
                    <div className="input-group">
                      <input type="text" className="form-control form-control-sm" placeholder="Coupon Code" required />
                      <div className="input-group-append">
                        <button className="btn btn-sm" type="submit">
                          Thêm Mã</button>
                      </div>
                    </div>{/* End .input-group */}
                  </form>
                </div>
              </div>{/* End .float-left */}
              <div className="float-right">
                <button type="submit" className="btn btn-shop btn-update-cart">
                  Cập Nhật
                </button>
              </div>{/* End .float-right */}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>{/* End .cart-table-container */}
  </div>{/* End .col-lg-8 */}
  <div className="col-lg-4">
    <div className="cart-summary">
      <h3>Tổng Giỏ Hàng</h3>
      <table className="table table-totals">
    <tbody>
        <tr>
            <td>Tổng phụ</td>
            <td>$17.90</td>
        </tr>
        <tr>
            <td colSpan={2} className="text-left">
                <h4>Vận chuyển</h4>
                <div className="form-group form-group-custom-control">
                    <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" name="radio" defaultChecked />
                        <label className="custom-control-label">Tự đến nhận</label>
                    </div>{/* End .custom-checkbox */}
                </div>{/* End .form-group */}
                <div className="form-group form-group-custom-control mb-0">
                    <div className="custom-control custom-radio mb-0">
                        <input type="radio" name="radio" className="custom-control-input" />
                        <label className="custom-control-label">Phí cố định</label>
                    </div>{/* End .custom-checkbox */}
                </div>{/* End .form-group */}
                <form action="#">
                    <div className="form-group form-group-sm">
                        <label>Vận chuyển tới <strong>NY.</strong></label>
                        <div className="select-custom">
                            <select className="form-control form-control-sm">
                                <option value="USA">Hoa Kỳ (US)</option>
                                <option value="Turkey">Thổ Nhĩ Kỳ</option>
                                <option value="China">Trung Quốc</option>
                                <option value="Germany">Đức</option>
                            </select>
                        </div>{/* End .select-custom */}
                    </div>{/* End .form-group */}
                    <div className="form-group form-group-sm">
                        <div className="select-custom">
                            <select className="form-control form-control-sm">
                                <option value="NY">New York</option>
                                <option value="CA">California</option>
                                <option value="TX">Texas</option>
                            </select>
                        </div>{/* End .select-custom */}
                    </div>{/* End .form-group */}
                    <div className="form-group form-group-sm">
                        <input type="text" className="form-control form-control-sm" placeholder="Thị trấn / Thành phố" />
                    </div>{/* End .form-group */}
                    <div className="form-group form-group-sm">
                        <input type="text" className="form-control form-control-sm" placeholder="ZIP" />
                    </div>{/* End .form-group */}
                    <button type="submit" className="btn btn-shop btn-update-total">
                        Cập nhật Tổng
                    </button>
                </form>
            </td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Tổng cộng</td>
            <td>$17.90</td>
        </tr>
    </tfoot>
</table>

      <div className="checkout-methods">
        <a href="cart.html" className="btn btn-block btn-dark">Thanh Toán
          <i className="fa fa-arrow-right" /></a>
      </div>
    </div>{/* End .cart-summary */}
  </div>{/* End .col-lg-4 */}
</div>{/* End .row */}

</div>

  )
}

export default Cart
