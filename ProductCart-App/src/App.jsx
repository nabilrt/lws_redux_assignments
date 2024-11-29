import { useState } from "react";
import NavBar from "./components/NavBar";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";

function App() {
  const [isProductPage, setIsProductPage] = useState(true);

  return (
    <>
      <>
        <NavBar setIsProductPage={setIsProductPage} />
        <main className="py-16">
          {isProductPage ? <ProductPage /> : <CartPage />}
        </main>
      </>
    </>
  );
}

export default App;
