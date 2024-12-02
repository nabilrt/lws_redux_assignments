import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import { Provider } from "react-redux";
import store from "./features/store";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/add" element={<CreateBook />} />
          <Route path="/book/:id" element={<EditBook />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
