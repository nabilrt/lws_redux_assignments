import { useDispatch } from "react-redux";
import { PRODUCT_ACTION_PROPS } from "../../features/product/productReducer";
import { CART_ACTION_PROPS } from "../../features/cart/cartReducer";

export default function ProductCard({ product }) {
  const { id, name, image, category, price, stock } = product;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch({
      type: PRODUCT_ACTION_PROPS.REMOVE_STOCK,
      payload: {
        id,
        quantity: 1,
      },
    });
    dispatch({
      type: CART_ACTION_PROPS.ADD_TO_CART,
      payload: product,
    });
  };
  return (
    <div className="lws-productCard">
      <img className="lws-productImage" src={image} alt="product" />
      <div className="p-4 space-y-2">
        <h4 className="lws-productName">{name}</h4>
        <p className="lws-productCategory">{category}</p>
        <div className="flex items-center justify-between pb-2">
          <p className="productPrice">
            BDT <span className="lws-price">{price}</span>
          </p>
          <p className="productQuantity">
            QTY <span className="lws-quantity">{stock}</span>
          </p>
        </div>
        <button
          className="lws-btnAddToCart"
          onClick={handleAddToCart}
          disabled={stock === 0}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
