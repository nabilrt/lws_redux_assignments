import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const products = useSelector((state) => state.product);
  console.log(products);
  return (
    <div className="productContainer" id="lws-productContainer">
      {products.length === 0 && "No Products Found. Add Some!"}
      {products?.map((pr) => {
        return <ProductCard product={pr} key={pr.id} />;
      })}
    </div>
  );
}
