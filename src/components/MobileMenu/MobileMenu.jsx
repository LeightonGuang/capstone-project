import "./MobileMenu.scss";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  return (
    <div className="mobile-menu">
      <nav className="mobile-menu__nav">
        <ul className="mobile-menu__list">
          <Link to={"/"} className="mobile-menu__link">
            <li className="mobile-menu__img-container">
              <img src="https://placehold.co/50x50" alt="Home Icon" />
              Home
            </li>
          </Link>
          <Link to={"/category"} className="mobile-menu__link">
            <li className="mobile-menu__img-container">
              <img src="https://placehold.co/50x50" alt="Category Icon" />
              Category
            </li>
          </Link>
          <Link to={"/saved"} className="mobile-menu__link">
            <li className="mobile-menu__img-container">
              <img src="https://placehold.co/50x50" alt="Saved Icon" />
              Saved
            </li>
          </Link>
          <Link to={"/profile"} className="mobile-menu__link">
            <li className="mobile-menu__img-container">
              <img src="https://placehold.co/50x50" alt="Profile Icon" />
              Profile
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
