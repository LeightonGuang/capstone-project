import "./ManageListingPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import scrollToTop from "../../utils/scrollToTop";
import deleteIcon from "../../assets/icons/delete-outline.svg";
import { Link } from "react-router-dom";

export default function ManageListingPage() {
  const authToken = sessionStorage.getItem("authToken");
  const [failedAuth, setFailedAuth] = useState(true);
  const [profile, setProfile] = useState(null);
  const [listing, setListing] = useState();

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      getListing();
    } catch (error) {
      console.error(error);
    }
  };

  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop/profile`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setProfile(data);
      setFailedAuth(false);
    } catch (error) {
      setFailedAuth(true);
      console.error(error);
    }
  };

  const getListing = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop/${profile.id}/listing`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setListing(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    scrollToTop();
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      getListing();
    }
  }, [profile]);

  if (!listing) return <p>Loading...</p>;

  return failedAuth ? (
    <div className="manage-listing">
      <div className="manage-listing__card">
        <h2 className="manage-listing__title">YOU DON'T HAVE ACCESS</h2>
      </div>
    </div>
  ) : (
    <div className="manage-listing">
      <div className="manage-listing__card">
        <h2 className="manage-listing__title">Manage Listing</h2>
        <ul className="manage-listing__list">
          {listing.map((product) => (
            <li
              key={product.listing_id}
              className="manage-listing__product-card"
            >
              <Link
                to={`/products/${product.product_id}`}
                className="manage-listing__link"
              >
                <img
                  src={product.product_img_url}
                  alt={product.product_name}
                  className="manage-listing__product-image"
                />
                <p className="manage-listing__product-name">
                  {product.product_name}
                </p>
              </Link>

              <img
                src={deleteIcon}
                alt="delete listing"
                onClick={() => {
                  handleDelete(product.listing_id);
                }}
                className="manage-listing__delete"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
