export const PRODUCT_ACTION_PROPS = {
  ADD_PRODUCT: "ADD_PRODUCT",
  REMOVE_STOCK: "REMOVE_STOCK",
  ADD_TO_STOCK: "ADD_TO_STOCK",
};

const initialState = [];
const nextId = (state) =>
  state.reduce((prevState, currState) => Math.max(currState.id, prevState), 0) +
  1;

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ACTION_PROPS.ADD_PRODUCT:
      console.log([
        ...state,
        {
          ...action.payload,
          id: nextId(state),
        },
      ]);
      return [
        ...state,
        {
          ...action.payload,
          id: nextId(state),
        },
      ];
    case PRODUCT_ACTION_PROPS.ADD_TO_STOCK:
      return state.map((st) =>
        st.id === action.payload.id
          ? { ...st, stock: st.stock + action.payload.quantity }
          : st
      );
    case PRODUCT_ACTION_PROPS.REMOVE_STOCK:
      return state.map((st) =>
        st.id === action.payload.id
          ? { ...st, stock: st.stock - action.payload.quantity }
          : st
      );
    default:
      return state;
  }
};

export default productReducer;
