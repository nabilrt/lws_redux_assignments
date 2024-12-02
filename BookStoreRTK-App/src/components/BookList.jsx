import { useGetAllBooksQuery } from "../features/api/apiSlice";
import BookCard from "./BookCard";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

export default function BookList() {
  const { data: books, isError, isLoading, error } = useGetAllBooksQuery();
  const { filterType, searchKey } = useSelector((state) => state.filter);

  const filterSearchTerm = (item) =>
    item.name.toLowerCase().includes(searchKey.toLowerCase());
  const filterFeatured = (item) =>
    filterType === "featured" ? item.featured : true;

  let render = null;

  if (isLoading) {
    render = <Loader />;
  }
  if (!isLoading && isError) {
    render = <div className="text-red-500">{error}</div>;
  }
  if (!isLoading && !isError && books.length === 0) {
    render = <div className="text-blue-500">No Books Found!. Add Some</div>;
  }
  if (!isLoading && !isError && books.length > 0) {
    render = books
      .filter(filterSearchTerm)
      .filter(filterFeatured)
      .map((book) => <BookCard bk={book} key={book.id} />);
  }

  return (
    <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
      {render}
    </div>
  );
}
