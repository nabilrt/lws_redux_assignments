import CartItem from "./CartItem";
import { useSelector } from "react-redux";
export default function CartSection() {
  const cartItems = useSelector((state) => state.cart);
  return (
    <div className="space-y-6">
      {cartItems.length === 0 && "Cart is Empty. Please add something!"}
      {cartItems?.map((item) => {
        return <CartItem key={item.cartId} item={item} />;
      })}
    </div>
  );
}
