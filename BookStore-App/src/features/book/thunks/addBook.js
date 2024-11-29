import { BOOK_PROPS } from "../bookReducer";

const addBook = (data) => async (dispatch) => {
  const response = await fetch(`http://localhost:9000/books`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const book = await response.json();

  dispatch({
    type: BOOK_PROPS.ADD_BOOKS,
    payload: book,
  });
};

export default addBook;
