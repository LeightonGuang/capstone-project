import "./ShopListingCard.scss";
import heartIcon from "../../assets/icons/heart-outline.svg";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ShopListingCard({
  listingId,
  shopId,
  imgURL,
  shopName,
  address,
  currency,
  price,
}) {
  const handleFavouriteClick = async () => {
    let user_id = localStorage.getItem("id");

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
  };

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
        src={heartIcon}
        alt=""
        onClick={handleFavouriteClick}
        className="shop-card__fav-btn"
      />
    </article>
  );
}
