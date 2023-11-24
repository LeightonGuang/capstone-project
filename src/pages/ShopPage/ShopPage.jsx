import { Link, useParams } from "react-router-dom";
import "./ShopPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShopPage() {
  const [shopListing, setShopListing] = useState();
  const { id } = useParams();

  const getShopListing = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop/${id}`
    );
    setShopListing(data);
  };

  useEffect(() => {
    getShopListing();
  }, []);

  if (!shopListing) {
    return <p>loading...</p>;
  }

  return (
    <div className="shop-page">
      <div className="shop-page__container">
        <article className="shop-page__card">
          <img src={shopListing[0].shop_logo_url} alt="shop logo" />
          <h2 className="shop-page__title">{shopListing[0].shop_name}</h2>

          <ul className="shop-page__listing">
            {shopListing.map((product) => {
              return (
                <Link
                  to={`/products/${product.product_id}`}
                  key={product.product_id}
                >
                  <img src={product.product_img_url} alt={product.product_name} />
                  {product.product_name}
                </Link>
              );
            })}
          </ul>
        </article>
      </div>
    </div>
  );
}
