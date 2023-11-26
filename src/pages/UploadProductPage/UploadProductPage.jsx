import "./UploadProductPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import scrollToTop from "../../utils/scrollToTop";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";

export default function UploadProductPage() {
  const [allProducts, setAllProducts] = useState();
  const [allShops, setAllShops] = useState();
  const navigate = useNavigate();

  const handleUpload = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop/listing`,
        {
          product_id: event.target.product.value,
          shop_id: event.target.shop.value,
          currency: event.target.currency.value,
          price: event.target.price.value,
        }
      );

      navigate(`/products/${event.target.product.value}`);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProducts = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product`
    );
    setAllProducts(data);
  };

  const getAllShops = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop`
    );
    setAllShops(data);
  };

  useEffect(() => {
    scrollToTop();
    getAllProducts();
    getAllShops();
  }, []);

  if (!(allProducts && allShops)) {
    return <p>Loading..</p>;
  }

  return (
    <div className="list-product">
      <div className="list-product__container">
        <article className="list-product__card">
          <h2 className="list-product__title">List Product</h2>

          <form className="list-product__form" onSubmit={handleUpload}>
            <label htmlFor="">Select a product</label>
            <select name="product">
              {allProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.product_name}
                </option>
              ))}
            </select>
            <label htmlFor="">Select a shop</label>
            <select name="shop">
              {allShops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.shop_name}
                </option>
              ))}
            </select>
            <Input type="text" name={"currency"} label={"Currency"} />
            <Input type={"number"} name={"price"} label={"Price"} />
            <input type="submit" value={"Upload"} />
          </form>
        </article>
      </div>
    </div>
  );
}
