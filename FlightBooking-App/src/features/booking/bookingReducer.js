export const BOOKING_ACTION_TYPES = {
  ADD_BOOKING: "ADD_BOOKING",
  DELETE_BOOKING: "DELETE_BOOKING",
};

const BOOKING_INITIAL_STATE = [];

const bookingReducer = (state = BOOKING_INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOKING_ACTION_TYPES.ADD_BOOKING:
      if (state.length < 3) {
        return [...state, action.payload];
      } else {
        return null;
      }
    case BOOKING_ACTION_TYPES.DELETE_BOOKING:
      return state.filter((book) => book.id !== action.payload);
    default:
      return state;
  }
};

export default bookingReducer;
