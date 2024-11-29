import cartReducer from "./cart/cartReducer";
import productReducer from "./product/productReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
