import "./ProfilePage.scss";
import axios from "axios";
import scrollToTop from "../../utils/scrollToTop";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState();
  const [failedAuth, setFailedAuth] = useState(true);

  const login = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");

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
    setIsLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
    setFailedAuth(true);
  };

  useEffect(() => {
    scrollToTop();
    login();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return failedAuth ? (
    <div className="profile">
      <div className="profile__container">
        <article className="profile__card">
          <h2 className="profile__title">Profile</h2>
          <div className="profile__btn-container">
            <Link to={"/signup"} className="profile__setting-btn">
              Register as a business
            </Link>

            <Link to={"/login"} className="profile__setting-btn">
              Log In
            </Link>
          </div>
        </article>
      </div>
    </div>
  ) : (
    <div className="profile">
      <div className="profile__container">
        <article className="profile__card">
          <h2 className="profile__title">{profile.shop_name}</h2>
          <div className="profile__btn-container">
            <Link to={"/uploadProduct"} className="profile__setting-btn">
              Upload a product listing
            </Link>

            <Link to={"/manage-listing"} className="profile__setting-btn">
              Manage Listing
            </Link>

            <p onClick={handleLogout} className="profile__setting-btn">
              Log Out
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
