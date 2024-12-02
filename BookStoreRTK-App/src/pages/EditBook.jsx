import { useParams } from "react-router-dom";
import EditForm from "../components/EditForm";
import { useGetBookQuery } from "../features/api/apiSlice";
import Loader from "../components/Loader";
export default function EditBook() {
  const { id } = useParams();
  const { data: book, isLoading, isError, error } = useGetBookQuery(id);

  let render = null;

  if (isLoading) {
    render = <Loader />;
  }
  if (!isLoading && isError) {
    render = <div className="text-red-500">{error}</div>;
  }
  if (!isLoading && !isError && book?.name === "") {
    render = <div className="text-blue-500">No Book Found!</div>;
  }
  if (!isLoading && !isError && book.name !== "") {
    render = <EditForm book={book} id={id} />;
  }
  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
          {render}
        </div>
      </div>
    </main>
  );
}
