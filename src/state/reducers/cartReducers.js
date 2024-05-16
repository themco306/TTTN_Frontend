import { CartActionTypes } from "../actions/cartActions";


const initialState = {
 carts:[],
 cartsToOrder:[],
 quantity:0
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      const existingCartItemIndex = state.carts.findIndex(item => item.id === action.payload.id);
      if (existingCartItemIndex !== -1) {
        const updatedCarts = state.carts.map((item, index) =>
          index === existingCartItemIndex ? action.payload : item
        );
        // Update the total quantity
        const updatedQuantity = state.carts.reduce((total, item, index) =>
          total + (index === existingCartItemIndex ? action.payload.quantity : item.quantity), 0);

        return {
          ...state,
          carts: updatedCarts,
          quantity: updatedQuantity
        };
      } else {
        return {
          ...state,
          carts: [action.payload, ...state.carts],
          quantity: state.quantity+action.payload.quantity
        };
      }
      case CartActionTypes.SET_INIT:
        const totalQuantity = action.payload.reduce((sum, item) => sum + item.quantity, 0);
        return {
          ...state,
          carts: action.payload,
          quantity: totalQuantity
        };
        case CartActionTypes.REMOVE_FROM_CART:
          const updatedCartsAfterRemoval = state.carts.filter(item => item.id !== action.payload);
          const updatedQuantityAfterRemoval = updatedCartsAfterRemoval.reduce((total, item) => total + item.quantity, 0);
          return {
            ...state,
            carts: updatedCartsAfterRemoval,
            quantity: updatedQuantityAfterRemoval
          };
          case CartActionTypes.CHANGE_QUANTITY:
            const { id, quantity } = action.payload;
            const updatedCarts = state.carts.map(item =>
              item.id === id ? { ...item, quantity: quantity } : item
            );
            const updatedQuantity = updatedCarts.reduce((total, item) => total + item.quantity, 0);
            return {
              ...state,
              carts: updatedCarts,
              quantity: updatedQuantity
            };
          case CartActionTypes.SET_CART_TO_ORDER:
            return {...state,cartsToOrder:action.payload}
          case CartActionTypes.CLEAR_CART:
            return initialState;
    default:
      return state;
  }
};

export default cartReducers;
