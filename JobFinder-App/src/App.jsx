import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./features/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/job/add" element={<CreateJob />} />
            <Route path="/job/:id" element={<EditJob />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
