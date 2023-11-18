import "./ProductPage.scss";
import ShopListingCard from "../../components/ShopListingCard/ShopListingCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductPage() {
  const GOOGLE_MAP_API_KEY = "AIzaSyBwkmurehaPP1evvj8i2F67MrPwlDMHrTI";

  const [coordinates, setCoordinates] = useState({});

  const getPostcodeCoordinate = async () => {
    const { data } = await axios.get(
      `https://api.postcodes.io/postcodes/ha14su`
    );
    setCoordinates({
      longitude: data.result.longitude,
      latitude: data.result.latitude,
    });
  };

  useEffect(() => {
    getPostcodeCoordinate();
  }, []);

  return (
    <div className="product-page">
      <div className="product-page__container">
        <section className="product-info">
          <article className="product-info__img">
            <img
              src="https://placehold.co/500x500"
              alt="placeholder img"
              className="product-info__img--main"
            />
            <div className="product-info__img-list">
              <img
                src="https://placehold.co/500x500"
                alt=""
                className="product-info__img--select"
              />
              <img
                src="https://placehold.co/500x500"
                alt=""
                className="product-info__img--select"
              />
              <img
                src="https://placehold.co/500x500"
                alt=""
                className="product-info__img--select"
              />
            </div>
          </article>

          <article className="product-info__description">
            <div className="product-info__container">
              <h2 className="product-info__name">Intel I9 14900k</h2>
              <span>Intel</span>
              <p>release date</p>
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

        <iframe
          title="google map"
          width="100%"
          height="400"
          frameborder="0"
          referrerpolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place
          ?key=${"AIzaSyBwkmurehaPP1evvj8i2F67MrPwlDMHrTI"}
          &location=${coordinates.latitude},${coordinates.longitude}`}
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

// &q=${"Eiffel,Tower"}`}
// &location=${coordinates.latitude},${coordinates.longitude}
