

// authActions.js
export const CartActionTypes = {
 ADD_TO_CART : 'ADD_TO_CART',
 SET_INIT:'SET_INIT',
 CHANGE_QUANTITY: "CHANGE_QUANTITY",
  SET_CART_TO_ORDER:"SET_CART_TO_ORDER",
  CLEAR_CART_TO_ORDER:"CLEAR_CART_TO_ORDER",
 REMOVE_FROM_CART: "REMOVE_FROM_CART",
 CLEAR_CART:"CLEAR_CART"
}
export const cartActions = {
  add2Cart: (cart) => ({
    type: CartActionTypes.ADD_TO_CART,
    payload: cart,
  }),
  setInitShow:(data)=>({
    type:CartActionTypes.SET_INIT,
    payload: data
  }),
  removeFromCart: (id) => ({
    type:CartActionTypes.REMOVE_FROM_CART,
    payload: id
  }),
  changeQuantity: (data) => ({
    type:CartActionTypes.CHANGE_QUANTITY,
    payload: data
  }),
  setCartToOrder:(data)=>({
    type:CartActionTypes.SET_CART_TO_ORDER,
    payload:data
  }),
  clearCart:()=>({
    type:CartActionTypes.CLEAR_CART
  }),
  clearCart2Order:()=>({
    type:CartActionTypes.CLEAR_CART_TO_ORDER
  })

};
