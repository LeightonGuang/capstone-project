import "./ProductDetailPage.scss";
import ShopListingCard from "../../components/ShopListingCard/ShopListingCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import scrollToTop from "../../utils/scrollToTop";

export default function ProductDetailPage() {
  const [coordinates, setCoordinates] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [listing, setListing] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getProductDetails = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product/${id}`
    );
    console.log(data[0]);
    setProductDetails(data[0]);
  };

  const getListing = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product/${id}/listing`
    );
    setListing(data);
    setLoading(false);

    const addressList = data.map((shop) => shop.address);
    setAddress(addressList);

    console.log("Listing set:", data);
  };

  const getPostcodeCoordinate = async () => {
    if (!listing) {
      console.log("listing is null");
      return;
    }

    const { data } = await axios.post(`https://api.postcodes.io/postcodes`, {
      postcodes: address,
    });
    console.log(data.result);
    const coordinateList = data.result.map((coordinate) => ({
      longitude: coordinate.result.longitude,
      latitude: coordinate.result.latitude,
    }));
    setCoordinates(coordinateList);

    console.log(coordinateList);
  };

  useEffect(() => {
    scrollToTop();
    getProductDetails();
    getListing();
  }, []);

  useEffect(() => {
    if (!loading) {
      getPostcodeCoordinate();
    }
  }, [loading]);

  if (!(productDetails && coordinates)) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-page">
      <div className="product-page__container">
        <section className="product-info">
          <article className="product-info__img-card">
            <img
              src={productDetails.product_img_url}
              alt={productDetails.product_name}
              className="product-info__img"
            />
          </article>

          <article className="product-info__description">
            <div className="product-info__container">
              <h2 className="product-info__name">{productDetails.name}</h2>
              <span>Brand: {productDetails.brand}</span>
              <span>Model: {productDetails.model}</span>
              <span>Category: {productDetails.category}</span>
              <p>description: {productDetails.description}</p>
            </div>
          </article>
        </section>

        <article className="shops-card">
          <h3 className="shops-card__title">Prices</h3>
          <div className="shops-card__list">
            {listing.length === 0 ? (
              <div className="shops-card__no-listing">
                there are no listing at the moment
              </div>
            ) : (
              listing.map((shop) => (
                <ShopListingCard
                  key={shop.shop_id}
                  listingId={shop.listing_id}
                  shopId={shop.shop_id}
                  imgURL={shop.shop_logo_url}
                  shopName={shop.shop_name}
                  address={shop.address}
                  currency={shop.currency}
                  price={shop.price}
                />
              ))
            )}
          </div>
        </article>

        {coordinates.length === 0 ? (
          <div></div>
        ) : (
          <div className="map">
            <article className="map__card">
              <Map
                mapLib={import("mapbox-gl")}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                initialViewState={{
                  longitude: coordinates[0].longitude,
                  latitude: coordinates[0].latitude,
                  zoom: 15,
                }}
                mapStyle="mapbox://styles/leighton-guang/clpb24van006a01o0bvhecb2b"
                className="map"
                width="100%"
                height="25rem"
              >
                {coordinates.map((coordinate, index) => (
                  <Marker
                    key={index}
                    longitude={coordinate.longitude}
                    latitude={coordinate.latitude}
                    color="red"
                  />
                ))}
              </Map>
            </article>
          </div>
        )}
      </div>
    </div>
  );
}
