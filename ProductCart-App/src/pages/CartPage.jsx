import CartSection from "../components/Cart/CartSection";
import BillSection from "../components/Cart/BillSection";
export default function CartPage() {
  return (
    <div className="container 2xl:px-8 px-2 mx-auto">
      <h2 className="mb-8 text-xl font-bold">Shopping Cart</h2>
      <div className="cartListContainer">
        <CartSection />
        {/* Bill Details */}
        <BillSection />
      </div>
    </div>
  );
}
