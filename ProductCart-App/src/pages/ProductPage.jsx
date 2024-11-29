import ProductForm from "../components/Product/ProductForm";
import ProductList from "../components/Product/ProductList";

export default function ProductPage() {
  return (
    <div className="productWrapper">
      <ProductList />

      <div>
        <ProductForm />
      </div>
    </div>
  );
}
