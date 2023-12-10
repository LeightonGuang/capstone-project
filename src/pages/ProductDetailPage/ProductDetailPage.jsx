import "./ProductDetailPage.scss";
import ShopListingCard from "../../components/ShopListingCard/ShopListingCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl";
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
  };

  const getPostcodeCoordinate = async () => {
    if (!listing) {
      return;
    }

    const { data } = await axios.post(`https://api.postcodes.io/postcodes`, {
      postcodes: address,
    });
    const coordinateList = data.result.map((coordinate) => ({
      longitude: coordinate.result.longitude,
      latitude: coordinate.result.latitude,
    }));
    setCoordinates(coordinateList);
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
        <div className="product-info">
          <article className="product-info__card">
            <div className="product-info__card-container">
              <h2 className="product-info__name">
                {productDetails.product_name}
              </h2>
              <div className="product-info__img-container">
                <img
                  src={productDetails.product_img_url}
                  alt={productDetails.product_name}
                  className="product-info__img"
                />
                <div className="product-info__infos">
                  <span>Brand: {productDetails.brand}</span>
                  <span>Model: {productDetails.model}</span>
                  <span>Category: {productDetails.category}</span>
                </div>
              </div>
              <div className="product-info__divider" />
              <p className="product-info__description">
                description: {productDetails.description}
              </p>
            </div>
          </article>
        </div>

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
                  key={shop.listing_id}
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
                  <div key={listing[index].listing_id}>
                    <Marker
                      longitude={coordinate.longitude}
                      latitude={coordinate.latitude}
                      color="red"
                    />
                    <Popup
                      longitude={coordinate.longitude}
                      latitude={coordinate.latitude}
                    >
                      {
                        <div className="popup">
                          <img
                            src={listing[index].shop_logo_url}
                            alt=""
                            className="popup__shop-logo"
                          />
                          {listing[index].shop_name}
                        </div>
                      }
                    </Popup>
                  </div>
                ))}
              </Map>
            </article>
          </div>
        )}
      </div>
    </div>
  );
}
