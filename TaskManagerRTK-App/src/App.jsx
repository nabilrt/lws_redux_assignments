import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import { store } from "./features/store";
function App() {
  return (
    <body className="text-[#111827]">
      <BrowserRouter>
        <Provider store={store}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/task/add" element={<AddTask />} />
            <Route path="/task/:id" element={<EditTask />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </body>
  );
}

export default App;
