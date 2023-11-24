import "./ShopListingCard.scss";
import heartIcon from "../../assets/icons/heart-outline.svg";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ShopListingCard({
  shopId,
  imgURL,
  shopName,
  address,
  currency,
  price,
}) {
  const handleFavouriteClick = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/favourite/new-user`
        );

        const user = { id: data };
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <article className="shop-card">
      <Link to={`/shop/${shopId}`}>
        <img src={imgURL} alt="shop logo" className="shop-card__logo" />
        <div>
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
