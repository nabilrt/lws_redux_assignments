import { useState } from "react";
import { useAddBookMutation } from "../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
export default function CreateBook() {
  const [addBook, { isLoading, isError, error }] = useAddBookMutation();
  let navigate = useNavigate();
  const [bookForm, setBookForm] = useState({
    name: "",
    author: "",
    thumbnail: "",
    price: 0,
    rating: 1,
    featured: false,
  });

  const resetForm = () => {
    setBookForm({
      name: "",
      author: "",
      thumbnail: "",
      price: 0,
      rating: 1,
      featured: false,
    });
  };

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
    addBook(bookForm).then(() => {
      resetForm();
      navigate("/");
    });
  };
  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Add New Book</h4>
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
              Add Book
            </button>
          </form>
          {isError && <div className="text-red-500">{error}</div>}
        </div>
      </div>
    </main>
  );
}
