import { useNavigate } from "react-router-dom";
import { useUpdateBookMutation } from "../features/api/apiSlice";
import { useState } from "react";
export default function EditForm({ id, book }) {
  const [editBook, { isError, isLoading, error }] = useUpdateBookMutation();
  const [bookForm, setBookForm] = useState(book);
  let navigate = useNavigate();

  const handleInputs = (e) => {
    if (e.target.name === "featured") {
      setBookForm({
        ...bookForm,
        [e.target.name]: e.target.checked,
      });
      return;
    }
    setBookForm({
      ...bookForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editBook({ id, data: bookForm }).then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="name">Book Name</label>
          <input
            required=""
            className="text-input"
            type="text"
            id="input-Bookname"
            name="name"
            value={bookForm.name}
            onChange={handleInputs}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="category">Author</label>
          <input
            required=""
            className="text-input"
            type="text"
            id="input-Bookauthor"
            name="author"
            value={bookForm.author}
            onChange={handleInputs}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="image">Image Url</label>
          <input
            required=""
            className="text-input"
            type="text"
            id="input-Bookthumbnail"
            name="thumbnail"
            value={bookForm.thumbnail}
            onChange={handleInputs}
          />
        </div>
        <div className="grid grid-cols-2 gap-8 pb-4">
          <div className="space-y-2">
            <label htmlFor="price">Price</label>
            <input
              required=""
              className="text-input"
              type="number"
              id="input-Bookprice"
              name="price"
              value={bookForm.price}
              onChange={handleInputs}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="quantity">Rating</label>
            <input
              required=""
              className="text-input"
              type="number"
              id="input-Bookrating"
              name="rating"
              value={bookForm.rating}
              onChange={handleInputs}
              min={1}
              max={5}
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="input-Bookfeatured"
            type="checkbox"
            name="featured"
            onChange={handleInputs}
            className="w-4 h-4"
            checked={bookForm.featured}
          />
          <label htmlFor="featured" className="ml-2 text-sm">
            {" "}
            This is a featured book{" "}
          </label>
        </div>
        <button
          type="submit"
          className="submit"
          id="submit"
          disabled={isLoading}
        >
          Edit Book
        </button>
      </form>
      {isError && <div className="text-red-500">{error}</div>}
    </>
  );
}
