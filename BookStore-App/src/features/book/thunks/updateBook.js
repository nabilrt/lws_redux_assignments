import { BOOK_PROPS } from "../bookReducer";

const updateBook = (id, data) => async (dispatch) => {
  const response = await fetch(`http://localhost:9000/books/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const updatedBook = await response.json();

  dispatch({
    type: BOOK_PROPS.UPDATE_BOOK,
    payload: updatedBook,
  });
};

export default updateBook;
