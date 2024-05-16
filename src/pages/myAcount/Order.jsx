import React from 'react'

function Order() {
  return (
    <div className="order-content">
    <h3 className="account-sub-title d-none d-md-block"><i className="sicon-social-dropbox align-middle mr-3" />Orders</h3>
    <div className="order-table-container text-center">
      <table className="table table-order text-left">
        <thead>
          <tr>
            <th className="order-id">ORDER</th>
            <th className="order-date">DATE</th>
            <th className="order-status">STATUS</th>
            <th className="order-price">TOTAL</th>
            <th className="order-action">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center p-0" colSpan={5}>
              <p className="mb-5 mt-5">
                No Order has been made yet.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <hr className="mt-0 mb-3 pb-2" />
      <a href="category.html" className="btn btn-dark">Go Shop</a>
    </div>
  </div>
  )
}

export default Order
