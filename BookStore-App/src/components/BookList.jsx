import { useSelector } from "react-redux";
import BookCard from "./BookCard";

export default function BookList({
  filterOption,
  searchTerm,
  setSelectedBook,
}) {
  const books = useSelector((state) => state);

  const filterSearchTerm = (item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase());
  const filterFeatured = (item) =>
    filterOption === "featured" ? item.featured : true;

  return (
    <div className="lws-bookContainer">
      {books.length === 0 && "No Books Found. Add Some!"}
      {books
        ?.filter(filterSearchTerm)
        .filter(filterFeatured)
        .map((bk) => {
          return (
            <BookCard bk={bk} key={bk.id} setSelectedBook={setSelectedBook} />
          );
        })}
    </div>
  );
}
