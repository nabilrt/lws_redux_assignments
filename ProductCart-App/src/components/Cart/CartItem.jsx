import { useDispatch } from "react-redux";
import { PRODUCT_ACTION_PROPS } from "../../features/product/productReducer";
import { CART_ACTION_PROPS } from "../../features/cart/cartReducer";

export default function CartItem({ item }) {
  const { cartId, id, name, image, category, price, quantity } = item;

  const dispatch = useDispatch();

  const increaseCartQuantity = () => {
    dispatch({
      type: PRODUCT_ACTION_PROPS.REMOVE_STOCK,
      payload: {
        id,
        quantity: 1,
      },
    });
    dispatch({
      type: CART_ACTION_PROPS.INCREASE_CART_QUANTITY,
      payload: {
        id: cartId,
        quantity: 1,
      },
    });
  };

  const decreaseCartQuantity = () => {
    dispatch({
      type: PRODUCT_ACTION_PROPS.ADD_TO_STOCK,
      payload: {
        id,
        quantity: 1,
      },
    });
    if (quantity === 1) {
      dispatch({
        type: CART_ACTION_PROPS.REMOVE_ITEM_FROM_CART,
        payload: cartId,
      });
    } else {
      dispatch({
        type: CART_ACTION_PROPS.DECREASE_CART_QUANTITY,
        payload: {
          id: cartId,
          quantity: 1,
        },
      });
    }
  };

  const removeItemFromCart = () => {
    dispatch({
      type: PRODUCT_ACTION_PROPS.ADD_TO_STOCK,
      payload: {
        id,
        quantity,
      },
    });

    dispatch({
      type: CART_ACTION_PROPS.REMOVE_ITEM_FROM_CART,
      payload: cartId,
    });
  };

  return (
    <div className="cartCard">
      <div className="flex items-center col-span-6 space-x-6">
        {/* cart image */}
        <img className="lws-cartImage" src={image} alt="product" />
        {/* cart item info */}
        <div className="space-y-2">
          <h4 className="lws-cartName">{name}</h4>
          <p className="lws-cartCategory">{category}</p>
          <p>
            BDT <span className="lws-cartPrice">{price}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
        {/* amount buttons */}
        <div className="flex items-center space-x-4">
          <button
            className="lws-incrementQuantity"
            onClick={increaseCartQuantity}
          >
            <i className="text-lg fa-solid fa-plus" />
          </button>
          <span className="lws-cartQuantity">{quantity}</span>
          <button
            className="lws-decrementQuantity"
            onClick={decreaseCartQuantity}
          >
            <i className="text-lg fa-solid fa-minus" />
          </button>
        </div>
        {/* price */}
        <p className="text-lg font-bold">
          BDT <span className="lws-calculatedPrice">{price * quantity}</span>
        </p>
      </div>
      {/* delete button */}
      <div className="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
        <button className="lws-removeFromCart" onClick={removeItemFromCart}>
          <i className="text-lg text-red-400 fa-solid fa-trash" />
        </button>
      </div>
    </div>
  );
}
