import { useEffect } from "react";
import "./ProfilePage.scss";
import scrollToTop from "../../utils/scrollToTop";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

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
