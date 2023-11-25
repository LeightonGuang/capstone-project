import "./UploadProductPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import scrollToTop from "../../utils/scrollToTop";

export default function UploadProductPage() {
  const [allProducts, setAllProducts] = useState();

  const getAllProducts = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product`
    );
    console.log(data);
    setAllProducts(data);
  };

  useEffect(() => {
    scrollToTop();
    getAllProducts();
  }, []);

  if (!allProducts) {
    return <p>Loading..</p>;
  }

  return (
    <div className="list-product">
      <div className="list-product__container">
        <article className="list-product__card">
          <h2 className="list-product__title">List Product</h2>

          <form className="list-product__form">
            <label htmlFor="">Select a product</label>
            <select name="" id="">
              {allProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.product_name}
                </option>
              ))}
            </select>
            <label htmlFor="">Currency</label>
            <input type="text" />
            <label htmlFor="">Price</label>
            <input type="text" />
          </form>
        </article>
      </div>
    </div>
  );
}
