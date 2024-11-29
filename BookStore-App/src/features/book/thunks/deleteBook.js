import { BOOK_PROPS } from "../bookReducer";

const deleteBook = (id) => async (dispatch) => {
  await fetch(`http://localhost:9000/books/${id}`, {
    method: "DELETE",
  });
  dispatch({
    type: BOOK_PROPS.DELETE_BOOK,
    payload: id,
  });
};

export default deleteBook;
