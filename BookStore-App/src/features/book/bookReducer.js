export const BOOK_PROPS = {
  LOAD_BOOKS: "LOAD_BOOKS",
  ADD_BOOKS: "ADD_BOOKS",
  UPDATE_BOOK: "UPDATE_BOOK",
  DELETE_BOOK: "DELETE_BOOK",
};

const initialState = [];
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_BOOKS":
      return action.payload;
    case "ADD_BOOKS":
      return [
        ...state,
        {
          ...action.payload,
        },
      ];
    case "UPDATE_BOOK":
      return state.map((st) =>
        st.id === action.payload.id ? { ...action.payload } : st
      );
    case "DELETE_BOOK":
      return state.filter((st) => st.id !== action.payload);
    default:
      return state;
  }
};

export default bookReducer;
