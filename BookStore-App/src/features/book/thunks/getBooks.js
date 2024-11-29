import { BOOK_PROPS } from "../bookReducer";

const getBooks = async (dispatch) => {
  const response = await fetch("http://localhost:9000/books");
  const books = await response.json();

  dispatch({
    type: BOOK_PROPS.LOAD_BOOKS,
    payload: books,
  });
};

export default getBooks;
