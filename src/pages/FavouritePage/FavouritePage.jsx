import "./FavouritePage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FavouritePage() {
  const [favouriteList, setFavouriteList] = useState();
  const id = localStorage.getItem("id");

  const getFavourite = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/favourite/${id}`
    );
    setFavouriteList(data);
    console.log(data);
  };
  useEffect(() => {
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
                <Link
                  to={`/products/${listing.product_id}`}
                  key={index}
                  className="favourite-card"
                >
                  <img
                    src={listing.product_img_url}
                    alt={listing.product_name}
                    className="favourite-card__img"
                  />
                  <div className="favourite-card__infos">
                    <p>{listing.product_name}</p>
                    <span>{`${listing.currency} ${listing.price}`}</span>
                  </div>
                </Link>
              );
            })}
          </ul>
        </article>
      </div>
    </div>
  );
}
