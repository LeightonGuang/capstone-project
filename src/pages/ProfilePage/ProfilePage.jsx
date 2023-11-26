import { useEffect, useState } from "react";
import "./ProfilePage.scss";
import scrollToTop from "../../utils/scrollToTop";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);

  const login = async () => {
    const authToken = sessionStorage.getItem("authToken");
    console.log(authToken);

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setFailedAuth(false);
    } catch (error) {
      setFailedAuth(true);
    }
    setIsLoading(false);
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
            <h2 className="profile__title">Profile</h2>
            <div className="profile__btn-container">
              <Link to={"/uploadProduct"} className="profile__setting-card">
                Upload a product listing
              </Link>
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
              <Link to={"/signup"} className="profile__setting-card">
                Register as a business
              </Link>

              <Link to={"/login"} className="profile__setting-card">
                Log In
              </Link>
            </div>
          </article>
        </div>
      </div>
    );
  }
}
