import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function BillSection() {
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (totalPrice, item) => totalPrice + item.quantity * item.price,
      0
    );
  }, [cartItems]);
  return (
    <div>
      <div className="billDetailsCard">
        <h4 className="mt-2 mb-8 text-xl font-bold text-center">
          Bill Details
        </h4>
        <div className="space-y-4">
          {/* sub total */}
          <div className="flex items-center justify-between">
            <p>Sub Total</p>
            <p>
              BDT <span className="lws-subtotal">{totalPrice}</span>
            </p>
          </div>
          {/* Discount */}
          <div className="flex items-center justify-between">
            <p>Discount</p>
            <p>
              BDT <span className="lws-discount">0</span>
            </p>
          </div>
          {/* VAT */}
          <div className="flex items-center justify-between">
            <p>VAT</p>
            <p>
              BDT <span className="vat">0</span>
            </p>
          </div>
          {/* Total */}
          <div className="flex items-center justify-between pb-4">
            <p className="font-bold">TOTAL</p>
            <p className="font-bold">
              BDT <span className="lws-total">{totalPrice}</span>
            </p>
          </div>
          <button className="placeOrderbtn">place order</button>
        </div>
      </div>
    </div>
  );
}
