import { useState } from "react";
import { useDispatch } from "react-redux";
import { PRODUCT_ACTION_PROPS } from "../../features/product/productReducer";

export default function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    image: "",
    price: 0,
    stock: 0,
  });

  const dispatch = useDispatch();

  const resetForm = () => {
    setProduct({
      name: "",
      category: "",
      image: "",
      price: 0,
      stock: 0,
    });
  };

  const handleFormDataChange = (e) => {
    setProduct({
      ...product,

      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !Object.entries(product).every(
        ([key, value]) => value !== null && value !== undefined && value !== ""
      )
    ) {
      return;
    }
    dispatch({
      type: PRODUCT_ACTION_PROPS.ADD_PRODUCT,
      payload: {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      },
    });
    resetForm();
  };
  return (
    <div className="formContainer">
      <h4 className="formTitle">Add New Product</h4>
      <form
        className="space-y-4 text-[#534F4F]"
        id="lws-addProductForm"
        onSubmit={handleFormSubmit}
      >
        {/* product name */}
        <div className="space-y-2">
          <label htmlFor="lws-inputName">Product Name</label>
          <input
            className="addProductInput"
            id="lws-inputName"
            name="name"
            type="text"
            required=""
            value={product.name}
            onChange={handleFormDataChange}
          />
        </div>
        {/* product category */}
        <div className="space-y-2">
          <label htmlFor="lws-inputCategory">Category</label>
          <input
            className="addProductInput"
            id="lws-inputCategory"
            type="text"
            name="category"
            required=""
            value={product.category}
            onChange={handleFormDataChange}
          />
        </div>
        {/* product image url */}
        <div className="space-y-2">
          <label htmlFor="lws-inputImage">Image Url</label>
          <input
            className="addProductInput"
            id="lws-inputImage"
            type="text"
            name="image"
            required=""
            value={product.image}
            onChange={handleFormDataChange}
          />
        </div>
        {/* price & quantity container */}
        <div className="grid grid-cols-2 gap-8 pb-4">
          {/* price */}
          <div className="space-y-2">
            <label htmlFor="ws-inputPrice">Price</label>
            <input
              className="addProductInput"
              type="number"
              name="price"
              id="lws-inputPrice"
              required=""
              value={product.price}
              onChange={handleFormDataChange}
            />
          </div>
          {/* quantity */}
          <div className="space-y-2">
            <label htmlFor="lws-inputQuantity">Quantity</label>
            <input
              className="addProductInput"
              type="number"
              name="stock"
              id="lws-inputQuantity"
              required=""
              value={product.stock}
              onChange={handleFormDataChange}
            />
          </div>
        </div>
        {/* submit button */}
        <button type="submit" id="lws-inputSubmit" className="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
