import Header from "./components/Header";
import BookingTable from "./components/BookingTable";
import BookingForm from "./components/BookingForm";

function App() {
  return (
    <body>
      <Header />
      <section>
        <div className="mt-[160px] mx-4 md:mt-[160px] relative">
          <div className="bg-white rounded-md max-w-6xl w-full mx-auto">
            <BookingForm />
          </div>
        </div>
        <BookingTable />
      </section>
    </body>
  );
}

export default App;
