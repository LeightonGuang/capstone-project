import "./ShopListingCard.scss";
import outlineHeartIcon from "../../assets/icons/heart-outline.svg";
import fillHeartIcon from "../../assets/icons/heart-fill.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ShopListingCard({
  listingId,
  shopId,
  imgURL,
  shopName,
  address,
  currency,
  price,
}) {
  const [savedListing, setSavedListing] = useState();

  const getSaved = async () => {
    const user_id = localStorage.getItem("id");

    if (!user_id) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/favourite/new-user`
        );

        localStorage.setItem("id", data);
      } catch (error) {
        console.error(error);
      }
    }

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/favourite/${user_id}`
    );
    console.log(data);
    const savedArray = data.map((product) => product.listing_id);
    console.log(savedArray);
    setSavedListing(savedArray);
  };

  const handleFavouriteClick = async () => {
    const user_id = localStorage.getItem("id");

    if (!user_id) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/favourite/new-user`
        );

        localStorage.setItem("id", data);
      } catch (error) {
        console.error(error);
      }
    }

    await axios.put(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/favourite`,
      { user_id, listing_id: listingId }
    );

    getSaved();
  };

  useEffect(() => {
    getSaved();
  }, []);

  if (!savedListing) {
    return <p>Loading...</p>;
  }

  return (
    <article className="shop-card">
      <Link to={`/shop/${shopId}`} className="shop-card__link">
        <img
          src={imgURL ? imgURL : "https://placehold.co/500x500"}
          alt="shop logo"
          className="shop-card__logo"
        />
        <div className="shop-card__info-container">
          <h3 className="shop-card__name">{shopName}</h3>
          <span className="shop-card__address">{address}</span>
          <div className="shop-card__price">{currency + " " + price}</div>
        </div>
      </Link>
      <img
        src={
          savedListing.includes(listingId) ? fillHeartIcon : outlineHeartIcon
        }
        alt=""
        onClick={handleFavouriteClick}
        className="shop-card__fav-btn"
      />
    </article>
  );
}
