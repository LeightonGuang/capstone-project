import "./ProductDetailPage.scss";
import ShopListingCard from "../../components/ShopListingCard/ShopListingCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const [coordinates, setCoordinates] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();

  const getPostcodeCoordinate = async () => {
    const { data } = await axios.get(
      `https://api.postcodes.io/postcodes/ha14su`
    );
    setCoordinates({
      longitude: data.result.longitude,
      latitude: data.result.latitude,
    });
  };

  const getProductDetails = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product/${id}`
    );
    console.log(data[0]);
    setProductDetails(data[0]);
  };

  useEffect(() => {
    getProductDetails();
    getPostcodeCoordinate();
  }, []);

  if (!productDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-page">
      <div className="product-page__container">
        <section className="product-info">
          <article className="product-info__img">
            <img
              src={productDetails.img_url}
              alt={productDetails.name}
              className="product-info__img--main"
            />
          </article>

          <article className="product-info__description">
            <div className="product-info__container">
              <h2 className="product-info__name">{productDetails.name}</h2>
              <span>Brand: {productDetails.brand}</span>
              <span>Model: {productDetails.model}</span>
              <p>description: {productDetails.description}</p>
              <span>Category: {productDetails.category}</span>
            </div>
          </article>
        </section>

        <article className="shops-card">
          <h3 className="shops-card__title">Prices</h3>
          <div className="shops-card__list">
            <ShopListingCard className="shops-card__shop" />
            <ShopListingCard />
            <ShopListingCard />
            <ShopListingCard />
          </div>
        </article>

        {/* <iframe
          title="google map"
          width="100%"
          height="400"
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place
          ?key=${"AIzaSyBwkmurehaPP1evvj8i2F67MrPwlDMHrTI"}
          &location=${coordinates.latitude},${coordinates.longitude}`}
          allowFullScreen
        ></iframe> */}
      </div>
    </div>
  );
}

// &q=${"Eiffel,Tower"}`}
// &location=${coordinates.latitude},${coordinates.longitude}
