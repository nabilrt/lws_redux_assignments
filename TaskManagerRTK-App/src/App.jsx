import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import { store } from "./features/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="text-[#111827]">
      <BrowserRouter>
        <Provider store={store}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/task/add" element={<AddTask />} />
            <Route path="/task/:id" element={<EditTask />} />
          </Routes>
        </Provider>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
