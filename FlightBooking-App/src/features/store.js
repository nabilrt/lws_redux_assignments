import { createStore } from "redux";
import bookingReducer from "./booking/bookingReducer";

const store = createStore(bookingReducer);

export default store;
