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
          <div className="profile__">
            <div className="profile__signup-card">
              <Link to={"/signup"}>Sign Up</Link>
            </div>
            <div className="profile__login-card">
              <Link to={"/login"}>Log In</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
