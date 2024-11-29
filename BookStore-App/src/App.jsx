import { useEffect, useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import FilterBar from "./components/FilterBar";
import NavBar from "./components/NavBar";
import { useDispatch } from "react-redux";
import { getBooks } from "./features/book/thunks";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [selectedBook, setSelectedBook] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks);
  }, []);

  return (
    <>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="py-12 2xl:px-6">
        <div className="container grid xl:grid-cols-[auto_350px] 2xl:grid-cols-[auto_400px] gap-4 2xl:gap-8">
          <div className="order-2 xl:-order-1">
            <div className="flex items-center justify-between mb-12">
              <h4 className="mt-2 text-xl font-bold">Book List</h4>
              <FilterBar
                filterOption={filterOption}
                setFilterOption={setFilterOption}
              />
            </div>
            <BookList
              filterOption={filterOption}
              searchTerm={searchTerm}
              setSelectedBook={setSelectedBook}
            />
          </div>
          <div>
            <BookForm
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
