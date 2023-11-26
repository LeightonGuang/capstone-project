import { useEffect, useState } from "react";
import "./ProfilePage.scss";
import scrollToTop from "../../utils/scrollToTop";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState();
  const [failedAuth, setFailedAuth] = useState(false);

  const login = async () => {
    const authToken = sessionStorage.getItem("authToken");

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/auth/profile`,
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
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    scrollToTop();
    login();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!failedAuth) {
    return (
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
  } else if (failedAuth) {
    return (
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
    );
  }
}
