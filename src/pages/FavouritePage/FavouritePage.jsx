import "./FavouritePage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import selectedHeartIcon from "../../assets/icons/heart-fill.svg";
import scrollToTop from "../../utils/scrollToTop";

export default function FavouritePage() {
  const [favouriteList, setFavouriteList] = useState();
  const id = localStorage.getItem("id");

  const getFavourite = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/favourite/${id}`
    );
    console.log(data);
    setFavouriteList(data);
  };

  const handleUnsaveClick = async (savedId) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/favourite/delete/${savedId}`
    );
    getFavourite();
  };

  useEffect(() => {
    scrollToTop();
    getFavourite();
  }, []);

  if (!favouriteList) {
    return <p>Loading...</p>;
  }

  return (
    <div className="favourite">
      <div className="favourite__container">
        <article className="favourite__card">
          <ul className="favourite__list">
            {favouriteList.map((listing, index) => {
              return (
                <li key={listing.saved_id} className="favourite-card">
                  <Link
                    to={`/products/${listing.product_id}`}
                    className="favourite-card__link"
                  >
                    <img
                      src={listing.product_img_url}
                      alt={listing.product_name}
                      className="favourite-card__img"
                    />
                    <div className="favourite-card__infos">
                      <p className="favourite-card__name">
                        {listing.product_name}
                      </p>
                      <span>{`${listing.currency} ${listing.price}`}</span>
                    </div>
                  </Link>

                  <img
                    src={selectedHeartIcon}
                    alt="save icon"
                    onClick={() => {
                      handleUnsaveClick(listing.saved_id);
                    }}
                    className="favourite-card__heart-icon"
                  />
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </div>
  );
}
