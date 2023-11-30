import { Link, useParams } from "react-router-dom";
import "./ShopPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import scrollToTop from "../../utils/scrollToTop";

export default function ShopPage() {
  const [shopListing, setShopListing] = useState();
  const { id } = useParams();

  const getShopListing = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop/${id}`
      );
      setShopListing(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    scrollToTop();
    getShopListing();
  }, []);

  if (!shopListing) {
    return <p>loading...</p>;
  }

  return (
    <div className="shop-page">
      <div className="shop-page__container">
        <article className="shop-page__card">
          <div className="shop-page__shop-info-container">
            <img
              src={shopListing[0].shop_logo_url}
              alt="shop logo"
              className="shop-page__shop-logo"
            />
            <h2 className="shop-page__title">{shopListing[0].shop_name}</h2>
          </div>

          <ul className="shop-page__list">
            {shopListing.map((product) => {
              return (
                <Link
                  to={`/products/${product.product_id}`}
                  key={product.listing_id}
                  className="shop-page__shop-card"
                >
                  <img
                    src={product.product_img_url}
                    alt={product.product_name}
                    className="shop-page__shop-product-img"
                  />
                  <p className="shop-page__shop-product-title">
                    {product.product_name}
                  </p>
                </Link>
              );
            })}
          </ul>
        </article>
      </div>
    </div>
  );
}
