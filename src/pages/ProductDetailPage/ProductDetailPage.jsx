import "./ProductDetailPage.scss";
import ShopListingCard from "../../components/ShopListingCard/ShopListingCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl";

export default function ProductDetailPage() {
  const [coordinates, setCoordinates] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();

  const getPostcodeCoordinate = async () => {
    const { data } = await axios.get(
      `https://api.postcodes.io/postcodes/EC2A3QA`
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

  const getListingList = async () => {
    const { data } = await axios.get();
  };

  useEffect(() => {
    getProductDetails();
    getPostcodeCoordinate();
  }, []);

  if (!productDetails || !coordinates) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-page">
      <div className="product-page__container">
        <section className="product-info">
          <article className="product-info__img-card">
            <img
              src={productDetails.img_url}
              alt={productDetails.name}
              className="product-info__img"
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

        <div className="map">
          <article className="map__card">
            <Map
              mapLib={import("mapbox-gl")}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              initialViewState={{
                longitude: coordinates.longitude,
                latitude: coordinates.latitude,
                zoom: 15,
              }}
              mapStyle="mapbox://styles/leighton-guang/clpb24van006a01o0bvhecb2b"
              className="map"
              width="100%"
              height="25rem"
            >
              <Marker
                longitude={coordinates.longitude}
                latitude={coordinates.latitude}
                anchor="bottom"
                color="red"
              ></Marker>
              {/* <Popup
                longitude={coordinates.longitude}
                latitude={coordinates.latitude}
              >
                You are here
              </Popup> */}
            </Map>
          </article>
        </div>
      </div>
    </div>
  );
}
