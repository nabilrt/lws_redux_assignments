export const CART_ACTION_PROPS = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
  INCREASE_CART_QUANTITY: "INCREASE_CART_QUANTITY",
  DECREASE_CART_QUANTITY: "DECREASE_CART_QUANTITY",
};

const initialState = [];
const itemExist = (state, payload) => state.some((st) => st.id === payload.id);
const nextId = (state) =>
  state.reduce((prevState, currState) => Math.max(currState.id, prevState), 0) +
  1;
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ACTION_PROPS.ADD_TO_CART:
      if (itemExist(state, action.payload)) {
        return state.map((st) =>
          st.id === action.payload.id
            ? { ...st, quantity: st.quantity + 1 }
            : st
        );
      } else {
        return [
          ...state,
          {
            cartId: nextId(state),
            quantity: 1,
            ...action.payload,
          },
        ];
      }

    case CART_ACTION_PROPS.REMOVE_ITEM_FROM_CART:
      return state.filter((st) => st.cartId !== action.payload);
    case CART_ACTION_PROPS.INCREASE_CART_QUANTITY:
      return state.map((st) =>
        st.cartId === action.payload.id
          ? { ...st, quantity: st.quantity + 1 }
          : st
      );
    case CART_ACTION_PROPS.DECREASE_CART_QUANTITY:
      return state.map((st) =>
        st.cartId === action.payload.id
          ? { ...st, quantity: st.quantity - 1 }
          : st
      );
    default:
      return state;
  }
};

export default cartReducer;
